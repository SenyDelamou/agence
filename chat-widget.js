// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PREMIUM CHAT SYSTEM V4.0 - Voyage Élégance
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    // 1️⃣ HTML STRUCTURE - DESIGN PREMIUM AVANCÉ
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget-v3';
    chatWidget.innerHTML = `
        <div class="chat-bubble-v3" id="chatBubble">
            <div class="chat-header-v3">
                <div class="header-top">
                    <div class="header-left">
                        <div class="avatar-large">✨</div>
                        <div class="header-info">
                            <h3>Voyage Assistante</h3>
                            <span class="status-badge-header">
                                <span class="status-dot"></span> En ligne
                            </span>
                        </div>
                    </div>
                    <button class="close-chat-v3" id="closeChatBtn">✕</button>
                </div>
                <div class="chat-tabs-v3">
                    <button class="chat-tab-v3 active" data-tab="chat">💬 Messages</button>
                    <button class="chat-tab-v3" data-tab="contacts">👥 Agents</button>
                    <button class="chat-tab-v3" data-tab="faq">❓ Aide</button>
                </div>
            </div>

            <div class="chat-content-v3">
                <div id="chat-tab" class="chat-tab-content-v3 active">
                    <div class="chat-header-subtitle">Bienvenue dans votre espace privé de voyage</div>
                    <div class="chat-messages-v3" id="chatMessages">
                        <div class="message-bot">
                            <div class="avatar">✨</div>
                            <div class="message-content">
                                <p class="message-text">Bonjour! 👋 Je suis Élégance, votre assistante IA. Je suis disponible 24h/24 pour répondre à vos questions sur les voyages, les réservations et bien plus!</p>
                                <span class="message-time">Maintenant</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="typing-indicator" id="typingIndicator" style="display: none;">
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-text">En train de répondre...</span>
                    </div>

                    <div class="chat-input-v3">
                        <button class="input-action-btn" id="attachBtn" title="Joindre un fichier">📎</button>
                        <input type="text" id="chatInput" placeholder="Votre message..." class="chat-input-field" autocomplete="off">
                        <button id="sendChatBtn" class="send-btn-v3" title="Envoyer">✈️</button>
                    </div>
                </div>

                <div id="contacts-tab" class="chat-tab-content-v3">
                    <div class="contacts-header">Notre équipe d'experts</div>
                    <div class="contacts-list-v3">
                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">🤴</div>
                                <div class="contact-info">
                                    <h4>Conciergerie Luxe</h4>
                                    <span class="status-badge online">● En ligne</span>
                                </div>
                                <span class="response-time">Répond en 2min</span>
                            </div>
                            <p>Services premium personnalisés et sur-mesure pour les VIP</p>
                            <button class="contact-btn">Demander contact</button>
                        </div>

                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">👒</div>
                                <div class="contact-info">
                                    <h4>Expert Destinations</h4>
                                    <span class="status-badge online">● En ligne</span>
                                </div>
                                <span class="response-time">Répond en 5min</span>
                            </div>
                            <p>Spécialiste des destinations exotiques et tendances</p>
                            <button class="contact-btn">Demander contact</button>
                        </div>

                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">💼</div>
                                <div class="contact-info">
                                    <h4>Support Réservations</h4>
                                    <span class="status-badge online">● En ligne</span>
                                </div>
                                <span class="response-time">Répond en 1min</span>
                            </div>
                            <p>Gestion et modification rapide de vos réservations</p>
                            <button class="contact-btn">Demander contact</button>
                        </div>

                        <div class="contact-item-v3">
                            <div class="contact-header">
                                <div class="contact-avatar">✈️</div>
                                <div class="contact-info">
                                    <h4>Agent Voyage</h4>
                                    <span class="status-badge offline">● Hors ligne (Rappel?)</span>
                                </div>
                                <span class="response-time">Répond dès retour</span>
                            </div>
                            <p>Conseil en itinéraires et planification complète</p>
                            <button class="contact-btn">Prévoir un rappel</button>
                        </div>
                    </div>
                </div>

                <div id="faq-tab" class="chat-tab-content-v3">
                    <div class="faq-header">Questions fréquemment posées</div>
                    <div class="faq-list-v3">
                        <div class="faq-item">
                            <button class="faq-question">💎 Qu'est-ce qu'un service VIP? <span>➕</span></button>
                            <div class="faq-answer">Accès exclusif à héli-transport, hôtels 5*, conciergerie 24h/24. Demandez un devis personnalisé.</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">🌍 Quelles sont les meilleures destinations? <span>➕</span></button>
                            <div class="faq-answer">Cette année: Fouta Djallon (⛰️), Bali (🏝️), Maldives (🏖️) et Paris (✨). Selon votre budget et saison.</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">💳 Comment payer de manière sécurisée? <span>➕</span></button>
                            <div class="faq-answer">Cryptage bancaire SSL 256-bit. Acceptons: Visa, Mastercard, Mobile Money et virement. Garantie anti-fraude.</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">🛫 Comment modifier ma réservation? <span>➕</span></button>
                            <div class="faq-answer">Contactez notre équipe Support (onglet Agents). Nous pouvons modifier/annuler 24h avant le départ.</div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">🤝 Comment devenir partenaire? <span>➕</span></button>
                            <div class="faq-answer">Nous cherchons hôtels, agences locales et guide touristiques. Email: partenaires@voyageelegance.com</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-footer-v3">
                <button class="footer-action" id="starBtn" title="Marquer comme favori">⭐</button>
                <button class="footer-action" id="downloadBtn" title="Télécharger">📥</button>
                <a href="messenger.html" class="footer-link">📩 Conversations</a>
                <button class="footer-action" id="settingsBtn" title="Paramètres">⚙️</button>
            </div>
        </div>

        <button class="chat-toggle-v3" id="chatToggle" title="Ouvrir le chat">
            <span class="chat-toggle-text">💎</span>
            <span class="online-dot"></span>
            <span class="notification-badge" id="notificationBadge" style="display: none;">1</span>
        </button>
    `;
    document.body.appendChild(chatWidget);

    // 2️⃣ BASE DE DONNÉES - RÉPONSES INTELLIGENTES
    const conversationDatabase = {
        greetings: ['bonjour', 'salut', 'coucou', 'hey', 'bonsoir', 'soir'],
        questions: {
            prix: ['prix', 'tarif', 'coût', 'combien', 'montant'],
            destination: ['destination', 'où', 'endroit', 'pays', 'lieu', 'voyage'],
            contact: ['contact', 'appel', 'téléphone', 'numéro'],
            aide: ['aide', 'help', 'problème', 'problema', 'panne'],
            merci: ['merci', 'merci beaucoup', 'thanks'],
            vip: ['vip', 'premium', 'luxe', 'haut gamme'],
            reservation: ['réservation', 'booking', 'réserver', 'book'],
        }
    };

    const botResponses = {
        greetings: [
            '👋 Bonjour! Bienvenue chez Voyage Élégance. Comment puis-je vous aider aujourd\'hui?',
            '✨ Salut! Je suis ravi de vous accueillir. Que puis-je faire pour vous?',
            '🌟 Bonjour à vous! Posez-moi vos questions sur les voyages.',
        ],
        prix: [
            '💰 Nos packages commencent à 5,000,000 GNF. Que cherchez-vous? (Week-end, semaine complète?)',
            '💎 Prix VIP: à partir de 10,000,000 GNF avec services exclusifs inclus.',
        ],
        destination: [
            '🌍 Le Fouta Djallon est spectaculaire actuellement! ⛰️ Intéressé?',
            '🏝️ Bali et les Maldives sont parfaites cette saison. Quel type de vacances?',
        ],
        contact: [
            '📞 Ligne directe: +224 629 403 019\n💬 WhatsApp disponible aussi!',
        ],
        aide: [
            '🆘 Je suis là pour vous! Décrivez votre problème en détail.',
        ],
        merci: [
            '🙏 C\'est un plaisir! Avez-vous d\'autres questions?',
            '😊 Avec grand plaisir! Nous restons à votre disposition.',
        ],
        vip: [
            '👑 Service VIP premium: conciergerie 24/24, héli-transport, hôtels 5*. Intéressé?',
        ],
        reservation: [
            '✅ Pour réserver: onglet "Agents" pour parler à un expert directement.',
        ],
        default: [
            '📝 C\'est une excellente question! Un agent vous recontactera avec plus de détails.',
            '💭 Intéressant! Laissez-moi passer votre demande à nos experts.',
        ]
    };
    const chatToggle = document.getElementById('chatToggle');
    const chatBubble = document.getElementById('chatBubble');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatTabs = document.querySelectorAll('.chat-tab-v3');
    const chatTabContents = document.querySelectorAll('.chat-tab-content-v3');
    const faqItems = document.querySelectorAll('.faq-item');

    let chatOpen = false;
    let messageCount = 0;
    let userData = {
        name: 'Voyageur',
        email: '',
        history: []
    };

    // 3️⃣ GESTION DU CHAT
    chatToggle.addEventListener('click', () => {
        chatOpen = !chatOpen;
        chatBubble.classList.toggle('open', chatOpen);
        if (chatOpen) {
            chatInput.focus();
            document.getElementById('notificationBadge').style.display = 'none';
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatOpen = false;
        chatBubble.classList.remove('open');
    });

    // Onglets
    chatTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            chatTabs.forEach(t => t.classList.remove('active'));
            chatTabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // FAQ avec animation
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    i.querySelector('span').textContent = '➕';
                }
            });
            item.classList.toggle('active');
            const icon = item.querySelector('span');
            icon.textContent = item.classList.contains('active') ? '➖' : '➕';
        });
    });

    // Actions footer
    document.getElementById('starBtn')?.addEventListener('click', () => {
        alert('⭐ Conversation marquée comme favorite!');
    });

    document.getElementById('downloadBtn')?.addEventListener('click', () => {
        downloadChat();
    });

    document.getElementById('settingsBtn')?.addEventListener('click', () => {
        alert('⚙️ Paramètres du chat');
    });

    // 4️⃣ SYSTÈME DE MESSAGES AVANCÉ
    function formatTime() {
        const now = new Date();
        return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    function addMessage(text, type = 'user', isHTML = false) {
        const msg = document.createElement('div');
        msg.className = `message-${type}`;
        const avatar = type === 'user' ? '👑' : '✨';
        
        const messageHTML = isHTML ? text : `<p class="message-text">${text}</p>`;
        
        msg.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div class="message-content">
                ${messageHTML}
                <span class="message-time">${formatTime()}</span>
            </div>
        `;
        
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        userData.history.push({ type, text, time: formatTime() });
        messageCount++;
    }

    function getRandomResponse(category) {
        const responses = botResponses[category];
        return responses ? responses[Math.floor(Math.random() * responses.length)] : 
               botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }

    function analyzeMessage(text) {
        const lowerText = text.toLowerCase().trim();
        
        // Chercher les mots-clés
        for (const [category, keywords] of Object.entries(conversationDatabase.questions)) {
            if (keywords.some(kw => lowerText.includes(kw))) {
                return botResponses[category];
            }
        }
        
        // Salutations
        if (conversationDatabase.greetings.some(g => lowerText.includes(g))) {
            return botResponses.greetings;
        }
        
        return botResponses.default;
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Message utilisateur
        addMessage(text, 'user');
        chatInput.value = '';
        chatInput.focus();

        // Indicateur de saisie
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Délai réaliste
        const delay = 800 + Math.random() * 700;
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            
            const responses = analyzeMessage(text);
            const reply = Array.isArray(responses) ? 
                responses[Math.floor(Math.random() * responses.length)] : 
                responses;
            
            addMessage(reply, 'bot', reply.includes('\n'));
            
            // Notification si fermé
            if (!chatOpen) {
                document.getElementById('notificationBadge').style.display = 'flex';
            }
        }, delay);
    }

    function downloadChat() {
        const chatContent = userData.history
            .map(m => `[${m.time}] ${m.type === 'user' ? 'Vous' : 'Élégance'}: ${m.text}`)
            .join('\n');
        
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(chatContent));
        element.setAttribute('download', 'conversation_' + new Date().toISOString().split('T')[0] + '.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});
