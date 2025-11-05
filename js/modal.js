/*Torna o modal e o overlay visível*/
function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Fechar modal clicando no overlay
document.getElementById('overlay').addEventListener('click', closeContactForm);

// Fechar com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactForm();
    }

    // No final do seu script, adicione:
document.getElementById('openModalBtn').addEventListener('click', openContactForm);
});