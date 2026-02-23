class CloudsAnimation {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.clouds = [];
        this.init();
    }

    init() {
        // Simple multiple overlap circles for clouds
        const numClouds = 8;
        for (let i = 0; i < numClouds; i++) {
            this.clouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * (this.canvas.height / 2),
                radius: Math.random() * 50 + 50,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.3 + 0.2
            });
        }
    }

    update() {
        for (let cloud of this.clouds) {
            cloud.x += cloud.speed;
            if (cloud.x - cloud.radius * 2 > this.canvas.width) {
                cloud.x = -cloud.radius * 2;
                cloud.y = Math.random() * (this.canvas.height / 2);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let cloud of this.clouds) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
            this.ctx.beginPath();

            // Draw a basic cloud shape
            this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.radius * 0.8, cloud.y - cloud.radius * 0.3, cloud.radius * 0.8, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.radius * 1.5, cloud.y, cloud.radius * 0.9, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.radius * 0.8, cloud.y + cloud.radius * 0.2, cloud.radius * 0.7, 0, Math.PI * 2);

            this.ctx.fill();
        }
    }
}
