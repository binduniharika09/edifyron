/**
 * Edifyron Main App Controller (Engineering Students Edition)
 * Branding: Edifyron - "THE FUTURE STARTS HERE" & "MADE IN INDIA - MADE FOR INDIA"
 */

document.addEventListener("DOMContentLoaded", () => {
  initTwoPhaseIntro();
  initNavbar();
  initSearchAutocomplete();
  initDrawers();
  initHeroSlider();
  initSkillTabs();
  initReelsSection();
  initQuizArena();
  initCollegeLeaderboard();
  initTeachCalculator();
  initModals();
  initThemeToggle();
  renderDynamicComponents();

  window.addEventListener("edifyron_state_change", (e) => {
    updateBadgeCounters();
    if (e.detail?.topic === "cart") renderCartDrawer();
    if (e.detail?.topic === "wishlist") renderWishlistDrawer();
    if (e.detail?.topic === "reels") updateReelsUI();
    if (e.detail?.topic === "xp") updateLeaderboardUI();
  });

  updateBadgeCounters();
});

// ==========================================================================
// TWO-PHASE CINEMATIC MOTION INTRO SEQUENCE
// Phase 1: Edifyron + Tagline -> Phase 2: MADE IN INDIA - MADE FOR INDIA
// ==========================================================================
function initTwoPhaseIntro() {
  const introEl = document.getElementById("brandMotionIntro");
  const skipBtn = document.getElementById("skipIntroBtn");
  const replayBtns = document.querySelectorAll(".replay-intro-btn");

  if (!introEl) return;

  // Auto transition to main page after 5.4 seconds (full 2-phase sequence)
  let hideTimer = setTimeout(() => {
    hideIntro();
  }, 5500);

  function hideIntro() {
    introEl.classList.add("hidden");
    clearTimeout(hideTimer);
  }

  function showIntro() {
    introEl.classList.remove("hidden");
    const phase1 = introEl.querySelector(".phase-1-wrapper");
    const phase2 = introEl.querySelector(".phase-2-wrapper");

    if (phase1 && phase2) {
      phase1.style.animation = 'none';
      phase2.style.animation = 'none';
      void phase1.offsetWidth; // Reflow
      void phase2.offsetWidth;
      phase1.style.animation = 'phase1FadeOut 0.5s 2.7s forwards';
      phase2.style.animation = 'phase2Reveal 2.8s 2.8s forwards';
    }

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      hideIntro();
    }, 5500);
  }

  if (skipBtn) skipBtn.addEventListener("click", hideIntro);

  replayBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showIntro();
    });
  });
}

// --- NAVBAR & MEGA-MENU ---
function initNavbar() {
  const categoriesBtn = document.getElementById("categoriesBtn");
  const megaMenu = document.getElementById("megaMenuDropdown");
  const categoriesList = document.getElementById("megaMenuCategoriesList");
  const subcatPanel = document.getElementById("megaMenuSubcategoriesPanel");

  if (categoriesList && subcatPanel) {
    categoriesList.innerHTML = EDIFYRON_CATEGORIES.map((cat, idx) => `
      <li class="mega-cat-item ${idx === 0 ? 'active' : ''}" data-cat-id="${cat.id}">
        <span>${cat.name}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </li>
    `).join("");

    renderMegaSubcategories(EDIFYRON_CATEGORIES[0]);

    categoriesList.querySelectorAll(".mega-cat-item").forEach(item => {
      item.addEventListener("mouseenter", () => {
        categoriesList.querySelectorAll(".mega-cat-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        const catId = item.dataset.catId;
        const cat = EDIFYRON_CATEGORIES.find(c => c.id === catId);
        if (cat) renderMegaSubcategories(cat);
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (megaMenu && !categoriesBtn?.contains(e.target) && !megaMenu.contains(e.target)) {
      megaMenu.classList.remove("active");
    }
  });

  if (categoriesBtn) {
    categoriesBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      megaMenu?.classList.toggle("active");
    });
  }
}

function renderMegaSubcategories(cat) {
  const subcatPanel = document.getElementById("megaMenuSubcategoriesPanel");
  if (!subcatPanel) return;

  subcatPanel.innerHTML = `
    <div class="subcat-title">${cat.name} Topics</div>
    <ul class="subcat-list">
      ${cat.subcategories.map(sub => `
        <li>
          <a href="courses.html?category=${cat.id}&sub=${sub.id}" class="subcat-link">
            <span>${sub.name}</span>
            <span class="subcat-count">${sub.count} courses</span>
          </a>
        </li>
      `).join("")}
    </ul>
    <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
      <a href="courses.html?category=${cat.id}" class="btn btn-sm btn-outline-primary" style="width: 100%;">
        Explore All ${cat.name} &rarr;
      </a>
    </div>
  `;
}

// --- SEARCH AUTOCOMPLETE ---
function initSearchAutocomplete() {
  const searchInput = document.getElementById("globalSearchInput");
  const autocompleteDropdown = document.getElementById("searchAutocompleteDropdown");
  const searchForm = document.getElementById("globalSearchForm");

  if (!searchInput || !autocompleteDropdown) return;

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 1) {
      autocompleteDropdown.classList.remove("active");
      return;
    }

    const matchingCourses = EDIFYRON_COURSES.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.headline.toLowerCase().includes(query) ||
      c.instructor.name.toLowerCase().includes(query)
    ).slice(0, 4);

    const matchingSuggestions = POPULAR_SEARCHES.filter(s => 
      s.toLowerCase().includes(query)
    ).slice(0, 4);

    let html = "";
    if (matchingSuggestions.length > 0) {
      html += `
        <div class="autocomplete-section">
          <div class="autocomplete-heading">Engineering Topics</div>
          ${matchingSuggestions.map(s => `
            <a href="courses.html?q=${encodeURIComponent(s)}" class="autocomplete-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>${highlightQuery(s, query)}</span>
            </a>
          `).join("")}
        </div>
      `;
    }

    if (matchingCourses.length > 0) {
      html += `
        <div class="autocomplete-section">
          <div class="autocomplete-heading">Placement Masterclasses (INR ₹)</div>
          ${matchingCourses.map(c => `
            <a href="course-details.html?id=${c.id}" class="autocomplete-item">
              <img src="${c.thumbnail}" class="course-thumb-tiny" alt="">
              <div>
                <div style="font-weight: 700; font-size: 0.85rem; line-height: 1.2;">${highlightQuery(c.title, query)}</div>
                <div style="font-size: 0.75rem; color: var(--primary);">₹${c.price} &bull; ${c.instructor.name}</div>
              </div>
            </a>
          `).join("")}
        </div>
      `;
    }

    if (!matchingSuggestions.length && !matchingCourses.length) {
      html = `
        <div class="autocomplete-section" style="padding: 16px; text-align: center; color: var(--text-secondary);">
          No direct matches for "<strong>${query}</strong>". <br>
          <a href="courses.html?q=${encodeURIComponent(query)}" style="color: var(--primary); font-weight: 700; text-decoration: underline; margin-top: 6px; display: inline-block;">
            Search all courses for "${query}" &rarr;
          </a>
        </div>
      `;
    }

    autocompleteDropdown.innerHTML = html;
    autocompleteDropdown.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
      autocompleteDropdown.classList.remove("active");
    }
  });

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (val) window.location.href = `courses.html?q=${encodeURIComponent(val)}`;
    });
  }
}

function highlightQuery(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.substring(0, idx) + `<strong>${text.substring(idx, idx + query.length)}</strong>` + text.substring(idx + query.length);
}

// --- HERO CAROUSEL ---
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.getElementById("heroSliderDots");
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");

  if (!slides.length) return;

  let currentSlide = 0;
  let autoplayTimer = null;

  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from(slides).map((_, idx) => `
      <div class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
    `).join("");

    dotsContainer.querySelectorAll(".slider-dot").forEach(dot => {
      dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.index)));
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    const dots = dotsContainer?.querySelectorAll(".slider-dot");
    if (dots) dots[currentSlide]?.classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    if (dots) dots[currentSlide]?.classList.add("active");
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(currentSlide - 1); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(currentSlide + 1); resetAutoplay(); });

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

// ==========================================================================
// INTERACTIVE ENGINEERING QUIZ ARENA
// ==========================================================================
let currentQuizIdx = 0;
let quizTimer = null;
let timeLeft = 15;

function initQuizArena() {
  loadQuizQuestion(currentQuizIdx);

  const nextBtn = document.getElementById("quizNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQuizIdx = (currentQuizIdx + 1) % EDIFYRON_QUIZZES.length;
      loadQuizQuestion(currentQuizIdx);
    });
  }
}

function loadQuizQuestion(index) {
  const q = EDIFYRON_QUIZZES[index];
  if (!q) return;

  const topicBadge = document.getElementById("quizTopicBadge");
  const questionTitle = document.getElementById("quizQuestionTitle");
  const codeBlock = document.getElementById("quizCodeBlock");
  const optionsGrid = document.getElementById("quizOptionsGrid");
  const feedbackBox = document.getElementById("quizFeedbackBox");
  const nextBtn = document.getElementById("quizNextBtn");
  const timerFill = document.getElementById("quizTimerBarFill");

  if (topicBadge) topicBadge.textContent = `${q.topic} Challenge (Q${index + 1}/${EDIFYRON_QUIZZES.length})`;
  if (questionTitle) questionTitle.textContent = q.question;
  
  if (codeBlock) {
    if (q.code) {
      codeBlock.style.display = "block";
      codeBlock.textContent = q.code;
    } else {
      codeBlock.style.display = "none";
    }
  }

  if (feedbackBox) {
    feedbackBox.style.display = "none";
    feedbackBox.className = "quiz-feedback-box";
  }

  if (nextBtn) nextBtn.style.display = "none";

  // Reset timer
  clearInterval(quizTimer);
  timeLeft = 15;
  if (timerFill) {
    timerFill.style.width = "100%";
    timerFill.style.transition = "none";
    void timerFill.offsetWidth;
    timerFill.style.transition = "width 15s linear";
    timerFill.style.width = "0%";
  }

  quizTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      handleQuizAnswer(-1, q); // Time out
    }
  }, 1000);

  // Render Options
  if (optionsGrid) {
    optionsGrid.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option-btn" data-opt-index="${i}">
        <span style="font-weight: 800; color: var(--primary);">${String.fromCharCode(65 + i)}.</span>
        <span>${opt}</span>
      </button>
    `).join("");

    optionsGrid.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        clearInterval(quizTimer);
        const chosenIdx = parseInt(btn.dataset.optIndex);
        handleQuizAnswer(chosenIdx, q);
      });
    });
  }
}

function handleQuizAnswer(chosenIdx, q) {
  const optionsGrid = document.getElementById("quizOptionsGrid");
  const feedbackBox = document.getElementById("quizFeedbackBox");
  const nextBtn = document.getElementById("quizNextBtn");

  if (!optionsGrid || !feedbackBox) return;

  const buttons = optionsGrid.querySelectorAll(".quiz-option-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add("correct");
    } else if (idx === chosenIdx) {
      btn.classList.add("wrong");
    }
  });

  const isCorrect = (chosenIdx === q.correctIndex);
  if (isCorrect) {
    store.addXP(100);
    feedbackBox.style.display = "block";
    feedbackBox.style.backgroundColor = "#d1fae5";
    feedbackBox.style.color = "#065f46";
    feedbackBox.style.border = "1px solid #a7f3d0";
    feedbackBox.innerHTML = `<strong>🎉 Correct! (+100 XP)</strong><br>${q.explanation}`;
  } else {
    feedbackBox.style.display = "block";
    feedbackBox.style.backgroundColor = "#ffe4e6";
    feedbackBox.style.color = "#991b1b";
    feedbackBox.style.border = "1px solid #fecdd3";
    feedbackBox.innerHTML = `<strong>❌ ${chosenIdx === -1 ? 'Time Expired!' : 'Incorrect!'}</strong><br>${q.explanation}`;
  }

  if (nextBtn) nextBtn.style.display = "inline-flex";
}

// ==========================================================================
// LIVE INDIAN ENGINEERING COLLEGES LEADERBOARD
// ==========================================================================
function initCollegeLeaderboard() {
  updateLeaderboardUI();
}

function updateLeaderboardUI() {
  const container = document.getElementById("collegeLeaderboardList");
  if (!container) return;

  const userXP = store.getUserXP();
  const streak = store.getUserStreak();

  // Update user's score in dataset
  const updatedLeaderboard = COLLEGE_LEADERBOARD.map(item => {
    if (item.name.includes("You")) {
      return { ...item, xp: userXP, streak: streak };
    }
    return item;
  }).sort((a, b) => b.xp - a.xp);

  container.innerHTML = updatedLeaderboard.map((item, idx) => {
    const isUser = item.name.includes("You");
    let medal = idx + 1;
    if (idx === 0) medal = "🥇";
    if (idx === 1) medal = "🥈";
    if (idx === 2) medal = "🥉";

    return `
      <li class="leaderboard-item ${isUser ? 'is-user' : ''}">
        <span class="leaderboard-rank-num">${medal}</span>
        <img src="${item.avatar}" class="leaderboard-avatar" alt="">
        <div class="leaderboard-info">
          <div class="leaderboard-name">${item.name} ${isUser ? '<span class="badge" style="background:#0284c7; color:#fff; font-size:0.6rem;">YOU</span>' : ''}</div>
          <div class="leaderboard-college">${item.college} &bull; 🔥 ${item.streak}d streak</div>
        </div>
        <div class="leaderboard-xp-tag">${item.xp.toLocaleString("en-IN")} XP</div>
      </li>
    `;
  }).join("");
}

// ==========================================================================
// 30-SECOND ENGINEERING SKILL REELS & SHORTS
// ==========================================================================
let currentReelIndex = 0;

function initReelsSection() {
  const reelsContainer = document.getElementById("skillReelsGrid");
  if (!reelsContainer) return;

  reelsContainer.innerHTML = EDIFYRON_REELS.map((reel, idx) => `
    <div class="reel-card-vertical" onclick="openReelModal(${idx})">
      <img src="${reel.poster}" class="reel-poster-thumb" alt="">
      <div class="reel-card-overlay-gradient"></div>
      
      <div class="reel-duration-badge">⏱️ 30s Hack</div>
      
      <div class="reel-play-indicator">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </div>

      <div class="reel-card-info-bottom">
        <div class="reel-creator-strip">
          <img src="${reel.creator.avatar}" class="reel-creator-pic" alt="">
          <span class="reel-creator-handle">${reel.creator.name}</span>
        </div>
        <h4 class="reel-card-title">${reel.title}</h4>
        <div class="reel-stats-row">
          <span>▶️ ${reel.views}</span>
          <span>❤️ ${store.isReelLiked(reel.id) ? 'Liked' : reel.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join("");

  initReelModalHandlers();
}

function initReelModalHandlers() {
  const modal = document.getElementById("reelViewerModal");
  const closeBtn = document.getElementById("closeReelModalBtn");
  const nextBtn = document.getElementById("nextReelBtn");
  const prevBtn = document.getElementById("prevReelBtn");
  const likeBtn = document.getElementById("reelLikeBtn");
  const muteBtn = document.getElementById("reelMuteBtn");
  const video = document.getElementById("fullscreenReelVideo");

  if (!modal || !video) return;

  closeBtn?.addEventListener("click", () => {
    video.pause();
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      video.pause();
      modal.classList.remove("active");
    }
  });

  nextBtn?.addEventListener("click", () => {
    currentReelIndex = (currentReelIndex + 1) % EDIFYRON_REELS.length;
    loadReel(currentReelIndex);
  });

  prevBtn?.addEventListener("click", () => {
    currentReelIndex = (currentReelIndex - 1 + EDIFYRON_REELS.length) % EDIFYRON_REELS.length;
    loadReel(currentReelIndex);
  });

  likeBtn?.addEventListener("click", () => {
    const currentReel = EDIFYRON_REELS[currentReelIndex];
    if (!currentReel) return;

    const isLiked = store.toggleLikeReel(currentReel.id);
    likeBtn.classList.toggle("liked", isLiked);
    
    const countEl = document.getElementById("reelLikesCountDisplay");
    if (countEl) {
      countEl.textContent = isLiked ? (currentReel.likes + 1).toLocaleString() : currentReel.likes.toLocaleString();
    }
  });

  muteBtn?.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowDown") nextBtn?.click();
    if (e.key === "ArrowUp") prevBtn?.click();
    if (e.key === "Escape") closeBtn?.click();
  });
}

window.openReelModal = function(index) {
  currentReelIndex = index;
  const modal = document.getElementById("reelViewerModal");
  if (!modal) return;

  modal.classList.add("active");
  loadReel(currentReelIndex);
};

function loadReel(index) {
  const reel = EDIFYRON_REELS[index];
  const video = document.getElementById("fullscreenReelVideo");
  if (!reel || !video) return;

  video.src = reel.videoUrl;
  video.currentTime = 0;
  video.play().catch(() => {});

  document.getElementById("modalReelTitle").textContent = reel.title;
  document.getElementById("modalReelDesc").textContent = reel.desc;
  document.getElementById("modalReelCreatorName").textContent = reel.creator.name;
  document.getElementById("modalReelCreatorHandle").textContent = reel.creator.handle;
  document.getElementById("modalReelCreatorAvatar").src = reel.creator.avatar;
  
  const relatedCourseBtn = document.getElementById("modalReelRelatedCourseBtn");
  if (relatedCourseBtn) {
    relatedCourseBtn.href = `course-details.html?id=${reel.courseRef}`;
  }

  const isLiked = store.isReelLiked(reel.id);
  const likeBtn = document.getElementById("reelLikeBtn");
  if (likeBtn) likeBtn.classList.toggle("liked", isLiked);

  const countEl = document.getElementById("reelLikesCountDisplay");
  if (countEl) countEl.textContent = isLiked ? (reel.likes + 1).toLocaleString() : reel.likes.toLocaleString();
}

function updateReelsUI() {
  initReelsSection();
}

// --- TABBED SKILLS FOR ENGINEERING (C, C++, JAVA, PYTHON, DSA) ---
function initSkillTabs() {
  const tabs = document.querySelectorAll(".skill-tab-btn");
  const container = document.getElementById("tabCoursesGrid");
  const skillTitle = document.getElementById("skillBoxTitle");
  const skillDesc = document.getElementById("skillBoxDesc");
  const exploreBtn = document.getElementById("skillExploreBtn");

  if (!tabs.length || !container) return;

  const SKILL_CONTENT_MAP = {
    "c-cpp": {
      title: "Master C & C++ Memory Architecture and Placements",
      desc: "Build rock-solid low-level understanding of pointers, dynamic memory allocation, and high-performance C++ Standard Template Library (STL).",
      query: "c-cpp"
    },
    "java": {
      title: "Java 21, Spring Boot & Enterprise Microservices",
      desc: "Master JVM memory, multithreading, Spring Data JPA, and RESTful microservices for top software engineering roles.",
      query: "java"
    },
    "python": {
      title: "Python for Engineers: Scripting, DSA & AI",
      desc: "Write clean, idiomatic Python code, solve engineering challenges, and automate workflows with real projects.",
      query: "python"
    },
    "dsa": {
      title: "Data Structures & Algorithms (DSA) Placement Track",
      desc: "Master LeetCode Medium/Hard patterns, Dynamic Programming, Graphs, and Trees to crack FAANG/MAANG interviews.",
      query: "dsa"
    },
    "core-cs": {
      title: "Core CS Subjects: DBMS, Operating Systems & Networks",
      desc: "Prepare for technical campus interviews and GATE exams with comprehensive revision of Core CS subjects.",
      query: "core-cs"
    }
  };

  function renderTabCourses(skillKey) {
    const meta = SKILL_CONTENT_MAP[skillKey] || SKILL_CONTENT_MAP["c-cpp"];
    if (skillTitle) skillTitle.textContent = meta.title;
    if (skillDesc) skillDesc.textContent = meta.desc;
    if (exploreBtn) exploreBtn.href = `courses.html?q=${meta.query}`;

    const filteredCourses = EDIFYRON_COURSES.filter(c => c.skillTab === skillKey || c.subcategory === skillKey);
    const displayCourses = filteredCourses.length ? filteredCourses : EDIFYRON_COURSES.slice(0, 4);

    container.innerHTML = displayCourses.map((course, idx) => createCourseCardHtml(course, idx)).join("");
    attachPopoverHandlers();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const skill = tab.dataset.skill;
      renderTabCourses(skill);
    });
  });

  renderTabCourses("c-cpp");
}

// --- COURSE CARD & HOVER POPOVER (CLEAN BRIGHT & INR) ---
function createCourseCardHtml(course, index = 0) {
  const isWishlisted = store.isInWishlist(course.id);
  const isInCart = store.isInCart(course.id);
  const isEnrolled = store.isEnrolled(course.id);

  const popoverSide = (index % 4 >= 2) ? "popover-left" : "popover-right";

  let badgeHtml = "";
  if (course.badge) {
    let badgeClass = "badge-bestseller";
    if (course.badge.includes("Hot") || course.badge.includes("Top")) badgeClass = "badge-hot";
    if (course.badge.includes("Highest")) badgeClass = "badge-highest-rated";
    badgeHtml = `<span class="badge ${badgeClass}">${course.badge}</span>`;
  }

  const starIcons = renderStarIcons(course.rating);

  return `
    <div class="course-card-container" style="position: relative;">
      <div class="course-card" onclick="window.location.href='course-details.html?id=${course.id}'">
        <div class="course-card-thumb-wrapper">
          <img src="${course.thumbnail}" alt="${course.title}" class="course-card-thumb" loading="lazy">
          <div class="course-card-play-overlay">
            <div class="play-circle-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="course-card-body">
          <h3 class="course-card-title">${course.title}</h3>
          <div class="course-card-instructor">${course.instructor.name}</div>
          <div class="course-card-rating-row">
            <span class="rating-score">${course.rating.toFixed(1)}</span>
            <div class="rating-stars">${starIcons}</div>
            <span class="rating-count">(${course.ratingCount.toLocaleString("en-IN")})</span>
          </div>
          <div class="course-card-price-row">
            <span class="course-price-current">₹${course.price.toLocaleString("en-IN")}</span>
            <span class="course-price-original">₹${course.originalPrice.toLocaleString("en-IN")}</span>
          </div>
          <div class="course-card-badge-container">
            ${badgeHtml}
          </div>
        </div>
      </div>

      <!-- Clean Popover -->
      <div class="course-popover ${popoverSide}">
        <div class="popover-title">${course.title}</div>
        <div class="popover-updated">Updated ${course.lastUpdated}</div>
        <div class="popover-meta">
          <span>${course.durationHours} hrs</span>
          <span>&bull;</span>
          <span>${course.level}</span>
        </div>
        <div class="popover-headline">${course.headline}</div>
        
        <ul class="popover-objectives-list">
          ${course.objectives.slice(0, 3).map(obj => `
            <li class="popover-obj-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${obj}</span>
            </li>
          `).join("")}
        </ul>

        <div class="popover-actions">
          ${isEnrolled ? `
            <a href="player.html?id=${course.id}" class="btn btn-primary" style="flex-grow: 1;">
              Go to Classroom
            </a>
          ` : `
            <button class="btn btn-primary btn-add-cart" data-id="${course.id}" style="flex-grow: 1;">
              ${isInCart ? 'In Cart &check;' : 'Add to Cart (₹' + course.price + ')'}
            </button>
          `}
          <button class="popover-wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${course.id}" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStarIcons(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    } else {
      stars += `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
  }
  return stars;
}

function attachPopoverHandlers() {
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      store.addToCart(id);
      btn.textContent = "In Cart ✓";
    };
  });

  document.querySelectorAll(".popover-wishlist-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const added = store.toggleWishlist(id);
      btn.classList.toggle("active", added);
      btn.querySelector("svg").setAttribute("fill", added ? "currentColor" : "none");
    };
  });
}

// --- DRAWERS ---
function initDrawers() {
  const backdrop = document.getElementById("drawerBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const wishlistDrawer = document.getElementById("wishlistDrawer");

  const cartBtn = document.getElementById("cartNavBtn");
  const wishlistBtn = document.getElementById("wishlistNavBtn");
  const closeBtns = document.querySelectorAll(".drawer-close-btn");

  function openDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.add("open");
    backdrop?.classList.add("open");
    if (drawer === cartDrawer) renderCartDrawer();
    if (drawer === wishlistDrawer) renderWishlistDrawer();
  }

  function closeAllDrawers() {
    cartDrawer?.classList.remove("open");
    wishlistDrawer?.classList.remove("open");
    backdrop?.classList.remove("open");
  }

  if (cartBtn) cartBtn.addEventListener("click", () => openDrawer(cartDrawer));
  if (wishlistBtn) wishlistBtn.addEventListener("click", () => openDrawer(wishlistDrawer));
  if (backdrop) backdrop.addEventListener("click", closeAllDrawers);

  closeBtns.forEach(btn => btn.addEventListener("click", closeAllDrawers));
}

function renderCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  const footer = document.getElementById("cartDrawerFooter");
  if (!body) return;

  const courses = store.getCartCourses();
  const summary = store.getCartFinalTotal();

  if (courses.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty-state">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 14px; color: var(--primary);"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <h4 style="font-weight: 800; margin-bottom: 6px;">Your cart is empty</h4>
        <p style="font-size: 0.85rem; margin-bottom: 16px;">Enroll in engineering masterclasses today.</p>
        <a href="courses.html" class="btn btn-primary btn-sm">Explore Courses</a>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  body.innerHTML = courses.map(c => `
    <div class="drawer-item-card">
      <img src="${c.thumbnail}" class="drawer-item-thumb" alt="">
      <div class="drawer-item-info">
        <a href="course-details.html?id=${c.id}" class="drawer-item-title">${c.title}</a>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">By ${c.instructor.name}</div>
        <div class="drawer-item-price-row">
          <span class="drawer-item-price">₹${c.price.toLocaleString("en-IN")}</span>
          <span class="drawer-item-remove" onclick="store.removeFromCart('${c.id}')">Remove</span>
        </div>
      </div>
    </div>
  `).join("");

  if (footer) {
    const currentCoupon = store.getCoupon();
    footer.innerHTML = `
      <div class="coupon-input-group">
        <input type="text" id="cartCouponInput" class="form-input" placeholder="Coupon (e.g. FUTURE50)" value="${currentCoupon || ''}">
        <button class="btn btn-outline btn-sm" id="applyCouponBtn">${currentCoupon ? 'Applied ✓' : 'Apply'}</button>
      </div>

      <div class="drawer-total-row">
        <span style="font-weight: 700; color: var(--text-secondary);">Total:</span>
        <div>
          <span class="drawer-total-amount">₹${summary.total.toLocaleString("en-IN")}</span>
          ${summary.discount > 0 ? `<span class="drawer-original-amount">₹${summary.subtotal.toLocaleString("en-IN")}</span>` : ''}
        </div>
      </div>

      <button class="btn btn-primary" id="drawerCheckoutBtn" style="width: 100%; margin-top: 14px;">
        Proceed to UPI Checkout &rarr;
      </button>
    `;

    document.getElementById("applyCouponBtn")?.addEventListener("click", () => {
      const code = document.getElementById("cartCouponInput")?.value;
      store.applyCoupon(code);
    });

    document.getElementById("drawerCheckoutBtn")?.addEventListener("click", () => {
      openCheckoutModal();
    });
  }
}

function renderWishlistDrawer() {
  const body = document.getElementById("wishlistDrawerBody");
  if (!body) return;

  const courses = store.getWishlistCourses();
  if (courses.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty-state">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 14px; color: var(--primary);"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <h4 style="font-weight: 800; margin-bottom: 6px;">Your wishlist is empty</h4>
        <a href="courses.html" class="btn btn-primary btn-sm">Explore Courses</a>
      </div>
    `;
    return;
  }

  body.innerHTML = courses.map(c => `
    <div class="drawer-item-card">
      <img src="${c.thumbnail}" class="drawer-item-thumb" alt="">
      <div class="drawer-item-info">
        <a href="course-details.html?id=${c.id}" class="drawer-item-title">${c.title}</a>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">By ${c.instructor.name}</div>
        <div class="drawer-item-price-row">
          <span class="drawer-item-price">₹${c.price.toLocaleString("en-IN")}</span>
          <div style="display: flex; gap: 10px;">
            <span class="drawer-item-remove" style="color: var(--primary); font-weight: 700;" onclick="store.addToCart('${c.id}'); store.toggleWishlist('${c.id}');">Move to Cart</span>
            <span class="drawer-item-remove" onclick="store.toggleWishlist('${c.id}')">Remove</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function updateBadgeCounters() {
  const cartBadge = document.getElementById("cartCountBadge");
  const wishlistBadge = document.getElementById("wishlistCountBadge");

  const cartCount = store.getCart().length;
  const wishlistCount = store.getWishlist().length;

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "flex" : "none";
  }

  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? "flex" : "none";
  }
}

// --- CHECKOUT WITH UPI ---
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  const courses = store.getCartCourses();
  const summary = store.getCartFinalTotal();

  const checkoutItemsContainer = document.getElementById("checkoutModalItems");
  const checkoutTotalContainer = document.getElementById("checkoutModalTotal");

  if (checkoutItemsContainer) {
    checkoutItemsContainer.innerHTML = courses.map(c => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
        <span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.title}</span>
        <strong>₹${c.price.toLocaleString("en-IN")}</strong>
      </div>
    `).join("");
  }

  if (checkoutTotalContainer) {
    checkoutTotalContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px; font-size: 1.15rem; font-weight: 900;">
        <span>Total Payable:</span>
        <span style="color: var(--primary);">₹${summary.total.toLocaleString("en-IN")}</span>
      </div>
    `;
  }

  modal.classList.add("active");

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
      e.preventDefault();
      const courseIds = courses.map(c => c.id);
      store.enrollCourses(courseIds);
      modal.classList.remove("active");
      
      store.showToast("🎉 Payment Successful via UPI! Welcome to Edifyron.", "success");
      
      setTimeout(() => {
        if (courseIds[0]) {
          window.location.href = `player.html?id=${courseIds[0]}`;
        }
      }, 1000);
    };
  }
}

// --- TEACH ON EDIFYRON EARNINGS CALCULATOR (INR ₹) ---
function initTeachCalculator() {
  const slider = document.getElementById("studentsCountSlider");
  const studentCountDisplay = document.getElementById("studentsCountDisplay");
  const earningsDisplay = document.getElementById("monthlyEarningsDisplay");

  if (!slider || !studentCountDisplay || !earningsDisplay) return;

  function updateEarnings() {
    const students = parseInt(slider.value);
    studentCountDisplay.textContent = students.toLocaleString("en-IN") + " students";
    const estimated = Math.round(students * 350);
    earningsDisplay.textContent = "₹" + estimated.toLocaleString("en-IN") + " / month";
  }

  slider.addEventListener("input", updateEarnings);
  updateEarnings();
}

function initModals() {
  document.querySelectorAll(".modal-close-btn, .modal-overlay").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el) {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      }
    });
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  if (!toggleBtn) return;

  function updateIcon(theme) {
    toggleBtn.innerHTML = theme === "dark" 
      ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  updateIcon(store.getTheme());

  toggleBtn.addEventListener("click", () => {
    const next = store.toggleTheme();
    updateIcon(next);
  });
}

// --- DYNAMIC HOMEPAGE COMPONENTS ---
function renderDynamicComponents() {
  const viewingContainer = document.getElementById("studentsViewingGrid");
  if (viewingContainer) {
    const recommendations = EDIFYRON_COURSES.slice(0, 6);
    viewingContainer.innerHTML = recommendations.map((c, i) => createCourseCardHtml(c, i)).join("");
    attachPopoverHandlers();
  }

  const categoriesGrid = document.getElementById("topCategoriesBentoGrid");
  if (categoriesGrid) {
    const bentoItems = [
      { name: "C & C++ Programming", count: "180+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`, link: "courses.html?category=programming&sub=c-cpp" },
      { name: "Java & Spring Boot", count: "240+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`, link: "courses.html?category=programming&sub=java" },
      { name: "Python for Engineers", count: "310+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>`, link: "courses.html?category=programming&sub=python" },
      { name: "DSA & LeetCode Top 150", count: "160+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`, link: "courses.html?category=dsa-placements" },
      { name: "DBMS & SQL Query Mastery", count: "130+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`, link: "courses.html?category=core-cs&sub=dbms" },
      { name: "Operating Systems & Linux", count: "95+ Courses", icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`, link: "courses.html?category=core-cs&sub=os" }
    ];

    categoriesGrid.innerHTML = bentoItems.map(item => `
      <a href="${item.link}" class="category-tile">
        <div class="category-icon-wrapper">
          ${item.icon}
        </div>
        <div class="category-tile-name">${item.name}</div>
        <div class="category-tile-count">${item.count}</div>
      </a>
    `).join("");
  }
}
