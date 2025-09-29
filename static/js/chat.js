document.addEventListener('DOMContentLoaded', function() {
    
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    
    init();
    
    function init() {
        setupEventListeners();
        focusInput();
    }
    
   function setupEventListeners() {
        chatForm.addEventListener('submit', handleFormSubmit);
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
            }
        });
        
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
    
    function focusInput() {
        if (messageInput) {
            messageInput.focus();
        }
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;
        
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        await sendMessage(message);
    }
    
    async function sendMessage(message) {
        try {
            addUserMessage(message);

            await new Promise(resolve => setTimeout(resolve, 500));
            
            showTypingIndicator();
            scrollToBottom();
            
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            await new Promise(resolve => setTimeout(resolve, 1500));            
            hideTypingIndicator();
            
            if (data.status === 'success') {
                addBotMessage(data.response);
            } else {
                addBotMessage('Desculpe, houve um erro. Tente novamente.');
            }
            
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            hideTypingIndicator();
            addBotMessage('Desculpe, não consegui processar sua mensagem. Tente novamente.');
        }
        
        focusInput();
    }
    
    function addUserMessage(message) {
        const messageElement = createMessageElement(message, 'user');
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addBotMessage(message) {
        const messageElement = createMessageElement(message, 'bot');
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const timestamp = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble user-bubble">
                        <p>${escapeHtml(message)}</p>
                        <small class="message-time">${timestamp}</small>
                    </div>
                </div>
                <div class="message-avatar">
                    <div class="avatar user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar bot-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                </div>
                <div class="message-content">
                    <div class="message-bubble bot-bubble">
                        <p>${formatBotMessage(message)}</p>
                        <small class="message-time">${timestamp}</small>
                    </div>
                </div>
            `;
        }
        
        return messageDiv;
    }
    
    function formatBotMessage(message) {
        let formatted = escapeHtml(message).replace(/\n/g, '<br>');
        
        if (formatted.includes('•')) {
            const lines = formatted.split('<br>');
            let inList = false;
            let result = [];
            
            for (let line of lines) {
                line = line.trim();
                if (line.startsWith('•')) {
                    if (!inList) {
                        result.push('<ul class="bot-list">');
                        inList = true;
                    }
                    result.push(`<li>${line.substring(1).trim()}</li>`);
                } else {
                    if (inList) {
                        result.push('</ul>');
                        inList = false;
                    }
                    if (line) {
                        result.push(line);
                    }
                }
            }
            
            if (inList) {
                result.push('</ul>');
            }
            
            formatted = result.join('<br>');
        }
        
        return formatted;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
        }
    }
    
    function hideTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }
    
    function scrollToBottom() {
        requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
    
    setTimeout(() => {
        const exampleBotResponse = "Qual a sua duvida hoje?";
        addBotMessage(exampleBotResponse);
    }, 1000);
    
});
