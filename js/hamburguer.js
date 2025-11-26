document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Toggle menu ao clicar no botão hambúrguer
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita que o clique propague para o document
        toggleMenu();
    });

    // Fechar menu ao clicar em qualquer link ou botão dentro do menu
    const navLinks = navMenu.querySelectorAll('a, button');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function (e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});