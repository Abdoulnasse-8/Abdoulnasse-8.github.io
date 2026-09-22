document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // Nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 15, 26, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 15, 26, 0.85)';
    }
  });

  // ===== TYPED TEXT =====
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'Full Stack Developer',
    'Cloud & DevOps Enthusiast',
    '1337 / 42 Student',
    'Security First',
    'Open Source Contributor'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // ===== COUNTER ANIMATION (simple & reliable) =====
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.dataset.animated = 'true';
        const target = parseInt(el.dataset.target);
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        const intervalTime = duration / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, intervalTime);
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  window.addEventListener('load', animateCounters);
  // Trigger once on load in case elements are already visible
  animateCounters();

  // ===== SKILL BARS =====
  function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach(el => {
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.dataset.animated = 'true';
        el.style.width = el.dataset.width + '%';
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  window.addEventListener('load', animateSkills);
  animateSkills();

  // ===== FADE IN ANIMATION =====
  const fadeEls = document.querySelectorAll(
    '.stat-card, .timeline-item, .exp-card, .project-card, .skill-card, .cert-card, .contact-item'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  function handleFadeIn() {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', handleFadeIn);
  window.addEventListener('load', handleFadeIn);
  handleFadeIn();

  // ===== FOOTER YEAR =====
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const message = form.querySelector('#message').value;
      const mailto = `mailto:hammatinni5@gmail.com?subject=Portfolio — ${encodeURIComponent(name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      window.location.href = mailto;
      form.reset();
    });
  }

});
