// Utilitaires communs
const initializeGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);
};

// Fonctionnalités du menu responsive
const initializeMenu = () => {
    const menu = document.querySelector('.menu');
    const menu_toggle = document.querySelector('.menu_toggle');

    menu_toggle.onclick = function(){
        menu_toggle.classList.toggle('active');
        menu.classList.toggle('responsive');
    }
};

// Animations de la page d'accueil
const initializeHome = () => {
    const TL = gsap.timeline();
    const header = document.querySelector('header');
    const title_spans = document.querySelectorAll('.left h1 span');
    const p = document.querySelector('.left p');
    const hero_content = document.querySelector('.hero-content');
    const img = document.querySelector('.image_bird');

    if (title_spans.length > 0) {  // Vérifier si nous sommes sur la page d'accueil
        gsap.set(title_spans, { opacity: 1 });

        TL.from(header, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
        .from(img, {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
        .from(title_spans, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5")
        .from(p, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .from(hero_content, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

        // Initialisation du système de filtrage
        initializeFiltering();
        
        // Animation des éléments flottants
        initializeFloatingElements();
    }
};

// Système de filtrage pour la page d'accueil
const initializeFiltering = () => {
    const releaseCards = document.querySelectorAll('.anime-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length > 0) {  // Vérifier si nous sommes sur la page avec les filtres
        gsap.set(releaseCards, {
            opacity: 1,
            y: 0,
            clearProps: "transform"
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                releaseCards.forEach(card => {
                    const shouldShow = filter === 'all' || card.dataset.category.includes(filter);
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        gsap.to(card, {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.inOut"
                        });
                    } else {
                        gsap.to(card, {
                            opacity: 0,
                            y: 20,
                            duration: 0.4,
                            ease: "power2.inOut",
                            onComplete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });

        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
            allButton.click();
        }
    }
};

// Animations des éléments flottants
const initializeFloatingElements = () => {
    const floatingElements = document.querySelectorAll('.float-item');
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        gsap.to(element, {
            y: -30 * speed,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
        });
    });
};

// Animations de la page de présentation
const initializePresentation = () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const title = document.querySelector('.title-animated');

    if (title) {  // Vérifier si nous sommes sur la page de présentation
        gsap.from(title, {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        });

        gsap.from(gridItems, {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        gridItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('img'), {
                    duration: 0.3,
                    scale: 1.05,
                    ease: "power2.out"
                });
                gsap.to(item.querySelector('h2'), {
                    duration: 0.3,
                    color: "#fff",
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('img'), {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
                gsap.to(item.querySelector('h2'), {
                    duration: 0.3,
                    color: "#45d0e4",
                    ease: "power2.out"
                });
            });
        });
    }
};

// Animations de la page de contact
const initializeContact = () => {
    const form = document.getElementById('contactForm');
    
    if (form) {  // Vérifier si nous sommes sur la page de contact
        const submitBtn = form.querySelector('.submit-btn');
        const successAnimation = submitBtn.querySelector('.success-animation');
        const submitText = submitBtn.querySelector('span');

        gsap.from('.contact-title', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        });

        gsap.from('.contact-subtitle', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: "power3.out",
            delay: 0.3
        });

        gsap.from('.info-card', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        });

        gsap.from('.contact-form', {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: "power3.out",
            delay: 0.8
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitText.style.opacity = '0';
            successAnimation.style.display = 'block';

            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                form.reset();
                
                gsap.to(submitBtn, {
                    duration: 0.3,
                    backgroundColor: '#4CAF50',
                    onComplete: () => {
                        setTimeout(() => {
                            successAnimation.style.display = 'none';
                            submitText.style.opacity = '1';
                            gsap.to(submitBtn, {
                                duration: 0.3,
                                backgroundColor: '#45d0e4'
                            });
                        }, 2000);
                    }
                });
            } catch (error) {
                console.error('Erreur lors de l\'envoi du formulaire:', error);
                submitText.style.opacity = '1';
                successAnimation.style.display = 'none';
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });

        // Animation des labels du formulaire
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            input.addEventListener('focus', () => {
                gsap.to(label, {
                    duration: 0.3,
                    y: -20,
                    scale: 0.8,
                    color: '#45d0e4',
                    ease: "power2.out"
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(label, {
                        duration: 0.3,
                        y: 0,
                        scale: 1,
                        color: '#666',
                        ease: "power2.out"
                    });
                }
            });

            if (input.value) {
                gsap.set(label, {
                    y: -20,
                    scale: 0.8,
                    color: '#45d0e4'
                });
            }
        });
    }
};

// Animation des éléments au scroll
const initializeScrollAnimations = () => {
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.category-item, .grid-item');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
};

// Gestion du bouton retour en haut
const initializeScrollToTop = () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Afficher/masquer le bouton en fonction du défilement
    const toggleScrollButton = () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };

    // Animation de défilement fluide vers le haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Écouteurs d'événements
    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
};

// Gestion du défilement fluide
const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Si nous sommes sur la page d'accueil
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialisation générale
document.addEventListener('DOMContentLoaded', () => {
    initializeGSAP();
    initializeMenu();
    initializeHome();
    initializePresentation();
    initializeContact();
    initializeScrollAnimations();
    initializeScrollToTop();
    initializeSmoothScroll();
}); 