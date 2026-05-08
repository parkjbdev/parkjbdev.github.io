/* modal.js — fullscreen project modal */
(function () {
  const root = () => document.getElementById('modal-root');
  let lastTrigger = null;
  let onKeydown = null;
  let onCloseCb = null;

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));
  }

  function render(project) {
    const titleHTML = project.titleEm
      ? `${escapeHTML(project.title)} <em>${escapeHTML(project.titleEm)}</em>`
      : escapeHTML(project.title);

    const galleryHTML = (project.gallery || [])
      .map(
        (g, i) => `
          <figure class="${g.wide ? 'wide' : ''}" data-gallery-idx="${i}" tabindex="0" role="button" aria-label="Open image ${i + 1}">
            <img src="${escapeHTML(g.src)}" alt="${escapeHTML(project.title)} preview" loading="lazy" />
          </figure>`
      )
      .join('');

    const bodyHTML = (project.body || [])
      .map((p) => `<p class="modal-paragraph">${escapeHTML(p)}</p>`)
      .join('');

    const linksHTML = (project.links || [])
      .map(
        (l) =>
          `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)}</a>`
      )
      .join('');

    return `
      <div class="modal-backdrop" data-close></div>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-panel">
          <button class="modal-close" type="button" aria-label="Close" data-close>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="modal-scroll">
            ${
              project.cover
                ? `<div class="modal-hero${project.coverFit === 'contain' ? ' modal-hero--contain' : ''}"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)} cover" /></div>`
                : ''
            }
            <div class="modal-body">
              <div class="modal-main">
                <p class="modal-eyebrow">${escapeHTML(project.number || '')} · ${escapeHTML(project.tag || '')}</p>
                <h2 class="modal-title" id="modal-title">${titleHTML}</h2>
                ${
                  project.summary
                    ? `<p class="modal-summary">${escapeHTML(project.summary)}</p>`
                    : ''
                }
                ${
                  bodyHTML
                    ? `<section class="modal-section"><h3>About</h3>${bodyHTML}</section>`
                    : ''
                }
                ${
                  galleryHTML
                    ? `<section class="modal-section"><h3>Gallery</h3><div class="modal-gallery">${galleryHTML}</div></section>`
                    : ''
                }
              </div>
              <aside class="modal-side">
                <dl>
                  ${project.year ? `<div><dt>Year</dt><dd>${escapeHTML(project.year)}</dd></div>` : ''}
                  ${project.role ? `<div><dt>Role</dt><dd>${escapeHTML(project.role)}</dd></div>` : ''}
                  ${project.stack ? `<div><dt>Stack</dt><dd>${escapeHTML(project.stack)}</dd></div>` : ''}
                </dl>
                ${linksHTML ? `<div><dt style="font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">Links</dt><div class="modal-links">${linksHTML}</div></div>` : ''}
              </aside>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderList(projects) {
    const items = (projects || [])
      .map(
        (p) => `
          <li>
            <button class="project-row" type="button" data-id="${escapeHTML(p.id)}" aria-haspopup="dialog">
              <span class="project-num">${escapeHTML(p.number || '')}</span>
              <span class="project-title">
                ${escapeHTML(p.title)}
                ${p.tag ? `<span class="project-tag">— ${escapeHTML(p.tag)}</span>` : ''}
              </span>
              <span class="project-year">${escapeHTML(p.year || '')}</span>
              <span class="project-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </button>
          </li>`
      )
      .join('');

    return `
      <div class="modal-backdrop" data-close></div>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="work-modal-title">
        <div class="modal-panel modal-panel-compact">
          <button class="modal-close" type="button" aria-label="Close" data-close>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="modal-scroll">
            <div class="modal-list-body">
              <p class="modal-eyebrow">Index</p>
              <h2 class="modal-title" id="work-modal-title"><em>Work</em></h2>
              <ul class="project-list" role="list">${items}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function mount(html, triggerEl, onClose) {
    const r = root();
    if (!r) return;
    lastTrigger = triggerEl || null;
    onCloseCb = typeof onClose === 'function' ? onClose : null;

    r.innerHTML = html;
    r.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
      const backdrop = r.querySelector('.modal-backdrop');
      const modal = r.querySelector('.modal');
      backdrop && backdrop.classList.add('open');
      modal && modal.classList.add('open');
    });

    r.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', close);
    });

    if (!onKeydown) {
      onKeydown = (e) => {
        if (e.key === 'Escape') close();
      };
      document.addEventListener('keydown', onKeydown);
    }

    const closeBtn = r.querySelector('.modal-close');
    closeBtn && closeBtn.focus({ preventScroll: true });
  }

  function open(project, triggerEl, onClose) {
    mount(render(project), triggerEl, onClose);
    const r = root();
    if (!r) return;
    const gallery = project.gallery || [];
    r.querySelectorAll('.modal-gallery figure[data-gallery-idx]').forEach((fig) => {
      const handler = () => {
        const idx = parseInt(fig.getAttribute('data-gallery-idx'), 10) || 0;
        openLightbox(gallery, idx);
      };
      fig.addEventListener('click', handler);
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  function openList(projects, triggerEl, onClose) {
    mount(renderList(projects), triggerEl, onClose);
  }

  function close() {
    const r = root();
    if (!r) return;
    const backdrop = r.querySelector('.modal-backdrop');
    const modal = r.querySelector('.modal');
    backdrop && backdrop.classList.remove('open');
    modal && modal.classList.remove('open');

    const cb = onCloseCb;
    onCloseCb = null;
    setTimeout(() => {
      r.innerHTML = '';
      r.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (onKeydown) {
        document.removeEventListener('keydown', onKeydown);
        onKeydown = null;
      }
      const trigger = lastTrigger;
      lastTrigger = null;
      if (cb) {
        cb(trigger);
      } else if (trigger && typeof trigger.focus === 'function') {
        trigger.focus({ preventScroll: true });
      }
    }, 320);
  }

  // ---------- Lightbox ----------
  let lbImages = [];
  let lbIndex = 0;
  let lbKeydown = null;

  function lbRoot() {
    let el = document.getElementById('lightbox-root');
    if (!el) {
      el = document.createElement('div');
      el.id = 'lightbox-root';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    return el;
  }

  function renderLightbox() {
    const img = lbImages[lbIndex];
    if (!img) return '';
    const total = lbImages.length;
    const counter = total > 1 ? `<div class="lightbox-counter">${lbIndex + 1} / ${total}</div>` : '';
    const nav = total > 1
      ? `
        <button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous image" data-lb-prev>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="lightbox-nav lightbox-next" type="button" aria-label="Next image" data-lb-next>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>`
      : '';
    const navBar = total > 1
      ? `
        <div class="lightbox-nav-bar" role="group" aria-label="Image navigation">
          <button type="button" aria-label="Previous image" data-lb-prev>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span>${lbIndex + 1} / ${total}</span>
          <button type="button" aria-label="Next image" data-lb-next>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>`
      : '';
    return `
      <div class="lightbox-backdrop" data-lb-close></div>
      <div class="lightbox" role="dialog" aria-modal="true">
        <button class="lightbox-close" type="button" aria-label="Close" data-lb-close>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        ${nav}
        <figure class="lightbox-figure">
          <img src="${escapeHTML(img.src)}" alt="" />
        </figure>
        ${navBar}
        ${counter}
      </div>
    `;
  }

  function paintLightbox() {
    const r = lbRoot();
    r.innerHTML = renderLightbox();
    r.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      const bd = r.querySelector('.lightbox-backdrop');
      const lb = r.querySelector('.lightbox');
      bd && bd.classList.add('open');
      lb && lb.classList.add('open');
    });
    r.querySelectorAll('[data-lb-close]').forEach((el) => el.addEventListener('click', closeLightbox));
    r.querySelectorAll('[data-lb-prev]').forEach((el) => el.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(-1); }));
    r.querySelectorAll('[data-lb-next]').forEach((el) => el.addEventListener('click', (e) => { e.stopPropagation(); navLightbox(1); }));
  }

  function navLightbox(delta) {
    const n = lbImages.length;
    if (!n) return;
    lbIndex = (lbIndex + delta + n) % n;
    paintLightbox();
  }

  function openLightbox(images, startIndex) {
    if (!images || !images.length) return;
    lbImages = images;
    lbIndex = Math.max(0, Math.min(startIndex || 0, images.length - 1));
    paintLightbox();
    if (!lbKeydown) {
      lbKeydown = (e) => {
        if (e.key === 'Escape') { e.stopPropagation(); closeLightbox(); }
        else if (e.key === 'ArrowLeft') navLightbox(-1);
        else if (e.key === 'ArrowRight') navLightbox(1);
      };
      document.addEventListener('keydown', lbKeydown, true);
    }
  }

  function closeLightbox() {
    const r = lbRoot();
    const bd = r.querySelector('.lightbox-backdrop');
    const lb = r.querySelector('.lightbox');
    bd && bd.classList.remove('open');
    lb && lb.classList.remove('open');
    if (lbKeydown) {
      document.removeEventListener('keydown', lbKeydown, true);
      lbKeydown = null;
    }
    setTimeout(() => {
      r.innerHTML = '';
      r.setAttribute('aria-hidden', 'true');
      lbImages = [];
      lbIndex = 0;
    }, 240);
  }

  window.ProjectModal = { open, openList, close };
  window.Lightbox = { open: openLightbox, close: closeLightbox };
})();
