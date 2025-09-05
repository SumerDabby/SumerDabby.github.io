// Component Loader - Handles loading components with their CSS and JS
class ComponentLoader {
  constructor() {
    this.loadedComponents = new Set();
    this.loadedStyles = new Set();
    this.loadedScripts = new Set();
  }
  
  async loadComponent(componentPath) {
    if (this.loadedComponents.has(componentPath)) {
      return;
    }
    
    try {
      // Load HTML content
      const htmlResponse = await fetch(`${componentPath}/index.html`);
      if (!htmlResponse.ok) {
        throw new Error(`Failed to load HTML for ${componentPath}`);
      }
      const htmlContent = await htmlResponse.text();
      
      // Load CSS
      await this.loadCSS(`${componentPath}/style.css`);
      
      // Load JS
      await this.loadJS(`${componentPath}/script.js`);
      
      // Replace data-include elements
      this.replaceIncludeElements(htmlContent, componentPath);
      
      this.loadedComponents.add(componentPath);
      console.log(`Component loaded: ${componentPath}`);
      
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }
  
  async loadCSS(cssPath) {
    if (this.loadedStyles.has(cssPath)) {
      return;
    }
    
    try {
      const response = await fetch(cssPath);
      if (!response.ok) {
        console.warn(`CSS not found: ${cssPath}`);
        return;
      }
      
      const cssContent = await response.text();
      
      // Create style element
      const styleElement = document.createElement('style');
      styleElement.textContent = cssContent;
      styleElement.setAttribute('data-component-css', cssPath);
      document.head.appendChild(styleElement);
      
      this.loadedStyles.add(cssPath);
      console.log(`CSS loaded: ${cssPath}`);
      
    } catch (error) {
      console.error(`Error loading CSS ${cssPath}:`, error);
    }
  }
  
  async loadJS(jsPath) {
    if (this.loadedScripts.has(jsPath)) {
      return;
    }
    
    try {
      const response = await fetch(jsPath);
      if (!response.ok) {
        console.warn(`JS not found: ${jsPath}`);
        return;
      }
      
      const jsContent = await response.text();
      
      // Create script element
      const scriptElement = document.createElement('script');
      scriptElement.textContent = jsContent;
      scriptElement.setAttribute('data-component-js', jsPath);
      document.head.appendChild(scriptElement);
      
      this.loadedScripts.add(jsPath);
      console.log(`JS loaded: ${jsPath}`);
      
    } catch (error) {
      console.error(`Error loading JS ${jsPath}:`, error);
    }
  }
  
  replaceIncludeElements(htmlContent, componentPath) {
    // Find all elements with data-include attribute
    const includeElements = document.querySelectorAll(`[data-include="${componentPath}/index.html"]`);
    
    includeElements.forEach(element => {
      // For modal component, append to body instead of replacing
      if (componentPath.includes('modal')) {
        document.body.insertAdjacentHTML('beforeend', htmlContent);
        element.remove(); // Remove the placeholder element
      } else {
        element.outerHTML = htmlContent;
      }
    });
  }
  
  async loadAllComponents() {
    // Find all data-include elements
    const includeElements = document.querySelectorAll('[data-include]');
    console.log('Found components to load:', includeElements.length);
    
    // Load components sequentially to ensure proper order
    for (const element of includeElements) {
      const componentPath = element.getAttribute('data-include').replace('/index.html', '');
      console.log('Loading component:', componentPath);
      await this.loadComponent(componentPath);
    }
    
    console.log('All components loaded');
    
    // Set up global event listeners after all components are loaded
    this.setupGlobalEventListeners();
    
    // Initialize header functionality after components are loaded
    setTimeout(() => {
      if (typeof initHeader === 'function') {
        initHeader();
      }
    }, 500);
  }
  
  setupGlobalEventListeners() {
    // Set up event delegation for dynamically loaded content
    document.addEventListener('click', (e) => {
      // Handle image preview clicks
      if (e.target.classList.contains('preview-image')) {
        e.preventDefault();
        if (window.modalManager) {
          window.modalManager.openImagePreview(e.target.src, e.target.alt);
        }
      }
      
      // Handle project inquiry buttons
      if (e.target.classList.contains('lets-work-together-btn') || 
          e.target.classList.contains('send-project-inquiry-btn') ||
          e.target.classList.contains('project-connect-btn')) {
        e.preventDefault();
        if (window.openGeneralInquiryModal) {
          window.openGeneralInquiryModal();
        }
      }
    });
  }
  
  openInquiryModal() {
    const inquiryFormHTML = `
      <form id="inquiryForm" autocomplete="off">
        <label for="nameInput">Name *</label>
        <input type="text" id="nameInput" name="name" placeholder="Your full name" required>

        <label for="emailInput">Email *</label>
        <input type="email" id="emailInput" name="email" placeholder="you@example.com" required>

        <label for="mobileInput">Mobile *</label>
        <input type="tel" id="mobileInput" name="mobile" placeholder="Your phone number" pattern="[0-9]{10}" required>

        <label for="subjectInput">Subject *</label>
        <input type="text" id="subjectInput" name="subject" placeholder="Subject of your inquiry" required>

        <label for="messageInput">Message *</label>
        <textarea id="messageInput" name="message" placeholder="Write your message here..." rows="4" required></textarea>

        <button type="submit" class="btn">Send Inquiry</button>
      </form>
      <div id="formStatus" class="modal-status"></div>
    `;
    
    window.modalManager.openForm(inquiryFormHTML, 'Project Inquiry Form');
    
    // Set up form handling after modal opens
    setTimeout(() => {
      const form = document.getElementById('inquiryForm');
      if (form) {
        form.addEventListener('submit', this.handleFormSubmit);
        document.getElementById('nameInput').focus();
      }
    }, 100);
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    
    // Collect form data
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      mobile: form.mobile.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.subject || !formData.message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'modal-status error';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'modal-status error';
      return;
    }
    
    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      formStatus.textContent = 'Please enter a valid 10-digit mobile number.';
      formStatus.className = 'modal-status error';
      return;
    }
    
    // Show loading state
    formStatus.textContent = 'Sending inquiry...';
    formStatus.className = 'modal-status';
    
    // Simulate form submission
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your inquiry has been sent successfully. I\'ll get back to you soon.';
      formStatus.className = 'modal-status success';
      form.reset();
      
      // Close modal after 3 seconds
      setTimeout(() => {
        window.modalManager.close();
      }, 3000);
    }, 1500);
  }
}

// Initialize component loader
const componentLoader = new ComponentLoader();

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Loading components...');
  await componentLoader.loadAllComponents();
  console.log('All components loaded');
});

// Export for global access
window.componentLoader = componentLoader;
