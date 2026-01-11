// ============================================
// FONCTIONNALITÉS MODERNES - VOYAGE ÉLÉGANCE
// ============================================

// ============================================
// SYSTÈME DE FAVORIS
// ============================================
class FavoritesManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    
    add(id) {
        if (!this.favorites.includes(id)) {
            this.favorites.push(id);
            this.save();
            return true;
        }
        return false;
    }
    
    remove(id) {
        this.favorites = this.favorites.filter(fav => fav !== id);
        this.save();
    }
    
    toggle(id) {
        if (this.favorites.includes(id)) {
            this.remove(id);
            return false;
        } else {
            this.add(id);
            return true;
        }
    }
    
    has(id) {
        return this.favorites.includes(id);
    }
    
    save() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}

const favoritesManager = new FavoritesManager();

// ============================================
// SYSTÈME DE NOTIFICATIONS
// ============================================
class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;
        
        this.container.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Fermeture automatique
        const timeout = setTimeout(() => this.close(notification), duration);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(timeout);
            this.close(notification);
        });
        
        return notification;
    }
    
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }
    
    close(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

const notificationManager = new NotificationManager();

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
            { id: 'iles-loos', name: 'Îles de Los', country: 'Guinée', icon: '🏝️', price: '750 000' },
            { id: 'fouta-djallon', name: 'Fouta Djallon', country: 'Guinée', icon: '⛰️', price: '500 000' },
            { id: 'kakoulima', name: 'Kakoulima', country: 'Guinée', icon: '🌴', price: '400 000' },
            { id: 'paris', name: 'Paris', country: 'France', icon: '🗼', price: '8 000 000' },
            { id: 'tokyo', name: 'Tokyo', country: 'Japon', icon: '🗾', price: '12 000 000' },
            { id: 'newyork', name: 'New York', country: 'USA', icon: '🗽', price: '10 000 000' },
            { id: 'dubai', name: 'Dubai', country: 'Émirats', icon: '🏙️', price: '5 000 000' },
            { id: 'maldives', name: 'Maldives', country: 'Maldives', icon: '🏖️', price: '9 000 000' }
        ];
        
        const debouncedSearch = debounce(function(e) {
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
                    <div class="search-result-item" data-id="${dest.id}">
                        <span class="dest-icon">${dest.icon}</span>
                        <div class="result-info">
                            <div class="dest-name">${dest.name}</div>
                            <div class="dest-country">${dest.country} • À partir de ${dest.price} GNF</div>
                        </div>
                        <button class="favorite-btn-mini" data-id="${dest.id}">
                            ${favoritesManager.has(dest.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
                
                // Ajouter les événements aux favoris
                searchResults.querySelectorAll('.favorite-btn-mini').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const id = btn.dataset.id;
                        const isFavorite = favoritesManager.toggle(id);
                        btn.textContent = isFavorite ? '❤️' : '🤍';
                        notificationManager.show(
                            isFavorite ? 'Ajouté aux favoris ❤️' : 'Retiré des favoris',
                            'success', 2000
                        );
                    });
                });
            } else {
                searchResults.innerHTML = '<div class="no-results">Aucune destination trouvée 🔍</div>';
                searchResults.style.display = 'block';
            }
        }, 300);
        
        searchBar.addEventListener('input', debouncedSearch);
        
        // Fermer la recherche en cliquant dehors
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
        
        // Gérer les clics sur les résultats
        searchResults.addEventListener('click', function(e) {
            const item = e.target.closest('.search-result-item');
            if (item && !e.target.closest('.favorite-btn-mini')) {
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
            destinationCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(20px)';
                card.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.pointerEvents = 'auto';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }, index * 50); // Stagger animation
            });
            
            notificationManager.show('Filtrage appliqué ✨', 'success', 1500);
        });
    });
    
    // Ajouter des événements pour les boutons de favoris
    const addWishlistFunctionality = () => {
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        wishlistButtons.forEach(btn => {
            const cardId = btn.closest('[data-category]')?.getAttribute('data-id') || 
                          btn.closest('[data-category]')?.querySelector('h3')?.textContent || 
                          'destination';
            
            if (favoritesManager.has(cardId)) {
                btn.classList.add('active');
                btn.textContent = '❤️';
            }
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isFavorite = favoritesManager.toggle(cardId);
                btn.classList.toggle('active', isFavorite);
                btn.textContent = isFavorite ? '❤️' : '🤍';
                btn.style.animation = 'none';
                setTimeout(() => {
                    btn.style.animation = 'heart-beat 0.6s ease';
                }, 10);
                notificationManager.show(
                    isFavorite ? 'Ajouté aux favoris ❤️' : 'Retiré des favoris 💔',
                    'success',
                    2000
                );
            });
        });
    };
    
    // Ajouter les styles pour l'animation du cœur
    if (!document.getElementById('heart-beat-style')) {
        const style = document.createElement('style');
        style.id = 'heart-beat-style';
        style.textContent = `
            @keyframes heart-beat {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.3); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    addWishlistFunctionality();
    
    // Observer pour ajouter les boutons wishlist quand les cartes sont chargées
    const cardObserver = new MutationObserver(() => {
        addWishlistFunctionality();
    });
    
    const destinationSection = document.querySelector('[id="destinations"]');
    if (destinationSection) {
        cardObserver.observe(destinationSection, { childList: true, subtree: true });
    };
    
    
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
    
    
    // � DESTINATION DETAILS MODAL - Modal des détails de voyage
    // ======================================================
    
    class DestinationModal {
        constructor() {
            this.modal = this.createModal();
            this.reviews = this.loadReviews();
        }
        
        createModal() {
            const modal = document.createElement('div');
            modal.id = 'destinationModal';
            modal.className = 'destination-modal-overlay';
            modal.innerHTML = `
                <div class="destination-modal-content">
                    <button class="modal-close-btn">×</button>
                    <div class="destination-modal-header">
                        <div class="destination-modal-image"></div>
                        <div class="destination-modal-header-info">
                            <h2 class="destination-modal-title"></h2>
                            <div class="destination-modal-rating">
                                <span class="modal-stars"></span>
                                <span class="modal-rating-count">(0 avis)</span>
                            </div>
                            <p class="destination-modal-price"></p>
                        </div>
                    </div>
                    
                    <div class="destination-modal-body">
                        <!-- Onglets -->
                        <div class="modal-tabs">
                            <button class="modal-tab active" data-tab="details">📋 Détails</button>
                            <button class="modal-tab" data-tab="reviews">⭐ Avis (0)</button>
                            <button class="modal-tab" data-tab="leave-review">✍️ Laisser un avis</button>
                        </div>
                        
                        <!-- Contenu Détails -->
                        <div class="modal-tab-content active" id="tab-details">
                            <h3>Description</h3>
                            <p class="destination-description"></p>
                            
                            <h3>Caractéristiques</h3>
                            <div class="destination-features"></div>
                            
                            <h3>Activités Disponibles</h3>
                            <div class="destination-activities"></div>
                        </div>
                        
                        <!-- Contenu Avis -->
                        <div class="modal-tab-content" id="tab-reviews">
                            <div class="reviews-list"></div>
                        </div>
                        
                        <!-- Formulaire Avis -->
                        <div class="modal-tab-content" id="tab-leave-review">
                            <form class="review-form-inline">
                                <div class="form-group">
                                    <label>Votre nom *</label>
                                    <input type="text" class="review-name-input" placeholder="Votre nom" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Note *</label>
                                    <div class="review-rating-stars">
                                        <button type="button" class="star-btn" data-rating="1">⭐</button>
                                        <button type="button" class="star-btn" data-rating="2">⭐</button>
                                        <button type="button" class="star-btn" data-rating="3">⭐</button>
                                        <button type="button" class="star-btn" data-rating="4">⭐</button>
                                        <button type="button" class="star-btn" data-rating="5">⭐</button>
                                    </div>
                                    <div class="rating-display">Note: <span class="rating-value">0</span>/5</div>
                                </div>
                                
                                <div class="form-group">
                                    <label>Votre avis *</label>
                                    <textarea class="review-comment-input" placeholder="Partagez votre expérience..." rows="5" required></textarea>
                                </div>
                                
                                <button type="submit" class="btn btn-primary review-submit-btn">
                                    Soumettre l'avis
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            this.setupEventListeners();
            return modal;
        }
        
        setupEventListeners() {
            // Fermer le modal
            this.modal.querySelector('.modal-close-btn').addEventListener('click', () => this.close());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
            
            // Onglets
            this.modal.querySelectorAll('.modal-tab').forEach(tab => {
                tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
            });
            
            // Étoiles de notation
            let selectedRating = 0;
            this.modal.querySelectorAll('.star-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    selectedRating = parseInt(btn.dataset.rating);
                    this.updateStarDisplay(selectedRating);
                    this.modal.querySelector('.rating-value').textContent = selectedRating;
                });
                
                btn.addEventListener('mouseover', () => {
                    const hoverRating = parseInt(btn.dataset.rating);
                    this.modal.querySelectorAll('.star-btn').forEach((b, i) => {
                        if (i < hoverRating) {
                            b.style.transform = 'scale(1.2)';
                        } else {
                            b.style.transform = 'scale(1)';
                        }
                    });
                });
            });
            
            this.modal.querySelector('.review-rating-stars').addEventListener('mouseleave', () => {
                this.updateStarDisplay(selectedRating);
            });
            
            // Soumettre l'avis
            this.modal.querySelector('.review-form-inline').addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview(selectedRating);
            });
        }
        
        switchTab(tabName) {
            // Désactiver tous les onglets
            this.modal.querySelectorAll('.modal-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            this.modal.querySelectorAll('.modal-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activer l'onglet sélectionné
            this.modal.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
            this.modal.querySelector(`#tab-${tabName}`).classList.add('active');
        }
        
        updateStarDisplay(rating) {
            this.modal.querySelectorAll('.star-btn').forEach((btn, i) => {
                if (i < rating) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
                btn.style.transform = 'scale(1)';
            });
        }
        
        submitReview(rating) {
            const name = this.modal.querySelector('.review-name-input').value;
            const comment = this.modal.querySelector('.review-comment-input').value;
            
            if (!name || !comment || rating === 0) {
                notificationManager.show('Veuillez remplir tous les champs! ⚠️', 'warning');
                return;
            }
            
            const review = {
                id: Date.now(),
                name,
                rating,
                comment,
                date: new Date().toLocaleDateString('fr-FR'),
                destinationId: this.currentDestinationId
            };
            
            this.reviews.push(review);
            this.saveReviews();
            
            // Réinitialiser le formulaire
            this.modal.querySelector('.review-form-inline').reset();
            this.modal.querySelector('.rating-value').textContent = '0';
            this.updateStarDisplay(0);
            
            notificationManager.show('Avis enregistré avec succès! ✅', 'success');
            
            // Afficher l'avis immédiatement
            setTimeout(() => {
                this.switchTab('reviews');
                this.displayReviews();
            }, 500);
        }
        
        displayReviews() {
            const reviewsList = this.modal.querySelector('.reviews-list');
            const destinationReviews = this.reviews.filter(r => r.destinationId === this.currentDestinationId);
            
            if (destinationReviews.length === 0) {
                reviewsList.innerHTML = `
                    <div class="no-reviews">
                        <p>Aucun avis pour le moment. Soyez le premier! ⭐</p>
                    </div>
                `;
                return;
            }
            
            const avgRating = (destinationReviews.reduce((sum, r) => sum + r.rating, 0) / destinationReviews.length).toFixed(1);
            
            reviewsList.innerHTML = `
                <div class="reviews-summary">
                    <div class="average-rating">
                        <span class="big-rating">${avgRating}</span>
                        <span class="stars-display">${'⭐'.repeat(Math.round(avgRating))}</span>
                        <p>${destinationReviews.length} avis</p>
                    </div>
                </div>
                <div class="individual-reviews">
                    ${destinationReviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <strong>${review.name}</strong>
                                <span class="review-date">${review.date}</span>
                            </div>
                            <div class="review-rating">
                                ${'⭐'.repeat(review.rating)}
                            </div>
                            <p class="review-text">${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        loadReviews() {
            const stored = localStorage.getItem('destinationReviews');
            return stored ? JSON.parse(stored) : [];
        }
        
        saveReviews() {
            localStorage.setItem('destinationReviews', JSON.stringify(this.reviews));
        }
        
        open(destinationData) {
            this.currentDestinationId = destinationData.id;
            const avgRating = this.getAverageRating(destinationData.id);
            const reviewCount = this.reviews.filter(r => r.destinationId === destinationData.id).length;
            
            // Remplir les informations
            this.modal.querySelector('.destination-modal-image').style.backgroundImage = 
                `url('${destinationData.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop'}')`;
            this.modal.querySelector('.destination-modal-title').textContent = destinationData.name;
            this.modal.querySelector('.modal-rating-count').textContent = `(${reviewCount} avis)`;
            this.modal.querySelector('.modal-stars').textContent = '⭐'.repeat(Math.round(avgRating));
            this.modal.querySelector('.destination-modal-price').textContent = destinationData.price;
            this.modal.querySelector('.destination-description').textContent = destinationData.description;
            
            // Caractéristiques
            const featuresHtml = (destinationData.features || []).map(f => 
                `<div class="feature-tag">${f}</div>`
            ).join('');
            this.modal.querySelector('.destination-features').innerHTML = featuresHtml || '<p>Non disponible</p>';
            
            // Activités
            const activitiesHtml = (destinationData.activities || []).map(a => 
                `<li class="activity-item">🎯 ${a}</li>`
            ).join('');
            this.modal.querySelector('.destination-activities').innerHTML = 
                `<ul class="activities-list">${activitiesHtml || '<li>Non disponible</li>'}</ul>`;
            
            // Afficher avis
            this.displayReviews();
            
            // Ouvrir le modal
            this.modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        close() {
            this.modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
        
        getAverageRating(destinationId) {
            const reviews = this.reviews.filter(r => r.destinationId === destinationId);
            if (reviews.length === 0) return 0;
            return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        }
    }
    
    // Initialiser le modal
    const destinationModal = new DestinationModal();
    
    // Données des destinations (exemple - à adapter avec vos vraies données)
    const destinationsData = {
        'fouta-djallon': {
            id: 'fouta-djallon',
            name: 'Fouta Djallon, Guinée',
            price: 'À partir de 500 000 GNF',
            image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop',
            description: 'Découvrez les magnifiques paysages montagneux du Fouta Djallon avec ses cascades spectaculaires, ses vallées verdoyantes et la riche culture peule. Une destination idéale pour les amateurs de nature et de trekking.',
            features: ['🏔️ Montagnes', '💧 Cascades', '🌲 Nature', '👥 Culture Peule'],
            activities: ['Randonnée en montagne', 'Visite de cascades', 'Rencontre avec communautés locales', 'Photographie nature', 'Picnic panoramique']
        },
        'iles-loos': {
            id: 'iles-loos',
            name: 'Îles de Loos, Guinée',
            price: 'À partir de 750 000 GNF',
            image: 'https://images.unsplash.com/photo-1544735745-b89b78a99463?q=80&w=800&auto=format&fit=crop',
            description: 'Paradis tropical guinéen avec ses plages de sable blanc et eaux turquoise. Les Îles de Loos offrent une expérience balnéaire inoubliable avec snorkeling et découverte marine.',
            features: ['🏖️ Plages', '🌊 Eau turquoise', '🐠 Snorkeling', '☀️ Tropical'],
            activities: ['Plage et détente', 'Snorkeling', 'Plongée', 'Bateau', 'Coucher de soleil']
        },
        'kakoulima': {
            id: 'kakoulima',
            name: 'Kakoulima, Guinée',
            price: 'À partir de 400 000 GNF',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
            description: 'Montagne sacrée offrant une vue panoramique sur Conakry. Randonnée accessible avec points de vue spectaculaires et connexion à la nature.',
            features: ['⛰️ Montagne', '🎯 Panorama', '🙏 Sacré', '📸 Photo'],
            activities: ['Randonnée facile', 'Observation panoramique', 'Picnic au sommet', 'Photographie', 'Exploration nature']
        }
    };
    
    // Ajouter événements click sur les cartes destinations
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Ne pas ouvrir si on clique sur un bouton
            if (e.target.closest('.btn') || e.target.closest('.wishlist-btn')) {
                return;
            }
            
            const cardTitle = card.querySelector('h3')?.textContent || '';
            const cardPrice = card.querySelector('.destination-price')?.textContent || '';
            const cardImage = card.querySelector('.destination-image')?.style.backgroundImage || '';
            
            // Chercher les données correspondantes
            let destinationData = null;
            for (const [key, data] of Object.entries(destinationsData)) {
                if (data.name.includes(cardTitle.split(',')[0])) {
                    destinationData = data;
                    break;
                }
            }
            
            if (!destinationData) {
                // Créer un objet par défaut
                destinationData = {
                    id: 'destination-' + Date.now(),
                    name: cardTitle,
                    price: cardPrice,
                    image: cardImage.replace(/url\(['"]?(.+?)['"]?\)/g, '$1'),
                    description: card.querySelector('.destination-info p')?.textContent || 'Destination magnifique à découvrir.',
                    features: ['🌍 Unique', '✈️ À découvrir'],
                    activities: ['Exploration', 'Détente', 'Découverte']
                };
            }
            
            destinationModal.open(destinationData);
        });
        
        // Ajouter un curseur pointer
        card.style.cursor = 'pointer';
    });
    
    // Observer les nouvelles cartes ajoutées dynamiquement
    const cardObserverForModal = new MutationObserver(() => {
        document.querySelectorAll('.destination-card').forEach(card => {
            if (!card.hasEventListener) {
                card.hasEventListener = true;
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn') || e.target.closest('.wishlist-btn')) {
                        return;
                    }
                    
                    const cardTitle = card.querySelector('h3')?.textContent || '';
                    const cardPrice = card.querySelector('.destination-price')?.textContent || '';
                    
                    let destinationData = null;
                    for (const [key, data] of Object.entries(destinationsData)) {
                        if (data.name.includes(cardTitle.split(',')[0])) {
                            destinationData = data;
                            break;
                        }
                    }
                    
                    if (!destinationData) {
                        destinationData = {
                            id: 'destination-' + Date.now(),
                            name: cardTitle,
                            price: cardPrice,
                            description: card.querySelector('.destination-info p')?.textContent || 'Destination magnifique.',
                            features: ['🌍 Unique'],
                            activities: ['Exploration']
                        };
                    }
                    
                    destinationModal.open(destinationData);
                });
                card.style.cursor = 'pointer';
            }
        });
    });
    
    const destinationsSection = document.querySelector('#destinations');
    if (destinationsSection) {
        cardObserverForModal.observe(destinationsSection, { childList: true, subtree: true });
    }

    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = window.pageYOffset * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    
    // 🎪 HOVER CARD EFFECTS - Effets 3D sur les cartes
    // ================================================
    
    const hoverCards = document.querySelectorAll('.card-modern, .destination-card, .service-card, .testimonial-card');
    
    hoverCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculer l'angle de rotation basé sur la position de la souris
            const rotateY = ((x - rect.width / 2) / rect.width) * 8;
            const rotateX = ((y - rect.height / 2) / rect.height) * -8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    
    // ⌨️ KEYBOARD NAVIGATION - Navigation au clavier
    // ==============================================
    
    document.addEventListener('keydown', (e) => {
        // Touche Échap pour fermer les modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal-backdrop.open, [role="dialog"]:not([style*="display: none"])');
            openModals.forEach(modal => {
                if (modal.classList) {
                    modal.classList.remove('open');
                } else if (modal.style) {
                    modal.style.display = 'none';
                }
            });
            
            // Fermer aussi le chat bubble
            const chatBubble = document.getElementById('chatBubble') || document.querySelector('.chat-bubble');
            if (chatBubble && chatBubble.classList.contains('open')) {
                chatBubble.classList.remove('open');
            }
        }
        
        // Touche / pour focus sur la recherche
        if (e.key === '/' && e.ctrlKey === false && e.metaKey === false) {
            const searchInput = document.getElementById('searchBar');
            if (searchInput && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
                notificationManager.show('Focus sur la recherche 🔍', 'info', 1500);
            }
        }
    });
    
    
    // 📊 DYNAMIC ANIMATIONS - Animations dynamiques basées sur le scroll
    // ===============================================================
    
    const createDynamicAnimation = () => {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPos = window.pageYOffset;
                    
                    // Anime les éléments basés sur leur position
                    document.querySelectorAll('[data-animate]').forEach(el => {
                        const rect = el.getBoundingClientRect();
                        const elementMiddle = rect.top + rect.height / 2;
                        const windowMiddle = window.innerHeight / 2;
                        const distance = Math.abs(elementMiddle - windowMiddle);
                        
                        // Change la vitesse d'animation basée sur la distance
                        const speed = Math.max(0.3, 1 - (distance / window.innerHeight));
                        el.style.opacity = Math.min(1, speed);
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    };
    
    createDynamicAnimation();
    
    
    // 🎨 COLOR THEME MANAGER - Gestionnaire de thème couleur
    // ======================================================
    
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.initTheme();
        }
        
        initTheme() {
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggle());
                this.updateThemeIcon();
            }
        }
        
        toggle() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme();
        }
        
        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
            this.updateThemeIcon();
            notificationManager.show(
                `Mode ${this.currentTheme === 'dark' ? 'sombre' : 'clair'} activé 🌓`,
                'info',
                1500
            );
        }
        
        updateThemeIcon() {
            const themeIcon = document.getElementById('themeIcon');
            if (themeIcon) {
                themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
            }
        }
    }
    
    const themeManager = new ThemeManager();
    
    
    // 📱 SMOOTH SCROLL BEHAVIOR - Comportement de scroll fluide
    // ========================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Highlight l'élément cible
                    target.style.animation = 'highlight 2s ease-out';
                    setTimeout(() => {
                        target.style.animation = '';
                    }, 2000);
                }
            }
        });
    });
    
    // Ajouter l'animation highlight si elle n'existe pas
    if (!document.getElementById('highlight-style')) {
        const style = document.createElement('style');
        style.id = 'highlight-style';
        style.textContent = `
            @keyframes highlight {
                0% {
                    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
                    background-color: rgba(102, 126, 234, 0.1);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
                    background-color: transparent;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // 🔄 PAGE VISIBILITY - Détecteur de visibilité de page
    // ==================================================
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page cachée
            document.title = '👋 À bientôt | Voyage Élégance';
        } else {
            // Page visible
            document.title = '✈️ Voyage Élégance - Agence de Voyages en Guinée';
        }
    });
    
    
    // 📍 GEOLOCATION HELPER - Localisation utilisateur
    // ================================================
    
    class LocationHelper {
        static getLocation() {
            if (navigator.geolocation) {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                accuracy: position.coords.accuracy
                            });
                        },
                        (error) => {
                            console.log('Localisation non disponible:', error);
                            reject(error);
                        }
                    );
                });
            }
        }
    }
    
    window.LocationHelper = LocationHelper;
    
    
    // 📸 IMAGE LAZY LOADING - Chargement lazy des images
    // ==================================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.style.opacity = '0';
                        img.onload = () => {
                            img.style.transition = 'opacity 0.4s ease-out';
                            img.style.opacity = '1';
                        };
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    
    // 🎯 ANALYTICS EVENT TRACKING - Suivi analytique
    // =============================================
    
    class Analytics {
        static track(event, properties = {}) {
            const trackingData = {
                event,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                ...properties
            };
            
            console.log('📊 Analytics:', trackingData);
            
            // Envoyer à un serveur d'analytics si disponible
            // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(trackingData) });
        }
    }
    
    window.Analytics = Analytics;
    
    // Tracker les clics sur les boutons de réservation
    document.querySelectorAll('.reserve-btn, [data-load-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            Analytics.track('reservation_clicked', {
                text: btn.textContent,
                element: btn.className
            });
        });
    });
    
    // Tracker les filtres
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            Analytics.track('filter_applied', {
                filter: btn.getAttribute('data-filter')
            });
        });
    });
    
    
    // 🎬 PERFORMANCE MONITORING - Monitoring des performances
    // =======================================================
    
    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`⏱️ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                }
            });
            
            perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
        } catch (e) {
            // Performance API not supported
        }
    }

    
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
