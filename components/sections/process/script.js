// Process Section Component Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Process section component loaded');
  
  // Add animation on scroll
  const processCards = document.querySelectorAll('.process-section .section-card');
  
  if (processCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });
    
    processCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
  
  // Add hover effects for step numbers
  const stepNumbers = document.querySelectorAll('.step-number');
  stepNumbers.forEach(step => {
    step.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    step.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});
