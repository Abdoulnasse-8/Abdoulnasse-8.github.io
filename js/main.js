// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
    });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// ANIMATE STATS
const stats = document.querySelectorAll('.stat-number');
const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.ceil(current);
                }
            }, 40);
            observer.unobserve(entry.target);
        }
    });
};
const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
stats.forEach(stat => statsObserver.observe(stat));

// ANIMATE SKILL BARS
const fills = document.querySelectorAll('.skill-fill');
const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width') + '%';
            observer.unobserve(entry.target);
        }
    });
};
const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.3 });
fills.forEach(fill => skillObserver.observe(fill));

// FADE IN ON SCROLL
const fadeElements = document.querySelectorAll('.project-card, .stat-card, .cert-card, .skill-category, .contact-link');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    window.open(`mailto:criminasser@gmail.com?subject=Portfolio - ${name}&body=${encodeURIComponent(message + '\n\nDe: ' + name + ' (' + email + ')')}`);
    this.reset();
    alert('Merci ! Ton client email s\'est ouvert.');
});
