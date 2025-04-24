// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks  = document.querySelector('.nav-links');
  
    // Toggle mobile navigation menu
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  
    // Close mobile menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      });
    });
  });
  