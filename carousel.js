// ═══════════════════════════════════════════════════════════════════════════
// 🎬 PREMIUM CAROUSEL/SLIDER - Voyage Élégance
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    class PremiumCarousel {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.options = {
                autoplay: options.autoplay !== false,
                interval: options.interval || 5000,
                transition: options.transition || 'fade',
                showIndicators: options.showIndicators !== false,
                showControls: options.showControls !== false,
                ...options
            };

            this.init();
        }

        init() {
            this.slides = this.container.querySelectorAll('.carousel-slide');
            this.currentIndex = 0;

            if (this.slides.length === 0) return;

            // Ajouter les contrôles
            if (this.options.showControls) {
                this.createControls();
            }

            // Ajouter les indicateurs
            if (this.options.showIndicators) {
                this.createIndicators();
            }

            // Démarrer le carousel
            if (this.options.autoplay) {
                this.startAutoplay();
            }

            // Ajouter les événements de survol pour pause
            this.container.addEventListener('mouseenter', () => {
                if (this.autoplayInterval) clearInterval(this.autoplayInterval);
            });

            this.container.addEventListener('mouseleave', () => {
                if (this.options.autoplay) this.startAutoplay();
            });

            // Afficher la première slide
            this.updateSlides();
        }

        createControls() {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-control carousel-prev';
            prevBtn.innerHTML = '❮';
            prevBtn.addEventListener('click', () => this.prev());

            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-control carousel-next';
            nextBtn.innerHTML = '❯';
            nextBtn.addEventListener('click', () => this.next());

            this.container.appendChild(prevBtn);
            this.container.appendChild(nextBtn);
        }

        createIndicators() {
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'carousel-indicators';

            for (let i = 0; i < this.slides.length; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-indicator';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(i));
                indicatorsContainer.appendChild(dot);
            }

            this.container.appendChild(indicatorsContainer);
            this.indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        }

        updateSlides() {
            this.slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === this.currentIndex) {
                    slide.classList.add('active');
                }
            });

            if (this.indicators) {
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.remove('active');
                    if (index === this.currentIndex) {
                        indicator.classList.add('active');
                    }
                });
            }
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlides();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.updateSlides();
        }

        goToSlide(index) {
            this.currentIndex = index;
            this.updateSlides();
        }

        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.next();
            }, this.options.interval);
        }
    }

    // Initialiser les carousels sur la page
    // Carousel principal (accueil)
    if (document.getElementById('mainCarousel')) {
        new PremiumCarousel('mainCarousel', {
            autoplay: true,
            interval: 6000,
            showIndicators: true,
            showControls: true
        });
    }

    // Carousel destinations
    if (document.getElementById('destinationsCarousel')) {
        new PremiumCarousel('destinationsCarousel', {
            autoplay: true,
            interval: 5000,
            showIndicators: true,
            showControls: true
        });
    }

    // Carousel testimonials
    if (document.getElementById('testimonialsCarousel')) {
        new PremiumCarousel('testimonialsCarousel', {
            autoplay: true,
            interval: 7000,
            showIndicators: true,
            showControls: true
        });
    }

    // Carousel galerie
    if (document.getElementById('galleryCarousel')) {
        new PremiumCarousel('galleryCarousel', {
            autoplay: true,
            interval: 4000,
            showIndicators: true,
            showControls: true
        });
    }

    window.PremiumCarousel = PremiumCarousel;
});
