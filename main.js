// Hamburger Menu Functionality
const menuBtn = document.querySelector('.hamburger');
const menuBar = document.querySelector('.menu-bar');
const menuList = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', showMenu);

function showMenu() {
  menuBtn.classList.toggle('is-active');
  menuBar.classList.toggle('is-active');
  menuList.classList.toggle('is-active');
}

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuList.classList.contains('is-active')) {
      menuBtn.classList.remove('is-active');
      menuBar.classList.remove('is-active');
      menuList.classList.remove('is-active');
    }
  });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link a[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add('active');
    } else if (navLink) {
      navLink.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Cursor follow effect (optional - adds a custom cursor)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .tool, .project, .side-project');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroSection.style.opacity = 1 - (scrolled / 600);
  }
});

// Add fade-in animation to project images on hover
const projectImages = document.querySelectorAll('.project-img-link img');
projectImages.forEach(img => {
  img.addEventListener('mouseenter', function() {
    this.style.filter = 'brightness(1.1) contrast(1.1)';
  });
  img.addEventListener('mouseleave', function() {
    this.style.filter = 'brightness(1) contrast(1)';
  });
});

// Console message
console.log('%cHey there! 👋', 'color: #18b9cf; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? Nice! Feel free to reach out if you want to collaborate!', 'color: #7e92d9; font-size: 14px;');
