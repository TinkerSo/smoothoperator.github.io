document.addEventListener('DOMContentLoaded', () => {
    const toggle       = document.querySelector('.nav-toggle');
    const links        = document.querySelector('.nav-links');
    const navLinks     = document.querySelectorAll('.nav-links a');
    const dropdowns    = document.querySelectorAll('.dropdown');
    const submenuParents = document.querySelectorAll('.dropdown > .has-submenu');
    const submenuLinks = document.querySelectorAll('.dropdown .submenu a');
  
    // 1) Hamburger button toggles the main menu
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // 2) Desktop: hover shows dropdown, mobile: tap toggles
    dropdowns.forEach(dd => {
      // Desktop hover:
      dd.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) dd.classList.add('open');
      });
      dd.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) dd.classList.remove('open');
      });
    });
  
    // 3) Mobile: tap on parent toggles its submenu only
    submenuParents.forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();                // prevent jump to #…
          link.parentElement.classList.toggle('open');
        }
      });
    });
  
    // 4) Clicking any link (top‐level or submenu) collapses all menus
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        dropdowns.forEach(dd => dd.classList.remove('open'));
      });
    });
  
    // 5) Click outside nav closes any open menus (mobile only)
    document.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        const insideNav   = !!e.target.closest('nav');
        const isHamburger = !!e.target.closest('.nav-toggle');
        if (!insideNav && !isHamburger && links.classList.contains('open')) {
          links.classList.remove('open');
          dropdowns.forEach(dd => dd.classList.remove('open'));
        }
      }
    });
  
    // 6) Also recalc behavior on resize (optional)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        links.classList.remove('open');
        dropdowns.forEach(dd => dd.classList.remove('open'));
      }
    });
  });
  