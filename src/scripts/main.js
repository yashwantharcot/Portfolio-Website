/* ═══════════════════════════════════════════
   ARCOT YASHWANTH — PORTFOLIO JAVASCRIPT
   Particles · Typewriter · Animations · UX
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ═══ 1. PARTICLE CANVAS ═══
  (function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], mouse = { x: -1000, y: -1000 };

    function resize() {
      const hero = canvas.parentElement;
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = Math.min(120, Math.floor(window.innerWidth / 10));
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1
      });
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.alpha})`;
        ctx.fill();

        // Mouse repulsion
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.3;
          p.vy -= (dy / dist) * force * 0.3;
          p.vx = Math.max(-2, Math.min(2, p.vx));
          p.vy = Math.max(-2, Math.min(2, p.vy));
        } else {
          p.vx *= 0.998; p.vy *= 0.998;
        }

        // Connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ═══ 2. TYPEWRITER ═══
  (function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const roles = [
      'Production-Grade AI Systems',
      'RAG Pipelines & Chatbots',
      'AI Backend Services',
      'Voice AI Applications',
      'Document Intelligence Systems',
      'ML Models with Explainability'
    ];

    let roleIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
      const current = roles[roleIdx];
      if (isDeleting) {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 30);
      } else {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          setTimeout(() => { isDeleting = true; type(); }, 2200);
          return;
        }
        setTimeout(type, 60);
      }
    }
    setTimeout(type, 1500);
  })();

  // ═══ 3. CUSTOM CURSOR ═══
  (function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let cx = 0, cy = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      dot.style.left = cx + 'px';
      dot.style.top = cy + 'px';
    });

    function followRing() {
      rx += (cx - rx) * 0.15;
      ry += (cy - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(followRing);
    }
    followRing();

    const hovers = document.querySelectorAll('a, button, .glass-card, .service-card, .tech-pill, .tag, .project-card-sm, .project-featured');
    hovers.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });
  })();

  // ═══ 4. SCROLL PROGRESS ═══
  (function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (scrollTop / docHeight * 100) + '%';
    }, { passive: true });
  })();

  // ═══ 5. NAVBAR ═══
  (function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      });
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link[data-section]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
    }, { passive: true });
  })();

  // ═══ 6. SCROLL REVEAL ═══
  (function initReveal() {
    const items = document.querySelectorAll('.reveal-item, .service-card, .process-step');
    if (!items.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    items.forEach(el => obs.observe(el));
  })();

  // ═══ 7. SKILL BAR ANIMATION ═══
  (function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill[data-width]');
    if (!fills.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width + '%';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach(f => obs.observe(f));
  })();

  // ═══ 8. COUNTER ANIMATION (Metrics strip) ═══
  (function initCounters() {
    const counters = document.querySelectorAll('.metric-number[data-target]');
    if (!counters.length) return;

    function animateCounter(el, target, suffix, duration = 1500) {
      let start = 0;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(eased * target);
        el.textContent = currentVal + (progress >= 1 ? (suffix || '') : '');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  })();

  // ═══ 9. TECH PILL STAGGER ═══
  (function initPillStagger() {
    const pills = document.querySelectorAll('.tech-pill');
    pills.forEach((p, i) => { p.style.transitionDelay = (i * 25) + 'ms'; });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          pills.forEach(p => p.style.opacity = '1');
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    if (pills.length) obs.observe(pills[0].parentElement);
  })();

  // ═══ 10. CONTACT FORM ═══
  (function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#form-name');
      const email = form.querySelector('#form-email');
      const message = form.querySelector('#form-message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const btn = form.querySelector('#contact-submit-btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        showToast('Message sent! I\'ll get back to you soon.', 'success');
        form.reset();
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }, 1500);
    });

    function showToast(msg, type) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.className = `toast ${type} show`;
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  })();

  // ═══ 11. BACK TO TOP ═══
  (function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  // ═══ 12. TERMINAL LINE ANIMATION ═══
  (function initTerminalAnim() {
    const body = document.getElementById('terminal-body');
    if (!body) return;
    const lines = body.children;
    Array.from(lines).forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(6px)';
      line.style.transition = `opacity 0.3s ease ${i * 60}ms, transform 0.3s ease ${i * 60}ms`;
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          Array.from(lines).forEach(line => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(body);
  })();

  // ═══ 13. SMOOTH SECTION SCROLL ═══
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});