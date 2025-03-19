document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Contact form submission
    const form = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
  
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
  
        try {
          const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            formResponse.textContent = 'Message sent successfully!';
            formResponse.style.color = '#4CAF50'; // Green for success
            form.reset(); // Clear the form
          } else {
            formResponse.textContent = 'Failed to send message. Please try again.';
            formResponse.style.color = '#FF6F61'; // Red for error
          }
        } catch (error) {
          formResponse.textContent = 'An error occurred. Please try again.';
          formResponse.style.color = '#FF6F61'; // Red for error
          console.error('Error:', error);
        }
      });
    }
  });