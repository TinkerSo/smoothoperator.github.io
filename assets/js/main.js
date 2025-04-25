// ensure this runs after DOM load
document.addEventListener('DOMContentLoaded', () => {
    // toggle hamburger
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // tap “Implementation & Results” on mobile to open submenu
    document.querySelectorAll('.dropdown > .has-submenu').forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();              // don’t immediately jump to #results
          link.parentElement.classList.toggle('open');
        }
      });
    });
  });
  