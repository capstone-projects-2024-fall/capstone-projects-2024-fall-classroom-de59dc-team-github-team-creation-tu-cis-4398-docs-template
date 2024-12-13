class NPC2 {
    constructor({
      x,
      y,
      size,
      imageSrc,
      sprites,
      health = 3,
    }) {
      this.x = x;
      this.y = y;
      this.width = size;
      this.height = size;
      this.center = {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
      };
  
      this.loaded = false;
      this.image = new Image();
      this.image.onload = () => {
        this.loaded = true;
      };
      this.image.src = imageSrc;
      this.currentFrame = 0;
      this.elapsedTime = 0;
      this.sprites = sprites;
  
      this.currentSprite = Object.values(this.sprites)[0];
      this.health = health;
      this.isInvincible = true;
      this.elapsedInvincibilityTime = 0;
      this.invincibilityInterval = 0.3;
    }
  
    draw(c) {
        if (!this.loaded) return;
      
        let alpha = 1;
        if (this.isInvincible) alpha = 0.5;
      
        c.save();
        c.globalAlpha = alpha;
        c.drawImage(
          this.image,
          this.currentSprite.x,
          this.currentSprite.height * this.currentFrame + 1,
          this.currentSprite.width,
          this.currentSprite.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
        c.restore(); // Ensure globalAlpha is reset
      }
      
  
    update(deltaTime, player, onCollision) {
      if (!deltaTime) return;
    
      this.elapsedTime += deltaTime;
    
      // Handle invincibility timer
      if (this.isInvincible) {
        this.elapsedInvincibilityTime += deltaTime;
    
        if (this.elapsedInvincibilityTime >= this.invincibilityInterval) {
          this.isInvincible = false;
          this.elapsedInvincibilityTime = 0;
        }
      }
    
      // Animate sprite to idle state
      const intervalToGoToNextFrame = 0.15;
      if (this.elapsedTime > intervalToGoToNextFrame) {
        this.currentFrame = 0;
      }
    
      // Check for collision with player
      if (this.checkPlayerCollision(player)) {
        if (onCollision) onCollision(this); // Trigger collision callback
      }
    }
      
  
    checkPlayerCollision(player) {
      return (
        this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y
      );
    }
  }
  