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

// Event listener para o formulário
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch('processa_form.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        showSuccessModal(data.message);
                        form.reset();
                        closeContactForm();
                    } else {
                        showErrorModal(data.message);
                    }
                })
                .catch(error => {
                    showErrorModal('Erro ao enviar mensagem. Tente novamente.');
                    console.error('Erro:', error);
                });
        });
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