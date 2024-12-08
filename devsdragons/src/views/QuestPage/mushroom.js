export default function initMushRoomAnimation(adjust_y) {
    const canvas = document.getElementById("enemyCanvas");
    console.log("Canvas is being drawn to:", canvas);
    console.log("Adjust Y passed to Mushroom:", adjust_y);
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class Mushroom {
        constructor(canvasWidth, canvasHeight, imageID, max, adjust_y){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 5;
            this.spriteWidth = 80;
            this.spriteHeight = 64;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width)/ 5;
            this.y = (canvasHeight - this.height) - adjust_y;
            this.tickCount = 0;
            this.ticksPerFrame = 7;
            this.maxFrame = max;
            this.currentAnimation = "mushroomIdle";
            this.changeAnimation("mushroomIdle", 7);
        }

        changeAnimation(state, frames) {
            this.image = document.getElementById(state);
            this.maxFrame = frames;
            this.frameIndex = 0;
            this.playOnce = state !== 'mushroomIdle'; // Only play once if not Idle
            this.currentAnimation = state;
        }

        draw(context) {
            // context.drawImage(this.image, this.frameIndex * 160, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameIndex * 80, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex >= this.maxFrame - 1 && this.playOnce) {
                    if (this.currentAnimation === 'mushroomDeath') {
                        // Stay on the last frame of the death animation
                        this.frameIndex = this.maxFrame - 1;
                    } else {
                        this.changeAnimation('mushroomIdle', 7); // Revert to idle after playing once
                    }
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.maxFrame;  // Cycle through frames
                }
            }
        }
    }

    const mushroom = new Mushroom(canvas.width, canvas.height, "mushroomIdle", 7, adjust_y);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mushroom.draw(ctx);
        mushroom.update();
        requestAnimationFrame(animate);
    }

    animate();

    return mushroom; // Return the Mushroom instance
}