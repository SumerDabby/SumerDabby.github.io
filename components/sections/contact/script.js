// Contact section component removed
// Contact Section Component Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact section component loaded');
  
  // Add animation on scroll
  const contactMethods = document.querySelectorAll('.contact-section .contact-method');
  
  if (contactMethods.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });
    
    contactMethods.forEach(method => {
      method.style.opacity = '0';
      method.style.transform = 'translateY(20px)';
      method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(method);
    });
  }
  
  // Add click tracking for contact methods
  const contactLinks = document.querySelectorAll('.contact-section .contact-details a');
  contactLinks.forEach(link => {
    link.addEventListener('click', function() {
      const contactType = this.textContent.trim();
      console.log(`Contact method clicked: ${contactType}`);
      // Add analytics tracking here if needed
    });
  });
  
  // Add hover effects for contact methods
  contactMethods.forEach(method => {
    method.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    method.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add inquiry form functionality
  const sendInquiryBtn = document.querySelector('.send-project-inquiry-btn');
  if (sendInquiryBtn) {
    sendInquiryBtn.addEventListener('click', function() {
      if (window.componentLoader && typeof window.componentLoader.openEnquiryModal === 'function') {
        window.componentLoader.openEnquiryModal();
      }
    });
  }
});

// Old modalManager modal system removed. Now uses new modal system via componentLoader.openEnquiryModal().

// Old modalManager modal system removed. Now uses new modal system via componentLoader.openEnquiryModal().
