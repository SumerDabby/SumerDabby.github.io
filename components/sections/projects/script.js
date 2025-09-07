// Projects section component removed
// Projects Section Component Script
console.log('Projects section script loaded');

// Load projects from JSON file
let projects = [];

async function loadProjects() {
  console.log('Starting to load projects...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadProjects());
    return;
  }
  
  try {
    console.log('Fetching projects.json...');
    const response = await fetch('./data/projects.json');
    console.log('Response received:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    projects = await response.json();
    console.log('Loaded projects from JSON:', projects.length);
    renderProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
    // Fallback to sample data if JSON fails to load
    projects = [
      {
        id: 1,
        title: "E-commerce Dashboard",
        description: "A comprehensive dashboard for managing e-commerce operations with real-time analytics, inventory management, and order tracking.",
        image: "https://via.placeholder.com/400x220/2a2d32/b489fd?text=E-commerce+Dashboard",
        tags: ["React", "Node.js", "MongoDB", "Chart.js"],
        features: [
          "Real-time analytics dashboard",
          "Inventory management system",
          "Order tracking and fulfillment",
          "Customer relationship management"
        ],
        liveUrl: "#",
        githubUrl: "#"
      }
    ];
    renderProjects();
  }
}
  
  // Render projects
  function renderProjects() {
    // Wait for the projects grid to exist
    const waitForGrid = () => {
      const projectsGrid = document.getElementById('projectsGrid');
      if (!projectsGrid) {
        console.log('Projects grid not found, waiting...');
        setTimeout(waitForGrid, 100);
        return;
      }
      
      console.log('Projects grid found, rendering projects:', projects.length);
    
    projectsGrid.innerHTML = projects.map(project => `
      <div class="project-card">
        <img src="${project.image}" alt="${project.alt || project.title}" class="project-image preview-image" loading="lazy">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-meta">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <p class="project-description">${project.description}</p>
        <div class="project-features">
          <h4>${project.featuresTitle || 'Key Features:'}</h4>
          <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="project-buttons">
          <button class="btn btn-small project-connect-btn">Connect Now</button>
        </div>
      </div>
    `).join('');
    
    console.log('Projects rendered successfully');
    
    // Add event listeners for Connect Now buttons
    setTimeout(() => {
      const connectButtons = document.querySelectorAll('.project-connect-btn');
      connectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          if (window.openGeneralInquiryModal) {
            window.openGeneralInquiryModal();
          } else {
            console.error('General inquiry modal function not available');
          }
        });
      });
    }, 100);
    
    // Add scroll animation after projects are rendered
    setTimeout(() => {
      const projectCards = document.querySelectorAll('.project-card');
      if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
              }, index * 150);
            }
          });
        }, { threshold: 0.1 });
        
        projectCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(card);
        });
      }
    }, 100);
    };
    
    waitForGrid();
  }
  
// Use the general inquiry modal function from contact section
// This ensures all inquiries use the same form

// Start loading projects with a delay to ensure component is loaded
setTimeout(() => {
  loadProjects();
}, 500);
