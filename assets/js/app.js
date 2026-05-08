/* app.js — wires the Work button (and the modal-rendered project list) to the modal */
(function () {
  // "2024 — now" → 9999, "2025 — 2026" → 2026, "2023" → 2023
  function yearKey(y) {
    if (!y) return -Infinity;
    if (/now/i.test(y)) return 9999;
    const m = String(y).match(/\d{4}/g);
    return m ? Math.max(...m.map(Number)) : -Infinity;
  }

  function sortProjects(list) {
    return [...list].sort((a, b) => {
      const pa = a.pinned ? 1 : 0;
      const pb = b.pinned ? 1 : 0;
      if (pa !== pb) return pb - pa;
      return yearKey(b.year) - yearKey(a.year);
    });
  }

  function init() {
    const projects = sortProjects(window.PROJECTS || []);
    projects.forEach((p, i) => {
      p.number = String(i + 1).padStart(2, '0');
    });

    const workBtn = document.querySelector('[data-open-work]');

    function openList() {
      if (!window.ProjectModal) return;
      window.ProjectModal.openList(projects, workBtn);
    }

    if (workBtn && window.ProjectModal) {
      workBtn.addEventListener('click', openList);
    }

    // Project rows live inside the list modal. Close the list, open the detail,
    // and on detail-close re-open the list so the user lands back on the index.
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.project-row');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      const project = projects.find((p) => p.id === id);
      if (!project || !window.ProjectModal) return;

      window.ProjectModal.close();
      setTimeout(() => {
        window.ProjectModal.open(project, workBtn || btn, () => {
          openList();
        });
      }, 340);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
