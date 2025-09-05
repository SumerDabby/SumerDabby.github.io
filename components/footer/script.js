// Footer Component Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Footer component loaded');
  
  // Smooth scrolling for "Back to Top" link
  const backToTopLink = document.querySelector('.footer-component .footer-links a[href="#home"]');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add click tracking for social links
  const socialLinks = document.querySelectorAll('.footer-component .social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('click', function() {
      const platform = this.textContent.trim();
      console.log(`Social link clicked: ${platform}`);
      // Add analytics tracking here if needed
    });
  });
  
  // Add hover effects for social links
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});
