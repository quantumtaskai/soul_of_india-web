// Soul of India - Interactive Features
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.borderBottomColor = 'rgba(255, 215, 0, 0.4)';
            navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 215, 0, 0.2)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dish card interactions
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        // Hover effect for dish cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add floating animation to dish placeholder
            const placeholder = this.querySelector('.dish-placeholder');
            if (placeholder) {
                placeholder.style.animation = 'dishFloat 2s ease-in-out infinite';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const placeholder = this.querySelector('.dish-placeholder');
            if (placeholder) {
                placeholder.style.animation = 'none';
            }
        });

        // Add to cart button interaction
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Added! ✓';
                this.style.background = 'var(--cardamom)';
                
                // Animate the price
                const price = card.querySelector('.dish-price');
                if (price) {
                    price.style.animation = 'priceGlow 0.6s ease-in-out';
                }
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'var(--saffron)';
                    if (price) {
                        price.style.animation = 'none';
                    }
                }, 2000);
                
                // Show cart notification (simple implementation)
                showCartNotification();
            });
        }
    });

    // Cart notification system
    function showCartNotification() {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🛒</span>
                <span>Item added to cart!</span>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: linear-gradient(135deg, var(--cardamom), #229954);
            color: white;
            padding: 16px 24px;
            border-radius: 50px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Hero section animations
    const heroSpices = document.querySelectorAll('.decoration-spice');
    
    // Animate spices on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        heroSpices.forEach((spice, index) => {
            const speed = (index + 1) * 0.2;
            spice.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Button interactions
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    hasAnimated = true;
                    
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text);
                        const isPercentage = text.includes('%');
                        const suffix = text.replace(/[0-9]/g, '');
                        
                        if (!isNaN(number)) {
                            let current = 0;
                            const increment = number / 50; // 50 steps
                            
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= number) {
                                    current = number;
                                    clearInterval(timer);
                                }
                                stat.textContent = Math.floor(current) + suffix;
                            }, 50);
                        }
                    });
                    
                    observer.disconnect();
                }
            });
        });

        const statsSection = document.querySelector('.story-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateStats();

    // Contact information interactions
    const contactInfo = document.querySelectorAll('.info-value');
    
    contactInfo.forEach(info => {
        if (info.textContent.includes('+971')) {
            info.style.cursor = 'pointer';
            info.addEventListener('click', function() {
                window.location.href = 'tel:' + this.textContent.replace(/\s/g, '');
            });
        }
    });

    // Order button actions
    const orderButtons = document.querySelectorAll('.order-btn, .btn-primary');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Menu') || this.textContent.includes('Explore')) {
                e.preventDefault();
                document.querySelector('.signature-dishes').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// CSS animations (added via JavaScript for better performance)
const style = document.createElement('style');
style.textContent = `
    @keyframes dishFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }

    @keyframes priceGlow {
        0%, 100% { color: var(--saffron); transform: scale(1); }
        50% { color: var(--turmeric); transform: scale(1.1); }
    }

    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification-content span:first-child {
        font-size: 18px;
    }

    /* Loading animation for images (if needed later) */
    @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
    }

    .loading-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 2s infinite;
    }
`;

document.head.appendChild(style);