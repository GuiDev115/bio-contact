// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg ${
        isError ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Previne o comportamento padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validação básica
            if (!name) {
                showMessage('Por favor, preencha seu nome', true);
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showMessage('Por favor, insira um email válido', true);
                return;
            }
            
            if (!message) {
                showMessage('Por favor, escreva uma mensagem', true);
                return;
            }

            // Parâmetros para o template do EmailJS
            const templateParams = {
                from_name: name,
                message: message,
                email: email
            };

            try {
                // Adiciona um indicador visual de carregamento
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;

                const response = await emailjs.send(
                    "service_ipfapm1",
                    "template_6mtvsw9",
                    templateParams
                );

                if (response.status === 200) {
                    showMessage('Mensagem enviada com sucesso!');
                    clearForm();
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            } catch (error) {
                console.error('Erro:', error);
                showMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', true);
            } finally {
                // Restaura o botão ao estado original
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            }
        });

        // Remove mensagens de erro quando o usuário começa a digitar
        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id).addEventListener('input', function() {
                const errorMessages = document.querySelectorAll('.bg-red-500');
                errorMessages.forEach(msg => msg.remove());
            });
        });
    }
});