    document.addEventListener("DOMContentLoaded", () => {
        // ===================================
        // MODERN LOADER FUNCTIONALITY
        // ===================================
        
        const pageLoader = document.getElementById('page-loader');
        const progressFill = document.querySelector('.progress-fill');
        const progressPercentage = document.querySelector('.progress-percentage');
        const body = document.body;
        
        // Simulate loading progress
        function simulateLoading() {
            let progress = 0;
            const loadingInterval = setInterval(() => {
                // Random progress increment for realistic loading
                const increment = Math.random() * 15 + 5; // 5-20% random increment
                progress = Math.min(progress + increment, 100);
                
                // Update progress bar and percentage
                if (progressFill) {
                    progressFill.style.width = progress + '%';
                }
                if (progressPercentage) {
                    progressPercentage.textContent = Math.floor(progress) + '%';
                }
                
                // When loading is complete
                if (progress >= 100) {
                    clearInterval(loadingInterval);
                    
                    // Add a small delay for smooth transition
                    setTimeout(() => {
                        // Fade out loader
                        if (pageLoader) {
                            pageLoader.classList.add('fade-out');
                        }
                        
                        // Remove loading state from body
                        body.classList.remove('page-loading');
                        body.classList.add('loaded');
                        
                        // Remove loader from DOM after animation
                        setTimeout(() => {
                            if (pageLoader) {
                                pageLoader.style.display = 'none';
                            }
                        }, 600);
                    }, 500);
                }
            }, 200); // Update every 200ms for smooth animation
        }
        
        // Start loading simulation
        if (pageLoader) {
            simulateLoading();
        } else {
            // If no loader element, remove loading state immediately
            body.classList.remove('page-loading');
            body.classList.add('loaded');
        }
        // INTERSECTION OBSERVER untuk scroll animation up dan down
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        // Tambahkan class scroll-animate ke elemen
        document.querySelectorAll('.hero, .hero-content, .hero-scroll, .about-section, .about-content, .skills-section, .projects-section, .contact-section, .project-card, .skill-card').forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });

        // Features cards tetap terlihat tanpa hilang saat scroll
        document.querySelectorAll('.feature-card, .features-header').forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
            el.classList.add('visible');
        });

        // Hero entrance animation sudah ditangani oleh CSS animation
        // Tidak perlu JavaScript tambahan untuk entrance animation

        // Navbar scroll animation
        const navbar = document.querySelector('nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });

        // Smooth scroll untuk navbar links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 100; // Offset untuk navbar fixed
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Typing Animation untuk teks hero
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const lines = JSON.parse(typingElement.getAttribute('data-lines') || '[]');
            let lineIndex = 0;
            let charIndex = 0;
            let displayed = '';

            function typeLine() {
                if (lineIndex >= lines.length) return;

                const currentLine = lines[lineIndex];
                if (charIndex < currentLine.length) {
                    displayed += currentLine.charAt(charIndex);
                    typingElement.textContent = displayed;
                    charIndex++;
                    setTimeout(typeLine, 120);
                } else {
                    lineIndex++;
                    if (lineIndex < lines.length) {
                        displayed += '\n';
                        charIndex = 0;
                        setTimeout(typeLine, 400);
                    }
                }
            }

            setTimeout(typeLine, 500);
        }

        // Loader hide after page selesai dimuat
        const pageLoader = document.getElementById('page-loader');
        window.addEventListener('load', () => {
            if (pageLoader) {
                pageLoader.classList.add('hide');
                document.body.classList.remove('page-loading');
                setTimeout(() => {
                    if (pageLoader.parentNode) {
                        pageLoader.parentNode.removeChild(pageLoader);
                    }
                }, 500);
            }
        });

        // Feature cards click animation
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = '';
                }, 50);
            });
            
            card.addEventListener('mouseenter', function() {
                this.style.animation = 'featurePulse 0.6s ease';
            });
        });

        // Card click effect - pause marquee and show skill name

        const marqueeContent = document.querySelector('.marquee-content');
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => {
                // Toggle pause state
                const isPaused = marqueeContent.style.animationPlayState === 'paused';
                marqueeContent.style.animationPlayState = isPaused ? 'running' : 'paused';
                
                // Toggle active class for visual feedback
                document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));
                if (!isPaused) {
                    card.classList.add('active');
                }
            });
        });

        document.querySelectorAll('.project-card[data-link]').forEach(card => {
            card.addEventListener('click', () => {
                const url = card.getAttribute('data-link');
                if (url) {
                    window.open(url, '_blank');
                }
            });
        });
    });