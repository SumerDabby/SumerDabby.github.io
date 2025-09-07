// Component Loader - Handles loading components with their CSS and JS
class ComponentLoader {
  async openEnquiryModal() {
    // Load enquiry modal HTML
    const enquiryHtmlResponse = await fetch('components/modal/enquiry/index.html');
    const enquiryHtml = await enquiryHtmlResponse.text();
    // Load enquiry modal CSS
    await this.loadCSS('components/modal/enquiry/style.css');
    // Load enquiry modal JS
    await this.loadJS('components/modal/enquiry/script.js');
    // Open modal using modalManager, and bind form handler after content is injected
    if (window.modalManager) {
      window.modalManager.openForm(enquiryHtml, 'Project Inquiry Form', {
        onOpen: function() {
          if (window.bindEnquiryFormHandler) window.bindEnquiryFormHandler();
        }
      });
    } else {
      alert('Modal system not loaded.');
    }
  }
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
    if (typeof initHeader === 'function') {
      initHeader();
    }
  }
  
  setupGlobalEventListeners() {
    // Set up event delegation for dynamically loaded content
    document.addEventListener('click', (e) => {
      // Handle project inquiry buttons
      if (
        e.target.classList.contains('lets-work-together-btn') ||
        e.target.classList.contains('send-project-inquiry-btn') ||
        e.target.classList.contains('project-connect-btn') ||
        e.target.textContent.trim().toLowerCase().includes('connect now') ||
        e.target.textContent.trim().toLowerCase().includes('lets work together') ||
        e.target.textContent.trim().toLowerCase().includes('send project enquery')
      ) {
        e.preventDefault();
        if (window.componentLoader && typeof window.componentLoader.openEnquiryModal === 'function') {
          window.componentLoader.openEnquiryModal();
        }
      }
    });
  }
  
  // Old modal system removed. New modal system will be used.
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
