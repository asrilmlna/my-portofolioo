document.addEventListener("DOMContentLoaded", () => {
    // ===================================
    // MODERN LOADER FUNCTIONALITY - FAST VERSION
    // ===================================
    
    const pageLoader = document.getElementById('page-loader');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const body = document.body;
    
    // Fast loading simulation
    function simulateLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            // Fast progress increment (15-40% per update)
            const increment = Math.random() * 25 + 15;
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
                
                // Quick transition to home
                setTimeout(() => {
                    // Fade out loader
                    if (pageLoader) {
                        pageLoader.classList.add('fade-out');
                    }
                    
                    // Remove loading state from body
                    body.classList.remove('page-loading');
                    body.classList.add('loaded');
                    
                    // Remove loader from DOM quickly
                    setTimeout(() => {
                        if (pageLoader) {
                            pageLoader.style.display = 'none';
                        }
                    }, 300);
                }, 150); // Very short delay
            }
        }, 80); // Fast update every 80ms
    }
    
    // Start loading simulation
    if (pageLoader) {
        simulateLoading();
    } else {
        // If no loader element, remove loading state immediately
        body.classList.remove('page-loading');
        body.classList.add('loaded');
    }

    // ===================================
    // INTERSECTION OBSERVER untuk scroll animation
    // ===================================
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

    // Contact card animation dengan stack effect
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        // Observer khusus untuk contact card
        const contactObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    // Optional: remove animasi saat keluar viewport
                    // entry.target.classList.remove('animate-in');
                }
            });
        }, contactObserverOptions);

        contactCard.classList.add('scroll-animate');
        contactObserver.observe(contactCard);
    }

    // Features cards tetap terlihat tanpa hilang saat scroll
    document.querySelectorAll('.feature-card, .features-header').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
        el.classList.add('visible');
    });

    // ===================================
    // HAMBURGER MENU FUNCTIONALITY
    // ===================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (mobileMenuToggle && mobileDropdown) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileDropdown.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileDropdown.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileDropdown.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileDropdown.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // NAVBAR FUNCTIONALITY
    // ===================================
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
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // TYPING ANIMATION
    // ===================================
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
                setTimeout(typeLine, 100);
            } else {
                lineIndex++;
                if (lineIndex < lines.length) {
                    displayed += '\n';
                    charIndex = 0;
                    setTimeout(typeLine, 300);
                }
            }
        }

        // Start typing after loader finishes
        setTimeout(typeLine, 1000);
    }

    // ===================================
    // FEATURE CARDS ANIMATION
    // ===================================
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

    // ===================================
    // PROJECT CARDS CLICK
    // ===================================
    document.querySelectorAll('.project-card[data-link]').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-link');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // ===================================
    // PROJECT IMAGE MODAL (Project 2 & 3)
    // ===================================
    const project2Card = document.querySelector('.project-card:nth-child(2)');
    const project3Card = document.querySelector('.project-card:nth-child(3)');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    if (imageModal && modalImage && closeModal) {
        // Function to open modal with project image
        function openProjectModal(projectCard) {
            const projectImage = projectCard.querySelector('img');
            if (projectImage) {
                modalImage.src = projectImage.src;
                modalImage.alt = projectImage.alt;
                imageModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            }
        }

        // Open modal when project 2 is clicked
        if (project2Card) {
            project2Card.addEventListener('click', () => {
                openProjectModal(project2Card);
            });
        }

        // Open modal when project 3 is clicked
        if (project3Card) {
            project3Card.addEventListener('click', () => {
                openProjectModal(project3Card);
            });
        }

        // Close modal when close button is clicked
        closeModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore body scroll
        });

        // Close modal when clicking outside the image
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore body scroll
            }
        });

        // Close modal when Escape key is pressed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.style.display === 'block') {
                imageModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore body scroll
            }
        });
    }

    // ===================================
    // SKILL CARDS INTERACTION
    // ===================================
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => {
                const isPaused = marqueeContent.style.animationPlayState === 'paused';
                marqueeContent.style.animationPlayState = isPaused ? 'running' : 'paused';
                
                document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));
                if (!isPaused) {
                    card.classList.add('active');
                }
            });
        });
    }

    // ===================================
    // HAMBURGER MENU FUNCTIONALITY
    // ===================================
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu && navLinks) {
        // Toggle mobile navigation
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile navigation when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile navigation when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile navigation on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // CERTIFICATES HERO ANIMATIONS
    // ===================================
    const certificatesHero = document.querySelector('.certificates-hero');
    const statItems = document.querySelectorAll('.stat-item');
    
    if (certificatesHero && statItems.length > 0) {
        // Animate stat numbers on scroll
        const animateNumbers = () => {
            statItems.forEach(item => {
                const number = item.querySelector('.stat-number');
                if (number) {
                    const finalText = number.textContent;
                    const finalNumber = parseInt(finalText.replace(/\D/g, ''));
                    const hasPlus = finalText.includes('+');
                    
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(timer);
                        }
                        number.textContent = Math.floor(currentNumber) + (hasPlus ? '+' : '');
                    }, 30);
                }
            });
        };
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(certificatesHero);
        
        // Add hover effects for stat items
        statItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
});
