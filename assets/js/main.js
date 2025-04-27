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
    
    // ==== SMOOTH SCROLLING FUNCTIONALITY ====
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
    
    // Slideshow functionality (only initialize if elements exist)
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const nextButton = document.querySelector('.gallery-button.next');
    const prevButton = document.querySelector('.gallery-button.prev');
    
    if (slides.length && dots.length && nextButton && prevButton) {
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
    }
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

  // Gallery functionality
// Simplified gallery controls that work properly
function initGallery() {
    // Get all gallery elements
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const pauseBtn = document.querySelector('.slider-pause');
    
    // Only proceed if we have the required elements
    if (!sliderTrack || !slides.length) return;
    
    // Create dots if they don't exist
    if (dotsContainer && dotsContainer.children.length === 0) {
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
    
    // Current slide index and slide width calculation
    let currentSlide = 0;
    const slideWidth = 100 / slides.length;
    
    // Function to update slide position
    function goToSlide(index) {
      // Update current slide index
      currentSlide = index;
      
      // Calculate the transform position
      const position = -slideWidth * currentSlide;
      sliderTrack.style.transform = `translateX(${position}%)`;
      
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
    
    // Next slide function
    function goToNextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      goToSlide(nextIndex);
    }
    
    // Previous slide function
    function goToPrevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      goToSlide(prevIndex);
    }
    
    // Add event listeners to buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToPrevSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToNextSlide();
      });
    }
    
    // Hide pause button as requested
    if (pauseBtn) {
      pauseBtn.style.display = 'none';
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        goToSlide(index);
      });
    });
  }
  
  // Call the function when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery
    initGallery();
    
    // Add your Learn More button functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-target');
        const detailsSection = document.getElementById(targetId);
        const parentSubsection = this.closest('.subsection');
        
        if (detailsSection && parentSubsection) {
          const isActive = detailsSection.classList.contains('active');
          this.textContent = isActive ? 'Learn More' : 'Show Less';
          detailsSection.classList.toggle('active');
          
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
  
  // Call initGallery() inside your DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', () => {
    // Your existing initialization code here...
    
    // Initialize the gallery
    initGallery();
  });

  // Add this code to your main.js file or within a <script> tag at the bottom of your HTML

  document.addEventListener('DOMContentLoaded', function() {
    // Get all "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    // Add click event listener to each button
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default behavior
        
        // Get the target details section ID
        const targetId = this.getAttribute('data-target');
        const detailsSection = document.getElementById(targetId);
        
        // Find the parent subsection
        const parentSubsection = this.closest('.subsection');
        
        if (detailsSection && parentSubsection) {
          // Check if this section is already active
          const isActive = detailsSection.classList.contains('active');
          
          // Update button text
          this.textContent = isActive ? 'Learn More' : 'Show Less';
          
          // Toggle the active class on the details section
          detailsSection.classList.toggle('active');
          
          // If opening, scroll to the expanded content smoothly
          if (!isActive) {
            // Allow a moment for the DOM to update before scrolling
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

  // Add this function to your existing JavaScript

function fixGalleryControls() {
    // Get all gallery elements
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const pauseBtn = document.querySelector('.slider-pause');
  
    if (!sliderTrack || !slides.length) return;
  
    // Current slide index
    let currentSlide = 0;
    
    // Calculate slide width based on number of slides
    const slideWidth = 100 / slides.length;
  
    // Function to update slide position
    function updateSlidePosition(index) {
      // Update current slide index
      currentSlide = index;
      
      // Calculate position and update transform
      const position = -slideWidth * currentSlide;
      sliderTrack.style.transform = `translateX(${position}%)`;
      
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
  
    // Next slide function
    function goToNextSlide() {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      updateSlidePosition(nextIndex);
    }
  
    // Previous slide function
    function goToPrevSlide() {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      updateSlidePosition(prevIndex);
    }
  
    // Add event listeners to navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToPrevSlide();
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goToNextSlide();
      });
    }
  
    // Disable the pause functionality as requested
    if (pauseBtn) {
      pauseBtn.style.display = 'none';
    }
  
    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        updateSlidePosition(index);
      });
    });
  }
  
  // Call the function when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // Fix gallery controls
    fixGalleryControls();
  });

  