// Initialize EmailJS
(function() {
  // You need to get your own EmailJS user ID
  // emailjs.init('YOUR_USER_ID');
  
  console.log('EmailJS loaded - add your user ID to enable email functionality');
})();

// Contact form handling with EmailJS
function sendEmail(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Collect form data
  const formData = {
    name: form.querySelector('#name').value,
    email: form.querySelector('#email').value,
    message: form.querySelector('#message').value,
    date: new Date().toLocaleDateString()
  };
  
  // Send email using EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(() => {
      // Success
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch((error) => {
      // Error
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error sending your message. Please try again or email me directly.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
  }
});
