export default function initGamePlayerAnimation(adjust_y) {
    const canvas = document.getElementById("playerCanvas");
    if (!canvas) return null; // Return null if canvas is not found
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class Knight {
        constructor(canvasWidth, canvasHeight, imageID, max, adjust_y) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById(imageID);
            this.scale = 5;
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width) / 2;
            this.y = canvasHeight - this.height + adjust_y;
            this.tickCount = 0;
            this.ticksPerFrame = 5;
            this.maxFrame = max;
            this.frameIndex = 0;
            this.playOnce = false;
            this.changeAnimation("playerIdle", 7);
        }

        changeAnimation(state, frames) {
            this.image = document.getElementById(state);
            this.maxFrame = frames;
            this.frameIndex = 0;
            this.playOnce = state !== "playerIdle";
        }

        draw(context) {
            let sx = 16 + this.frameIndex * 96;
            let sy = 16;
            context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex >= this.maxFrame - 1 && this.playOnce) {
                    this.changeAnimation("playerIdle", 7); // Revert to idle animation after playOnce
                } else {
                    this.frameIndex = (this.frameIndex + 1) % this.maxFrame;
                }
            }
        }
    }

    const knight = new Knight(canvas.width, canvas.height, "playerIdle", 7, adjust_y);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        knight.draw(ctx);
        knight.update();
        requestAnimationFrame(animate);
    }
    animate();
    return knight; // Return the Knight instance
}

