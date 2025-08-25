$(document).ready(function() {
    // Toggle profile dropdown with animation
    $('.profile-icon').on('click', function(e) {
        e.stopPropagation();
        $('#profileDropdown').slideToggle(300);
    });

    // Logout confirmation
    $('.logout-btn button').on('click', function() {
        if (confirm('Are you sure you want to log out?')) {
            // Add actual logout logic here
            window.location.href = '/login';
        }
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.profile-icon').length) {
            $('#profileDropdown').slideUp(300);
        }
    });

    // Animate progress bar on load
    $('.progress').each(function() {
        $(this).css('width', '0%').animate({
            width: $(this).attr('data-progress')
        }, 1500);
    });

    // Sidebar menu interactions
    $('.nav-menu li').on('click', function() {
        $('.nav-menu li').removeClass('active');
        $(this).addClass('active');
    });

    // Hover effects for menu items
    $('.nav-menu li').hover(
        function() {
            $(this).stop(true).animate({ backgroundColor: '#34495e' }, 200);
        },
        function() {
            if (!$(this).hasClass('active')) {
                $(this).stop(true).animate({ backgroundColor: '#2c3e50' }, 200);
            }
        }
    );

    // Smooth content transitions
    $('.nav-menu a').on('click', function(e) {
        e.preventDefault();
        const targetSection = $(this).attr('href');
        $('.content-wrapper').fadeOut(300, function() {
            // Load content here (simulated)
            $(this).fadeIn(300);
        });
    });

    // Animated profile card entrance
    $('.profile-card').hide().delay(500).fadeIn(1000);

    // Dynamic date display
    const joinDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    $('.join-date').text(`Joined: ${joinDate}`);
});