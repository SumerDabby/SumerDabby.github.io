// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main application loaded');
  
  // Wait for all components to load
  const waitForComponents = setInterval(() => {
    if (window.componentLoader && window.modalManager) {
      clearInterval(waitForComponents);
      console.log('All components loaded successfully');
    }
  }, 100);
})
// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove('lazy')
        observer.unobserve(img)
      }
    })
  })
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img)
  })
}
// Performance monitoring
if ('performance' in window && 'PerformanceObserver' in window) {
  // Core Web Vitals monitoring
  function sendToAnalytics (metric) {
    // You can replace this with your analytics implementation
    console.log('Core Web Vital:', metric)
  }
  // Largest Contentful Paint
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      sendToAnalytics({
        name: 'LCP',
        value: entry.startTime,
        id: Math.random().toString(36).substring(7)
      })
    }
  }).observe({
    entryTypes: ['largest-contentful-paint']
  })
  // First Input Delay
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      sendToAnalytics({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        id: Math.random().toString(36).substring(7)
      })
    }
  }).observe({
    entryTypes: ['first-input']
  })
  // Cumulative Layout Shift
  let clsValue = 0
  new PerformanceObserver(entryList => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        sendToAnalytics({
          name: 'CLS',
          value: clsValue,
          id: Math.random().toString(36).substring(7)
        })
      }
    }
  }).observe({
    entryTypes: ['layout-shift']
  })
}
// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
  // Trigger animations for elements in viewport
  const animateElements = document.querySelectorAll(
    '.hero-content, .hero-image'
  )
  animateElements.forEach(el => {
    el.style.animationDelay = '0.1s'
    el.style.animationFillMode = 'forwards'
  })
})
// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(registrationError => console.log('SW registration failed'))
  })
}

// Inject JSON-LD schemas from external files to keep index.html clean
;(function injectSchemas () {
  const files = [
    './data/person.json',
    './data/localbusiness.json',
    './data/website.json',
    './data/breadcrumbs.json',
    './data/faq.json'
  ]
  files.forEach(path => {
    fetch(path)
      .then(r => r.json())
      .then(json => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(json)
        document.head.appendChild(script)
      })
      .catch(() => {})
  })
})()

// Simple HTML include system for layouts/components
;(function enableHtmlIncludes () {
  async function fetchHtml (path) {
    const res = await fetch(path)
    if (!res.ok) throw new Error('Failed to fetch ' + path)
    return res.text()
  }

  async function processIncludes () {
    // Resolve includes; support nested includes with a few passes
    let guard = 0
    while (guard < 10) {
      const placeholders = document.querySelectorAll('[data-include]')
      if (!placeholders.length) break
      for (const node of placeholders) {
        const path = node.getAttribute('data-include')
        try {
          const html = await fetchHtml(path)
          node.outerHTML = html
        } catch (e) {
          console.warn('Include failed:', path)
          node.remove()
        }
      }
      guard++
    }
    // Re-observe section ids for nav highlighting after includes
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processIncludes)
  } else {
    processIncludes()
  }
})()

// Render projects from JSON data
;(function renderProjectsFromJson () {
  async function loadProjects () {
    try {
      const res = await fetch('./data/projects.json')
      if (!res.ok) return []
      return res.json()
    } catch (e) {
      return []
    }
  }

  function createProjectCard (p) {
    const features = (p.features || [])
      .map(f => `<li>${f}</li>`)
      .join('')
    const tags = (p.tags || [])
      .map(t => `<span class="project-tag">${t}</span>`)
      .join('')
    return `
      <article class="project-card" data-category="${p.category || ''}">
        <img src="${p.image}" alt="${p.alt || ''}" class="project-image preview-image" width="300" height="220" loading="lazy" decoding="async">
        <h3 class="project-title">${p.title}</h3>
        <div class="project-meta">${tags}</div>
        <p class="project-description">${p.description}</p>
        ${features ? `<div class="project-features"><h4>${p.featuresTitle || 'Features:'}</h4><ul>${features}</ul></div>` : ''}
        <div class="project-buttons">
          <button type="button" class="btn btn-small connect-now-btn" aria-label="Connect now to discuss the project">Connect Now</button>
        </div>
      </article>
    `
  }

  async function init () {
    const grid = document.querySelector('.projects-grid')
    if (!grid) return
    const projects = await loadProjects()
    if (!projects.length) return
    grid.innerHTML = projects.map(createProjectCard).join('')
    // Re-bind preview and inquiry buttons added dynamically
    document.querySelectorAll('.preview-image').forEach(elem => {
      elem.addEventListener('click', function (e) {
        e.preventDefault()
        const imageModal = document.getElementById('imagePreviewModal')
        const modalImage = document.getElementById('modalImage')
        const closeImageModalBtn = imageModal.querySelector('.close-modal')
        modalImage.src = this.src
        modalImage.alt = this.alt
        imageModal.style.display = 'flex'
        imageModal.setAttribute('aria-hidden', 'false')
        closeImageModalBtn.focus()
        document.body.style.overflow = 'hidden'
      })
    })
    document.querySelectorAll('.connect-now-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const inquiryModal = document.getElementById('projectInquiryModal')
        inquiryModal.style.display = 'flex'
        inquiryModal.setAttribute('aria-hidden', 'false')
        document.body.style.overflow = 'hidden'
        const formStatus = document.getElementById('formStatus')
        const form = document.getElementById('inquiryForm')
        formStatus.textContent = ''
        formStatus.className = ''
        form.reset()
        document.getElementById('nameInput').focus()
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()