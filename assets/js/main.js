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
  
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
  
    // 1) Hamburger toggle
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // 2) On mobile, tap a dropdown parent only toggles submenu
    document.querySelectorAll('.dropdown > .has-submenu').forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();                // don’t navigate away
          const parent = link.parentElement;
          parent.classList.toggle('open');   // open/close that submenu
        }
      });
    });
  
    // 3) When you tap any **submenu item**, close everything
    document.querySelectorAll('.dropdown .submenu a').forEach(sublink => {
      sublink.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          // collapse both the entire nav and any open dropdown
          links.classList.remove('open');
          document.querySelectorAll('.dropdown.open')
                  .forEach(d => d.classList.remove('open'));
        }
      });
    });
  
    // 4) Tapping any non-dropdown top‐level link should also close the menu
    document.querySelectorAll('.nav-links > li:not(.dropdown) > a')
      .forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            links.classList.remove('open');
          }
        });
      });
  });
  