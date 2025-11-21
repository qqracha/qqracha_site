const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const confettiParticles = [];

// resize canvas
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// клик мыши — компактный взрыв конфетти
document.addEventListener('click', e => {
  createConfetti(e.clientX, e.clientY);
});

// создаём конфетти
function createConfetti(x, y) {
  const count = 15; // уменьшили количество частиц
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 3 + 1; // уменьшили скорость
    confettiParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5, // немного подбрасываем вверх
      size: Math.random() * 4 + 2,       // немного меньше частицы
      alpha: 1,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 5      // вращение меньше
    });
  }
}

// анимация
function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];

    // движение
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12; // немного слабее гравитация
    p.rotation += p.vr;
    p.alpha -= 0.02; // исчезают чуть быстрее

    // рисуем частицу
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = `rgba(220, 251, 178, ${p.alpha})`;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    ctx.restore();

    if (p.alpha <= 0) confettiParticles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();
