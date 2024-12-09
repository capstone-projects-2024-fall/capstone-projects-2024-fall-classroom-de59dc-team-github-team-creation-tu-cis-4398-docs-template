export default function initKnightAnimation() {
    const canvas = document.getElementById("playerCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;


    class Knight {
        constructor (canvasWidth, canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.getElementById("playerAttack1");
            this.scale = 6
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth * this.scale;
            this.height = this.spriteHeight * this.scale;
            this.x = (canvasWidth - this.width) / 2;
            this.y = (canvasHeight - this.height) /2;
            this.minFrame = 0;
            this.maxFrame = 6;
            this.frameIndex = 0;
            // this.frameX = 1;
            this.tickCount = 0;
            this.ticksPerFrame = 10;
        }

        draw(context) {
            let sx = 16 + this.frameIndex * 96;
            // let sx =16+96+96+96;
            let sy = 16;
            let sWidth = 64;
            let sHeight = 64;
            context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            // context.drawImage(this.image, 0, 0);
        }
        update() {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                this.frameIndex = (this.frameIndex + 1) % 6;  // Cycle through frames
            }
        }
    }

    const knight = new Knight(canvas.width, canvas.height);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        knight.draw(ctx);
        knight.update();
        requestAnimationFrame(animate);
    }
    
    animate();
}