// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation de la navbar au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animation des statistiques au scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer les éléments de statistiques
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Animation des cartes de services
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Animation des cartes de pricing
document.querySelectorAll('.pricing-card').forEach(card => {
    observer.observe(card);
});

// Animation des cartes de blog
document.querySelectorAll('.blog-card').forEach(card => {
    observer.observe(card);
});

// Animation des compteurs de statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('M') ? 'M+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('M') ? 'M+' : '');
        }
    }, 16);
}

// Observer pour déclencher l'animation des compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseFloat(text.replace(/[^0-9.]/g, ''));
            
            if (number && !target.classList.contains('animated')) {
                target.classList.add('animated');
                animateCounter(target, number);
            }
        }
    });
}, { threshold: 0.5 });

// Observer les compteurs
document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Effet de parallaxe pour la section hero
/* window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}); */

// Animation des cartes au hover
document.querySelectorAll('.service-card, .pricing-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation de la notification popup
const notificationPopup = document.querySelector('.notification-popup');
if (notificationPopup) {
    // Ajouter une animation d'entrée
    notificationPopup.style.opacity = '0';
    notificationPopup.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        notificationPopup.style.transition = 'all 0.6s ease-out';
        notificationPopup.style.opacity = '1';
        notificationPopup.style.transform = 'translateY(0)';
    }, 1000);
}

// Gestion des boutons CTA
document.querySelectorAll('.btn-primary, .btn-get-started, .btn-pricing').forEach(button => {
    button.addEventListener('click', function(e) {
        // Effet de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulation d'action (remplacez par votre logique)
        showNotification('Action en cours...', 'info');
    });
});

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification avec nouvelle palette
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#4ECDC4' // Vert menthe pour les notifications info
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Ajouter les styles pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Ajouter l'animation de sortie
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// Animation des éléments au scroll avec stagger
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

// Appliquer l'animation stagger aux éléments
document.querySelectorAll('.service-card, .pricing-card, .blog-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    staggerObserver.observe(el);
});

// Effet de parallaxe pour les images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image img, .about-image img');
    
    parallaxElements.forEach(element => {
        const rate = scrolled * -0.3;
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Animation du badge "MOST POPULAR"
const featuredCard = document.querySelector('.pricing-card.featured');
if (featuredCard) {
    const badge = featuredCard.querySelector('.pricing-badge');
    if (badge) {
        badge.style.animation = 'pulse 2s infinite';
        
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.05); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }
}

// Lazy loading pour les images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Préchargement des polices pour une meilleure performance
document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
});

// Ajout d'une classe pour les animations CSS
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Animation d'entrée pour le hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Gestion des erreurs de chargement d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x300/4ECDC4/2a2a2a?text=TANNI';
    });
});

// Effet de hover pour les boutons avec gradient
document.querySelectorAll('.btn-primary, .btn-get-started').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #4ECDC4, #3db8b0)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
});

// Animation des icônes au hover
document.querySelectorAll('.service-icon i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

console.log('🚀 Starship - Site web avec nouvelle palette chargé avec succès !');

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = contactForm.querySelector('input[placeholder="Prénom"]').value;
            const lastName = contactForm.querySelector('input[placeholder="Nom"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const service = contactForm.querySelector('select').value;
            const project = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!firstName || !lastName || !email) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Formulaire envoyé ! Nous vous recontacterons dans les 24h.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
