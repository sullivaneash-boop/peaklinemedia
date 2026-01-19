// === PREMIUM PAGE (index.html) SPECIFIC JAVASCRIPT ===

// Loading sequence with staged reveal
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    setTimeout(() => {
      document.getElementById('landing-page').classList.add('visible');
    }, 300);
  }, 1600);
});

// Parallax effect on background gradients
const circles = document.querySelectorAll('.gradient-circle');
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    circles.forEach((circle, i) => {
      const multiplier = i === 0 ? 1 : -1;
      circle.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
    });
  }
});

// Magnetic effect on logo
const logoContainer = document.querySelector('.logo-container');
if (logoContainer) {
  logoContainer.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
      const rect = logoContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;

      logoContainer.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  logoContainer.addEventListener('mouseleave', () => {
    logoContainer.style.transform = 'translate(0, 0)';
  });
}

// Enhanced button interactions with 3D tilt
const buttons = document.querySelectorAll('.path-button');

buttons.forEach(button => {
  let buttonX = 0, buttonY = 0;
  let currentX = 0, currentY = 0;

  button.addEventListener('mouseenter', function() {
    this.style.willChange = 'transform';
  });

  button.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) {
      const rect = this.getBoundingClientRect();
      buttonX = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      buttonY = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    }
  });

  button.addEventListener('mouseleave', function() {
    buttonX = 0;
    buttonY = 0;
    this.style.willChange = 'auto';
  });

  // Smooth animation loop for button tilt
  function animateButton() {
    currentX += (buttonX - currentX) * 0.1;
    currentY += (buttonY - currentY) * 0.1;

    if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
      button.style.transform = `
        translateY(-12px)
        scale(1.02)
        rotateX(${-currentY}deg)
        rotateY(${currentX}deg)
      `;
    }

    requestAnimationFrame(animateButton);
  }

  if (window.innerWidth > 768) {
    animateButton();
  }
});

// Subtle audio feedback
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSubtleClick() {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    if (window.innerWidth > 768) {
      playSubtleClick();
    }
  });
});