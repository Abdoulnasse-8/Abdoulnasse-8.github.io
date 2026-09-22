document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Nav background on scroll
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.style.background = window.scrollY > 50
        ? 'rgba(10, 15, 26, 0.98)'
        : 'rgba(10, 15, 26, 0.85)';
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(el => {
      if (el.dataset.animated === 'true') return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        el.dataset.animated = 'true';
        const target = parseInt(el.dataset.target);
        if (isNaN(target) || target <= 0) return;
        let current = 0;
        const increment = Math.max(1, target / 50);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 30);
      }
    });
  }

  // Run immediately and on scroll
  animateCounters();
  window.addEventListener('scroll', animateCounters);
  // Also run after a short delay in case layout isn't ready
  setTimeout(animateCounters, 500);
  setTimeout(animateCounters, 1000);

  // ===== SKILL BARS =====
  function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach(fill => {
      if (fill.dataset.animated === 'true') return;
      const rect = fill.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        fill.dataset.animated = 'true';
        const width = fill.dataset.width;
        if (width) {
          setTimeout(() => { fill.style.width = width + '%'; }, 200);
        }
      }
    });
  }
  animateSkills();
  window.addEventListener('scroll', animateSkills);
  setTimeout(animateSkills, 500);

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll(
    '.stat-card, .timeline-item, .exp-card, .project-card, .skill-card, .cert-card, .contact-item, .about-text p, .section-title'
  );

  function handleReveal() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  handleReveal();
  window.addEventListener('scroll', handleReveal);
  setTimeout(handleReveal, 300);

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
    let pi = 0, ci = 0, deleting = false;
    function type() {
      const current = phrases[pi];
      typedEl.textContent = deleting
        ? current.substring(0, ci--)
        : current.substring(0, ci++);
      let speed = deleting ? 25 : 50;
      if (!deleting && ci === current.length + 1) { speed = 1500; deleting = true; }
      else if (deleting && ci === -1) { deleting = false; pi = (pi + 1) % phrases.length; speed = 350; }
      setTimeout(type, speed);
    }
    type();
  }

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const msg = document.getElementById('contactMessage')?.value || '';
      window.open(`mailto:criminasser@gmail.com?subject=Portfolio - ${name}&body=${encodeURIComponent(msg)}`);
      form.reset();
    });
  }

  // ===== FOOTER YEAR =====
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

});
