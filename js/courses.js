/**
 * Edifyron Course Explorer & Faceted Filter Controller (INR ₹ Localized)
 */

document.addEventListener("DOMContentLoaded", () => {
  initCourseExplorer();
});

function initCourseExplorer() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get("q") || "";
  const initialCategory = urlParams.get("category") || "";
  const initialSub = urlParams.get("sub") || "";
  const initialSkill = urlParams.get("skill") || "";

  const searchInput = document.getElementById("catalogSearchInput");
  if (searchInput && initialQuery) {
    searchInput.value = initialQuery;
  }

  const state = {
    query: initialQuery,
    categories: initialCategory ? [initialCategory] : [],
    subcategories: initialSub ? [initialSub] : [],
    levels: [],
    ratings: 0,
    price: "all",
    sort: "popular",
    viewMode: "grid"
  };

  if (initialCategory) {
    const cb = document.querySelector(`input[name="category"][value="${initialCategory}"]`);
    if (cb) cb.checked = true;
  }

  const resultsContainer = document.getElementById("catalogResultsGrid");
  const countDisplay = document.getElementById("resultsCountDisplay");
  const sortSelect = document.getElementById("catalogSortSelect");
  const viewGridBtn = document.getElementById("viewGridBtn");
  const viewListBtn = document.getElementById("viewListBtn");
  const clearFiltersBtn = document.getElementById("clearAllFiltersBtn");

  function applyFilters() {
    let filtered = [...EDIFYRON_COURSES];

    if (state.query) {
      const q = state.query.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.headline.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    if (state.categories.length > 0) {
      filtered = filtered.filter(c => state.categories.includes(c.category));
    }

    if (state.subcategories.length > 0) {
      filtered = filtered.filter(c => state.subcategories.includes(c.subcategory));
    }

    if (state.levels.length > 0) {
      filtered = filtered.filter(c => state.levels.includes(c.level) || c.level === "All Levels");
    }

    if (state.ratings > 0) {
      filtered = filtered.filter(c => c.rating >= state.ratings);
    }

    if (state.price === "paid") {
      filtered = filtered.filter(c => c.price > 0);
    } else if (state.price === "free") {
      filtered = filtered.filter(c => c.price === 0);
    }

    if (state.sort === "popular") {
      filtered.sort((a, b) => b.students - a.students);
    } else if (state.sort === "highest-rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderResults(filtered);
  }

  function renderResults(courses) {
    if (!resultsContainer) return;

    if (countDisplay) {
      countDisplay.textContent = `${courses.length.toLocaleString("en-IN")} result${courses.length === 1 ? '' : 's'}${state.query ? ` for "${state.query}"` : ''}`;
    }

    if (courses.length === 0) {
      resultsContainer.className = "";
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 64px 20px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; color: var(--brand-cyan);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">No courses match your criteria</h3>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 20px;">Try adjusting your search terms or clearing one or more filters.</p>
          <button class="btn btn-outline-primary" id="emptyClearBtn">Clear All Filters</button>
        </div>
      `;
      document.getElementById("emptyClearBtn")?.addEventListener("click", resetAllFilters);
      return;
    }

    if (state.viewMode === "list") {
      resultsContainer.className = "courses-list-view";
    } else {
      resultsContainer.className = "courses-carousel-track";
    }

    resultsContainer.innerHTML = courses.map((c, i) => createCourseCardHtml(c, i)).join("");
    attachPopoverHandlers();
  }

  function resetAllFilters() {
    state.categories = [];
    state.subcategories = [];
    state.levels = [];
    state.ratings = 0;
    state.price = "all";
    state.query = "";

    document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-sidebar input[type="radio"]').forEach(rb => {
      if (rb.value === "all" || rb.value === "0") rb.checked = true;
      else rb.checked = false;
    });

    if (searchInput) searchInput.value = "";
    applyFilters();
  }

  document.querySelectorAll('input[name="category"]').forEach(cb => {
    cb.addEventListener("change", () => {
      state.categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="level"]').forEach(cb => {
    cb.addEventListener("change", () => {
      state.levels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(el => el.value);
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="rating"]').forEach(rb => {
    rb.addEventListener("change", (e) => {
      state.ratings = parseFloat(e.target.value) || 0;
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="price"]').forEach(rb => {
    rb.addEventListener("change", (e) => {
      state.price = e.target.value;
      applyFilters();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      applyFilters();
    });
  }

  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener("click", () => {
      state.viewMode = "grid";
      viewGridBtn.classList.add("active");
      viewListBtn.classList.remove("active");
      applyFilters();
    });

    viewListBtn.addEventListener("click", () => {
      state.viewMode = "list";
      viewListBtn.classList.add("active");
      viewGridBtn.classList.remove("active");
      applyFilters();
    });
  }

  if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", resetAllFilters);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value.trim();
      applyFilters();
    });
  }

  applyFilters();
}
