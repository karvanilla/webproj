const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let shapes = [];
function createShapes() {
    shapes = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width, // Рандомная позиция по X
        y: Math.random() * canvas.height, // Рандомная позиция по Y
        size: Math.random() * 20 + 5, // Рандомный размер
        color: `hsl(${Math.random() * 60 + 180}, ${Math.random() * 50 + 50}%, ${Math.random() * 50 + 50}%)`,
        dx: Math.random() * 2 - 1, // Рандомная скорость по X
        dy: Math.random() * 2 - 1, // Рандомная скорость по Y
    }));
}

function handleResize() {
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    resizeCanvas();

    const widthRatio = canvas.width / oldWidth;
    const heightRatio = canvas.height / oldHeight;

    shapes.forEach((shape) => {
        shape.x *= widthRatio;
        shape.y *= heightRatio;
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fillStyle = shape.color;
        ctx.fill();
        shape.x += shape.dx;
        shape.y += shape.dy;

        if (shape.x < 0 || shape.x > canvas.width) shape.dx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.dy *= -1;
    });
    requestAnimationFrame(animate);
}

resizeCanvas();
createShapes();

window.addEventListener("resize", handleResize);
animate();
