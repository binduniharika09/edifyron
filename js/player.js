/**
 * Edifyron Interactive Classroom & Learning Player Controller
 * Handles Video Playback, Curriculum Navigation, Checkbox Progress,
 * Timestamped Notes, Q&A, and Dynamic Certificate Generation.
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id") || "c1";
  const course = getCourseById(courseId);

  initClassroom(course);
});

function initClassroom(course) {
  // Page Title & Header info
  document.title = `${course.title} | Edifyron Classroom`;
  const headerTitle = document.getElementById("classroomCourseTitle");
  if (headerTitle) headerTitle.textContent = course.title;

  const video = document.getElementById("mainClassroomVideo");
  const playPauseBtn = document.getElementById("playerPlayPauseBtn");
  const scrubberTrack = document.getElementById("videoScrubberTrack");
  const scrubberProgress = document.getElementById("videoScrubberProgress");
  const timeDisplay = document.getElementById("videoTimeDisplay");
  const volumeBtn = document.getElementById("playerVolumeBtn");
  const speedSelect = document.getElementById("playbackSpeedSelect");
  const theaterBtn = document.getElementById("playerTheaterBtn");
  const fullscreenBtn = document.getElementById("playerFullscreenBtn");

  let currentLecture = course.curriculum[0]?.lectures[0] || null;

  // --- PROGRESS TRACKER & SIDEBAR ---
  function updateProgressUI() {
    const pct = store.getCourseCompletionPercentage(course.id);
    const progressFill = document.getElementById("courseProgressFill");
    const progressText = document.getElementById("courseProgressPctText");
    
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}% Complete`;

    // Highlight certificate button if 100%
    const certBtn = document.getElementById("claimCertificateBtn");
    if (certBtn) {
      if (pct === 100) {
        certBtn.style.backgroundColor = "var(--primary)";
        certBtn.innerHTML = `🏆 Get Certificate`;
      }
    }
  }

  function renderCurriculumSidebar() {
    const sidebarList = document.getElementById("sidebarCurriculumList");
    if (!sidebarList) return;

    sidebarList.innerHTML = course.curriculum.map((sec, secIdx) => `
      <div class="sidebar-section-group">
        <div class="sidebar-section-header">
          <span>${sec.sectionTitle}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${sec.duration}</span>
        </div>
        <div class="sidebar-lectures-container">
          ${sec.lectures.map(lec => {
            const isCompleted = store.isLectureCompleted(course.id, lec.id);
            const isActive = currentLecture?.id === lec.id;
            return `
              <div class="sidebar-lecture-item ${isActive ? 'active' : ''}" data-lecture-id="${lec.id}">
                <input type="checkbox" class="sidebar-checkbox" ${isCompleted ? 'checked' : ''} data-lec-id="${lec.id}">
                <span class="sidebar-lecture-name" style="flex-grow: 1; line-height: 1.3;">${lec.title}</span>
                <span class="lecture-duration-tag">${lec.duration}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");

    // Attach click handlers to lectures
    sidebarList.querySelectorAll(".sidebar-lecture-item").forEach(item => {
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("sidebar-checkbox")) return; // handled separately
        const lecId = item.dataset.lectureId;
        const targetLec = findLectureById(course, lecId);
        if (targetLec) {
          switchLecture(targetLec);
        }
      });
    });

    // Attach checkbox handlers
    sidebarList.querySelectorAll(".sidebar-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const lecId = cb.dataset.lecId;
        store.toggleLectureComplete(course.id, lecId);
        updateProgressUI();
      });
    });
  }

  function switchLecture(lec) {
    currentLecture = lec;
    if (video) {
      video.src = lec.videoUrl;
      video.play().catch(() => {});
      updatePlayBtnIcon(true);
    }
    const currentTitleEl = document.getElementById("currentLectureHeaderTitle");
    if (currentTitleEl) currentTitleEl.textContent = lec.title;

    renderCurriculumSidebar();
  }

  function findLectureById(c, id) {
    for (const sec of c.curriculum) {
      for (const lec of sec.lectures) {
        if (lec.id === id) return lec;
      }
    }
    return null;
  }

  // --- VIDEO CONTROLS LOGIC ---
  if (video) {
    video.src = currentLecture?.videoUrl || "";

    function updatePlayBtnIcon(isPlaying) {
      if (!playPauseBtn) return;
      playPauseBtn.innerHTML = isPlaying
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }

    playPauseBtn?.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        updatePlayBtnIcon(true);
      } else {
        video.pause();
        updatePlayBtnIcon(false);
      }
    });

    video.addEventListener("timeupdate", () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      if (scrubberProgress) scrubberProgress.style.width = `${pct}%`;
      if (timeDisplay) timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    });

    video.addEventListener("ended", () => {
      updatePlayBtnIcon(false);
      if (currentLecture) {
        store.toggleLectureComplete(course.id, currentLecture.id);
        updateProgressUI();
        renderCurriculumSidebar();
      }
    });

    scrubberTrack?.addEventListener("click", (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    });

    speedSelect?.addEventListener("change", (e) => {
      video.playbackRate = parseFloat(e.target.value);
    });

    volumeBtn?.addEventListener("click", () => {
      video.muted = !video.muted;
      volumeBtn.innerHTML = video.muted
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    });

    fullscreenBtn?.addEventListener("click", () => {
      const container = document.querySelector(".video-element-wrapper");
      if (!document.fullscreenElement) {
        container?.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // --- TABS (Overview, Q&A, Notes, Announcements) ---
  const tabBtns = document.querySelectorAll(".classroom-tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.dataset.tab;
      document.getElementById(targetId)?.classList.add("active");
    });
  });

  // --- NOTES FEATURE ---
  function renderNotes() {
    const list = document.getElementById("savedNotesList");
    if (!list) return;

    const notes = store.getNotes(course.id);
    if (notes.length === 0) {
      list.innerHTML = `<div style="color: var(--text-secondary); font-size: 0.875rem;">No notes taken yet. Capture key insights as you watch!</div>`;
      return;
    }

    list.innerHTML = notes.map(n => `
      <div class="saved-note-card">
        <div class="note-time-chip" onclick="jumpToVideoTime(${n.timeSec})">${formatTime(n.timeSec)}</div>
        <div class="note-content-block">
          <p class="note-text">${escapeHtml(n.text)}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="note-date">${n.date}</span>
            <button class="btn btn-ghost btn-sm" style="color: var(--accent-red); padding: 2px 6px;" onclick="store.deleteNote('${course.id}', '${n.id}'); renderNotes();">Delete</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  window.jumpToVideoTime = function(sec) {
    if (video) {
      video.currentTime = sec;
      video.play();
    }
  };

  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteTextInput = document.getElementById("newNoteTextInput");
  if (saveNoteBtn && noteTextInput) {
    saveNoteBtn.addEventListener("click", () => {
      const text = noteTextInput.value.trim();
      if (!text) {
        store.showToast("Please enter note text", "error");
        return;
      }
      const currentTime = video ? video.currentTime : 0;
      store.addNote(course.id, currentLecture?.id || "l1", currentTime, text);
      noteTextInput.value = "";
      renderNotes();
    });
  }

  // --- Q&A FORUM SUBMISSION SIMULATOR ---
  const askQuestionBtn = document.getElementById("submitQuestionBtn");
  const questionInput = document.getElementById("newQuestionInput");
  const qaContainer = document.getElementById("qaQuestionsContainer");

  if (askQuestionBtn && questionInput && qaContainer) {
    askQuestionBtn.addEventListener("click", () => {
      const q = questionInput.value.trim();
      if (!q) return;

      const qCard = document.createElement("div");
      qCard.className = "saved-note-card";
      qCard.style.marginBottom = "14px";
      qCard.innerHTML = `
        <div style="width: 40px; height: 40px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">You</div>
        <div style="flex-grow: 1;">
          <div style="font-weight: 700; font-size: 0.9375rem; margin-bottom: 4px;">${escapeHtml(q)}</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); margin-bottom: 8px;">Asked just now &bull; 0 replies</div>
          <div style="font-size: 0.8125rem; color: var(--primary); font-weight: 600; cursor: pointer;">Reply to question</div>
        </div>
      `;
      qaContainer.prepend(qCard);
      questionInput.value = "";
      store.showToast("Question posted to course discussion board!", "success");
    });
  }

  // --- CERTIFICATE OF COMPLETION GENERATOR ---
  const certBtn = document.getElementById("claimCertificateBtn");
  const certModal = document.getElementById("certificateModal");

  if (certBtn && certModal) {
    certBtn.addEventListener("click", () => {
      const studentName = "Learner Student";
      document.getElementById("certStudentName").textContent = studentName;
      document.getElementById("certCourseName").textContent = course.title;
      document.getElementById("certDateDisplay").textContent = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      document.getElementById("certInstructorName").textContent = course.instructor.name;
      document.getElementById("certIdDisplay").textContent = "EDF-" + Math.random().toString(36).substring(2, 9).toUpperCase();

      certModal.classList.add("active");
    });

    document.getElementById("downloadCertBtn")?.addEventListener("click", () => {
      window.print();
    });
  }

  // Initial UI Render
  renderCurriculumSidebar();
  updateProgressUI();
  renderNotes();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
