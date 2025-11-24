document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    
    // список ников/фраз для цикла
    const nicknames = [
        "qqracha",
        "ruberoid",
        "cascade",
        "ruber",
    ];
    
    let currentIndex = 0;
    
    if (logo) {
        logo.addEventListener('click', () => {
            // меняем ник
            currentIndex = (currentIndex + 1) % nicknames.length;
            const qqrachaElement = logo.querySelector('.qqracha');
            if (qqrachaElement) {
                qqrachaElement.textContent = nicknames[currentIndex];
            }
        });
    }
});

// подпрыгивание и конфетти для всех бейджей
document.querySelectorAll('.noclick').forEach(badge => {
    badge.addEventListener('click', () => {
        // запускаем анимацию прыжка
        badge.style.animation = 'bounce-spin 0.8s ease-in';
        badge.addEventListener('animationend', () => {
            badge.style.animation = '';
        }, { once: true });
        
        // запускаем конфетти
        launchConfetti();
    });
});

// простое конфетти
function launchConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
        
        // анимация падения
        const fallDuration = 2000 + Math.random() * 1000;
        confetti.animate(
            [
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ],
            { duration: fallDuration, easing: 'ease-out' }
        );
        
        // удаляем элемент после анимации
        setTimeout(() => confetti.remove(), fallDuration);
    }
}

// ========== API ИНТЕГРАЦИЯ ==========

// Счётчик визитов
async function updateVisitCount() {
    try {
        const response = await fetch('/api/visits');
        const data = await response.json();
        
        const visitElement = document.getElementById('visit-count');
        if (visitElement) {
            visitElement.textContent = `👁️ ${data.count} визитов`;
            visitElement.style.color = '#DCFBB2';
        }
        console.log('✅ Счётчик обновлён:', data.count);
    } catch (error) {
        console.error('❌ Ошибка загрузки счётчика:', error);
        const visitElement = document.getElementById('visit-count');
        if (visitElement) {
            visitElement.textContent = '👁️ Ошибка';
        }
    }
}

// Статус онлайн
async function updateStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = `🟢 ${data.status}`;
            statusElement.title = `Время сервера: ${data.server_time}`;
            statusElement.style.color = '#DCFBB2';
        }
        console.log('✅ Статус обновлён:', data.status);
    } catch (error) {
        console.error('❌ Ошибка загрузки статуса:', error);
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = '🔴 offline';
        }
    }
}

// Запускаем при загрузке страницы
window.addEventListener('load', () => {
    console.log('🚀 Страница загружена, запускаем API...');
    
    // Обновляем счётчик визитов
    updateVisitCount();
    
    // Обновляем статус
    updateStatus();
    
    // Обновлять статус каждые 30 секунд
    setInterval(updateStatus, 30000);
});
