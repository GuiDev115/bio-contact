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


document.querySelector('#contact form').addEventListener('submit', async (e) => {
    e.preventDefault();
    

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
    

    try {

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });
        
        if (response.ok) {
            showMessage('Mensagem enviada com sucesso!');
            clearForm();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        showMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', true);
        console.error('Erro:', error);
    }
});

['name', 'email', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        const errorMessages = document.querySelectorAll('.bg-red-500');
        errorMessages.forEach(msg => msg.remove());
    });
});