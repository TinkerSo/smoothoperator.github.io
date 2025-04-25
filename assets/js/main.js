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
    submenuParents.forEach(link => {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  
    // 4) Clicking any link collapses all menus,
    //    but skip the "has-submenu" parents so their submenu can open
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if ( link.classList.contains('has-submenu') ) return;
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
  });

  // 7) Close nav if clicking or touching anywhere outside nav when open
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const isInsideNav = nav.contains(e.target);
    const isHamburger = e.target.closest('.nav-toggle');
    if (!isInsideNav && !isHamburger && linksContainer.classList.contains('open')) {
      linksContainer.classList.remove('open');
      dropdownItems.forEach(dd => dd.classList.remove('open'));
    }
  });
  
  // Optional: also close on scroll
  document.addEventListener('scroll', () => {
    if (linksContainer.classList.contains('open')) {
      linksContainer.classList.remove('open');
      dropdownItems.forEach(dd => dd.classList.remove('open'));
    }
  });
  
  