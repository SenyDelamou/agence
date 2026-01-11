// Système de chat flottant unique
document.addEventListener('DOMContentLoaded', function() {
    // Créer le widget de chat flottant
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-bubble" id="chatBubble">
            <div class="chat-header-widget">
                <h3>💬 Assistance</h3>
                <button class="close-chat" id="closeChatBtn">×</button>
            </div>
            <div class="chat-messages-widget" id="chatMessagesWidget">
                <div class="message-bot">
                    <p>Bonjour ! 👋 Comment puis-je vous aider ?</p>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chatInput" placeholder="Écrivez votre message..." class="chat-message-input">
                <button id="sendChatBtn" class="send-btn">Envoyer</button>
            </div>
            <div class="chat-footer-widget">
                <a href="messenger.html" class="full-chat-link">💬 Ouvrir messagerie complète</a>
            </div>
        </div>
        <button class="chat-toggle" id="chatToggle" title="Ouvrir le chat">
            <span class="chat-icon">💬</span>
            <span class="notification-badge" id="notificationBadge" style="display: none;">1</span>
        </button>
    `;
    document.body.appendChild(chatWidget);

    // Variables
    const chatToggle = document.getElementById('chatToggle');
    const chatBubble = document.getElementById('chatBubble');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessagesWidget = document.getElementById('chatMessagesWidget');
    const notificationBadge = document.getElementById('notificationBadge');

    // États du chat
    let chatOpen = false;
    let unreadMessages = 0;

    // Charger les messages du localStorage
    function loadChatHistory() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            const messages = JSON.parse(saved);
            chatMessagesWidget.innerHTML = '';
            messages.forEach(msg => {
                addMessageToWidget(msg.text, msg.type);
            });
        }
    }

    // Sauvegarder les messages
    function saveChatHistory() {
        const messages = [];
        document.querySelectorAll('#chatMessagesWidget .message-user, #chatMessagesWidget .message-bot').forEach(msg => {
            const text = msg.querySelector('p').textContent;
            const type = msg.classList.contains('message-user') ? 'user' : 'bot';
            messages.push({ text, type });
        });
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    // Ajouter un message au widget
    function addMessageToWidget(text, type = 'user') {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'message-user' : 'message-bot';
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessagesWidget.appendChild(messageDiv);
        chatMessagesWidget.scrollTop = chatMessagesWidget.scrollHeight;
    }

    // Réponses automatiques du bot
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        const responses = {
            'bonjour|salut|coucou': 'Bonjour ! 👋 Comment puis-je vous aider ?',
            'reservation|réservation|book': 'Je peux vous aider avec vos réservations. Avez-vous une question spécifique ?',
            'prix|coût|tarif': 'Pour connaître les tarifs précis, veuillez consulter nos offres ou contactez directement notre équipe.',
            'destination|voyage|tour': 'Nous proposons plus de 50 destinations ! Laquelle vous intéresse ?',
            'contact|téléphone|email': 'Vous pouvez nous contacter à : contact@voyageelegance.gn ou +224 XXX XX XX XX',
            'horaire|heures|ouverture': 'Nous sommes ouverts 24/7 pour vous assister ! 🎯',
            'merci|thanks': 'De rien ! N\'hésitez pas si vous avez d\'autres questions. 😊',
            'au revoir|bye|adieu': 'À bientôt ! Bon voyage ! ✈️',
            'default': 'Merci pour votre message ! 📝 Pour des questions plus détaillées, veuillez ouvrir la messagerie complète.'
        };

        for (const [keywords, response] of Object.entries(responses)) {
            if (keywords.split('|').some(keyword => lowerMessage.includes(keyword))) {
                return response;
            }
        }
        return responses.default;
    }

    // Basculer le chat
    chatToggle.addEventListener('click', function() {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatBubble.classList.add('open');
            chatInput.focus();
            unreadMessages = 0;
            notificationBadge.style.display = 'none';
        } else {
            chatBubble.classList.remove('open');
        }
    });

    // Fermer le chat
    closeChatBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        chatOpen = false;
        chatBubble.classList.remove('open');
    });

    // Envoyer un message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessageToWidget(message, 'user');
        chatInput.value = '';

        // Simuler une réponse du bot
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessageToWidget(botResponse, 'bot');
            saveChatHistory();
        }, 500);
    }

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Charger l'historique au démarrage
    loadChatHistory();

    // Fermer le chat quand on clique en dehors
    document.addEventListener('click', function(e) {
        if (!chatWidget.contains(e.target) && chatOpen) {
            chatOpen = false;
            chatBubble.classList.remove('open');
        }
    });
});
