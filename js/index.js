// Smooth scrolling navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href !== '#') {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active')
        })
        if (this.classList.contains('nav-link')) {
          this.classList.add('active')
        }
      }
    }
  })
})
// Update active navigation on scroll
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-link')
const observerOptions = {
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active')
        }
      })
    }
  })
}, observerOptions)
sections.forEach(section => observer.observe(section))
// Image Preview Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
  const imageModal = document.getElementById('imagePreviewModal')
  const modalImage = document.getElementById('modalImage')
  const closeImageModalBtn = imageModal.querySelector('.close-modal')

  function openImageModal (src, alt) {
    modalImage.src = src
    modalImage.alt = alt
    imageModal.style.display = 'flex'
    imageModal.setAttribute('aria-hidden', 'false')
    closeImageModalBtn.focus()
    document.body.style.overflow = 'hidden'
  }

  function closeImageModal () {
    imageModal.style.display = 'none'
    imageModal.setAttribute('aria-hidden', 'true')
    modalImage.src = ''
    modalImage.alt = ''
    document.body.style.overflow = 'auto'
  }
  // Listen for clicks on preview images
  document.querySelectorAll('.preview-image').forEach(elem => {
    elem.addEventListener('click', function (e) {
      e.preventDefault()
      openImageModal(elem.src, elem.alt)
    })
  })
  // Close image modal
  closeImageModalBtn.addEventListener('click', closeImageModal)
  imageModal.addEventListener('click', function (e) {
    if (e.target === imageModal) closeImageModal()
  })
  // Project Inquiry Modal Functionality
  const inquiryModal = document.getElementById('projectInquiryModal')
  const closeInquiryModalBtn = inquiryModal.querySelector('.close-modal')
  const letsWorkBtn = document.querySelector('.lets-work-together-btn')
  const sendInquiryBtn = document.querySelector('.send-project-inquiry-btn')
  const connectNowBtns = document.querySelectorAll('.connect-now-btn')
  const form = document.getElementById('inquiryForm')
  const formStatus = document.getElementById('formStatus')

  function openInquiryModal () {
    inquiryModal.style.display = 'flex'
    inquiryModal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    formStatus.textContent = ''
    formStatus.className = ''
    form.reset()
    document.getElementById('nameInput').focus()
  }

  function closeInquiryModal () {
    inquiryModal.style.display = 'none'
    inquiryModal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = 'auto'
  }
  // Open inquiry modal on buttons
  if (letsWorkBtn) letsWorkBtn.addEventListener('click', openInquiryModal)
  if (sendInquiryBtn) sendInquiryBtn.addEventListener('click', openInquiryModal)
  connectNowBtns.forEach(btn => btn.addEventListener('click', openInquiryModal))
  // Close inquiry modal
  closeInquiryModalBtn.addEventListener('click', closeInquiryModal)
  inquiryModal.addEventListener('click', function (e) {
    if (e.target === inquiryModal) closeInquiryModal()
  })
  // Close modals on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (imageModal.style.display === 'flex') {
        closeImageModal()
      }
      if (inquiryModal.style.display === 'flex') {
        closeInquiryModal()
      }
    }
  })
  // Form submission handling with curl request
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    // Collect form data
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      mobile: form.mobile.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    }
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.subject ||
      !formData.message
    ) {
      formStatus.textContent = 'Please fill in all required fields.'
      formStatus.className = 'error'
      return
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      formStatus.textContent = 'Please enter a valid email address.'
      formStatus.className = 'error'
      return
    }
    // Mobile validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/
    if (!mobileRegex.test(formData.mobile)) {
      formStatus.textContent = 'Please enter a valid 10-digit mobile number.'
      formStatus.className = 'error'
      return
    }
    formStatus.textContent = 'Sending inquiry...'
    formStatus.className = ''
    // Make the actual curl request
    fetch('https://api.shiwansh.com/api/contacts', {
      method: 'POST',
      headers: {
        'sec-ch-ua-platform': '"Windows"',
        Referer: 'https://www.shiwansh.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        'sec-ch-ua':
          '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'Content-Type': 'application/json',
        'sec-ch-ua-mobile': '?0'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data)
        formStatus.textContent =
          'Inquiry sent successfully! Thank you for reaching out.'
        formStatus.className = 'success'
        form.reset()
        // Close modal after 2 seconds
        setTimeout(() => {
          closeInquiryModal()
        }, 2000)
      })
      .catch(error => {
        console.error('Error:', error)
        formStatus.textContent =
          'There was an error sending your inquiry. Please try again or contact directly.'
        formStatus.className = 'error'
      })
  })
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