document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dropdowns = document.querySelectorAll('.dropdown');
  
    // Toggle hamburger
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // Close menu and any open dropdowns on any link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Collapse the main menu
        links.classList.remove('open');
        // Close all dropdowns
        dropdowns.forEach(dd => dd.classList.remove('open'));
      });
    });
  
    // Mobile submenu toggle
    document.querySelectorAll('.dropdown > .has-submenu').forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  });
  