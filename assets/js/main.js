document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dropdownLinks = document.querySelectorAll('.dropdown > .has-submenu');
  
    // Toggle hamburger menu
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // Close mobile menu automatically when any link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  
    // Mobile submenu toggle for "Implementation & Results"
    dropdownLinks.forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();  // prevent jumping directly to the anchor
          link.parentElement.classList.toggle('open');
        }
      });
    });
  });
  