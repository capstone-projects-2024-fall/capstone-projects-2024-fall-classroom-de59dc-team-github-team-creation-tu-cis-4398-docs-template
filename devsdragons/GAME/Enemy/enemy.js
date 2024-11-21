export default function initDragonAnimation() {
    const canvas = document.getElementById("enemyCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 700;

    class Dragon {
        constructor(canvasWidth, canvasHeight, imageID, max){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 5;
            this.spriteWidth = 140;
            this.spriteHeight = 140;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width) / 2;
            this.y = (canvasHeight - this.height) / 2;
            this.tickCount = 0;
            this.ticksPerFrame = 10;
            this.changeAnimation('dragonIdle', 3); // Set defauly animation to idle
        }

        changeAnimation(state, frames) {
            this.image =  document.getElementById(state);
            this.maxFrame = frames;
            this.frameIndex = 0;
            this.playOnce = state !== 'dragonIdle'; // Only play once if not idle
        }

        draw(context) {
            context.drawImage(this.image, this.frameIndex * 140, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex >= this.maxFrame - 1 && this.playOnce) {
                    this.changeAnimation('dragonIdle', 3); // Revert to idle after playing once
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.maxFrame;  // Cycle through frames
                }
            }
        }
    }

    const dragon = new Dragon(canvas.width, canvas.height, "dragonIdle", 3);

    document.getElementById("idle").addEventListener("click", () => {
        dragon.changeAnimation('dragonIdle', 3);
    });
    document.getElementById("attack").addEventListener("click", () => {
        dragon.changeAnimation('dragonAttack', 15);
    });
    document.getElementById("hurt").addEventListener("click", () => {
        dragon.changeAnimation('dragonHurt', 3);
    });
    document.getElementById("death").addEventListener("click", () => {
        dragon.changeAnimation('dragonDeath', 4);
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dragon.draw(ctx);
        dragon.update();
        requestAnimationFrame(animate);
    }

    animate();

}