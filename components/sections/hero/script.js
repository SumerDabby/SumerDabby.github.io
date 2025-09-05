// Hero Section Component Script
document.addEventListener('DOMContentLoaded', function() {
  // Add any hero-specific JavaScript functionality here
  console.log('Hero section component loaded');
  
  // Example: Add click tracking for hero buttons
  const heroButtons = document.querySelectorAll('.hero-section .btn');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      console.log(`Hero button clicked: ${buttonText}`);
      // Add analytics tracking here if needed
    });
  });
  
  // Example: Add scroll animation trigger
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
  }
});
