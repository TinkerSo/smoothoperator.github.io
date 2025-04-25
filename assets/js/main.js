document.addEventListener('DOMContentLoaded', () => {
    const toggle         = document.querySelector('.nav-toggle');
    const links          = document.querySelector('.nav-links');
    const navLinks       = document.querySelectorAll('.nav-links a');
    const dropdowns      = document.querySelectorAll('.dropdown');
    const submenuParents = document.querySelectorAll('.dropdown > .has-submenu');
  
    // 1) Hamburger button toggles the main menu
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  
    // 2) Desktop: hover shows dropdown, mobile: tap toggles
    dropdowns.forEach(dd => {
      dd.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) dd.classList.add('open');
      });
      dd.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) dd.classList.remove('open');
      });
    });
  
    // 3) Mobile: tap on parent toggles its submenu only
// 3) Mobile: tap on the parent link itself toggles its submenu,
//    but let any links *inside* the submenu (<a href="#...">) work normally
submenuParents.forEach(link => {
    const submenu = link.nextElementSibling;
    if (!submenu || !submenu.classList.contains('submenu')) return;
  
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        // only preventDefault when tapping *exactly* the parent link,
        // not when tapping its child <a> inside the submenu
        if (e.target === link) {
          e.preventDefault();
          // close any other open dropdowns
          dropdowns.forEach(dd => dd !== link.parentElement && dd.classList.remove('open'));
          // toggle this one
          link.parentElement.classList.toggle('open');
        }
      }
    });
  });
  
  
    // 4) Clicking any link (except submenu‐toggler) collapses everything
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('has-submenu')) return;
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
  
    // 6) Reset on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        links.classList.remove('open');
        dropdowns.forEach(dd => dd.classList.remove('open'));
      }
    });
  
    // 7) Close nav + dropdowns when you scroll (mobile only)
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768 && links.classList.contains('open')) {
        links.classList.remove('open');
        dropdowns.forEach(dd => dd.classList.remove('open'));
      }
    });
  });
  