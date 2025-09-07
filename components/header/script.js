// Header Component Script
function initHeader() {
  console.log('Header component loaded');
  
  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mainNav = document.querySelector('.main-nav');
  
  if (!hamburgerMenu) {
    console.error('Hamburger menu button not found!');
  } else {
    console.log('Hamburger menu element found:', hamburgerMenu);
  }
  if (!mainNav) {
    console.error('Main navigation not found!');
  } else {
    console.log('Main nav element found:', mainNav);
  }
  
  if (hamburgerMenu && mainNav) {
    console.log('Mobile menu JS is active.');
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      mainNav.classList.toggle('active');
      const header = document.querySelector('.header-component');
      if (mainNav.classList.contains('active')) {
        header.classList.add('menuOpen');
        header.classList.remove('menuClose');
      } else {
        header.classList.remove('menuOpen');
        header.classList.add('menuClose');
      }
      // Update aria-expanded
      const isExpanded = mainNav.classList.contains('active');
      hamburgerMenu.setAttribute('aria-expanded', isExpanded);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const header = document.querySelector('.header-component');
        header.classList.remove('menuOpen');
        header.classList.add('menuClose');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburgerMenu.contains(e.target) && !mainNav.contains(e.target)) {
        hamburgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const header = document.querySelector('.header-component');
        header.classList.remove('menuOpen');
        header.classList.add('menuClose');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const header = document.querySelector('.header-component');
        header.classList.remove('menuOpen');
        header.classList.add('menuClose');
      }
    });
  }
  
  // Smooth scrolling for navigation links
  const allNavLinks = document.querySelectorAll('.header-component .nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update active nav link
          allNavLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });
  
  // Update active navigation on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
}

// Initialize header when DOM is ready
// Only call initHeader from component-loader.js after all components are loaded
