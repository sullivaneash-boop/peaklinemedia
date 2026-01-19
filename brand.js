// === BRAND PAGE (brand-landing.html) SPECIFIC JAVASCRIPT ===

// Smooth scroll for explore button
document.querySelector('.btn-explore').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.querySelector('#how-it-works');
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Simple fade-in on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('page-content').classList.add('visible');
  }, 300);
});