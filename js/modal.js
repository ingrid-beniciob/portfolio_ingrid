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

// Função para mostrar pop-up de notificação
function showNotification(message, type) {
    const popup = document.getElementById('notificationPopup');
    const messageElement = document.getElementById('popupMessage');
    const icon = document.getElementById('popupIcon');

    if (popup && messageElement && icon) {
        // Define a mensagem
        messageElement.textContent = message;

        // Define o ícone e estilo baseado no tipo
        if (type === 'success') {
            icon.textContent = '✓';
            popup.className = 'notification-popup success';
        } else {
            icon.textContent = '✕';
            popup.className = 'notification-popup error';
        }

        // Mostra o pop-up
        popup.style.display = 'flex';

        // Fecha automaticamente após 3 segundos
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }
}

// Função para fechar o pop-up manualmente
function closeNotification() {
    const popup = document.getElementById('notificationPopup');
    if (popup) {
        popup.style.display = 'none';
    }
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

    // Enviar para o backend - Agora funciona em todas as páginas pois há processa_form.php em pages/ também
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
                // Sucesso - mostrar pop-up de sucesso
                showNotification(data.message || 'Mensagem enviada com sucesso!', 'success');
                form.reset();

                // Fechar modal de contato após 1 segundo
                setTimeout(() => {
                    closeContactForm();
                }, 1000);

            } else {
                // Erro do servidor
                throw new Error(data.message || 'Erro ao enviar mensagem');
            }
        })
        .catch(error => {
            // Erro de rede ou do servidor
            showNotification(error.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
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