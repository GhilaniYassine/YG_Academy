document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const inputs = document.querySelectorAll('.form-input');
    const submitBtn = document.querySelector('.submit-btn');

    // Enhanced form validation and animations
    inputs.forEach(input => {
        const icon = input.parentElement.querySelector('.input-icon');
        
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            icon.style.color = '#4f46e5';
            icon.style.transform = 'translateY(-50%) scale(1.1)';
        });

        // Blur animations
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
                icon.style.color = 'rgba(255, 255, 255, 0.7)';
                icon.style.transform = 'translateY(-50%) scale(1)';
            }
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Form submission with enhanced animations
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showErrorShake();
            return;
        }

        // Add loading state
        showLoadingState();

        // Show success message with enhanced styling
        Swal.fire({
            icon: 'success',
            title: 'Welcome to YG Academy!',
            html: `
                <div style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 3rem; color: #4f46e5; margin-bottom: 15px;">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <p style="font-size: 1.1rem; color: #6b7280; margin-bottom: 10px;">
                        Thank you for joining our learning community!
                    </p>
                    <p style="font-size: 0.95rem; color: #9ca3af;">
                        You'll receive a confirmation email shortly.
                    </p>
                </div>
            `,
            confirmButtonColor: '#4f46e5',
            confirmButtonText: 'Get Started',
            background: 'rgba(255, 255, 255, 0.98)',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-confirm-btn'
            },
            showClass: {
                popup: 'animate__animated animate__zoomIn animate__faster'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut animate__faster'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Add a smooth transition before submitting
                document.body.style.opacity = '0.7';
                document.body.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    form.submit();
                }, 300);
            }
        });
    });

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.parentElement.classList.remove('error');

        switch(fieldName) {
            case 'username':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Username must be at least 3 characters';
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Username can only contain letters, numbers, and underscores';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'password1':
                if (value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    isValid = false;
                    errorMessage = 'Password must contain uppercase, lowercase, and number';
                }
                break;

            case 'password2':
                const password1 = document.querySelector('input[name="password1"]').value;
                if (value !== password1) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            showFieldSuccess(field);
        }

        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        field.parentElement.classList.add('error');
        field.style.borderColor = '#ef4444';
        field.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        
        // Create or update error message
        let errorDiv = field.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 5px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentElement.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        setTimeout(() => {
            errorDiv.style.opacity = '1';
        }, 100);
    }

    // Show field success
    function showFieldSuccess(field) {
        field.parentElement.classList.remove('error');
        field.style.borderColor = '#10b981';
        field.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }
    }

    // Show error shake animation
    function showErrorShake() {
        const container = document.querySelector('.form-container');
        container.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }

    // Show loading state
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Creating Account...</span>
            </div>
        `;
        
        // Add spinning animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced particle animation
    function createFloatingElements() {
        const container = document.querySelector('.particles-container');
        
        setInterval(() => {
            if (document.querySelectorAll('.floating-element').length < 5) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 6 + 4}px;
                    height: ${Math.random() * 6 + 4}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: 100vh;
                    animation: floatUp ${Math.random() * 10 + 15}s linear forwards;
                    pointer-events: none;
                `;
                
                container.appendChild(element);
                
                // Remove element after animation
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }, 25000);
            }
        }, 3000);
    }

    // Add floating animation keyframes
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        @keyframes floatUp {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0; 
            }
            10% { 
                opacity: 1; 
            }
            90% { 
                opacity: 1; 
            }
            100% { 
                transform: translateY(-100vh) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(floatingStyle);

    // Initialize floating elements
    createFloatingElements();

    // Add smooth scrolling and focus management
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    submitBtn.click();
                }
            }
        });
    });

    // Add welcome animation on page load
    setTimeout(() => {
        document.querySelector('.form-container').style.opacity = '1';
        document.querySelector('.form-container').style.transform = 'translateY(0)';
    }, 200);

    // Set initial state
    document.querySelector('.form-container').style.opacity = '0';
    document.querySelector('.form-container').style.transform = 'translateY(20px)';
    document.querySelector('.form-container').style.transition = 'all 0.6s ease';
});