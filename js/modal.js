// Função para abrir o modal de contato
function openContactForm() {
    // Fecha o menu hambúrguer se estiver aberto (fix bug mobile)
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    document.getElementById('contactModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Função para fechar o modal de contato
function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Função para mostrar modal de sucesso
function showSuccessModal(message) {
    const modal = document.getElementById('notificationModal');
    const messageElement = document.getElementById('notificationMessage');

    if (modal && messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'notification-message success';
        modal.style.display = 'block';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
    } else {
        alert(message); // Fallback caso o modal não exista
    }
}

// Função para mostrar modal de erro
function showErrorModal(message) {
    const modal = document.getElementById('notificationModal');
    const messageElement = document.getElementById('notificationMessage');

    if (modal && messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'notification-message error';
        modal.style.display = 'block';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);
    } else {
        alert(message); // Fallback
    }
}

// Função para mostrar tela de sucesso
function showSuccessScreen() {
    document.getElementById('successScreen').style.display = 'flex';
}

// Função para fechar tela de sucesso
function closeSuccessScreen() {
    document.getElementById('successScreen').style.display = 'none';
}

// Função para enviar o formulário
function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formData = new FormData(form);
    
    // Mostrar estado de carregamento
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Enviar para o backend
    fetch('processa_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // Sucesso - mostrar modal de sucesso
            showSuccessModal(data.message || 'Mensagem enviada com sucesso!');
            form.reset();
            
            // Fechar modal de contato e mostrar tela de sucesso
            setTimeout(() => {
                closeContactForm();
                showSuccessScreen();
            }, 2000);
            
        } else {
            // Erro do servidor
            throw new Error(data.message || 'Erro ao enviar mensagem');
        }
    })
    .catch(error => {
        // Erro de rede ou do servidor
        showErrorModal(error.message || 'Erro ao enviar mensagem. Tente novamente.');
        console.error('Erro:', error);
    })
    .finally(() => {
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Event listener para o formulário
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', submitForm);
    }

    // Fechar modal clicando no overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeContactForm);
    }

    // Fechar com ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeContactForm();
        }
    });

    // Adicionar listener ao botão de abrir modal se ele não estiver inline no HTML
    const openBtn = document.getElementById('openModalBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openContactForm);
    }
});