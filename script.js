// Параллакс эффектісі
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Таймлайн анимациясы
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline-section',
        start: 'top center'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3
});

// Картаны инициализациялау
const map = L.map('battleMap').setView([43.2389, 76.8897], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Тарихи оқиғалардың маркерлері
const battles = [
    { coords: [43.2389, 76.8897], title: "Алматы түбіндегі шайқас" },
    { coords: [51.1694, 71.4491], title: "Ақмола штурмы" }
];

battles.forEach(battle => {
    L.marker(battle.coords)
        .addTo(map)
        .bindPopup(battle.title);
});

// AI сұхбат функциясы
function askAI() {
    const userInput = document.getElementById('userInput').value;
    const chatHistory = document.getElementById('chatHistory');
    
    // Жауаптар базасы
    const answers = {
        "салам": "Сәлем! Мен Кенесары Қасымұлы туралы ақпарат беремін.",
        "неге соғыстың": "Ресей империясының жаулап алу саясатына қарсы күресу үшін!",
        "default": "Сұрағыңызға жауап бере алмаймын. Тарихшыларға хабарласыңыз."
    };

    const response = answers[userInput.toLowerCase()] || answers['default'];
    
    chatHistory.innerHTML += `
        <div class="user-message">${userInput}</div>
        <div class="ai-message">${response}</div>
    `;
    document.getElementById('userInput').value = '';
}

// Аудио ойнатқыш
function playAudio(type) {
    const audio = new Audio(`assets/audio/${type}.mp3`);
    audio.play();
}
