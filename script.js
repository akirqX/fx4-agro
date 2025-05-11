document.addEventListener('DOMContentLoaded', function() {
    // Loading Overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    window.addEventListener('load', function() {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
        
        function startCounters() {
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        current = target;
                    }
                    number.textContent = Math.floor(current);
                }, 16);
            });
        }
    }

    // Image Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    if (sliderItems.length > 0) {
        function showSlide(index) {
            sliderItems.forEach(item => item.classList.remove('active'));
            sliderItems[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= sliderItems.length) newIndex = 0;
            showSlide(newIndex);
        }
        
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = sliderItems.length - 1;
            showSlide(newIndex);
        }
        
        sliderNext.addEventListener('click', nextSlide);
        sliderPrev.addEventListener('click', prevSlide);
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        const sliderContainer = document.querySelector('.image-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // Initialize first slide
        showSlide(0);
    }

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.slider-dots .dot');
    let currentTestimonial = 0;
    
    if (testimonialItems.length > 0) {
        function showTestimonial(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto slide
        setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialItems.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
        
        // Initialize first testimonial
        showTestimonial(0);
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('Form submitted:', data);
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});