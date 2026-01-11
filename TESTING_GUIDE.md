# 🧪 Guide de Test - Voyage Élégance v2.0

## ✅ Checklist de Test Complète

### 1. Notifications (NotificationManager)

- [ ] **Test Success Notification**
  ```javascript
  notificationManager.show('Succès!', 'success');
  // Attendre: notification verte à droite, disappears in 3s
  ```

- [ ] **Test Error Notification**
  ```javascript
  notificationManager.show('Erreur!', 'error');
  // Attendre: notification rouge à droite
  ```

- [ ] **Test Info Notification**
  ```javascript
  notificationManager.show('Info', 'info');
  // Attendre: notification bleue à droite
  ```

- [ ] **Test Warning Notification**
  ```javascript
  notificationManager.show('Attention!', 'warning');
  // Attendre: notification orange à droite
  ```

- [ ] **Test Fermeture Manuel**
  - Cliquer sur le X de la notification
  - Attendre: notification disparaît immédiatement

- [ ] **Test Multiple Notifications**
  ```javascript
  for(let i = 0; i < 5; i++) {
      notificationManager.show(`Message ${i}`, 'success');
  }
  // Attendre: stack vertical à droite
  ```

### 2. Système de Favoris (FavoritesManager)

- [ ] **Test Ajouter aux Favoris**
  - Ouvrir une carte destination
  - Cliquer sur le cœur 🤍
  - Attendre: cœur devient ❤️ + notification

- [ ] **Test Retirer des Favoris**
  - Cliquer sur un cœur ❤️
  - Attendre: cœur devient 🤍 + notification

- [ ] **Test Persistance LocalStorage**
  - Ajouter 3 destinations aux favoris
  - Recharger la page
  - Attendre: favoris sont toujours là

- [ ] **Test Synchronisation Recherche**
  - Ajouter une destination aux favoris
  - Rechercher cette destination
  - Attendre: cœur ❤️ dans les résultats

- [ ] **Test Vérification LocalStorage**
  ```javascript
  console.log(JSON.parse(localStorage.getItem('favorites')));
  // Devrait montrer array d'IDs
  ```

### 3. Mode Sombre/Clair (ThemeManager)

- [ ] **Test Toggle Theme Button**
  - Cliquer sur 🌙/☀️ navbar
  - Attendre: toute la page change

- [ ] **Test Dark Mode Visual**
  - Activer dark mode
  - Vérifier: fond sombre, texte clair
  - Vérifier: cartes avec border primaire

- [ ] **Test Light Mode Visual**
  - Activer light mode
  - Vérifier: fond clair, texte sombre
  - Vérifier: cartes avec ombres douces

- [ ] **Test Persistance Theme**
  - Changer le thème
  - Recharger la page
  - Attendre: thème est conservé

- [ ] **Test Theme Icon Update**
  - Vérifier icône change (🌙 ↔️ ☀️)
  - Vérifier notification apparaît

- [ ] **Test Dark Mode LocalStorage**
  ```javascript
  console.log(localStorage.getItem('theme'));
  // Devrait montrer 'light' ou 'dark'
  ```

### 4. Filtrage des Destinations

- [ ] **Test Tous les Filtres**
  - Cliquer sur "Tous"
  - Attendre: toutes les cartes apparaissent

- [ ] **Test Filtre Guinée**
  - Cliquer sur "Guinée"
  - Attendre: seulement destinations locales
  - Vérifier: animation staggered

- [ ] **Test Filtre Afrique**
  - Cliquer sur "Afrique"
  - Attendre: destinations africaines

- [ ] **Test Filtre Monde**
  - Cliquer sur "Monde"
  - Attendre: destinations internationales

- [ ] **Test Animations Filtre**
  - Observer l'animation des cartes
  - Attendre: smooth scale + opacity change

- [ ] **Test Notification Filtre**
  - Appliquer un filtre
  - Attendre: notification "Filtrage appliqué ✨"

### 5. Recherche Avancée

- [ ] **Test Recherche Temps Réel**
  - Taper "Paris"
  - Attendre: résultats instantanés

- [ ] **Test Recherche Pays**
  - Taper "Guinée"
  - Attendre: toutes destinations guinéennes

- [ ] **Test Aucun Résultat**
  - Taper "XYZ123"
  - Attendre: "Aucune destination trouvée 🔍"

- [ ] **Test Clic Résultat**
  - Chercher une destination
  - Cliquer sur un résultat
  - Attendre: searchBar remplie + résultats fermés

- [ ] **Test Favoris dans Résultats**
  - Ajouter destination aux favoris
  - Rechercher et voir dans résultats
  - Attendre: cœur ❤️ visible + clickable

- [ ] **Test Débounce Search (300ms)**
  - Taper rapidement
  - Attendre: pas d'appels multiples

### 6. Hover Effects 3D

- [ ] **Test Card Hover**
  - Survoler une carte destination
  - Attendre: effet 3D perspective

- [ ] **Test Hover Image**
  - Survoler l'image
  - Attendre: zoom léger (1.1x)

- [ ] **Test Hover Shadow**
  - Survoler une carte
  - Attendre: ombre augmente

- [ ] **Test Mouse Tracking**
  - Bouger la souris sur carte
  - Attendre: rotation Y/X change

- [ ] **Test Hover Exit**
  - Quitter la carte
  - Attendre: transformation revient normal

### 7. Navigation au Clavier

- [ ] **Test Échap Modal**
  - Ouvrir un modal
  - Appuyer Échap
  - Attendre: modal ferme

- [ ] **Test Ctrl+/ Search**
  - Appuyer Ctrl+/
  - Attendre: focus sur searchBar

- [ ] **Test Tab Navigation**
  - Appuyer Tab plusieurs fois
  - Attendre: focus sur boutons/inputs

- [ ] **Test Smooth Scroll**
  - Cliquer sur lien ancre
  - Attendre: scroll fluide jusqu'à target

### 8. Performance & Optimisation

- [ ] **Test Lazy Loading Images**
  - Ouvrir DevTools > Network
  - Scroller vers images
  - Attendre: images chargent à scroll

- [ ] **Test Debounced Search (300ms)**
  - Taper dans recherche
  - Vérifier Network: pas d'appels multiples
  - Attendre: max 1 appel par 300ms

- [ ] **Test RequestAnimationFrame**
  - Scroller la page
  - DevTools > Performance
  - Attendre: animations 60fps

- [ ] **Test Lighthouse Score**
  - Chrome DevTools > Lighthouse
  - Attendre: Score > 90

### 9. Dark Mode Complet

- [ ] **Test Navbar Dark**
  - Activer dark mode
  - Attendre: navbar fond sombre

- [ ] **Test Cards Dark**
  - Attendre: background #1e293b avec border

- [ ] **Test Text Dark**
  - Attendre: texte clair (#f1f5f9)

- [ ] **Test Inputs Dark**
  - Attendre: background #334155

- [ ] **Test Scrollbar Dark**
  - Scroller dans dark mode
  - Attendre: scrollbar gradient #818cf8

- [ ] **Test Modal Dark**
  - Ouvrir modal en dark mode
  - Attendre: modal fond sombre

### 10. Responsivité

- [ ] **Test Desktop (1920px)**
  - Layout complet avec 3 colonnes

- [ ] **Test Tablet (768px)**
  - Chrome DevTools > Device Tablet
  - Attendre: 2 colonnes, layout adapté
  - Vérifier: hamburger menu disparu

- [ ] **Test Mobile (375px)**
  - Chrome DevTools > Device iPhone
  - Attendre: 1 colonne, full-width
  - Vérifier: hamburger menu visible

- [ ] **Test Touch Events**
  - Sur appareil mobile réel
  - Tester swipe, tap, double-tap

- [ ] **Test Orientation Change**
  - Portrait → Landscape
  - Attendre: layout s'adapte

### 11. Accessibilité

- [ ] **Test Keyboard Only**
  - Désactiver souris
  - Naviguer avec Tab/Enter/Arrows
  - Attendre: tout accessible

- [ ] **Test Focus Visibility**
  - Utiliser Tab
  - Attendre: focus states visibles

- [ ] **Test Screen Reader (NVDA/JAWS)**
  - Lire la page
  - Attendre: contenu logique et sémantique

- [ ] **Test Color Contrast**
  - Lighthouse > Accessibility
  - Attendre: AA minimum (4.5:1)

- [ ] **Test Text Sizing**
  - Augmenter font-size navigateur
  - Attendre: layout ne casse pas

### 12. Cross-Browser Testing

- [ ] **Test Chrome (Latest)**
  - Toutes fonctionnalités working

- [ ] **Test Firefox (Latest)**
  - Animations smooth
  - Dark mode correct

- [ ] **Test Safari (Latest)**
  - Hover effects working
  - Scrollbar visible

- [ ] **Test Edge (Latest)**
  - CSS Gradients correct
  - Animations fluides

### 13. API & LocalStorage

- [ ] **Test FavoritesManager API**
  ```javascript
  // Test add
  favoritesManager.add('test-1');
  
  // Test has
  console.log(favoritesManager.has('test-1')); // true
  
  // Test remove
  favoritesManager.remove('test-1');
  
  // Test toggle
  favoritesManager.toggle('test-2');
  ```

- [ ] **Test NotificationManager API**
  ```javascript
  // Test different types
  notificationManager.show('Success', 'success');
  notificationManager.show('Error', 'error');
  notificationManager.show('Warning', 'warning');
  notificationManager.show('Info', 'info');
  ```

- [ ] **Test Analytics API**
  ```javascript
  Analytics.track('test_event', {
      userId: '123',
      action: 'test'
  });
  // Vérifier console.log
  ```

- [ ] **Test LocationHelper API**
  ```javascript
  LocationHelper.getLocation().then(loc => {
      console.log(loc.lat, loc.lng);
  });
  // Autoriser géolocalisation
  ```

### 14. Formulaire & Validation

- [ ] **Test Submit Vide**
  - Cliquer submit sans données
  - Attendre: notification d'erreur

- [ ] **Test Champs Required**
  - Laisser champ vide
  - Attendre: validation HTML5

- [ ] **Test Email Invalid**
  - Entrer email invalide
  - Attendre: feedback visuel

- [ ] **Test Dates Valides**
  - Sélectionner date passée
  - Attendre: erreur ou warning

### 15. Page Visibility

- [ ] **Test Title Change Invisible**
  - Ouvrir page dans onglet
  - Cliquer autre onglet
  - Attendre: title change "👋 À bientôt"

- [ ] **Test Title Restore Visible**
  - Revenir sur onglet
  - Attendre: title original revient

## 📱 Tests Mobiles Spécifiques

### Orientation
- [ ] Portrait mode (375x667)
- [ ] Landscape mode (667x375)
- [ ] Layout adapté à chaque

### Interactions Touch
- [ ] Tap boutons (45px min)
- [ ] Double-tap zoom
- [ ] Swipe navigation
- [ ] Pinch zoom

### Slow Network
- [ ] Throttle 3G (DevTools)
- [ ] Vérifier UX acceptable
- [ ] Lazy loading visible

### Battery/Data Saver
- [ ] Réduire animations si dark mode
- [ ] Images optimisées
- [ ] Minified assets

## 🐛 Bug Reporting Template

Si vous trouvez un bug:

```
## Bug Report
- **Titre**: Court titre du bug
- **Description**: Détails du problème
- **Steps to Reproduce**:
  1. Aller à...
  2. Cliquer sur...
  3. Voir...
- **Expected**: Comportement attendu
- **Actual**: Comportement réel
- **Screenshot**: Screenshot si applicable
- **Browser**: Chrome 120, Firefox 121, etc.
- **Device**: Desktop, iPhone 15, Samsung Galaxy, etc.
- **OS**: Windows 11, macOS 14, iOS 17, Android 14, etc.
```

## 📊 Résultats de Test Attendus

| Test | Pass | Fail | Notes |
|---|---|---|---|
| Notifications | ✅ | | Apparat à droite |
| Favoris | ✅ | | Persiste dans localStorage |
| Dark Mode | ✅ | | Change tous éléments |
| Filtres | ✅ | | Animations staggered |
| Recherche | ✅ | | Temps réel, débounced |
| Hover 3D | ✅ | | Smooth perspective |
| Clavier | ✅ | | Tab, Echap, Ctrl+/ |
| Mobile | ✅ | | Responsive à tous breakpoints |
| Performance | ✅ | | Lighthouse > 90 |
| Dark Mode Full | ✅ | | Tous éléments couverts |

## 🎬 Vidéo Test Script

### Scénario 1: Utilisateur Nouveau
1. Charger page
2. Voir notification bienvenue
3. Chercher "Paris"
4. Cliquer résultat
5. Ajouter aux favoris
6. Passer en dark mode
7. Valider réservation

### Scénario 2: Power User
1. Accéder favoris
2. Appliquer filtres multiples
3. Comparer destinations
4. Utiliser clavier seulement
5. Changer thème plusieurs fois
6. Vérifier localStorage

### Scénario 3: Mobile User
1. Charger sur iPhone
2. Tester portrait/landscape
3. Chercher touch-friendly
4. Tester sur réseau lent
5. Vérifier dark mode

---

**Bonne chance pour les tests! 🧪✅**
