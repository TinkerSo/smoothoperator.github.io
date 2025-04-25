document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dropdowns = document.querySelectorAll('.dropdown');
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
  
    // 3) Mobile: tap on the parent link itself toggles its submenu,
    //    but let any links *inside* the submenu (<a href="#...">) work normally
    submenuParents.forEach(link => {
      const submenu = link.nextElementSibling;
      if (!submenu || !submenu.classList.contains('dropdown-menu')) return;
  
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
  
    // 4) Clicking any link (except submenu-toggler) collapses everything
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
        const insideNav = !!e.target.closest('nav');
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
  
    // ==== NEW ADDITION: SMOOTH SCROLLING FUNCTIONALITY ====
    // Get all navigation links with href starting with #
    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.has-submenu)');
    
    // Add smooth scrolling to section links
    sectionLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump behavior
        
        const targetId = this.getAttribute('href');
        // Skip if it's just # or if it's a dropdown toggle
        if (targetId === '#' || this.classList.contains('has-submenu')) return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Smooth scroll to the section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  
    // Add smooth scrolling for dropdown menu links too
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[href^="#"]');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Smooth scroll to the section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  });
  
  // Helper to collapse everything
  function closeMenus() {
    const links = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768 && links.classList.contains('open')) {
      links.classList.remove('open');
      dropdowns.forEach(dd => dd.classList.remove('open'));
    }
  }
  
  // Collapse on any scroll/drag (mobile)
  window.addEventListener('scroll', closeMenus);
  document.addEventListener('touchmove', closeMenus);
  document.addEventListener('wheel', closeMenus);
  
  // Collapse if you tap outside the nav (also mobile)
  document.addEventListener('touchstart', e => {
    if (window.innerWidth <= 768 && !e.target.closest('nav')) {
      closeMenus();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const nextButton = document.querySelector('.gallery-button.next');
    const prevButton = document.querySelector('.gallery-button.prev');
    let currentIndex = 0;
    let slideshowInterval;
  
    // Function to update the active slide
    function updateSlidePosition() {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }
  
    // Function to move to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    }
  
    // Function to move to the previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    }
  
    // Event listeners for buttons
    nextButton.addEventListener('click', function() {
      nextSlide();
      resetInterval();
    });
  
    prevButton.addEventListener('click', function() {
      prevSlide();
      resetInterval();
    });
  
    // Event listeners for dots
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        currentIndex = parseInt(this.getAttribute('data-index'));
        updateSlidePosition();
        resetInterval();
      });
    });
  
    // Start automatic slideshow
    function startSlideshow() {
      slideshowInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
  
    // Reset interval on user interaction
    function resetInterval() {
      clearInterval(slideshowInterval);
      startSlideshow();
    }
  
    // Initialize slideshow
    startSlideshow();
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      // Get the target element
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      
      // If the target element exists, scroll to it with a slight delay
      if (targetElement) {
        // Use setTimeout to ensure this happens after the page has fully loaded
        setTimeout(function() {
          // Scroll to the element with smooth behavior
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Alternatively, you can use window.scrollTo for more control
          // const headerOffset = 80; // match your header height
          // const elementPosition = targetElement.getBoundingClientRect().top;
          // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          // window.scrollTo({
          //   top: offsetPosition,
          //   behavior: "smooth"
          // });
        }, 100);
      }
    }
  });