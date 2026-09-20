// CURSOR GLOW
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(176, 132, 43, ${this.opacity})`;
        ctx.fill();
    }
}
for (let i = 0; i < 50; i++) particles.push(new Particle());
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
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

// TYPED TEXT
const typedEl = document.getElementById('typedText');
const phrases = [
    'Ingénieur DevOps & Cloud',
    'Construction de PaaS self-hosted',
    'Docker · FastAPI · Caddy',
    '1337 Coding School · ENSA Khouribga',
    'Git push → HTTPS en < 2 min'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
    const current = phrases[phraseIndex];
    typedEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
    let speed = isDeleting ? 30 : 60;
    if (!isDeleting && charIndex === current.length + 1) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === -1) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }
    setTimeout(typeEffect, speed);
}
typeEffect();

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// STAT COUNTER
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let current = 0;
            const inc = target / 40;
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) { entry.target.textContent = target; clearInterval(timer); }
                else entry.target.textContent = Math.ceil(current);
            }, 40);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
stats.forEach(s => statsObserver.observe(s));

// SKILL BARS
const fills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width') + '%';
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
fills.forEach(f => skillObserver.observe(f));

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    window.open(`mailto:criminasser@gmail.com?subject=Portfolio - ${name}&body=${encodeURIComponent(message + '\n\nDe: ' + name + ' (' + email + ')')}`);
    this.reset();
});
