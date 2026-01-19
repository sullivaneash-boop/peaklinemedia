// === ATHLETE PAGE (athlete.html) SPECIFIC JAVASCRIPT ===

// Card interaction system
const cards = document.querySelectorAll('.info-card');
const expandedArea = document.getElementById('expanded-area');
const finalCTA = document.getElementById('final-cta');
let viewedCards = new Set(JSON.parse(sessionStorage.getItem('viewedCards') || '[]'));

// Initialize viewed state
cards.forEach(card => {
  const cardId = card.dataset.card;
  if (viewedCards.has(cardId)) {
    card.dataset.viewed = 'true';
  }

  // Card click handler
  card.addEventListener('click', function() {
    const contentId = `content-${cardId}`;
    const template = document.getElementById(contentId);

    if (!template) {
      console.error(`Template ${contentId} not found`);
      return;
    }

    // Mark as viewed
    card.dataset.viewed = 'true';
    viewedCards.add(cardId);
    sessionStorage.setItem('viewedCards', JSON.stringify([...viewedCards]));

    // Clone and display content
    const content = template.content.cloneNode(true);
    expandedArea.innerHTML = '';
    expandedArea.appendChild(content);
    expandedArea.classList.add('active');

    // Smooth scroll to content
    setTimeout(() => {
      expandedArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    // Close button handler
    const closeBtn = expandedArea.querySelector('.close-content');
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      expandedArea.classList.remove('active');
      setTimeout(() => {
        expandedArea.innerHTML = '';
      }, 400);
    });

    // Check if all cards viewed
    if (viewedCards.size === 3) {
      // Close any open content first
      expandedArea.classList.remove('active');

      // Hide the cards section after brief delay
      setTimeout(() => {
        document.querySelector('.bridge-layer').style.display = 'none';
        document.querySelector('.journey-cards').style.display = 'none';
        document.querySelector('.skip-container').classList.add('hidden');
        expandedArea.style.display = 'none';

        // Show completion message and CTA
        finalCTA.style.display = 'block';

        // Smooth scroll to CTA
        finalCTA.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    }
  });
});

// Skip button handler
const skipBtn = document.getElementById('skip-btn');
if (skipBtn) {
  skipBtn.addEventListener('click', function() {
    // Mark all as viewed
    cards.forEach(card => {
      card.dataset.viewed = 'true';
      viewedCards.add(card.dataset.card);
    });
    sessionStorage.setItem('viewedCards', JSON.stringify([...viewedCards]));

    // Close any open content
    expandedArea.classList.remove('active');

    // Hide all sections
    document.querySelector('.bridge-layer').style.display = 'none';
    document.querySelector('.journey-cards').style.display = 'none';
    document.querySelector('.skip-container').classList.add('hidden');
    expandedArea.style.display = 'none';

    // Show final CTA
    finalCTA.style.display = 'block';
    finalCTA.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// Show CTA if already viewed all (and hide cards)
if (viewedCards.size === 3) {
  document.querySelector('.bridge-layer').style.display = 'none';
  document.querySelector('.journey-cards').style.display = 'none';
  document.querySelector('.skip-container').classList.add('hidden');
  expandedArea.style.display = 'none';
  finalCTA.style.display = 'block';
}

// Simple fade-in on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('page-content').classList.add('visible');
  }, 300);
});