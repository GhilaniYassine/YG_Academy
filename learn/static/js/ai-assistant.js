class AIAssistant {
    constructor() {
        this.button = null;
        this.isAnimating = false;
        this.fabButton = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.button = document.querySelector('.ai-assistant-btn');
            this.fabButton = document.querySelector('.fab'); // FAB button reference
            
            if (this.button) {
                this.setupEventListeners();
                this.setupEntranceAnimation();
                this.ensureProperStacking();
            }
        });
    }

    ensureProperStacking() {
        // Ensure AI button is above FAB button in z-index
        if (this.button && this.fabButton) {
            const aiZIndex = window.getComputedStyle(this.button).zIndex;
            const fabZIndex = window.getComputedStyle(this.fabButton).zIndex;
            
            if (parseInt(aiZIndex) <= parseInt(fabZIndex)) {
                this.button.style.zIndex = '1001'; // One higher than FAB
            }
        }
    }

    setupEventListeners() {
        // Click event with enhanced animation
        this.button.addEventListener('click', (e) => {
            this.handleClick(e);
        });

        // Hover effects
        this.button.addEventListener('mouseenter', () => {
            this.handleMouseEnter();
        });

        this.button.addEventListener('mouseleave', () => {
            this.handleMouseLeave();
        });

        // Touch events for mobile
        this.button.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        });

        // Scroll-based visibility and positioning
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleClick(e) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Create ripple effect
        this.createRipple(e);
        
        // Button animation
        this.button.style.transform = 'scale(0.85)';
        this.button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            this.button.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.button.style.transform = '';
                this.button.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.isAnimating = false;
            }, 100);
        }, 100);
        
        // Vibration feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    handleMouseEnter() {
        if (this.isAnimating) return;
        
        // Enhance glow effect
        this.button.style.boxShadow = '0 20px 45px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4)';
        
        // Rotate logo
        const logo = this.button.querySelector('.ai-logo');
        if (logo) {
            logo.style.transform = 'rotate(360deg) scale(1.1)';
        }
    }

    handleMouseLeave() {
        if (this.isAnimating) return;
        
        // Reset effects
        this.button.style.boxShadow = '';
        
        const logo = this.button.querySelector('.ai-logo');
        if (logo) {
            logo.style.transform = '';
        }
    }

    handleTouchStart(e) {
        // Add touch feedback
        this.button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.button.style.transform = '';
        }, 150);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Adjust opacity based on scroll position
        if (scrollY > windowHeight * 0.3) {
            this.button.style.opacity = '1';
        } else {
            this.button.style.opacity = '0.8';
        }
        
        // Subtle parallax effect (reduced to avoid conflict with FAB)
        const translateY = scrollY * 0.01;
        this.button.style.transform = `translateY(${translateY}px)`;
    }

    handleResize() {
        // Adjust positioning on resize to maintain proper spacing from FAB
        this.ensureProperStacking();
    }

    createRipple(e) {
        const ripple = document.createElement('div');
        const buttonRect = this.button.getBoundingClientRect();
        const size = Math.max(buttonRect.width, buttonRect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - buttonRect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - buttonRect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupEntranceAnimation() {
        // Initial hidden state
        this.button.style.opacity = '0';
        this.button.style.transform = 'scale(0.5) translateY(100px)';
        this.button.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Animate in after page load, with delay after FAB
        setTimeout(() => {
            this.button.style.opacity = '1';
            this.button.style.transform = 'scale(1) translateY(0)';
            
            // Add floating animation after entrance
            setTimeout(() => {
                this.button.style.animation = 'float 3s ease-in-out infinite';
            }, 800);
        }, 1800); // Slightly longer delay than FAB
    }

    // Public methods for external control
    show() {
        this.button.style.opacity = '1';
        this.button.style.pointerEvents = 'auto';
    }

    hide() {
        this.button.style.opacity = '0';
        this.button.style.pointerEvents = 'none';
    }

    pulse() {
        this.button.style.animation = 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite';
        
        setTimeout(() => {
            this.button.style.animation = 'float 3s ease-in-out infinite';
        }, 2000);
    }

    // Method to adjust position dynamically
    adjustPosition(bottomOffset = 120) {
        this.button.style.bottom = bottomOffset + 'px';
    }
}

// CSS animations to be added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Ensure proper stacking order */
    .ai-assistant-btn {
        z-index: 1001 !important;
    }
    
    .fab {
        z-index: 1000 !important;
    }
`;
document.head.appendChild(style);

// Initialize AI Assistant
const aiAssistant = new AIAssistant();

// Export for global access
window.AIAssistant = aiAssistant;
