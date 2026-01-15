// Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initThemeToggle();
  initScrollEffects();
  initAnimations();
  initContactForm();
  initBackToTop();
  initTooltips();
});

// Navigation
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link a');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or prefered scheme
  const savedTheme = localStorage.getItem('theme') || 
                     (prefersDark.matches ? 'dark' : 'light');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// Scroll Effects
function initScrollEffects() {
  const scrollProgress = document.getElementById('scrollProgress');
  const header = document.getElementById('header');
  
  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }
    
    // Header background on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Animations
function initAnimations() {
  // Fade in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
  
  // Skill bar animations
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        
        setTimeout(() => {
          entry.target.style.width = width;
        }, 300);
        
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formSuccess = contactForm.querySelector('.form-success');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual EmailJS or backend)
    setTimeout(() => {
      // Show success message
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Hide success after 5 seconds
      setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      }, 5000);
    }, 1500);
  });
}

// Back to Top
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = e.target.getAttribute('data-tooltip');
      
      document.body.appendChild(tooltip);
      
      const rect = e.target.getBoundingClientRect();
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      
      e.target._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', (e) => {
      if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
      }
    });
  });
}

// Add CSS for tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  .tooltip {
    position: fixed;
    background: var(--dark);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }
  
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--dark);
  }
  
  [data-tooltip]:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(tooltipStyle);
