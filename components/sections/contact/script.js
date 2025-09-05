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
      openGeneralInquiryModal();
    });
  }
});

// Function to open general inquiry modal (globally available)
window.openGeneralInquiryModal = function() {
  console.log('Opening general inquiry modal');
  
  if (window.modalManager) {
    const formHTML = `
      <div class="project-inquiry-form">
        <h3>Let's Work Together</h3>
        <form id="generalInquiryForm">
          <div class="form-group">
            <label for="generalName">Name *</label>
            <input type="text" id="generalName" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="generalEmail">Email *</label>
            <input type="email" id="generalEmail" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="generalCompany">Company</label>
            <input type="text" id="generalCompany" name="company">
          </div>
          
          <div class="form-group">
            <label for="generalBudget">Budget Range</label>
            <select id="generalBudget" name="budget">
              <option value="">Select Budget Range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="over-50k">Over $50,000</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="generalTimeline">Project Timeline</label>
            <select id="generalTimeline" name="timeline">
              <option value="">Select Timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-month">Within 1 Month</option>
              <option value="2-3-months">2-3 Months</option>
              <option value="3-6-months">3-6 Months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="generalMessage">Project Details *</label>
            <textarea id="generalMessage" name="message" rows="4" placeholder="Tell me about your project requirements, goals, and any specific features you need..." required></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Send Inquiry</button>
            <button type="button" class="btn btn-secondary" onclick="window.modalManager.close()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    
    window.modalManager.open(formHTML, 'Project Inquiry Form');
    
    // Handle form submission
    setTimeout(() => {
      const form = document.getElementById('generalInquiryForm');
      if (form) {
        form.addEventListener('submit', window.handleGeneralInquirySubmit);
      }
    }, 100);
  } else {
    console.error('Modal manager not available');
  }
}

// Handle general inquiry form submission (globally available)
window.handleGeneralInquirySubmit = function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  console.log('General inquiry submitted:', data);
  
  // Show success message
  if (window.modalManager) {
    const successHTML = `
      <div class="inquiry-success">
        <h3>Thank You!</h3>
        <p>Your project inquiry has been sent successfully. I'll get back to you within 24 hours.</p>
        <button class="btn btn-primary" onclick="window.modalManager.close()">Close</button>
      </div>
    `;
    window.modalManager.open(successHTML, 'Inquiry Sent');
  }
}
