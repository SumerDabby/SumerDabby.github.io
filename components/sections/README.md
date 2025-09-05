# Modular Section System

This directory contains reusable section components that use a comprehensive modular CSS system. The system provides consistent styling, spacing, and responsive behavior across all sections.

## CSS Classes Overview

### Section Container
- `.section-container` - Main container with max-width and padding
- `.section-spacing` - Consistent spacing between elements

### Section Variants
- `.section--compact` - Reduced padding (2rem 0)
- `.section--spacious` - Increased padding (6rem 0)
- `.section--no-border` - Removes top border
- `.section--accent-bg` - Adds accent background color

### Section Content Layouts
- `.section-content` - Base content wrapper
- `.section-content--centered` - Centers content
- `.section-content--two-column` - Two-column grid layout
- `.section-content--three-column` - Three-column grid layout
- `.section-content--four-column` - Four-column grid layout

### Section Titles
- `.section-title` - Base section title
- `.section-title--left` - Left-aligned title
- `.section-title--right` - Right-aligned title
- `.section-title--small` - Smaller title (2rem)
- `.section-title--large` - Larger title (3rem)
- `.section-title--no-underline` - Removes underline

### Section Text Elements
- `.section-subtitle` - Section subtitle with consistent styling
- `.section-description` - Section description text

### Section Grid System
- `.section-grid` - Base grid container
- `.section-grid--auto-fit` - Auto-fit columns (minmax 300px)
- `.section-grid--auto-fill` - Auto-fill columns (minmax 250px)
- `.section-grid--two-col` - Two columns
- `.section-grid--three-col` - Three columns
- `.section-grid--four-col` - Four columns

### Section Cards
- `.section-card` - Base card component
- `.section-card--elevated` - Adds shadow
- `.section-card--accent` - Accent border and background

### Section Lists
- `.section-list` - Base list styling
- `.section-list--checkmarks` - Checkmark bullet points
- `.section-list--bullets` - Bullet points

### Section Tags
- `.section-tags` - Tag container
- `.section-tag` - Individual tag styling

### Section Buttons
- `.section-buttons` - Button group container
- `.section-buttons--centered` - Centers buttons
- `.section-buttons--right` - Right-aligns buttons
- `.section-buttons--stacked` - Stacks buttons vertically

### Section Stats
- `.section-stats` - Stats grid container
- `.section-stat` - Individual stat card
- `.section-stat-number` - Stat number styling
- `.section-stat-label` - Stat label styling

## Usage Examples

### Basic Section Structure
```html
<section id="example" class="section" aria-labelledby="example-title">
  <div class="section-container">
    <h2 id="example-title" class="section-title">Section Title</h2>
    <p class="section-subtitle">Optional subtitle text</p>
    
    <div class="section-content">
      <!-- Section content goes here -->
    </div>
  </div>
</section>
```

### Section with Cards
```html
<section id="features" class="section section--accent-bg">
  <div class="section-container">
    <h2 class="section-title">Features</h2>
    <p class="section-subtitle">What we offer</p>
    
    <div class="section-grid section-grid--three-col">
      <div class="section-card">
        <h3>Feature 1</h3>
        <p>Description of feature 1</p>
      </div>
      <div class="section-card section-card--accent">
        <h3>Feature 2</h3>
        <p>Description of feature 2</p>
      </div>
      <div class="section-card section-card--elevated">
        <h3>Feature 3</h3>
        <p>Description of feature 3</p>
      </div>
    </div>
  </div>
</section>
```

### Section with Statistics
```html
<section id="stats" class="section">
  <div class="section-container">
    <h2 class="section-title">Our Impact</h2>
    
    <div class="section-stats">
      <div class="section-stat">
        <span class="section-stat-number">100+</span>
        <span class="section-stat-label">Projects</span>
      </div>
      <div class="section-stat">
        <span class="section-stat-number">50+</span>
        <span class="section-stat-label">Clients</span>
      </div>
    </div>
  </div>
</section>
```

### Section with Lists and Tags
```html
<section id="benefits" class="section">
  <div class="section-container">
    <h2 class="section-title">Benefits</h2>
    
    <div class="section-content section-content--two-column">
      <div>
        <h3 class="section-title section-title--small section-title--no-underline">What You Get</h3>
        <ul class="section-list section-list--checkmarks">
          <li>High-quality code</li>
          <li>Responsive design</li>
          <li>Fast performance</li>
        </ul>
      </div>
      
      <div>
        <h3 class="section-title section-title--small section-title--no-underline">Technologies</h3>
        <div class="section-tags">
          <span class="section-tag">React</span>
          <span class="section-tag">Node.js</span>
          <span class="section-tag">Shopify</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Responsive Behavior

The modular system is fully responsive and automatically adjusts layouts for different screen sizes:

- **Desktop (1024px+)**: Full grid layouts and spacing
- **Tablet (768px-1024px)**: Simplified layouts, reduced columns
- **Mobile (768px and below)**: Single column layouts, stacked elements

## Best Practices

1. **Always use `.section-container`** for consistent max-width and padding
2. **Use semantic HTML** with proper ARIA labels and roles
3. **Combine classes** to create the desired layout (e.g., `.section-grid .section-grid--three-col`)
4. **Test responsive behavior** across different screen sizes
5. **Keep content accessible** with proper heading hierarchy and alt text

## Available Components

- `process.html` - Process workflow section
- `testimonials.html` - Client testimonials section
- `certifications.html` - Certifications and achievements
- `example-modular.html` - Example demonstrating all features
- `github-projects.html` - GitHub projects showcase

Each component can be included in your HTML using:
```html
<div data-include="./components/sections/component-name.html"></div>
```
