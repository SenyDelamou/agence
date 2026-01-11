// ═══════════════════════════════════════════════════════════════════════════
// 🎯 SYSTÈME DE CHAT AVANCÉ V3.0 - Voyage Élégance
// ═══════════════════════════════════════════════════════════════════════════
// Widget de chat premium avec:
// • Assistante IA (20+ réponses intelligentes)
// • Messagerie visiteur ↔ staff
// • Notifications et statut online
// • Design premium avec animations
// • FAQ interactif

document.addEventListener('DOMContentLoaded', function() {
    // ─────────────────────────────────────────────────────────────────────────
    // 1️⃣ CRÉER LE WIDGET
    // ─────────────────────────────────────────────────────────────────────────
    
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget-v3';
    chatWidget.innerHTML = `
        <!-- Widget Principal -->
        <div class="chat-bubble-v3" id="chatBubble">
            <!-- En-tête -->
            <div class="chat-header-v3">
                <div class="header-top">
                    <h3>💬 Assistante Voyage</h3>
                    <div class="status-indicator" id="statusIndicator">
                        <span class="status-dot"></span>
                        <span class="status-text">En ligne</span>
                    </div>
                </div>
                <div class="chat-tabs-v3">
                    <button class="chat-tab-v3 active" data-tab="chat">💬 Chat</button>
                    <button class="chat-tab-v3" data-tab="contacts">👥 Staff</button>
                    <button class="chat-tab-v3" data-tab="faq">❓ FAQ</button>
                </div>
                <button class="close-chat-v3" id="closeChatBtn">✕</button>
            </div>

            <!-- Contenu -->
            <div class="chat-content-v3">
                <!-- Tab: Chat -->
                <div id="chat-tab" class="chat-tab-content-v3 active">
                    <div class="chat-messages-v3" id="chatMessages">
                        <div class="message-bot">
                            <div class="avatar">🤖</div>
                            <div class="message-content">
                                <p>Bonjour! 👋 Je suis votre assistante Voyage Élégance. Comment puis-je vous aider?</p>
                                <span class="message-time">À l'instant</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="typing-indicator" id="typingIndicator" style="display: none;">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>

                    <div class="chat-input-v3">
                        <input type="text" id="chatInput" placeholder="Tapez votre message..." class="chat-input-field">
                        <button id="sendChatBtn" class="send-btn-v3">📤</button>
                    </div>
                </div>

                <!-- Tab: Contacts -->
                <div id="contacts-tab" class="chat-tab-content-v3">
                    <div class="contacts-list-v3">
                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">👨‍💼</div>
                                <div class="contact-info">
                                    <h4>Support Client</h4>
                                    <span class="status-badge online">● En ligne</span>
                                </div>
                            </div>
                            <p>Réponses rapides à vos questions</p>
                            <button class="contact-btn">Démarrer chat</button>
                        </div>

                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">👩‍💼</div>
                                <div class="contact-info">
                                    <h4>Équipe Ventes</h4>
                                    <span class="status-badge online">● En ligne</span>
                                </div>
                            </div>
                            <p>Offres spéciales & réservations</p>
                            <button class="contact-btn">Démarrer chat</button>
                        </div>

                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">🗺️</div>
                                <div class="contact-info">
                                    <h4>Guide Voyage</h4>
                                    <span class="status-badge offline">● Hors ligne</span>
                                </div>
                            </div>
                            <p>Conseils destinations</p>
                            <button class="contact-btn" disabled>Hors ligne</button>
                        </div>
                    </div>
                </div>

                <!-- Tab: FAQ -->
                <div id="faq-tab" class="chat-tab-content-v3">
                    <div class="faq-list-v3">
                        <div class="faq-item">
                            <button class="faq-question">❓ Comment réserver?</button>
                            <div class="faq-answer">Cliquez sur "Réservation" ou contactez notre équipe ventes. Confirmation sous 24h!</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">💰 Quel est le prix?</button>
                            <div class="faq-answer">À partir de 500€. Les tarifs dépendent de la destination, durée et groupe. Demandez un devis!</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">❌ Comment annuler?</button>
                            <div class="faq-answer">Annulation gratuite jusqu'à 7j avant. Après 7j: 50% restituée. Moins de 3j: non remboursable.</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">🛂 Faut-il un visa?</button>
                            <div class="faq-answer">Dépend de votre nationalité et destination. Nous vous guidons dans les démarches!</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="chat-footer-v3">
                <a href="messenger.html" target="_blank">📧 Messagerie</a>
                <a href="video-call.html" target="_blank">📞 Appel Vidéo</a>
            </div>
        </div>

        <!-- Bouton flottant -->
        <button class="chat-toggle-v3" id="chatToggle">
            <span class="chat-icon">💬</span>
            <span class="notification-badge-v3" id="notificationBadge" style="display: none;">1</span>
            <span class="online-dot"></span>
        </button>
    `;
    document.body.appendChild(chatWidget);

    // ─────────────────────────────────────────────────────────────────────────
    // 2️⃣ VARIABLES
    // ─────────────────────────────────────────────────────────────────────────
    
    const chatToggle = document.getElementById('chatToggle');
    const chatBubble = document.getElementById('chatBubble');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const statusIndicator = document.getElementById('statusIndicator');
    
    const chatTabs = document.querySelectorAll('.chat-tab-v3');
    const chatTabContents = document.querySelectorAll('.chat-tab-content-v3');
    const contactBtns = document.querySelectorAll('.contact-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    let chatOpen = false;
    let currentTab = 'chat';

    // ─────────────────────────────────────────────────────────────────────────
    // 3️⃣ ONGLETS
    // ─────────────────────────────────────────────────────────────────────────
    
    chatTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            chatTabs.forEach(t => t.classList.remove('active'));
            chatTabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
            currentTab = tabName;
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 4️⃣ ASSISTANTE IA (20+ RÉPONSES)
    // ─────────────────────────────────────────────────────────────────────────
    
    const aiResponses = {
        'bonjour|salut|hello|coucou': [
            'Bonjour! 👋 Comment puis-je vous aider?',
            'Salut! 👋 Bienvenue chez Voyage Élégance!',
            'Bonjour! 😊 Que puis-je faire pour vous?'
        ],
        'réservation|reservation|réserver|book': [
            '📅 Pour réserver:\n1. Choisissez destination\n2. Sélectionnez dates\n3. Laissez vos coordonnées\n\nConfirmation sous 24h!',
            'Vous souhaitez réserver? 🎫 Quelle destination?',
            'Réservations faciles! 📝 Dites-moi où vous rêvez d\'aller!'
        ],
        'prix|tarif|coût|budget|cher': [
            '💰 À partir de 500€!\nLes tarifs dépendent de:\n• Destination\n• Durée\n• Groupe\n• Saison',
            'Les prix varient! 💵 De 500€ à 5000€+ selon le voyage.',
            'Tarifs compétitifs! 📊 Devis gratuit sur demande!'
        ],
        'destination|où|voyage|tour|pays': [
            '🌍 Nos destinations:\n✈️ Fouta Djallon\n🏝️ Îles de Loos\n🏛️ Dakar\n🇫🇷 Paris\n🏜️ Sahara\n\nLaquelle?',
            '50+ destinations! 🗺️ Montagne, plage, désert, culture... Quoi?',
            'Où rêvez-vous? 🌴 Nous avons le voyage parfait!'
        ],
        'contact|téléphone|email|appel|phone|mail': [
            '📞 +224 629 403 019\n📧 samakedelamou858@gmail.com\n💬 Ici même!\n🏢 Kindia, Guinée',
            'Contactez-nous anytime! ☎️ +224 629 403 019',
            'Nous sommes là! 📱 Téléphone, email, ou chat 24/7!'
        ],
        'horaire|heure|ouverture|fermeture|quand|jour': [
            '⏰ Ouverts 24/7! 🎯\nChat, email, téléphone toujours disponibles!',
            'Disponibles jour et nuit! 🌙 Contactez-nous anytime.',
            'Service 24h/24! ☎️ Chat, email, support permanent.'
        ],
        'paiement|payment|carte|virement|paypal|pay': [
            '💳 Paiements sécurisés:\n✅ Cartes (Visa/MC)\n✅ Virement\n✅ Mobile Money\n🔒 100% sûr!',
            'Tous les paiements acceptés! 💰 Cartes, virements, portefeuille.',
            'Payez en toute sécurité! 🛡️ Plusieurs options.'
        ],
        'annulation|annuler|refund|remboursement|cancel': [
            '❌ Conditions:\n• >7j: 100% remboursé\n• 3-7j: 50%\n• <3j: Non remboursé',
            'Annulation flexible! 📋 Plus de détails au support.',
            'Remboursements selon date! ↩️ Jusqu\'à 7j avant.'
        ],
        'visa|passeport|document|papier|dossier': [
            '🛂 Aide visa complète! 📖\nNous guidons pour tous pays.',
            'Documents? On vous aide! 📝 Toutes démarches.',
            'Assistance visa! 🛂 Quelle destination?'
        ],
        'groupe|famille|couple|seul|enfant|bébé|solo': [
            '👨‍👩‍👧‍👦 Tous les types:\nFamilles, couples, groupes, solo! 👥',
            'Voyages personnalisés! 👪 Famille, couple, groupe.',
            'Tous acceptés! 🎉 Quel type de voyage?'
        ],
        'saison|météo|quand|meilleure|climat|pluie': [
            '🌤️ Meilleures périodes:\n• Nov-Fév: Sec et chaud\n• Mar-Mai: Printemps\n• Jun-Oct: Pluies',
            'Chaque destination sa saison! 📅 Laquelle?',
            'Saisons idéales! ☀️ Dépend destination.'
        ],
        'activité|sport|randonnée|plongée|safari|beach|baignade': [
            '🎯 Activités:\n⛰️ Randonnée\n🏊 Plongée\n🐘 Safari\n🏖️ Plage\n🚴 VTT',
            'Activités pour tous! 🎪 Aventure ou détente?',
            'Sports et loisirs! 🏃 Que préférez-vous?'
        ],
        'hôtel|hôtel|hébergement|logement|chambre|accommodation': [
            '🏨 Hébergements:\n⭐ Luxe\n⭐⭐ Confort\n⭐⭐⭐ Budget\n🏕️ Camping',
            'Tous les niveaux! 🛏️ Budget ou luxe?',
            'Logements variés! 🏡 Quel type?'
        ],
        'assurance|insurance|couverture|problème|accident': [
            '🛡️ Assurance incluse!\n✅ Annulation\n✅ Rapatriement\n✅ 24/7 assistance',
            'Couverture complète! 📋 Assistance 24h.',
            'Assurance premium! 🛡️ Tout couvert.'
        ],
        'santé|vaccin|maladie|médecin|health|médicament': [
            '💉 Conseils santé:\nVaccins, précautions, pharmacie 24/7.',
            'Santé en priorité! 🏥 Assistance médicale.',
            'Guidance complète! 💊 Vaccins et prévention.'
        ],
        'merci|thanks|thank|gracias': [
            'De rien! 😊 D\'autres questions?',
            'Merci à vous! 🙏 Prêt à voyager?',
            'Avec plaisir! 😄 À bientôt!'
        ],
        'au revoir|goodbye|bye|adieu|à plus|ciao': [
            'Au revoir! ✈️ Préparez vos bagages!',
            'À bientôt! 🌍 Bon voyage!',
            'Bye! 👋 À très vite!'
        ]
    };

    function getAIResponse(msg) {
        const m = msg.toLowerCase().trim();
        for (const [keywords, responses] of Object.entries(aiResponses)) {
            if (keywords.split('|').some(kw => m.includes(kw))) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return '😊 Intéressant! Pour plus de détails, cliquez sur "Staff" ou appelez +224 629 403 019!';
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 5️⃣ MESSAGES
    // ─────────────────────────────────────────────────────────────────────────
    
    function formatTime() {
        const h = String(new Date().getHours()).padStart(2, '0');
        const m = String(new Date().getMinutes()).padStart(2, '0');
        return `${h}:${m}`;
    }

    function addMessage(text, type = 'user', time = null) {
        const msg = document.createElement('div');
        msg.className = `message-${type}`;
        const avatar = type === 'user' ? '👤' : '🤖';
        msg.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time || formatTime()}</span>
            </div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function saveChatHistory() {
        const msgs = [];
        document.querySelectorAll('.message-user, .message-bot').forEach(m => {
            msgs.push({
                text: m.querySelector('p').textContent,
                type: m.classList.contains('message-user') ? 'user' : 'bot',
                time: m.querySelector('.message-time').textContent
            });
        });
        localStorage.setItem('chatHistory_v3', JSON.stringify(msgs.slice(-50)));
    }

    function loadChatHistory() {
        const saved = localStorage.getItem('chatHistory_v3');
        if (saved) {
            const msgs = JSON.parse(saved);
            chatMessages.innerHTML = '';
            msgs.forEach(m => addMessage(m.text, m.type, m.time));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 6️⃣ WIDGET
    // ─────────────────────────────────────────────────────────────────────────
    
    chatToggle.addEventListener('click', function() {
        chatOpen = !chatOpen;
        chatBubble.classList.toggle('open', chatOpen);
        if (chatOpen) chatInput.focus();
    });

    closeChatBtn.addEventListener('click', function() {
        chatOpen = false;
        chatBubble.classList.remove('open');
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatInput.value = '';
        saveChatHistory();

        typingIndicator.style.display = 'flex';
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addMessage(getAIResponse(text), 'bot');
            saveChatHistory();
        }, 1000 + Math.random() * 1000);
    }

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 7️⃣ CONTACTS
    // ─────────────────────────────────────────────────────────────────────────
    
    contactBtns.forEach((btn, idx) => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                const agents = ['Support', 'Ventes', 'Guide'];
                alert(`Chat avec ${agents[idx]} - Ouverture messagerie...`);
                window.open('messenger.html', 'messenger', 'width=800,height=600');
            });
        }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 8️⃣ FAQ
    // ─────────────────────────────────────────────────────────────────────────
    
    faqQuestions.forEach(q => {
        q.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 9️⃣ CLIC EXTERNE
    // ─────────────────────────────────────────────────────────────────────────
    
    document.addEventListener('click', e => {
        if (!chatWidget.contains(e.target) && chatOpen) {
            chatOpen = false;
            chatBubble.classList.remove('open');
        }
    });

    // ─────────────────────────────────────────────────────────────────────────
    // 🔟 INIT
    // ─────────────────────────────────────────────────────────────────────────
    
    loadChatHistory();
    
    // Statut online (aléatoire pour démo)
    setInterval(() => {
        const isOnline = Math.random() > 0.1;
        statusIndicator.innerHTML = isOnline 
            ? '<span class="status-dot"></span><span class="status-text">En ligne</span>'
            : '<span class="status-dot offline"></span><span class="status-text">Hors ligne</span>';
    }, 30000);
});
