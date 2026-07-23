// ================= CONFETTI RAIN =================

function startConfetti() {

    const canvas = document.getElementById("confetti");
    if (!canvas) return;

    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            color: "hsl(" + Math.random() * 360 + ",100%,50%)"
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle);

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(draw);
    }

    draw();

    // stop after 4 seconds
    setTimeout(() => {
        canvas.style.display = "none";
    }, 4000);
}

// =========================
// FIREWORKS
// =========================

let fireworks;

function startFireworks() {
    const container = document.getElementById("fireworks");
    if (!container) return;

    if (!fireworks) {
        fireworks = new Fireworks.default(container, {
            rocketsPoint: {
                min: 10,
                max: 90
            },
            hue: {
                min: 0,
                max: 360
            },
            delay: {
                min: 15,
                max: 30
            },
            speed: 3,
            acceleration: 1.05,
            friction: 0.95,
            gravity: 1.2,
            particles: 80,
            traceLength: 4,
            traceSpeed: 10,
            explosion: 6,
            autoresize: true
        });
    }

    fireworks.start();

    // Stop after 4 seconds
    setTimeout(() => {
        fireworks.stop();
    }, 4000);
}