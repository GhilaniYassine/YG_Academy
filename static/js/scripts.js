// Import jQuery or declare the $ variable before using it
const $ = require("jquery")
const showNotification = require("showNotification") // Declare the showNotification variable

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
      $(this).find(".continue-btn i").addClass("bounce")
    })
    .on("mouseleave", function () {
      $(this).find(".continue-btn i").removeClass("bounce")
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

  // Initialize progress rings
  function initProgressRings() {
    $(".circular-progress").each(function () {
      const progress = $(this).data("progress")
      $(this).find(".progress-ring-fill").css("--progress", progress)
    })
  }

  initProgressRings()

  // Set greeting based on time of day
  function setGreeting() {
    const hour = new Date().getHours()
    let greeting = "Good morning,"

    if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon,"
    } else if (hour >= 18) {
      greeting = "Good evening,"
    }

    $("#greetingTime").text(greeting)
  }

  setGreeting()

  // Theme toggle functionality
  $("#themeToggle").on("click", function () {
    $(this).toggleClass("dark")
    $("body").toggleClass("dark-theme")

    // Change icon
    if ($(this).hasClass("dark")) {
      $(this).find("i").removeClass("fa-sun").addClass("fa-moon")
    } else {
      $(this).find("i").removeClass("fa-moon").addClass("fa-sun")
    }
  })

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
    if (e.key === "Escape" && $("#sidebar").hasClass("open")) {
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
  $(".subject-card, .activity-item, .continue-btn").on("click", function (e) {
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
      .subject-card, .activity-item, .continue-btn {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(15);
          opacity: 0;
        }
      }
    `)
    .appendTo("head")

  // Add bounce animation
  $("<style>")
    .text(`
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateX(0);
        }
        40% {
          transform: translateX(5px);
        }
        60% {
          transform: translateX(2px);
        }
      }
      
      .bounce {
        animation: bounce 1s ease infinite;
      }
    `)
    .appendTo("head")

  console.log("🎓 LearnSpace Dashboard initialized successfully!")
})
