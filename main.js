// === SHARED JAVASCRIPT UTILITIES ===

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Intersection Observer for scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all animate-in elements
document.querySelectorAll('.animate-in').forEach(el => {
  observer.observe(el);
});

// Respect reduced motion preferences
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}