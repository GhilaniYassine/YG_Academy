$(document).ready(function() {
  // Initialize page animations
  initializeAnimations();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize floating action button
  initializeFAB();
  
  // Initialize card interactions
  initializeCardInteractions();
});

// Initialize page animations
function initializeAnimations() {
  // Animate cards on page load
  $('.subject-card').each(function(index) {
      $(this).delay(index * 150).queue(function(next) {
          $(this).css({
              'opacity': '1',
              'transform': 'translateY(0)'
          });
          next();
      });
  });

  // Animate header elements
  $('.header').addClass('animate-in');
  $('.main-content').delay(300).queue(function(next) {
      $(this).addClass('animate-in');
      next();
  });

  // Welcome message animation
  $('.user-name').fadeIn(1000);
  
  // Page title animation
  $('.page-title').delay(500).fadeIn(800);
  $('.page-subtitle').delay(700).fadeIn(800);
}

// Set up all event listeners
function setupEventListeners() {
  // Smooth scrolling for navigation links
  $('#subjectsLink').on('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items
      $('.nav-item').removeClass('active');
      // Add active class to clicked item
      $(this).addClass('active');
      
      // Smooth scroll to subjects section
      $('html, body').animate({
          scrollTop: $('#subjects').offset().top - 120
      }, 800, 'easeInOutCubic');
  });

  // Navigation item hover effects
  $('.nav-item').hover(
      function() {
          if (!$(this).hasClass('active')) {
              $(this).addClass('nav-hover');
          }
      },
      function() {
          $(this).removeClass('nav-hover');
      }
  );

  // Back to home button click animation
  $('.back-home-btn').on('click', function() {
      $(this).addClass('btn-clicked');
      setTimeout(() => {
          $(this).removeClass('btn-clicked');
      }, 200);
  });

  // Handle scroll events
  $(window).scroll(function() {
      handleScroll();
  });

  // Handle window resize
  $(window).resize(function() {
      handleResize();
  });
}

// Initialize floating action button
function initializeFAB() {
  // Show/hide floating action button based on scroll position
  function toggleFAB() {
      if ($(window).scrollTop() > 300) {
          $('.fab').addClass('show');
      } else {
          $('.fab').removeClass('show');
      }
  }

  // Initial check
  toggleFAB();

  // Floating action button click - scroll to top
  $('#fabButton').on('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      $(this).addClass('fab-clicked');
      
      // Scroll to top
      $('html, body').animate({
          scrollTop: 0
      }, 1000, 'easeInOutCubic', function() {
          $('#fabButton').removeClass('fab-clicked');
      });
  });
}

// Initialize card interactions
function initializeCardInteractions() {
  // Subject card hover effects
  $('.subject-card').hover(
      function() {
          $(this).addClass('card-hover');
          $(this).find('.btn').addClass('btn-hover');
          $(this).find('.status-badge').addClass('badge-hover');
      },
      function() {
          $(this).removeClass('card-hover');
          $(this).find('.btn').removeClass('btn-hover');
          $(this).find('.status-badge').removeClass('badge-hover');
      }
  );

  // Button click animations
  $('.btn').on('click', function(e) {
      const $button = $(this);
      const subject = $button.closest('.subject-card').find('.card-title').text();
      
      // Add click animation
      $button.addClass('btn-clicked');
      
      // Show loading state
      const originalText = $button.text();
      $button.text('Loading...');
      $button.prepend('<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i>');
      
      // Reset after animation (in real app, this would be handled by page navigation)
      setTimeout(() => {
          $button.removeClass('btn-clicked');
      }, 200);
      
      // Log for debugging
      console.log(`Navigating to ${subject} subject page`);
  });

  // Card click to focus
  $('.subject-card').on('click', function(e) {
      if (!$(e.target).hasClass('btn') && !$(e.target).closest('.btn').length) {
          $(this).addClass('card-focus');
          setTimeout(() => {
              $(this).removeClass('card-focus');
          }, 300);
      }
  });
}

// Handle scroll events
function handleScroll() {
  const scrollTop = $(window).scrollTop();
  
  // Toggle FAB visibility
  if (scrollTop > 300) {
      $('.fab').addClass('show');
  } else {
      $('.fab').removeClass('show');
  }
  
  // Parallax effect for header
  if (scrollTop < 200) {
      $('.header').css('transform', `translateY(${scrollTop * 0.1}px)`);
  }
  
  // Update navigation active state based on scroll position
  const subjectsOffset = $('#subjects').offset().top - 150;
  
  if (scrollTop >= subjectsOffset) {
      $('.nav-item').removeClass('active');
      $('#subjectsLink').addClass('active');
  } else {
      $('.nav-item').removeClass('active');
  }
}

// Handle window resize
function handleResize() {
  // Recalculate any position-dependent elements
  const windowWidth = $(window).width();
  
  if (windowWidth < 768) {
      // Mobile adjustments
      $('.subjects-grid').addClass('mobile-grid');
  } else {
      $('.subjects-grid').removeClass('mobile-grid');
  }
}

// Utility function for smooth animations
$.easing.easeInOutCubic = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
};

// Add custom CSS classes for animations
function addCustomStyles() {
  const customCSS = `
      <style>
          .animate-in {
              animation: slideInUp 0.6s ease-out forwards;
          }
          
          @keyframes slideInUp {
              from {
                  opacity: 0;
                  transform: translateY(30px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          .nav-hover {
              background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;
              transform: translateY(-1px);
          }
          
          .card-hover {
              transform: translateY(-10px) !important;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2) !important;
          }
          
          .btn-hover {
              transform: translateY(-2px) scale(1.02) !important;
          }
          
          .badge-hover {
              transform: scale(1.05);
          }
          
          .btn-clicked {
              transform: scale(0.95) !important;
              transition: transform 0.1s ease !important;
          }
          
          .fab-clicked {
              transform: scale(0.9) rotate(180deg) !important;
              transition: all 0.2s ease !important;
          }
          
          .card-focus {
              outline: 2px solid #667eea;
              outline-offset: 4px;
          }
          
          .mobile-grid {
              gap: 15px !important;
          }
          
          .subject-card {
              opacity: 0;
              transform: translateY(30px);
              transition: all 0.6s ease;
          }
          
          .btn-loading {
              pointer-events: none;
              opacity: 0.7;
          }
      </style>
  `;
  
  $('head').append(customCSS);
}

// Initialize custom styles
addCustomStyles();

// Keyboard accessibility
$(document).keydown(function(e) {
  // ESC key to scroll to top
  if (e.keyCode === 27) {
      $('html, body').animate({
          scrollTop: 0
      }, 600);
  }
  
  // Space key to scroll down to subjects
  if (e.keyCode === 32 && !$('input, textarea').is(':focus')) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $('#subjects').offset().top - 120
      }, 600);
  }
});

// Add loading screen effect
$(window).on('load', function() {
  // Remove any loading overlays
  $('.loading-overlay').fadeOut(500);
  
  // Start main animations
  setTimeout(() => {
      initializeAnimations();
  }, 100);
});

// Error handling for images
$('img').on('error', function() {
  $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCwyLjkgMTQsNEMxNCw1LjEgMTMuMSw2IDEyLDZDMTAuOSw2IDEwLDUuMSAxMCw0QzEwLDIuOSAxMC45LDIgMTIsMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMSA5VjdMMTUgMUg1QzMuODkgMSAzIDEuODkgMyAzVjIxQTIgMiAwIDAgMCA1IDIzSDE5QzIwLjEgMjMgMjEgMjIuMSAyMSAyMVY5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=');
});

// Console message for debugging
console.log('Dashboard.js loaded successfully');
console.log('EduLearn Dashboard v1.0');

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
          console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
      }
  }
});

if ('PerformanceObserver' in window) {
  performanceObserver.observe({ entryTypes: ['navigation'] });
}