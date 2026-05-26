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
