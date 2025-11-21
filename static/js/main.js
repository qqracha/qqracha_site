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

  logo.addEventListener('click', () => {
    // меняем ник
    currentIndex = (currentIndex + 1) % nicknames.length;
    logo.querySelector('.qqracha').textContent = nicknames[currentIndex];
  });
});

  // небольшая скрытая пасхалка: сочетание клавиш (g then e then o) покажет географическую фразу
  let buf="";
  window.addEventListener('keydown', (ev)=>{
    buf += ev.key.toLowerCase();
    if(buf.endsWith('geo')){
      const el = document.createElement('div');
      el.textContent = "geo: Somewhere on the internet";
      Object.assign(el.style, {
        position:'fixed', right:'10px', bottom:'10px',
        background:'rgba(10,10,10,0.85)', color:'#fff', padding:'8px 10px', borderRadius:'6px', zIndex:2000
      });
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 3000);
      buf = "";
    }
    if(buf.length > 10) buf = buf.slice(-6);
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

  // don't do heavy stuff -> keep it light