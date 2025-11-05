// Dados das habilidades
const skillsData = [
    {
        title: "Soft Skills",
        description: "Proatividade, liderança, comunicação, trabalho em equipe, resolução de problemas, pensamento crítico e motivação contínua para aprender com as melhores práticas"
    },
    {
        title: "Hard Skills", 
        description: "Java, Python, SQL, HTML5, CSS3, Redes de computadores, IoT, Prototipagem, Banco de dados Oracle"
    }
];

// Função para criar os cards de habilidades
function createSkillsCards() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        skillCard.innerHTML = `
            <h3>${skill.title}</h3>
            <p>${skill.description}</p>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', createSkillsCards);