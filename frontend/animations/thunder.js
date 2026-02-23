class ThunderstormAnimation {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rain = new RainAnimation(ctx, canvas);
        this.lastLightning = 0;
        this.lightningActive = false;
        this.lightningOpacity = 0;
    }

    update() {
        this.rain.update();

        const now = Date.now();
        if (!this.lightningActive && Math.random() < 0.01 && now - this.lastLightning > 4000) {
            this.lightningActive = true;
            this.lightningOpacity = 1;
            this.lastLightning = now;
        }

        if (this.lightningActive) {
            this.lightningOpacity -= 0.03;
            if (this.lightningOpacity <= 0) {
                this.lightningActive = false;
            }
        }
    }

    draw() {
        // Draw lightning first
        if (this.lightningActive) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.lightningOpacity * 0.8})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Draw rain over lightning without clearing canvas
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        for (let drop of this.rain.drops) {
            this.ctx.lineWidth = drop.thick;
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
        }
        this.ctx.stroke();
    }
}
