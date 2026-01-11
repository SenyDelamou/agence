# 💻 Exemples d'Intégration - Code Snippets

## 1. Notification Personnalisées

### Exemple Simple
```javascript
// Succès
notificationManager.show('✈️ Réservation confirmée!', 'success', 3000);

// Erreur
notificationManager.show('❌ Erreur lors de la réservation', 'error', 4000);

// Info
notificationManager.show('ℹ️ Veuillez vérifier vos informations', 'info', 2500);

// Avertissement
notificationManager.show('⚠️ La date que vous avez choisie est complète', 'warning', 3500);
```

### Dans une Fonction de Réservation
```javascript
async function reserverVoyage(destination, dates) {
    try {
        // Validation
        if (!destination || !dates) {
            notificationManager.show(
                'Veuillez remplir tous les champs',
                'error'
            );
            return;
        }
        
        // Appel API
        const response = await fetch('/api/reservations', {
            method: 'POST',
            body: JSON.stringify({ destination, dates })
        });
        
        if (response.ok) {
            notificationManager.show(
                `✈️ Réservation pour ${destination} confirmée!`,
                'success',
                4000
            );
        } else {
            throw new Error('Erreur serveur');
        }
    } catch (error) {
        notificationManager.show(
            `Erreur: ${error.message}`,
            'error'
        );
    }
}
```

## 2. Système de Favoris

### Ajouter un Bouton Favoris
```html
<button class="wishlist-btn" data-id="destination-1">
    🤍
</button>

<script>
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    
    // Mettre à jour l'affichage initial
    if (favoritesManager.has(id)) {
        btn.textContent = '❤️';
        btn.classList.add('active');
    }
    
    // Événement click
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isFavorite = favoritesManager.toggle(id);
        
        btn.textContent = isFavorite ? '❤️' : '🤍';
        btn.classList.toggle('active', isFavorite);
        
        const message = isFavorite 
            ? 'Ajouté aux favoris ❤️' 
            : 'Retiré des favoris 💔';
        
        notificationManager.show(message, 'success', 2000);
    });
});
</script>
```

### Afficher tous les Favoris
```javascript
function afficherFavoris() {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Filtrer les cartes pour afficher seulement les favoris
    document.querySelectorAll('[data-category]').forEach(card => {
        const cardId = card.getAttribute('data-id') || card.querySelector('h3')?.textContent;
        card.style.display = favoriteIds.includes(cardId) ? 'block' : 'none';
    });
    
    notificationManager.show(
        `${favoriteIds.length} favoris affichés`,
        'info'
    );
}
```

### Exporter les Favoris
```javascript
function exporterFavoris() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mes-favoris.json';
    link.click();
    
    notificationManager.show('Favoris exportés! 📥', 'success');
}
```

## 3. Thème Sombre/Clair

### Implémenter un Sélecteur de Thème
```html
<div class="theme-selector">
    <button id="lightTheme">☀️ Clair</button>
    <button id="darkTheme">🌙 Sombre</button>
    <button id="autoTheme">🔄 Auto</button>
</div>

<script>
document.getElementById('lightTheme').addEventListener('click', () => {
    themeManager.currentTheme = 'light';
    themeManager.applyTheme();
});

document.getElementById('darkTheme').addEventListener('click', () => {
    themeManager.currentTheme = 'dark';
    themeManager.applyTheme();
});

document.getElementById('autoTheme').addEventListener('click', () => {
    // Déterminer selon les préférences système
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeManager.currentTheme = isDark ? 'dark' : 'light';
    themeManager.applyTheme();
});
</script>
```

### Auto-switch Selon l'Heure
```javascript
function autoThemeBasedOnTime() {
    const hour = new Date().getHours();
    
    // Mode sombre de 18h à 6h
    if (hour >= 18 || hour < 6) {
        themeManager.currentTheme = 'dark';
    } else {
        themeManager.currentTheme = 'light';
    }
    
    themeManager.applyTheme();
}

// Exécuter au chargement
autoThemeBasedOnTime();

// Vérifier toutes les heures
setInterval(autoThemeBasedOnTime, 3600000);
```

## 4. Filtrage Avancé

### Filtres Multi-niveaux
```javascript
class AdvancedFilter {
    constructor() {
        this.filters = {
            category: 'all',
            priceRange: [0, 10000000],
            rating: 0,
            search: ''
        };
    }
    
    apply() {
        const cards = document.querySelectorAll('[data-category]');
        let visible = 0;
        
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const price = parseInt(card.querySelector('.destination-price')?.textContent.replace(/\D/g, '') || 0);
            const rating = parseFloat(card.dataset.rating || 5);
            
            const categoryMatch = this.filters.category === 'all' || category === this.filters.category;
            const priceMatch = price >= this.filters.priceRange[0] && price <= this.filters.priceRange[1];
            const ratingMatch = rating >= this.filters.rating;
            
            const shouldShow = categoryMatch && priceMatch && ratingMatch;
            card.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) visible++;
        });
        
        notificationManager.show(`${visible} destination(s) trouvée(s)`, 'info');
    }
    
    setCategory(category) {
        this.filters.category = category;
        this.apply();
    }
    
    setPriceRange(min, max) {
        this.filters.priceRange = [min, max];
        this.apply();
    }
    
    setMinRating(rating) {
        this.filters.rating = rating;
        this.apply();
    }
}

// Utilisation
const filter = new AdvancedFilter();
filter.setCategory('africa');
filter.setPriceRange(0, 5000000);
filter.setMinRating(4);
```

## 5. Analytics Avancé

### Tracker les Sessions Utilisateur
```javascript
class SessionTracker {
    constructor() {
        this.sessionId = this.generateId();
        this.startTime = new Date();
        this.events = [];
        
        window.addEventListener('beforeunload', () => this.endSession());
    }
    
    generateId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            timestamp: new Date(),
            data,
            duration: Date.now() - this.startTime.getTime()
        };
        
        this.events.push(event);
        Analytics.track(eventName, {
            sessionId: this.sessionId,
            ...data
        });
    }
    
    endSession() {
        const duration = Date.now() - this.startTime.getTime();
        console.log(`Session ${this.sessionId} - Durée: ${duration}ms - Événements: ${this.events.length}`);
        
        // Envoyer au serveur si nécessaire
        fetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: this.sessionId,
                duration,
                events: this.events
            })
        }).catch(e => console.log('Session tracking failed', e));
    }
}

// Utilisation
const tracker = new SessionTracker();

document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        tracker.trackEvent('reservation_click', {
            destination: btn.closest('[data-category]')?.querySelector('h3')?.textContent
        });
    });
});
```

### Dashboard Analytique Simple
```javascript
function afficherDashboardAnalytics() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const theme = localStorage.getItem('theme') || 'light';
    
    const dashboard = document.createElement('div');
    dashboard.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>📊 Dashboard Analytics</h3>
            <p>📍 Favoris: ${favorites.length}</p>
            <p>🎨 Thème: ${theme}</p>
            <p>🕐 Heure: ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p>📱 Largeur écran: ${window.innerWidth}px</p>
            <p>🌐 URL: ${window.location.href}</p>
        </div>
    `;
    
    document.body.appendChild(dashboard);
}
```

## 6. Gestion des Erreurs

### Try-Catch avec Notifications
```javascript
async function fetchWithNotification(url, options = {}) {
    try {
        notificationManager.show('Chargement... ⏳', 'info');
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        notificationManager.show('Données chargées! ✅', 'success');
        
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        notificationManager.show(
            `Erreur: ${error.message}`,
            'error'
        );
        
        Analytics.track('fetch_error', {
            url,
            error: error.message
        });
        
        return null;
    }
}

// Utilisation
const data = await fetchWithNotification('/api/destinations');
```

## 7. Validation de Formulaire

### Validation avec Notifications
```javascript
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.errors = {};
    }
    
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    validateRequired(field, value) {
        if (!value || value.trim() === '') {
            this.errors[field] = 'Ce champ est obligatoire';
            return false;
        }
        return true;
    }
    
    validateDate(date) {
        const selected = new Date(date);
        const today = new Date();
        
        if (selected < today) {
            this.errors['date'] = 'La date ne peut pas être dans le passé';
            return false;
        }
        return true;
    }
    
    validate() {
        this.errors = {};
        
        // Valider email
        const email = this.form.querySelector('input[type="email"]')?.value;
        if (email && !this.validateEmail(email)) {
            this.errors['email'] = 'Email invalide';
        }
        
        // Valider champs obligatoires
        this.form.querySelectorAll('[required]').forEach(field => {
            this.validateRequired(field.name, field.value);
        });
        
        // Afficher les erreurs
        if (Object.keys(this.errors).length > 0) {
            const errorMsg = Object.values(this.errors).join(', ');
            notificationManager.show(errorMsg, 'error');
            return false;
        }
        
        notificationManager.show('Formulaire valide! ✅', 'success');
        return true;
    }
}

// Utilisation
const validator = new FormValidator('#reservationForm');

document.querySelector('#reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validator.validate()) {
        // Soumettre le formulaire
        console.log('Formulaire soumis!');
    }
});
```

## 8. Micro-interactions

### Toast de Confirmation
```javascript
function confirmAction(message, onConfirm) {
    const confirmed = confirm(message);
    
    if (confirmed) {
        onConfirm();
        notificationManager.show('Action confirmée ✅', 'success');
    } else {
        notificationManager.show('Action annulée', 'info');
    }
}

// Utilisation
document.querySelector('.delete-btn').addEventListener('click', () => {
    confirmAction('Êtes-vous sûr?', () => {
        // Supprimer l'élément
        console.log('Supprimé!');
    });
});
```

### Contador Animé
```javascript
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Utilisation
animateCounter(
    document.querySelector('.stat-number'),
    0,
    10000,
    2000
);
```

---

**Ces exemples vous aideront à intégrer rapidement les nouvelles fonctionnalités!** 🎉
