class ClearAnimation {
    constructor(ctx, canvas, isDay) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.isDay = isDay;
        this.stars = [];
        this.init();
    }

    init() {
        if (!this.isDay) {
            const numStars = 200;
            for (let i = 0; i < numStars; i++) {
                this.stars.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: Math.random() * 1.5,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * 0.05 + 0.01
                });
            }
        }
    }

    update() {
        if (!this.isDay) {
            for (let star of this.stars) {
                star.opacity += star.twinkleSpeed;
                if (star.opacity > 1 || star.opacity < 0) {
                    star.twinkleSpeed = -star.twinkleSpeed;
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.isDay) {
            // Draw Sun
            this.ctx.fillStyle = 'rgba(255, 235, 59, 1)';
            this.ctx.shadowBlur = 80;
            this.ctx.shadowColor = 'rgba(255, 235, 59, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width * 0.8, this.canvas.height * 0.2, 60, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0; // reset
        } else {
            // Draw Moon
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.shadowBlur = 40;
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width * 0.8, this.canvas.height * 0.2, 50, 0, Math.PI * 2);
            this.ctx.fill();

            // Moon crater/shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width * 0.8 - 15, this.canvas.height * 0.2 - 10, 50, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.shadowBlur = 0; // reset

            // Draw Stars
            for (let star of this.stars) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}
