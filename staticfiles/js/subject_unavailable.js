$(document).ready(function() {
    // Initialize page animations
    initializeAnimations();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize modal functionality
    initializeModal();
});

// Initialize page animations
function initializeAnimations() {
    // Animate lock icon
    $('.lock-icon').addClass('animate-pulse');
    
    // Animate content sections
    $('.access-denied-section').delay(200).fadeIn(800);
    $('.subject-info').delay(400).fadeIn(800);
    $('.alternative-options').delay(600).fadeIn(800);
    
    // Animate option cards
    $('.option-card').each(function(index) {
        $(this).delay(index * 150 + 800).queue(function(next) {
            $(this).addClass('slide-in');
            next();
        });
    });
    
    // Initial state for animated elements
    $('.access-denied-section, .subject-info, .alternative-options').hide();
    $('.option-card').css({
        'opacity': '0',
        'transform': 'translateY(20px)'
    });
}

// Set up event listeners
function setupEventListeners() {
    // Purchase button click
    $('#purchaseBtn').on('click', function(e) {
        e.preventDefault();
        showPurchaseModal();
        
        // Add click animation
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 200);
    });
    
    // Trial button click
    $('#trialBtn').on('click', function(e) {
        e.preventDefault();
        startFreeTrial();
        
        // Add click animation
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 200);
    });
    
    // Option card interactions
    $('.option-card').hover(
        function() {
            $(this).addClass('card-hover');
        },
        function() {
            $(this).removeClass('card-hover');
        }
    );
    
    // Option link clicks
    $('.option-link').on('click', function(e) {
        const linkText = $(this).text();
        
        if (linkText === 'Contact Admin') {
            e.preventDefault();
            showContactForm();
        } else if (linkText === 'Get Support') {
            e.preventDefault();
            showSupportForm();
        }
    });
    
    // Back button animation
    $('.back-btn').on('click', function() {
        $(this).addClass('btn-clicked');
    });
}

// Initialize modal functionality
function initializeModal() {
    // Close modal when clicking overlay
    $('.modal-overlay').on('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
    
    // Close modal when clicking close button
    $('#modalClose').on('click', function() {
        hideModal();
    });
    
    // Demo purchase button
    $('.demo-purchase').on('click', function() {
        processDemoPurchase();
    });
    
    // ESC key to close modal
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            hideModal();
        }
    });
}

// Show purchase modal
function showPurchaseModal() {
    $('.modal-overlay').fadeIn(300);
    $('.modal').addClass('modal-show');
    
    // Animate modal content
    setTimeout(() => {
        $('.purchase-summary').addClass('slide-in');
        $('.payment-form').delay(200).queue(function(next) {
            $(this).addClass('slide-in');
            next();
        });
    }, 150);
    
    // Disable body scroll
    $('body').addClass('modal-open');
}

// Hide modal
function hideModal() {
    $('.modal').removeClass('modal-show');
    $('.modal-overlay').fadeOut(300);
    
    // Reset modal content
    $('.purchase-summary, .payment-form').removeClass('slide-in');
    
    // Enable body scroll
    $('body').removeClass('modal-open');
}

// Process demo purchase
function processDemoPurchase() {
    const $button = $('.demo-purchase');
    const originalText = $button.html();
    
    // Show loading state
    $button.html('<i class="fas fa-spinner fa-spin"></i> Processing...');
    $button.prop('disabled', true);
    
    // Simulate processing time
    setTimeout(() => {
        $button.html('<i class="fas fa-check"></i> Purchase Complete!');
        $button.removeClass('btn-primary').addClass('btn-success');
        
        // Show success message
        showSuccessMessage();
        
        // Close modal after delay
        setTimeout(() => {
            hideModal();
            redirectToDashboard();
        }, 2000);
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successHtml = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Purchase Successful!</h3>
            <p>You now have access to this subject. Redirecting to dashboard...</p>
        </div>
    `;
    
    $('.modal-body').html(successHtml);
    $('.success-message').addClass('fade-in');
}

// Start free trial
function startFreeTrial() {
    const $button = $('#trialBtn');
    const originalText = $button.html();
    
    // Show loading state
    $button.html('<i class="fas fa-spinner fa-spin"></i> Starting Trial...');
    $button.prop('disabled', true);
    
    // Simulate trial start
    setTimeout(() => {
        $button.html('<i class="fas fa-check"></i> Trial Started!');
        $button.removeClass('btn-secondary').addClass('btn-success');
        
        // Show trial message
        showTrialMessage();
        
        // Redirect after delay
        setTimeout(() => {
            redirectToDashboard();
        }, 2000);
    }, 1500);
}

// Show trial message
function showTrialMessage() {
    const messageHtml = `
        <div class="trial-notification">
            <i class="fas fa-clock"></i>
            <h3>Free Trial Started!</h3>
            <p>You have 7 days of free access to this subject.</p>
        </div>
    `;
    
    $('.subject-card').prepend(messageHtml);
    $('.trial-notification').addClass('slide-down');
}

// Show contact form
function showContactForm() {
    alert('Contact form would open here. In a real application, this would show a contact form or redirect to a contact page.');
}

// Show support form
function showSupportForm() {
    alert('Support form would open here. In a real application, this would show a support widget or redirect to a help page.');
}

// Redirect to dashboard
function redirectToDashboard() {
    window.location.href = '/dashboard/';
}

// Add custom CSS animations
function addCustomStyles() {
    const customCSS = `
        <style>
            .animate-pulse {
                animation: pulse 2s infinite;
            }
            
            .slide-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.6s ease;
            }
            
            .card-hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
            }
            
            .btn-clicked {
                transform: scale(0.95);
                transition: transform 0.1s ease;
            }
            
            .btn-success {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
                color: white !important;
                border-color: #28a745 !important;
            }
            
            .modal-show {
                animation: modalShow 0.3s ease;
            }
            
            @keyframes modalShow {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            
            .success-message, .trial-notification {
                text-align: center;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .success-message {
                background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .trial-notification {
                background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
            
            .success-message i, .trial-notification i {
                font-size: 24px;
                margin-bottom: 10px;
                display: block;
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease;
            }
            
            .slide-down {
                animation: slideDown 0.5s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-open {
                overflow: hidden;
            }
        </style>
    `;
    
    $('head').append(customCSS);
}

// Initialize custom styles
addCustomStyles();

// Console log for debugging
console.log('Subject Unavailable page loaded successfully');

// Track user interactions for analytics (demo)
function trackInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // In a real application, this would send data to analytics service
}

// Add interaction tracking
$('.btn-primary, .btn-secondary, .option-link').on('click', function() {
    const action = 'click';
    const element = $(this).text().trim();
    trackInteraction(action, element);
});