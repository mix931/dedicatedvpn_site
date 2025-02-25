const canvas = document.getElementById("rocketCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rockets = [];
const numRockets = 5; // Количество ракет

// Загружаем изображение ракеты из корневого каталога
const rocketImg = new Image();
rocketImg.src = "/rocket.png"; // Абсолютный путь к картинке в корне репозитория

class Rocket {
    constructor() {
        this.x = Math.random() * 100; // Рандомный старт в левом углу
        this.y = canvas.height + Math.random() * 50;
        this.speed = Math.random() * 2 + 2; // Скорость от 2 до 4
        this.angle = Math.random() * 10 + 35; // Угол движения
        this.size = Math.random() * 30 + 20; // Размер ракеты
        this.trail = []; // Хвост ракеты
    }

    update() {
        let radian = (this.angle * Math.PI) / 180;
        this.x += Math.cos(radian) * this.speed;
        this.y -= Math.sin(radian) * this.speed;

        // Добавляем точки хвоста
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 15) {
            this.trail.shift(); // Оставляем только последние 15 точек
        }

        // Удаляем ракету, если она вышла за экран
        if (this.y < -50 || this.x > canvas.width + 50) {
            this.reset();
        }
    }

    draw() {
        // Рисуем хвост
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            let opacity = i / this.trail.length;
            ctx.fillStyle = `rgba(255, 165, 0, ${opacity})`; // Оранжевый хвост
            ctx.arc(this.trail[i].x, this.trail[i].y, i / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Рисуем ракету, если изображение загружено
        if (rocketImg.complete) {
            ctx.drawImage(rocketImg, this.x, this.y, this.size, this.size);
        }
    }

    reset() {
        this.x = Math.random() * 100;
        this.y = canvas.height + Math.random() * 50;
        this.speed = Math.random() * 2 + 2;
        this.angle = Math.random() * 10 + 35;
        this.size = Math.random() * 30 + 20;
        this.trail = [];
    }
}

// Создаем ракеты
for (let i = 0; i < numRockets; i++) {
    rockets.push(new Rocket());
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rockets.forEach((rocket) => {
        rocket.update();
        rocket.draw();
    });

    requestAnimationFrame(animate);
}

// Запускаем анимацию, когда изображение ракеты загружено
rocketImg.onload = animate;
