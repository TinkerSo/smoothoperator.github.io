document.addEventListener('DOMContentLoaded', function() {
    // === NAVIGATION FUNCTIONALITY ===
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const dropdowns = document.querySelectorAll('.dropdown');
    const submenuParents = document.querySelectorAll('.dropdown > .has-submenu');
    
    // 1) Hamburger button toggles the main menu
    if (toggle) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
      });
    }
    
    // 2) Desktop: hover shows dropdown, mobile: tap toggles
    dropdowns.forEach(dd => {
      dd.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) dd.classList.add('open');
      });
      dd.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) dd.classList.remove('open');
      });
    });
    
    // 3) Mobile: tap on the parent link toggles its submenu
    submenuParents.forEach(link => {
      const submenu = link.nextElementSibling;
      if (!submenu || !submenu.classList.contains('dropdown-menu')) return;
      
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
          if (e.target === link) {
            e.preventDefault();
            dropdowns.forEach(dd => dd !== link.parentElement && dd.classList.remove('open'));
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
    
    // === SMOOTH SCROLLING FUNCTIONALITY ===
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
          // Get header height for offset
          const headerHeight = document.querySelector('header').offsetHeight;
          
          // Calculate position with offset
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          // Smooth scroll with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
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
          // Get header height for offset
          const headerHeight = document.querySelector('header').offsetHeight;
          
          // Calculate position with offset
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          // Smooth scroll with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
    
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      // Get the target element
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      
      // If the target element exists, scroll to it with a slight delay
      if (targetElement) {
        // Use setTimeout to ensure this happens after the page has fully loaded
        setTimeout(function() {
          // Get header height for offset
          const headerHeight = document.querySelector('header').offsetHeight;
          
          // Calculate position with offset
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          // Smooth scroll with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300); // Increased delay to ensure page is fully loaded
      }
    }
    
    // === GALLERY FUNCTIONALITY ===
    function setupGallery() {
      // Core elements
      const sliderTrack = document.querySelector('.slider-track');
      const slides = document.querySelectorAll('.slider-slide');
      const dotsContainer = document.querySelector('.slider-dots');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      
      if (!sliderTrack || !slides.length) return;
      
      // Calculate slide width and set track width
      const slideCount = slides.length;
      const slideWidth = 100 / slideCount;
      
      // Set slider track width based on number of slides
      sliderTrack.style.width = `${slideCount * 100}%`;
      
      // Set each slide width
      slides.forEach(slide => {
        slide.style.width = `${slideWidth}%`;
      });
      
      // Create dots if they don't exist
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.classList.add('slider-dot');
          if (index === 0) dot.classList.add('active');
          dot.setAttribute('data-index', index);
          dotsContainer.appendChild(dot);
        });
      }
      
      // Current slide tracking
      let currentSlide = 0;
      
      // Function to go to a specific slide
      function goToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        currentSlide = index;
        
        // Update transform to show the current slide
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
      
      // Navigate to next slide
      function nextSlide() {
        goToSlide(currentSlide + 1);
      }
      
      // Navigate to previous slide
      function prevSlide() {
        goToSlide(currentSlide - 1);
      }
      
      // Add event listeners
      if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
          e.preventDefault();
          prevSlide();
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          nextSlide();
        });
      }
      
      // Add click events to dots
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'), 10);
          goToSlide(index);
        });
      });
      
      // Initialize to first slide
      goToSlide(0);
    }
    
    // Initialize gallery
    setupGallery();
    
    // === LEARN MORE BUTTON FUNCTIONALITY ===
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-target');
        const detailsSection = document.getElementById(targetId);
        
        if (detailsSection) {
          const isActive = detailsSection.classList.contains('active');
          detailsSection.classList.toggle('active');
          this.textContent = isActive ? 'Learn More' : 'Show Less';
          
          if (!isActive) {
            setTimeout(() => {
              detailsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
              });
            }, 100);
          }
        }
      });
    });
  });
  
  // Helper to collapse everything
  function closeMenus() {
    const links = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768 && links && links.classList.contains('open')) {
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