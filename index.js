document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Nav background
  window.addEventListener('scroll', () => {
    if (nav) nav.style.background = window.scrollY > 50
      ? 'rgba(10, 15, 26, 0.98)' : 'rgba(10, 15, 26, 0.85)';
  });

  // Active nav
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
      const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (link) {
        link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
      if (el.dataset.done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        el.dataset.done = '1';
        const target = parseInt(el.dataset.target);
        if (!target || target <= 0) return;
        let cur = 0;
        const inc = Math.max(1, Math.ceil(target / 40));
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { el.textContent = target; clearInterval(t); }
          else el.textContent = cur;
        }, 25);
      }
    });
  }

  // ===== SKILL BARS =====
  function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach(f => {
      if (f.dataset.done) return;
      const r = f.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        f.dataset.done = '1';
        setTimeout(() => { f.style.width = f.dataset.width + '%'; }, 100);
      }
    });
  }

  // ===== SCROLL REVEAL =====
  function handleReveal() {
    document.querySelectorAll('.stat-card, .timeline-item, .exp-card, .project-card, .skill-card, .cert-card, .contact-item').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  // Run all
  function onScroll() { animateCounters(); animateSkills(); handleReveal(); }
  onScroll();
  window.addEventListener('scroll', onScroll);
  setTimeout(onScroll, 300);
  setTimeout(onScroll, 800);
  setTimeout(onScroll, 1500);

  // ===== TYPED TEXT =====
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const phrases = [
      'Ingénieur DevOps & Cloud',
      'Python · FastAPI · Docker',
      'ENSA Khouribga · 1337',
      'Git push → HTTPS en < 2 min',
      'Platform Engineer'
    ];
    let pi = 0, ci = 0, del = false;
    (function type() {
      const cur = phrases[pi];
      typedEl.textContent = del ? cur.substring(0, ci--) : cur.substring(0, ci++);
      let spd = del ? 25 : 50;
      if (!del && ci === cur.length + 1) { spd = 1500; del = true; }
      else if (del && ci === -1) { del = false; pi = (pi + 1) % phrases.length; spd = 350; }
      setTimeout(type, spd);
    })();
  }

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const n = document.getElementById('contactName')?.value || '';
      const m = document.getElementById('contactMessage')?.value || '';
      window.open(`mailto:criminasser@gmail.com?subject=Portfolio - ${n}&body=${encodeURIComponent(m)}`);
      form.reset();
    });
  }

  // Footer year
  const fy = document.getElementById('footerYear');
  if (fy) fy.textContent = new Date().getFullYear();

});
