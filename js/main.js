// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case page is loaded midway down
    handleScroll();

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120; // trigger point

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    // Initial check
    revealOnScroll();

    // 3. Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (n) => {
        if (!slides.length) return;
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };

    // Initialize auto slider
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds

        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Stop auto when user clicks
                goToSlide(index);
                // restart interval
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // 4. Enhanced Parallax for "How It Works" section
    const howItWorks = document.querySelector('.how-it-works');

    if (howItWorks) {
        // CSS background-attachment: fixed handles parallax natively,
        // but on iOS it doesn't work — so we add a JS fallback for mobile
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            // Disable fixed bg on mobile and simulate with JS
            howItWorks.style.backgroundAttachment = 'scroll';

            const updateParallax = () => {
                const rect = howItWorks.getBoundingClientRect();
                const scrolled = window.scrollY;
                const sectionTop = howItWorks.offsetTop;
                const relativeScroll = scrolled - sectionTop;
                howItWorks.style.backgroundPositionY = `calc(50% + ${relativeScroll * 0.35}px)`;
            };

            window.addEventListener('scroll', updateParallax, { passive: true });
            updateParallax();
        }
    }

    // 5. Floating cards — stagger animation on scroll entry
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, i) => {
        card.style.animationDelay = `${i * -2.5}s`;
    });

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainHeader = document.querySelector('.main-header');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mainHeader.classList.toggle('mobile-nav-open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.main-header a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainHeader) mainHeader.classList.remove('mobile-nav-open');
            document.body.classList.remove('no-scroll');
        });
    });

    // 8. Gallery item — subtle entrance stagger
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, (parseInt(entry.target.dataset.index) || 0) * 60);
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach((item, i) => {
            item.dataset.index = i;
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            galleryObserver.observe(item);
        });
    }

    // 9. Contact Form Handling (Netlify AJAX)
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then(() => {
                    contactForm.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .catch((error) => {
                    if (errorMsg) errorMsg.style.display = 'block';
                    console.error('Form submission error:', error);
                });
        });
    }

});
