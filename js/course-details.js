/**
 * Edifyron Course Details Controller (INR ₹ Localized)
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id") || "c1";
  const course = getCourseById(courseId);

  renderCourseDetails(course);
});

function renderCourseDetails(course) {
  document.title = `${course.title} | Edifyron`;

  const breadcrumb = document.getElementById("courseBreadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a>
      <span>&gt;</span>
      <a href="courses.html?category=${course.category}">${capitalize(course.category)}</a>
      <span>&gt;</span>
      <span>${course.subcategory}</span>
    `;
  }

  const titleEl = document.getElementById("courseDetailTitle");
  const headlineEl = document.getElementById("courseDetailHeadline");
  const ratingScoreEl = document.getElementById("courseDetailRatingScore");
  const ratingStarsEl = document.getElementById("courseDetailRatingStars");
  const ratingCountEl = document.getElementById("courseDetailRatingCount");
  const studentsCountEl = document.getElementById("courseDetailStudents");
  const instructorNameEl = document.getElementById("courseDetailInstructor");
  const updatedDateEl = document.getElementById("courseDetailUpdated");
  const languageEl = document.getElementById("courseDetailLanguage");

  if (titleEl) titleEl.textContent = course.title;
  if (headlineEl) headlineEl.textContent = course.headline;
  if (ratingScoreEl) ratingScoreEl.textContent = course.rating.toFixed(1);
  if (ratingStarsEl) ratingStarsEl.innerHTML = renderStarIcons(course.rating);
  if (ratingCountEl) ratingCountEl.textContent = `(${course.ratingCount.toLocaleString("en-IN")} ratings)`;
  if (studentsCountEl) studentsCountEl.textContent = `${course.students.toLocaleString("en-IN")} students`;
  if (instructorNameEl) instructorNameEl.textContent = course.instructor.name;
  if (updatedDateEl) updatedDateEl.textContent = `Last updated ${course.lastUpdated}`;
  if (languageEl) languageEl.textContent = `${course.language} [${course.subtitles.join(", ")}]`;

  renderStickyCard(course);

  const objectivesGrid = document.getElementById("courseObjectivesGrid");
  if (objectivesGrid) {
    objectivesGrid.innerHTML = course.objectives.map(obj => `
      <div style="display: flex; gap: 12px; font-size: 0.9rem; line-height: 1.4;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--brand-cyan); flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${obj}</span>
      </div>
    `).join("");
  }

  const prereqList = document.getElementById("coursePrerequisitesList");
  if (prereqList) {
    prereqList.innerHTML = course.prerequisites.map(p => `
      <li style="margin-bottom: 8px; font-size: 0.9rem;">&bull; ${p}</li>
    `).join("");
  }

  const descEl = document.getElementById("courseDescriptionText");
  if (descEl) {
    descEl.innerHTML = course.description.replace(/\n\n/g, "<br><br>");
  }

  renderCurriculum(course);
  renderInstructor(course.instructor);
  renderReviews(course.reviews, course.rating);
}

function renderStickyCard(course) {
  const card = document.getElementById("courseStickyPurchaseCard");
  if (!card) return;

  const isEnrolled = store.isEnrolled(course.id);
  const isInCart = store.isInCart(course.id);
  const isWishlisted = store.isInWishlist(course.id);

  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  card.innerHTML = `
    <div class="video-trailer-wrapper" id="videoTrailerTrigger">
      <img src="${course.thumbnail}" alt="" class="video-trailer-thumb">
      <div class="video-trailer-play-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </div>
      <div class="video-preview-overlay-text">Preview this course</div>
    </div>

    <div class="purchase-card-content">
      <div class="purchase-price-row">
        <span class="purchase-price-val">₹${course.price.toLocaleString("en-IN")}</span>
        <span class="purchase-orig-val">₹${course.originalPrice.toLocaleString("en-IN")}</span>
        <span class="purchase-discount-pct">${discountPct}% off</span>
      </div>

      <div style="font-size: 0.8125rem; color: #f43f5e; font-weight: 700; display: flex; align-items: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Special launch price ends tonight!</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
        ${isEnrolled ? `
          <a href="player.html?id=${course.id}" class="btn btn-primary btn-lg" style="width: 100%;">
            Go to Course Classroom &rarr;
          </a>
        ` : `
          <button class="btn btn-primary btn-lg" id="detailAddToCartBtn" style="width: 100%;">
            ${isInCart ? 'In Cart (Go to Cart)' : 'Add to Cart (₹' + course.price + ')'}
          </button>
          <button class="btn btn-outline btn-lg" id="detailBuyNowBtn" style="width: 100%;">
            Buy with UPI / Card
          </button>
        `}
      </div>

      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 4px;">
        <button class="btn btn-ghost btn-sm" id="detailWishlistBtn" style="display: flex; align-items: center; gap: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span>${isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
        </button>
        <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(window.location.href); store.showToast('Course link copied to clipboard!', 'success');" style="display: flex; align-items: center; gap: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          <span>Share</span>
        </button>
      </div>

      <ul class="purchase-features-list">
        <li style="font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Course package includes:</li>
        <li class="purchase-feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>${course.durationHours} hours on-demand HD video</span>
        </li>
        <li class="purchase-feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span>${course.articlesCount} technical articles & cheatsheets</span>
        </li>
        <li class="purchase-feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>${course.resourcesCount} coding exercises & project assets</span>
        </li>
        <li class="purchase-feature-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          <span>Official Certificate of Completion</span>
        </li>
      </ul>
      <div style="font-size: 0.775rem; text-align: center; color: var(--text-muted); margin-top: 8px;">
        30-Day 100% Money-Back Guarantee
      </div>
    </div>
  `;

  document.getElementById("detailAddToCartBtn")?.addEventListener("click", () => {
    if (isInCart) {
      document.getElementById("cartNavBtn")?.click();
    } else {
      store.addToCart(course.id);
      renderStickyCard(course);
    }
  });

  document.getElementById("detailBuyNowBtn")?.addEventListener("click", () => {
    store.addToCart(course.id);
    openCheckoutModal();
  });

  document.getElementById("detailWishlistBtn")?.addEventListener("click", () => {
    store.toggleWishlist(course.id);
    renderStickyCard(course);
  });

  document.getElementById("videoTrailerTrigger")?.addEventListener("click", () => {
    openVideoTrailerModal(course);
  });
}

function openVideoTrailerModal(course) {
  const modal = document.getElementById("videoTrailerModal");
  const player = document.getElementById("trailerVideoPlayer");
  if (!modal || !player) return;

  player.src = course.previewVideo;
  modal.classList.add("active");
  player.play();

  modal.querySelector(".modal-close-btn").onclick = () => {
    player.pause();
    modal.classList.remove("active");
  };
}

function renderCurriculum(course) {
  const container = document.getElementById("courseCurriculumAccordion");
  if (!container) return;

  let totalLectures = 0;
  course.curriculum.forEach(sec => totalLectures += sec.lectures.length);

  document.getElementById("curriculumSummaryText").textContent = 
    `${course.curriculum.length} sections &bull; ${totalLectures} lectures &bull; ${course.durationHours} total length`;

  container.innerHTML = course.curriculum.map((sec, idx) => `
    <div class="curriculum-section ${idx === 0 ? 'open' : ''}">
      <div class="curriculum-section-header" onclick="this.parentElement.classList.toggle('open')">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          <span>${sec.sectionTitle}</span>
        </div>
        <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary);">
          ${sec.lectures.length} lectures &bull; ${sec.duration}
        </span>
      </div>
      <div class="curriculum-section-body">
        ${sec.lectures.map(lec => `
          <div class="curriculum-lecture-row">
            <div class="curriculum-lecture-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-secondary);"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>${lec.title}</span>
              ${lec.isFree ? `<span class="lecture-preview-tag" onclick="openLecturePreview('${lec.title}', '${lec.videoUrl}')">Preview</span>` : ''}
            </div>
            <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.8125rem;">${lec.duration}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function openLecturePreview(title, url) {
  const modal = document.getElementById("videoTrailerModal");
  const player = document.getElementById("trailerVideoPlayer");
  const modalTitle = document.getElementById("trailerModalTitle");
  if (!modal || !player) return;

  if (modalTitle) modalTitle.textContent = `Lecture Preview: ${title}`;
  player.src = url;
  modal.classList.add("active");
  player.play();
}

function renderInstructor(inst) {
  const container = document.getElementById("instructorProfileSection");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 16px;">
      <img src="${inst.avatar}" alt="${inst.name}" style="width: 80px; height: 80px; border-radius: var(--radius-full); object-fit: cover; border: 2px solid var(--brand-cyan);">
      <div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--brand-cyan);">${inst.name}</h4>
        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px;">${inst.title}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary);">
          <span>⭐ ${inst.rating} Instructor Rating</span>
          <span>💬 ${inst.reviewsCount.toLocaleString("en-IN")} Reviews</span>
          <span>👨‍🎓 ${inst.studentsCount.toLocaleString("en-IN")} Students</span>
        </div>
      </div>
    </div>
    <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-main);">${inst.bio}</p>
  `;
}

function renderReviews(reviews, overallRating) {
  const container = document.getElementById("courseReviewsList");
  if (!container) return;

  container.innerHTML = reviews.map(r => `
    <div style="border-bottom: 1px solid var(--border-subtle); padding: 20px 0;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <img src="${r.avatar}" alt="${r.user}" style="width: 44px; height: 44px; border-radius: var(--radius-full); object-fit: cover;">
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">${r.user}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="rating-stars">${renderStarIcons(r.rating)}</div>
            <span style="font-size: 0.775rem; color: var(--text-muted);">${r.date}</span>
          </div>
        </div>
      </div>
      <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-main);">${r.comment}</p>
    </div>
  `).join("");
}

function capitalize(s) {
  return (s || "").charAt(0).toUpperCase() + (s || "").slice(1);
}
