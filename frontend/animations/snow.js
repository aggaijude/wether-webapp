class SnowAnimation {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.flakes = [];
        this.init();
    }

    init() {
        const numFlakes = Math.floor((this.canvas.width * this.canvas.height) / 4000);
        for (let i = 0; i < numFlakes; i++) {
            this.flakes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                density: Math.random() * 40,
                speed: Math.random() * 1 + 0.5,
                angle: Math.random() * Math.PI * 2
            });
        }
    }

    update() {
        for (let flake of this.flakes) {
            flake.angle += 0.01;
            flake.y += flake.speed;
            flake.x += Math.sin(flake.angle) * 0.5;

            if (flake.y > this.canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * this.canvas.width;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        for (let flake of this.flakes) {
            this.ctx.moveTo(flake.x, flake.y);
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
        }
        this.ctx.fill();
    }
}
