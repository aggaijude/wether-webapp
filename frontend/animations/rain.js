class RainAnimation {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.drops = [];
        this.init();
    }

    init() {
        // Adjust drops count based on screen size
        const numDrops = Math.floor((this.canvas.width * this.canvas.height) / 3000);
        for (let i = 0; i < numDrops; i++) {
            this.drops.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 10 + 10,
                thick: Math.random() * 2 + 1
            });
        }
    }

    update() {
        for (let drop of this.drops) {
            drop.y += drop.speed;
            if (drop.y > this.canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.canvas.width;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        for (let drop of this.drops) {
            this.ctx.lineWidth = drop.thick;
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
        }
        this.ctx.stroke();
    }
}
