// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Portfolio image modal functionality
    function createImageModal() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Initialize image modal
    const imageModal = createImageModal();
    const modalImage = imageModal.querySelector('.modal-image');
    const modalTitle = imageModal.querySelector('.modal-title');
    const modalDescription = imageModal.querySelector('.modal-description');
    const closeModal = imageModal.querySelector('.close-modal');

    // Portfolio image click handlers
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('.portfolio-overlay p').textContent;
            
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });

    // Scroll animations for portfolio items
    function animateOnScroll() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.classList.add('animate-in');
            }
        });
    }

    // Typing effect for hero section
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect
    const heroText = document.querySelector('#home p');
    if (heroText) {
        const originalText = heroText.textContent;
        setTimeout(() => {
            typeWriter(heroText, originalText, 30);
        }, 1000);
    }

    // Scroll to top button
    function createScrollTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '&#8679;';
        scrollTopBtn.title = 'Scroll to top';
        document.body.appendChild(scrollTopBtn);
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return scrollTopBtn;
    }

    const scrollTopBtn = createScrollTopButton();

    // Show/hide scroll to top button
    function toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    // Portfolio item hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Event listeners for scroll events
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        animateOnScroll();
        toggleScrollTopButton();
    });

    // Initialize scroll animations
    animateOnScroll();
    
    // Contact form enhancement (if you add a form later)
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.addEventListener('click', function(e) {
            if (e.target.href && e.target.href.includes('mailto:')) {
                // Add a small animation when email is clicked
                e.target.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // Console welcome message
    console.log('🎉 Welcome to Justin\'s Portfolio! 📸');
    console.log('Thanks for checking out my photography website!');
    
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});