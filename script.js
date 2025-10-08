// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Scroll-triggered Animations
// ===================================
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

// Observe elements with animation
const animateElements = document.querySelectorAll('.feature-card, .mv-card, .value-card, .about-text, .contact-intro');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Header Scroll Effect
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link Highlight
// ===================================
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentLocation || 
        (currentLocation === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// ===================================
// Button Ripple Effect
// ===================================
const buttons = document.querySelectorAll('.btn, .btn-form-link, .btn-download-primary');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .btn, .btn-form-link, .btn-download-primary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElements = document.querySelectorAll('.footer-bottom p');
yearElements.forEach(el => {
    if (el.textContent.includes('2024')) {
        el.textContent = el.textContent.replace('2024', new Date().getFullYear());
    }
});

// ===================================
// Lazy Loading Images (if any are added)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Welcome to Mumble133!', 'color: #4361EE; font-size: 20px; font-weight: bold;');
console.log('%cEnhanced voice communication for everyone', 'color: #219EBC; font-size: 14px;');
console.log('%cVisit: https://mumble133.info/', 'color: #666; font-size: 12px;');

// ===================================
// Performance Monitoring (Optional)
// ===================================
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        if (pageLoadTime > 0) {
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }
    }
});
