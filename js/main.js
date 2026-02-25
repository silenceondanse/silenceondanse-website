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
            // Explicitly set the form-name for Netlify to catch the AJAX post
            formData.append("form-name", "contact");

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then(response => {
                    if (response.ok) {
                        // Success Workflow
                        contactForm.style.display = 'none';
                        if (successMsg) {
                            successMsg.innerHTML = `
                                <strong>Message envoyé ! ✓</strong><br>
                                <p style="margin-top: 10px; font-size: 0.95rem;">Nous avons bien reçu votre demande. Un courriel de confirmation (CC) vous a été envoyé automatiquement.</p>
                                <p style="margin-top: 5px; font-size: 0.95rem;">Alex ou un membre de l'équipe vous répondra sous peu.</p>
                            `;
                            successMsg.style.display = 'block';
                            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch((error) => {
                    // Error Workflow — DO NOT HIDE FORM
                    formSubmitBtn.innerText = originalBtnText;
                    formSubmitBtn.disabled = false;

                    if (errorMsg) {
                        const userMessage = contactForm.querySelector('textarea')?.value || '';
                        errorMsg.innerHTML = `
                            <strong>Oups ! Le formulaire a bogué.</strong><br>
                            <p style="margin-top: 10px; font-size: 0.9rem;">Désolé, nous avons un problème technique momentané.</p>
                            <p class="form-fallback-msg">Voici votre message à copier :</p>
                            <div class="form-fallback-code">${userMessage}</div>
                            <p class="form-fallback-footer">Veuillez l'envoyer directement par courriel à : <br><a href="mailto:infosilenceondanse@gmail.com" class="form-fallback-link">infosilenceondanse@gmail.com</a></p>
                        `;
                        errorMsg.style.display = 'block';
                        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    console.error('Form submission error:', error);
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
});
