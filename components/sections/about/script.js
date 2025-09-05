// About Section Component Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('About section component loaded');
  
  // Add animation on scroll
  const aboutCards = document.querySelectorAll('.about-section .experience-item, .about-section .education-item');
  
  if (aboutCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });
    
    aboutCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
  
  // Add hover effect for profile image
  const profileImage = document.querySelector('.about-profile-image');
  if (profileImage) {
    profileImage.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  }
});
