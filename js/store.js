/**
 * Edifyron State & Persistence Manager (Engineering & INR Localized)
 * Handles Cart, Wishlist, Enrolled Courses, Progress, Quiz XP, and Leaderboard.
 */

const STORAGE_KEYS = {
  CART: "edifyron_cart",
  WISHLIST: "edifyron_wishlist",
  ENROLLED: "edifyron_enrolled",
  PROGRESS: "edifyron_progress",
  THEME: "edifyron_theme",
  COUPON: "edifyron_applied_coupon",
  USER_NOTES: "edifyron_notes",
  REEL_LIKES: "edifyron_reel_likes",
  USER_XP: "edifyron_user_xp",
  USER_STREAK: "edifyron_user_streak"
};

class EdifyronStore {
  constructor() {
    this.initDefaultState();
  }

  initDefaultState() {
    if (!localStorage.getItem(STORAGE_KEYS.ENROLLED)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(["c1"]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REEL_LIKES)) {
      localStorage.setItem(STORAGE_KEYS.REEL_LIKES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_XP)) {
      localStorage.setItem(STORAGE_KEYS.USER_XP, "4200");
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_STREAK)) {
      localStorage.setItem(STORAGE_KEYS.USER_STREAK, "5");
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
      const defaultProgress = {
        "c1": {
          completedLectures: ["l1_1", "l1_2"],
          lastWatchedId: "l1_3"
        }
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(defaultProgress));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_NOTES)) {
      const defaultNotes = {
        "c1": [
          { id: "n1", lectureId: "l1_1", timeSec: 45, text: "Memory allocation: & operator returns address, * dereferences address.", date: "Feb 14, 2026" }
        ]
      };
      localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(defaultNotes));
    }
  }

  // --- QUIZ & XP SYSTEM ---
  getUserXP() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.USER_XP)) || 4200;
  }

  addXP(points) {
    const current = this.getUserXP();
    const updated = current + points;
    localStorage.setItem(STORAGE_KEYS.USER_XP, updated.toString());
    
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.USER_STREAK)) || 5;
    localStorage.setItem(STORAGE_KEYS.USER_STREAK, (streak + 1).toString());
    
    this.emitChange("xp");
    this.showToast(`+${points} XP Earned! Streak +1 🔥`, "success");
    return updated;
  }

  getUserStreak() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.USER_STREAK)) || 5;
  }

  // --- REELS / SHORTS ---
  getLikedReels() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.REEL_LIKES)) || [];
    } catch {
      return [];
    }
  }

  toggleLikeReel(reelId) {
    const likes = this.getLikedReels();
    const idx = likes.indexOf(reelId);
    let isLiked = false;
    if (idx === -1) {
      likes.push(reelId);
      isLiked = true;
    } else {
      likes.splice(idx, 1);
      isLiked = false;
    }
    localStorage.setItem(STORAGE_KEYS.REEL_LIKES, JSON.stringify(likes));
    this.emitChange("reels");
    return isLiked;
  }

  isReelLiked(reelId) {
    return this.getLikedReels().includes(reelId);
  }

  // --- CART MANAGEMENT (INR ₹) ---
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch {
      return [];
    }
  }

  addToCart(courseId) {
    const cart = this.getCart();
    if (!cart.includes(courseId)) {
      cart.push(courseId);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      this.emitChange("cart");
      this.showToast("Course added to Cart! 🛒", "success");
      return true;
    } else {
      this.showToast("Course is already in your Cart", "info");
      return false;
    }
  }

  removeFromCart(courseId) {
    let cart = this.getCart();
    cart = cart.filter(id => id !== courseId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitChange("cart");
    this.showToast("Item removed from Cart", "info");
  }

  clearCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    this.removeCoupon();
    this.emitChange("cart");
  }

  isInCart(courseId) {
    return this.getCart().includes(courseId);
  }

  getCartCourses() {
    const cartIds = this.getCart();
    return cartIds.map(id => getCourseById(id)).filter(Boolean);
  }

  getCartSubtotal() {
    const courses = this.getCartCourses();
    return courses.reduce((sum, c) => sum + c.price, 0);
  }

  // --- COUPON SYSTEM (INR) ---
  getCoupon() {
    return localStorage.getItem(STORAGE_KEYS.COUPON) || null;
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    const VALID_COUPONS = {
      "FUTURE50": { discountPct: 0.50, desc: "50% Off Future Special" },
      "ENGINEER": { discountFlat: 150, desc: "₹150 Off Student Code" },
      "EDIFY2026": { discountPct: 0.35, desc: "35% Off Launch Discount" },
      "WELCOME100": { discountPct: 1.00, desc: "100% Free Scholarship" }
    };

    if (VALID_COUPONS[cleanCode]) {
      localStorage.setItem(STORAGE_KEYS.COUPON, cleanCode);
      this.emitChange("cart");
      this.showToast(`Coupon '${cleanCode}' Applied! 🎉`, "success");
      return { success: true, coupon: VALID_COUPONS[cleanCode] };
    } else {
      this.showToast("Invalid coupon. Try 'FUTURE50' or 'ENGINEER'", "error");
      return { success: false, message: "Invalid Coupon Code" };
    }
  }

  removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    this.emitChange("cart");
  }

  getCartFinalTotal() {
    const subtotal = this.getCartSubtotal();
    const couponCode = this.getCoupon();
    if (!couponCode) return { total: subtotal, discount: 0, coupon: null };

    let discountAmount = 0;
    let discountRate = 0;

    if (couponCode === "FUTURE50") {
      discountRate = 0.50;
      discountAmount = Math.round(subtotal * 0.50);
    } else if (couponCode === "ENGINEER") {
      discountAmount = Math.min(subtotal, 150);
      discountRate = subtotal > 0 ? (discountAmount / subtotal) : 0;
    } else if (couponCode === "EDIFY2026") {
      discountRate = 0.35;
      discountAmount = Math.round(subtotal * 0.35);
    } else if (couponCode === "WELCOME100") {
      discountRate = 1.00;
      discountAmount = subtotal;
    }

    const finalTotal = Math.max(0, subtotal - discountAmount);

    return {
      subtotal: subtotal,
      discount: discountAmount,
      total: finalTotal,
      coupon: couponCode,
      discountRate: discountRate
    };
  }

  // --- WISHLIST MANAGEMENT ---
  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
    } catch {
      return [];
    }
  }

  toggleWishlist(courseId) {
    const wishlist = this.getWishlist();
    const index = wishlist.indexOf(courseId);
    let isAdded = false;
    if (index === -1) {
      wishlist.push(courseId);
      isAdded = true;
      this.showToast("Saved to Wishlist ❤️", "success");
    } else {
      wishlist.splice(index, 1);
      this.showToast("Removed from Wishlist", "info");
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    this.emitChange("wishlist");
    return isAdded;
  }

  isInWishlist(courseId) {
    return this.getWishlist().includes(courseId);
  }

  getWishlistCourses() {
    return this.getWishlist().map(id => getCourseById(id)).filter(Boolean);
  }

  // --- ENROLLMENT & PURCHASES ---
  getEnrolled() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLED)) || [];
    } catch {
      return [];
    }
  }

  isEnrolled(courseId) {
    return this.getEnrolled().includes(courseId);
  }

  enrollCourses(courseIds) {
    const enrolled = this.getEnrolled();
    let newEnrolls = 0;
    courseIds.forEach(id => {
      if (!enrolled.includes(id)) {
        enrolled.push(id);
        newEnrolls++;
      }
    });
    localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolled));
    this.clearCart();
    this.emitChange("enrolled");
    return newEnrolls;
  }

  // --- PROGRESS TRACKING ---
  getProgress(courseId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
      return all[courseId] || { completedLectures: [], lastWatchedId: null };
    } catch {
      return { completedLectures: [], lastWatchedId: null };
    }
  }

  toggleLectureComplete(courseId, lectureId) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
    if (!all[courseId]) {
      all[courseId] = { completedLectures: [], lastWatchedId: lectureId };
    }

    const completed = all[courseId].completedLectures || [];
    const idx = completed.indexOf(lectureId);
    let status = false;
    if (idx === -1) {
      completed.push(lectureId);
      status = true;
      this.showToast("Lecture marked as completed! 🎯", "success");
    } else {
      completed.splice(idx, 1);
      this.showToast("Lecture marked as incomplete", "info");
    }
    all[courseId].completedLectures = completed;
    all[courseId].lastWatchedId = lectureId;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    this.emitChange("progress");
    return status;
  }

  isLectureCompleted(courseId, lectureId) {
    const progress = this.getProgress(courseId);
    return progress.completedLectures.includes(lectureId);
  }

  getCourseCompletionPercentage(courseId) {
    const course = getCourseById(courseId);
    if (!course) return 0;
    let totalLectures = 0;
    course.curriculum.forEach(sec => totalLectures += sec.lectures.length);
    if (totalLectures === 0) return 0;

    const progress = this.getProgress(courseId);
    const completedCount = progress.completedLectures.length;
    return Math.min(100, Math.round((completedCount / totalLectures) * 100));
  }

  // --- USER NOTES ---
  getNotes(courseId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_NOTES)) || {};
      return all[courseId] || [];
    } catch {
      return [];
    }
  }

  addNote(courseId, lectureId, timeSec, text) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_NOTES)) || {};
    if (!all[courseId]) all[courseId] = [];
    
    const newNote = {
      id: "note_" + Date.now(),
      lectureId,
      timeSec: Math.floor(timeSec),
      text: text.trim(),
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
    };
    all[courseId].unshift(newNote);
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(all));
    this.emitChange("notes");
    this.showToast("Note saved at current timestamp!", "success");
    return newNote;
  }

  deleteNote(courseId, noteId) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_NOTES)) || {};
    if (all[courseId]) {
      all[courseId] = all[courseId].filter(n => n.id !== noteId);
      localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(all));
      this.emitChange("notes");
      this.showToast("Note deleted", "info");
    }
  }

  // --- THEME ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light"; // Default clean bright
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
    this.emitChange("theme");
  }

  toggleTheme() {
    const current = this.getTheme();
    const next = current === "dark" ? "light" : "dark";
    this.setTheme(next);
    return next;
  }

  // --- NOTIFICATIONS & TOASTS ---
  emitChange(topic) {
    window.dispatchEvent(new CustomEvent("edifyron_state_change", { detail: { topic } }));
  }

  showToast(message, type = "info") {
    let container = document.getElementById("edifyron-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "edifyron-toast-container";
      container.className = "edifyron-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `edifyron-toast toast-${type}`;
    
    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-text">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

const store = new EdifyronStore();

(function initTheme() {
  const savedTheme = store.getTheme();
  document.documentElement.setAttribute("data-theme", savedTheme);
})();
