// js/load-header.js
// Fetches the shared header component and injects it into each page.
// Place <div id="header-placeholder"></div> where the header should appear.

(function () {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    fetch('components/header.html')
        .then(function (res) { return res.text(); })
        .then(function (html) {
            placeholder.outerHTML = html;

            // Re-run header-dependent logic from main.js
            // 1. Sticky header
            var header = document.getElementById('header');
            if (header) {
                var handleScroll = function () {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                };
                window.addEventListener('scroll', handleScroll);
                handleScroll();
            }

            // 2. Mobile menu toggle
            var mobileBtn = document.querySelector('.mobile-menu-btn');
            var mainHeader = document.querySelector('.main-header');
            if (mobileBtn) {
                mobileBtn.addEventListener('click', function () {
                    mainHeader.classList.toggle('mobile-nav-open');
                    document.body.classList.toggle('no-scroll');
                });
            }

            // 3. Close mobile menu on link click
            var navLinks = document.querySelectorAll('.main-header a');
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    if (mainHeader) mainHeader.classList.remove('mobile-nav-open');
                    document.body.classList.remove('no-scroll');
                });
            });
        })
        .catch(function (err) {
            console.error('Failed to load header component:', err);
        });
})();
