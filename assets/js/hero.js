/* hero.js — animated word cycle in the hero title */
(function () {
  const PALETTE = [
    '#7F77DD', '#D85A30', '#1D9E75', '#D4537E', '#378ADD',
    '#E24B4A', '#BA7517', '#0F6E56', '#534AB7', '#639922',
    '#993556', '#185FA5', '#993C1D', '#EF9F27', '#3C3489',
    '#0C447C', '#A32D2D', '#27500A', '#72243E', '#085041'
  ];

  const WORDS = [
    // attention — engineer debugs, builder watches feedback,
    // tinkerer pokes, photographer notices light
    'curious', 'patient', 'attentive', 'observant', 'present',
    'thoughtful', 'meticulous', 'mindful', 'perceptive',

    // discipline & rigor — applies across all four
    'deliberate', 'intentional', 'methodical', 'rigorous',
    'principled', 'pragmatic', 'persistent', 'devoted', 'focused',

    // craft & precision — clean code, clean prints
    'precise', 'refined', 'polished', 'pristine',
    'sharp', 'crisp', 'minimal', 'clean', 'elegant',

    // grounding — honest engineering, honest photographs
    'honest', 'true', 'real', 'sincere', 'humble',
    'quiet', 'simple', 'clear',

    // energy & ambition — builder/tinkerer mode
    'ambitious', 'bold', 'fearless', 'audacious',
    'unstoppable',

    // making & inventing
    'inventive', 'resourceful', 'playful', 'prolific', 'driven',
    'collaborative',

    // beauty & contemplative — photographer/builder
    'beautiful', 'brilliant', 'magical', 'sublime',
    'contemplative', 'unhurried', 'timeless',

    'yours'
  ];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function init() {
    const track = document.getElementById('word-track');
    if (!track) return;

    const items = shuffle(
      WORDS.map((text, i) => ({ text, color: PALETTE[i % PALETTE.length] }))
    );

    let idx = 0;
    let current = null;

    function showNext() {
      const w = items[idx % items.length];
      const el = document.createElement('span');
      el.className = 'word-item';
      el.textContent = w.text;
      el.style.color = w.color;
      track.appendChild(el);

      // force a layout pass so the transition runs
      void el.offsetWidth;
      requestAnimationFrame(() => el.classList.add('in'));

      if (current) {
        const old = current;
        old.classList.remove('in');
        old.classList.add('out');
        setTimeout(() => old.remove(), 700);
      }
      current = el;
      idx++;
    }

    showNext();
    setInterval(showNext, 2800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
