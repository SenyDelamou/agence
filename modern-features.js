// ============================================
// FONCTIONNALITÉS MODERNES - VOYAGE ÉLÉGANCE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1️⃣ SCROLL ANIMATIONS - Animer les éléments en entrant dans la vue
    // ================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
    
    
    // 2️⃣ SEARCH BAR INTERACTIVE - Barre de recherche dynamique
    // ========================================================
    
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        const searchResults = document.getElementById('searchResults');
        
        // Destinations exemple
        const destinations = [
            { name: 'Îles de Los', country: 'Guinée', icon: '🏝️' },
            { name: 'Mont Nimba', country: 'Guinée', icon: '⛰️' },
            { name: 'Kindia', country: 'Guinée', icon: '🌴' },
            { name: 'Paris', country: 'France', icon: '🗼' },
            { name: 'Tokyo', country: 'Japon', icon: '🗾' },
            { name: 'New York', country: 'USA', icon: '🗽' },
            { name: 'Dubai', country: 'Émirats', icon: '🏙️' },
            { name: 'Maldives', country: 'Maldives', icon: '🏖️' }
        ];
        
        searchBar.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }
            
            const filtered = destinations.filter(dest => 
                dest.name.toLowerCase().includes(query) || 
                dest.country.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(dest => `
                    <div class="search-result-item">
                        <span class="dest-icon">${dest.icon}</span>
                        <div>
                            <div class="dest-name">${dest.name}</div>
                            <div class="dest-country">${dest.country}</div>
                        </div>
                        <span class="arrow-icon">→</span>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="no-results">Aucune destination trouvée 🔍</div>';
                searchResults.style.display = 'block';
            }
        });
        
        // Fermer la recherche en cliquant dehors
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
        
        // Gérer les clics sur les résultats
        searchResults.addEventListener('click', function(e) {
            const item = e.target.closest('.search-result-item');
            if (item) {
                const destName = item.querySelector('.dest-name').textContent;
                searchBar.value = destName;
                searchResults.style.display = 'none';
                // Animation de feedback
                item.style.background = 'rgba(102, 126, 234, 0.1)';
            }
        });
    }
    
    
    // 3️⃣ FILTRES DE DESTINATIONS - Filtrage dynamique
    // ==============================================
    
    const filterButtons = document.querySelectorAll('[data-filter]');
    const destinationCards = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Activer/désactiver le bouton
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            this.classList.add('filter-active');
            
            // Filtrer les cartes
            destinationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.transition = 'all 0.3s ease-out';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    }, 150);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    
    // 4️⃣ LOADING ANIMATIONS - Skeletons et spinners
    // ============================================
    
    function showLoader() {
        const loader = document.createElement('div');
        loader.className = 'modern-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p>Chargement...</p>
        `;
        return loader;
    }
    
    // Simuler un chargement sur les boutons
    const actionButtons = document.querySelectorAll('[data-load-action]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            const originalHTML = this.innerHTML;
            
            this.innerHTML = '<span class="button-loader"></span> Traitement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
                
                // Animation de succès
                this.classList.add('success-pulse');
                setTimeout(() => this.classList.remove('success-pulse'), 1000);
            }, 2000);
        });
    });
    
    
    // 5️⃣ MODAL REVIEW SYSTEM - Système d'avis avec modal
    // =================================================
    
    const reviewBtn = document.getElementById('reviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeModal = document.querySelector('.modal-close');
    const submitReview = document.getElementById('submitReview');
    const ratingStars = document.querySelectorAll('.rating-star');
    
    let selectedRating = 0;
    
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            reviewModal.style.display = 'flex';
            reviewModal.style.animation = 'modalSlideIn 0.3s ease-out';
            selectedRating = 0;
            document.getElementById('reviewForm').reset();
            document.querySelectorAll('.rating-star').forEach(star => {
                star.classList.remove('active');
            });
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            reviewModal.style.animation = 'modalSlideOut 0.3s ease-out';
            setTimeout(() => {
                reviewModal.style.display = 'none';
            }, 300);
        });
    }
    
    // Gestion des étoiles de rating
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-rating');
            ratingStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = this.getAttribute('data-rating');
            ratingStars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
    });
    
    document.querySelector('.review-rating').addEventListener('mouseleave', function() {
        ratingStars.forEach(star => star.classList.remove('hover'));
    });
    
    // Soumettre l'avis
    if (submitReview) {
        submitReview.addEventListener('click', function() {
            const name = document.getElementById('reviewName').value;
            const comment = document.getElementById('reviewComment').value;
            
            if (!name || !comment || selectedRating === 0) {
                alert('⚠️ Veuillez remplir tous les champs et choisir une note!');
                return;
            }
            
            // Animation de succès
            const form = document.getElementById('reviewForm');
            form.style.opacity = '0';
            form.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                const success = document.createElement('div');
                success.className = 'review-success';
                success.innerHTML = `
                    <div class="success-icon">✅</div>
                    <h3>Merci pour votre avis!</h3>
                    <p>Votre avis a été enregistré avec succès.</p>
                `;
                form.parentElement.replaceChild(success, form);
                
                setTimeout(() => {
                    reviewModal.style.animation = 'modalSlideOut 0.3s ease-out';
                    setTimeout(() => {
                        reviewModal.style.display = 'none';
                    }, 300);
                }, 2000);
            }, 300);
        });
    }
    
    // Fermer modal en cliquant dehors
    if (reviewModal) {
        reviewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.animation = 'modalSlideOut 0.3s ease-out';
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
            }
        });
    }
    
    
    // 6️⃣ BONUS: Counter Animation - Animation des chiffres
    // ===================================================
    
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length > 0) {
        statsObserver.observe(stats[0].closest('.stats'));
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('k') ? 'k+' : '');
                clearInterval(timer);
            } else {
                const display = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('k') ? 'k' : '');
                element.textContent = display;
            }
        }, 20);
    }
    
    
    // 7️⃣ PARALLAX EFFECT - Effet parallaxe au scroll
    // ============================================
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = window.pageYOffset * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    
    // 8️⃣ SMOOTH PAGE TRANSITIONS - Transitions fluides entre pages
    // ==========================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            target.style.transition = 'all 0.6s ease-out';
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                }
            }
        });
    });
    
});


// HELPER FUNCTIONS
// ================

/**
 * Débounce function - Limite la fréquence d'exécution
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Afficher une notification toast
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Vérifier si un élément est visible
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
