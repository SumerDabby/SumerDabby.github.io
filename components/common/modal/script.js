// Common Modal Component Script
class ModalManager {
  constructor() {
    this.modal = null;
    this.modalOverlay = null;
    this.modalClose = null;
    this.modalContent = null;
    this.isOpen = false;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  init() {
    // Create modal if it doesn't exist
    this.createModal();
    this.bindEvents();
    
    // Make sure modal is available globally
    window.modalManager = this;
  }
  
  createModal() {
    // Check if modal already exists
    this.modalOverlay = document.getElementById('modalOverlay');
    if (!this.modalOverlay) {
      // Create modal HTML
      const modalHTML = `
        <div class="modal-overlay" id="modalOverlay" aria-hidden="true" role="dialog" aria-modal="true">
          <div class="modal-container">
            <button class="modal-close" id="modalClose" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="modal-content" id="modalContent">
              <!-- Dynamic content will be inserted here -->
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Wait a bit for DOM to update
      setTimeout(() => {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalClose = document.getElementById('modalClose');
        this.modalContent = document.getElementById('modalContent');
        console.log('Modal elements created:', {
          overlay: !!this.modalOverlay,
          close: !!this.modalClose,
          content: !!this.modalContent
        });
      }, 100);
    } else {
      this.modalClose = document.getElementById('modalClose');
      this.modalContent = document.getElementById('modalContent');
    }
  }
  
  bindEvents() {
    // Close button
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.close());
    }
    
    // Overlay click to close
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.close();
        }
      });
    }
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  open(content, options = {}) {
    console.log('Opening modal with content:', content);
    
    // Ensure modal elements exist
    if (!this.modalOverlay || !this.modalContent) {
      console.error('Modal elements not found, recreating...');
      this.createModal();
      
      // Wait for elements to be created
      setTimeout(() => {
        this.open(content, options);
      }, 200);
      return;
    }
    
    // Set content
    this.modalContent.innerHTML = content;
    
    // Set title if provided
    if (options.title) {
      const title = document.createElement('h2');
      title.textContent = options.title;
      this.modalContent.insertBefore(title, this.modalContent.firstChild);
    }
    
    // Show modal
    this.modalOverlay.style.display = 'flex';
    this.modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.modalOverlay.classList.add('show');
    });
    
    this.isOpen = true;
    
    // Focus management
    if (this.modalClose) {
      this.modalClose.focus();
    }
    
    console.log('Modal opened successfully');
    
    // Callback
    if (options.onOpen) {
      options.onOpen();
    }
  }
  
  close() {
    if (!this.modalOverlay || !this.isOpen) return;
    
    this.modalOverlay.classList.remove('show');
    
    setTimeout(() => {
      this.modalOverlay.style.display = 'none';
      this.modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      this.isOpen = false;
    }, 300);
  }
  
  // Convenience methods for common modal types
  openImagePreview(imageSrc, imageAlt = '') {
    const content = `<img src="${imageSrc}" alt="${imageAlt}" />`;
    this.open(content, { title: 'Image Preview' });
  }
  
  openForm(formHTML, title = 'Form') {
    this.open(formHTML, { title });
  }
  
  openContent(contentHTML, title = '') {
    this.open(contentHTML, { title });
  }
}

// Create global modal instance
window.modalManager = new ModalManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModalManager;
}
