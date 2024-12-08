export default function initGameEnemyAnimation(adjust_y) {
    const canvas = document.getElementById("enemyCanvas");
    console.log("Canvas is being drawn to:", canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class Dragon {
        constructor(canvasWidth, canvasHeight, imageID, max, adjust_y){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 5;
            this.spriteWidth = 140;
            this.spriteHeight = 140;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width);
            this.y = (canvasHeight - this.height) / adjust_y;
            this.tickCount = 0;
            this.ticksPerFrame = 10;
            this.maxFrame = max;
            this.currentAnimation = "dragonIdle";
            this.changeAnimation('dragonIdle', 3); // Set default animation to idle
        }

        changeAnimation(state, frames) {
            this.image =  document.getElementById(state);
            this.maxFrame = frames;
            this.frameIndex = 0;
            this.playOnce = state !== 'dragonIdle'; // Only play once if not idle
            this.currentAnimation = state;
        }

        draw(context) {
            context.drawImage(this.image, this.frameIndex * 140, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex >= this.maxFrame - 1 && this.playOnce) {
                    if (this.currentAnimation === 'dragonDeath') {
                        // Stay on the last frame of the death animation
                        this.frameIndex = this.maxFrame - 1;
                    } else {
                        this.changeAnimation('dragonIdle', 3); // Revert to idle after playing once
                    }
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.maxFrame;  // Cycle through frames
                }
            }
        }
    }

    const dragon = new Dragon(canvas.width, canvas.height, "dragonIdle", 3, adjust_y);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dragon.draw(ctx);
        dragon.update();
        requestAnimationFrame(animate);
    }

    animate();

    return dragon; // Return the Dragon instance
}
