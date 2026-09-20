const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from(document.querySelectorAll('.nav__list-link'));
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576;

let currentActiveLink = document.querySelector('.nav__list-link.active');

// Reset active state on resize
const resetActiveState = () => {
  NAV_LIST.classList.remove('nav--active');
  Object.assign(NAV_LIST.style, { height: null });
  Object.assign(document.body.style, { overflowY: null });
}

// Add padding to hero header for fixed navbar
const addPaddingToHeroHeaderFn = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10;
  if (NAV_LIST.classList.contains('nav--active')) return;
  Object.assign(HERO_HEADER.style, { paddingTop: HEIGHT_IN_REM + 'rem' });
}
addPaddingToHeroHeaderFn();

window.addEventListener('resize', () => {
  addPaddingToHeroHeaderFn();
  if (window.innerWidth >= BREAKPOINT) {
    addPaddingToHeroHeaderFn();
    resetActiveState();
  }
});

// Active link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('#heroHeader, #about, #projects, #skills, #certifications, #contact');
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
    if (window.scrollY >= sectionTop - NAV_BAR_HEIGHT) {
      const ID = section.getAttribute('id');
      const LINK = NAV_LINKS.filter(link => link.href.includes('#' + ID))[0];
      if (LINK) {
        if (currentActiveLink) currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
        LINK.classList.add(ACTIVE_LINK_CLASS);
        currentActiveLink = LINK;
      }
    }
  });
});

// Hamburger menu
HAMBURGER_BTN.addEventListener('click', () => {
  NAV_LIST.classList.toggle('nav--active');
  if (NAV_LIST.classList.contains('nav--active')) {
    Object.assign(document.body.style, { overflowY: 'hidden' });
    Object.assign(NAV_LIST.style, { height: '100vh' });
    return;
  }
  Object.assign(NAV_LIST.style, { height: 0 });
  Object.assign(document.body.style, { overflowY: null });
});

// Reset active state on nav link click
NAV_LINKS.forEach(link => {
  link.addEventListener('click', () => {
    resetActiveState();
    link.blur();
  });
});

// Smooth scrolling with SweetScroll
new SweetScroll({
  trigger: '.nav__list-link',
  easing: 'easeOutQuint',
  offset: NAV_BAR.getBoundingClientRect().height - 80
});

// =====================
// TYPED TEXT EFFECT
// =====================
const typedTextElement = document.getElementById('typedText');
const phrases = [
  'Ingénieur DevOps & Cloud',
  'Infrastructure as Code',
  'CI/CD Pipelines',
  'Docker & Kubernetes',
  'Python & FastAPI',
  'Linux & Azure'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// =====================
// STAT COUNTER ANIMATION
// =====================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    statsAnimated = true;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
}

// =====================
// SKILL BAR ANIMATION
// =====================
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  
  const skillsSection = document.querySelector('.skills-grid');
  if (!skillsSection) return;
  
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    skillsAnimated = true;
    skillFills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
    });
  }
}

// =====================
// SCROLL REVEAL
// =====================
const revealElements = document.querySelectorAll(
  '.project-card, .skill-category, .cert-card, .stat-card, .contact__link, .about-text p'
);

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

// =====================
// CONTACT FORM HANDLER
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactNameTxt').value;
    const email = document.getElementById('contactEmailTxt').value;
    const message = document.getElementById('contactDescriptionTxt').value;
    
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    
    window.location.href = 'mailto:criminasser@gmail.com?subject=' + subject + '&body=' + body;
  });
}

// =====================
// INIT ON SCROLL
// =====================
window.addEventListener('scroll', () => {
  animateStats();
  animateSkills();
  revealOnScroll();
});

// Initial check
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
  animateSkills();
  revealOnScroll();
});
