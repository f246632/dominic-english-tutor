// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Book Now buttons functionality
    const bookButtons = document.querySelectorAll('.book-btn, .btn-primary, .btn-price');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Focus on the first form field after scrolling
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input[type="text"]');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 1000);
            }
        });
    });

    // Form submission handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Basic form validation
            if (!data.name || !data.email) {
                alert('Please fill in your name and email address.\n请填写您的姓名和邮箱地址。');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.\n请输入有效的邮箱地址。');
                return;
            }

            // Show success message
            showSuccessMessage();

            // Reset form
            this.reset();

            // In a real application, you would send this data to your server
            console.log('Form submitted with data:', data);
        });
    }

    // Success message display
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <h4>消息发送成功！</h4>
                <p>Thank you for your interest! We'll get back to you within 24 hours to schedule your first lesson.</p>
                <p class="chinese-text">感谢您的关注！我们将在24小时内回复您以安排您的第一节课。</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn-close">Close | 关闭</button>
            </div>
        `;

        // Style the success message
        successMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const successContent = successMessage.querySelector('.success-content');
        successContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            margin: 0 20px;
            animation: slideUp 0.3s ease;
        `;

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .success-message .fas {
                color: #10b981;
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .success-message h3 {
                color: #1e293b;
                margin-bottom: 0.5rem;
            }
            .success-message h4 {
                color: #64748b;
                font-family: 'Noto Sans SC', sans-serif;
                margin-bottom: 1rem;
            }
            .success-message p {
                color: #64748b;
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            .btn-close {
                background: #2563eb;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }
            .btn-close:hover {
                background: #1d4ed8;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);

        // Add to page
        document.body.appendChild(successMessage);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (successMessage.parentElement) {
                successMessage.remove();
            }
        }, 10000);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Allow only numbers, spaces, dashes, parentheses, and plus sign
            let value = e.target.value.replace(/[^\d\s\-\(\)\+]/g, '');
            e.target.value = value;
        });
    }

    // Language toggle functionality (if needed in the future)
    function toggleLanguage() {
        // This could be implemented to show/hide Chinese text
        // For now, both languages are shown simultaneously
    }

    // Contact form field enhancements
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if field has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close success message
        if (e.key === 'Escape') {
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
        }
    });

    // Preload images for better performance (if you add actual images later)
    function preloadImages() {
        const imageUrls = [
            // Add your image URLs here when you have actual photos
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Call preloadImages if you have images
    // preloadImages();

    // Analytics tracking (placeholder for future implementation)
    function trackEvent(eventName, eventData) {
        // Implement analytics tracking here
        console.log('Event tracked:', eventName, eventData);
    }

    // Track form interactions
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('book_button_clicked', { button_text: button.textContent });
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', () => {
            trackEvent('form_submitted', { form_id: 'bookingForm' });
        });
    }
});

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality (can be called from anywhere)
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
setTimeout(addScrollToTopButton, 1000);