document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
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
    
    // 3) Mobile: tap on the parent link itself toggles its submenu
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
    
    // ==== SMOOTH SCROLLING FUNCTIONALITY ====
    // Get all navigation links with href starting with #
    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.has-submenu)');
    
    // Add smooth scrolling to section links
    sectionLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || this.classList.contains('has-submenu')) return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
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
          const headerHeight = document.querySelector('header').offsetHeight;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          history.pushState(null, null, targetId);
        }
      });
    });
    
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        setTimeout(function() {
          const headerHeight = document.querySelector('header').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
    
    // ==== PHOTO GALLERY FUNCTIONALITY ====
    function setupGallery() {
      // Core elements
      const sliderTrack = document.querySelector('.slider-track');
      const slides = document.querySelectorAll('.slider-slide');
      const dotsContainer = document.querySelector('.slider-dots');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      const pauseBtn = document.querySelector('.slider-pause');
      
      if (!sliderTrack || !slides.length) return;
      
      // Disable the automatic animation completely
      sliderTrack.style.animation = 'none';
      sliderTrack.style.width = (slides.length * 100) + '%';
      
      // Set up each slide
      slides.forEach((slide) => {
        slide.style.width = (100 / slides.length) + '%';
      });
      
      // Clear existing dots and create new ones
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
      
      // Get dots after they've been created
      const dots = document.querySelectorAll('.slider-dot');
      
      // Current slide tracker
      let currentSlide = 0;
      
      // Function to update slide position
      function goToSlide(index) {
        currentSlide = index;
        
        // Update transform to show current slide
        sliderTrack.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
      
      // Next slide function
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      }
      
      // Previous slide function
      function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
      }
      
      // Add click event listeners
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
      
      // Hide pause button
      if (pauseBtn) {
        pauseBtn.style.display = 'none';
      }
      
      // Add click events to dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          goToSlide(index);
        });
      });
      
      // Initialize to first slide
      goToSlide(0);
    }
    
    // Run gallery setup
    setupGallery();
    
    // ==== LEARN MORE BUTTON FUNCTIONALITY ====
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
  
  // Helper to collapse menus
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