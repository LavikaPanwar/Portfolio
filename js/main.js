// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link a');
const sections = document.querySelectorAll('section[id]');
const fadeElements = document.querySelectorAll('.fade-in');

// Mobile Navigation Toggle
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Toggle body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Smooth scroll for anchor links
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  }
}

// Add active class to current section in navigation
function updateActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Fade-in animation on scroll
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// Form submission handling (if you add a contact form)
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Simulate form submission
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // You can integrate with EmailJS or other service here
  setTimeout(() => {
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Scroll events
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveNavLink();
  });
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize header state
  handleScroll();
  
  // Contact form (if added)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Add current year to footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Close menu with Escape key
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    closeMobileMenu();
  }
});
