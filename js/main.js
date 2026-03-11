// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');

    if (header) {
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
    }

    // 2. Scroll Reveal Animations (IntersectionObserver)
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length) {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

            reveals.forEach(reveal => revealObserver.observe(reveal));
        } else {
            // Fallback for old browsers without IntersectionObserver
            reveals.forEach(reveal => reveal.classList.add('active'));
        }
    }

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
    const cardQuestion = document.querySelector('.card-question');
    const cardAnswer = document.querySelector('.card-answer');

    if (cardQuestion && cardAnswer) {
        // We set initial animation delays for the floating effect
        cardQuestion.style.animationDelay = '0s';
        cardAnswer.style.animationDelay = '-2.5s';

        // Ensure reveal delay is sequenced in transition-delay if reveals are used
        const questionCol = cardQuestion.closest('.reveal');
        const answerCol = cardAnswer.closest('.reveal');

        if (questionCol) questionCol.style.transitionDelay = '0s';
        if (answerCol) answerCol.style.transitionDelay = '0.35s';
    }

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

    // 9. Contact Form Handling (Robust Netlify AJAX)
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    const formSubmitBtn = document.getElementById('contact-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Visual feedback
            const originalBtnText = formSubmitBtn.innerText;
            formSubmitBtn.innerText = 'ENVOI EN COURS...';
            formSubmitBtn.disabled = true;

            const formData = new FormData(contactForm);
            // Required for Netlify AJAX
            const searchParams = new URLSearchParams(formData);
            searchParams.set("form-name", "contact");

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: searchParams.toString(),
            })
                .then(response => {
                    if (response.ok) {
                        // Success Workflow
                        contactForm.style.display = 'none';
                        if (successMsg) {
                            successMsg.innerHTML = `
                                <strong>Message envoyé ! ✓</strong><br>
                                <p style="margin-top: 10px; font-size: 0.95rem;">Nous avons bien reçu votre demande.</p>
                                <p style="margin-top: 5px; font-size: 0.95rem;">Alex ou un membre de l'équipe vous répondra sous peu.</p>
                            `;
                            successMsg.style.display = 'block';
                            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        throw new Error(`Server returned status: ${response.status}`);
                    }
                })
                .catch((error) => {
                    // Error Workflow — DO NOT HIDE FORM
                    formSubmitBtn.innerText = originalBtnText;
                    formSubmitBtn.disabled = false;

                    console.error('Submission error:', error);

                    if (errorMsg) {
                        const userMessage = contactForm.querySelector('textarea')?.value || '';
                        errorMsg.innerHTML = `
                            <strong>Oups ! Le formulaire a bogué.</strong><br>
                            <p style="margin-top: 10px; font-size: 0.9rem;">Problème technique momentané. Voici votre message :</p>
                            <div class="form-fallback-code">${userMessage}</div>
                            <p class="form-fallback-footer">Envoyez-le directement à : <br><a href="mailto:infosilenceondanse@gmail.com" class="form-fallback-link">infosilenceondanse@gmail.com</a></p>
                        `;
                        errorMsg.style.display = 'block';
                        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
        });
    }

    // 10. Reveal Contact Info (Anti-Spam)
    document.querySelectorAll('.reveal-on-click').forEach(element => {
        element.addEventListener('click', () => {
            const secret = element.getAttribute('data-p') || element.getAttribute('data-e');
            if (secret) {
                element.innerText = secret;
                element.classList.remove('reveal-on-click');
                element.style.cursor = 'text';
                element.style.borderBottom = 'none';
            }
        });
    });

    // 11. Photo Gallery Modal
    const galleryItemElements = document.querySelectorAll('.gallery-item img');
    const galleryModal = document.getElementById('gallery-modal');
    
    if (galleryItemElements.length > 0 && galleryModal) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');
        const modalImage = document.getElementById('modal-image');
        
        let currentImageIndex = 0;
        
        const openModal = (index) => {
            if (window.innerWidth <= 768) return; // Only allow modal on Desktop
            
            currentImageIndex = index;
            modalImage.src = galleryItemElements[index].src;
            modalImage.alt = galleryItemElements[index].alt;
            
            galleryModal.classList.add('show');
            document.body.classList.add('no-scroll');
        };
        
        const closeModal = () => {
            galleryModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
            setTimeout(() => { modalImage.src = ''; }, 300); // Clear image after transition
        };
        
        const showNext = () => {
            currentImageIndex = (currentImageIndex + 1) % galleryItemElements.length;
            modalImage.src = galleryItemElements[currentImageIndex].src;
            modalImage.alt = galleryItemElements[currentImageIndex].alt;
        };
        
        const showPrev = () => {
            currentImageIndex = (currentImageIndex - 1 + galleryItemElements.length) % galleryItemElements.length;
            modalImage.src = galleryItemElements[currentImageIndex].src;
            modalImage.alt = galleryItemElements[currentImageIndex].alt;
        };
        
        // Add click listeners to gallery images
        galleryItemElements.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                openModal(index);
            });
        });
        
        // Modal Controls
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        modalPrev.addEventListener('click', showPrev);
        modalNext.addEventListener('click', showNext);
        
        // Keyboard Support
        document.addEventListener('keydown', (e) => {
            if (!galleryModal.classList.contains('show')) return;
            
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    // 12. Video Modal Logic
    const promoVideoWrapper = document.getElementById('promo-video-wrapper');
    const videoModal = document.getElementById('video-modal');

    if (promoVideoWrapper && videoModal) {
        const videoModalOverlay = document.getElementById('video-modal-overlay');
        const videoModalClose = document.getElementById('video-modal-close');
        const modalVideo = document.getElementById('modal-video');
        const promoVideo = document.getElementById('promo-video');

        const openVideoModal = (e) => {
            if (window.innerWidth <= 768) return; // Only allow modal on Desktop

            e.preventDefault();

            // The video source is now preloaded in HTML
            // Just play it immediately
            modalVideo.play();

            videoModal.classList.add('show');
            document.body.classList.add('no-scroll');
        };

        const closeVideoModal = () => {
            videoModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        };

        promoVideoWrapper.addEventListener('click', openVideoModal);

        videoModalClose.addEventListener('click', closeVideoModal);
        videoModalOverlay.addEventListener('click', closeVideoModal);

        document.addEventListener('keydown', (e) => {
            if (!videoModal.classList.contains('show')) return;
            if (e.key === 'Escape') closeVideoModal();
        });
    }
});

