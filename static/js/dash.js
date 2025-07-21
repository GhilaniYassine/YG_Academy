// Import jQuery or declare the $ variable before using it
const $ = require("jquery")

$(document).ready(() => {
  // Sidebar toggle functionality
  $("#sidebarToggle").on("click", () => {
    $("#sidebar").toggleClass("open")
    $("#mobileOverlay").toggleClass("active")
  })

  // Close sidebar when clicking overlay
  $("#mobileOverlay").on("click", function () {
    $("#sidebar").removeClass("open")
    $(this).removeClass("active")
  })

  // Navigation link clicks
  $(".nav-link").on("click", function (e) {
    e.preventDefault()

    // Remove active class from all nav items
    $(".nav-item").removeClass("active")

    // Add active class to clicked item
    $(this).parent().addClass("active")

    // Smooth scroll to section (if it exists)
    const target = $(this).attr("href")
    if ($(target).length) {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 100,
        },
        800,
      )
    }

    // Close mobile sidebar
    if (window.innerWidth <= 768) {
      $("#sidebar").removeClass("open")
      $("#mobileOverlay").removeClass("active")
    }
  })

  // Subject card hover effects
  $(".subject-card")
    .on("mouseenter", function () {
      $(this).find(".start-lesson-btn").addClass("bounce")
    })
    .on("mouseleave", function () {
      $(this).find(".start-lesson-btn").removeClass("bounce")
    })

  // Start lesson button clicks
  $(".start-lesson-btn").on("click", function (e) {
    e.stopPropagation()
    const subject = $(this).closest(".subject-card").data("subject")

    // Add click animation
    $(this).addClass("clicked")
    setTimeout(() => {
      $(this).removeClass("clicked")
    }, 200)

    // Simulate lesson start (replace with actual navigation)
    console.log(`Starting lesson for: ${subject}`)

    // You could add actual navigation here:
    // window.location.href = `/lessons/${subject}`;

    // For demo purposes, show an alert
    showNotification(`Starting ${subject} lesson...`, "success")
  })

  // Activity item clicks
  $(".activity-item").on("click", function () {
    const activityTitle = $(this).find("h4").text()
    showNotification(`Opening: ${activityTitle}`, "info")
  })

  // Smooth scroll for internal links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault()
    const target = $(this.getAttribute("href"))
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 100,
        },
        800,
      )
    }
  })

  // Progress ring animation
  function animateProgressRings() {
    $(".progress-ring").each(function () {
      const progressValue = $(this).find(".progress-value").text()
      const percentage = Number.parseInt(progressValue)
      const degrees = (percentage / 100) * 360

      $(this).css("background", `conic-gradient(var(--primary-teal) ${degrees}deg, var(--light-gray) ${degrees}deg)`)
    })
  }

  // Initialize progress rings
  animateProgressRings()

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    $(".notification").remove()

    const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === "success" ? "check" : type === "error" ? "times" : "info"}"></i>
                <span>${message}</span>
            </div>
        `)

    $("body").append(notification)

    // Show notification
    setTimeout(() => {
      notification.addClass("show")
    }, 100)

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.removeClass("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  // Add notification styles dynamically
  $("<style>")
    .text(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--primary-teal);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #10b981;
            color: #059669;
        }
        
        .notification-error {
            border-left-color: #ef4444;
            color: #dc2626;
        }
        
        .notification-info {
            border-left-color: var(--primary-teal);
            color: var(--primary-teal);
        }
    `)
    .appendTo("head")

  // Handle window resize
  $(window).on("resize", () => {
    if (window.innerWidth > 768) {
      $("#sidebar").removeClass("open")
      $("#mobileOverlay").removeClass("active")
    }
  })

  // Add loading states for buttons
  $(".start-lesson-btn").on("click", function () {
    const $btn = $(this)
    const originalText = $btn.find("span").text()

    $btn.prop("disabled", true)
    $btn.find("span").text("Loading...")
    $btn.find("i").removeClass("fa-arrow-right").addClass("fa-spinner fa-spin")

    // Simulate loading time
    setTimeout(() => {
      $btn.prop("disabled", false)
      $btn.find("span").text(originalText)
      $btn.find("i").removeClass("fa-spinner fa-spin").addClass("fa-arrow-right")
    }, 1500)
  })

  // Keyboard navigation
  $(document).on("keydown", (e) => {
    // Toggle sidebar with Ctrl/Cmd + B
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault()
      $("#sidebarToggle").click()
    }

    // Close sidebar with Escape
    if (e.key === "Escape") {
      $("#sidebar").removeClass("open")
      $("#mobileOverlay").removeClass("active")
    }
  })

  // Add subtle parallax effect to welcome section
  $(window).on("scroll", function () {
    const scrolled = $(this).scrollTop()
    const parallax = scrolled * 0.1

    $(".welcome-section").css("transform", `translateY(${parallax}px)`)
  })

  // Initialize tooltips for progress rings
  $(".progress-ring").each(function () {
    const progress = $(this).find(".progress-value").text()
    $(this).attr("title", `Progress: ${progress}`)
  })

  // Add click ripple effect
  $(".subject-card, .activity-item").on("click", function (e) {
    const $this = $(this)
    const offset = $this.offset()
    const x = e.pageX - offset.left
    const y = e.pageY - offset.top

    const ripple = $('<div class="ripple"></div>')
    ripple.css({
      left: x,
      top: y,
    })

    $this.append(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })

  // Add ripple effect styles
  $("<style>")
    .text(`
        .subject-card, .activity-item {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(74, 155, 142, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `)
    .appendTo("head")

  console.log("🎓 LearnSpace Dashboard initialized successfully!")
})
