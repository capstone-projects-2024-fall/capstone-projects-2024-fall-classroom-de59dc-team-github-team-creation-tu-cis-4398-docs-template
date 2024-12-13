const X_VELOCITY = 150
const Y_VELOCITY = 150

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 }, initialItems = [], gold = 100  }) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.velocity = velocity
    this.inventory = initialItems;
    this.gold = gold; // Player's starting gold
    this.inventory = initialItems.length > 0 ? initialItems : [
      new Item({ name: "Health Potion", type: "Potion", description: "A strange liquid that gives you 1 heart" }),
      new Item({ name: "Lance of Destiny", type: "Weapon", description: "A powerful lance with a legendary history.." })
    ];
    this.inventoryCapacity = 10; // Set capacity limit for inventory
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }
    this.health = 3

    this.worldState = localStorage.getItem("worldState")
    this.loaded = false
    this.image = new Image()
    this.image.onload = () => {
      this.loaded = true
    }
    this.image.src = './images/player.png'

    // Player weapon
    this.weaponSpriteHasLoaded = false
    this.weaponSprite = new Image()
    this.weaponSprite.onload = () => {
      this.weaponSpriteHasLoaded = true
    }
    this.weaponSprite.src = './images/lance.png'

    this.currentFrame = 0
    this.elapsedTime = 0
    this.sprites = {
      walkDown: {
        x: 0,
        y: 0,
        width: 16,
        height: 16,
        frameCount: 4,
      },
      walkUp: {
        x: 16,
        y: 0,
        width: 16,
        height: 16,
        frameCount: 4,
      },
      walkLeft: {
        x: 32,
        y: 0,
        width: 16,
        height: 16,
        frameCount: 4,
      },
      walkRight: {
        x: 48,
        y: 0,
        width: 16,
        height: 16,
        frameCount: 4,
      },
      attackDown: {
        x: 0,
        y: 64,
        width: 16,
        height: 15,
        frameCount: 1,
      },
      attackUp: {
        x: 16,
        y: 64,
        width: 16,
        height: 15,
        frameCount: 1,
      },
      attackLeft: {
        x: 32,
        y: 64,
        width: 16,
        height: 15,
        frameCount: 1,
      },
      attackRight: {
        x: 48,
        y: 64,
        width: 16,
        height: 15,
        frameCount: 1,
      },
    }

    this.currentSprite = this.sprites.walkDown
    this.facing = 'down'
    this.isAttacking = false
    this.attackTimer = 0

    this.attackBoxes = {
      right: {
        xOffset: 10,
        yOffset: 9,
        width: 20,
        height: 5,
      },
      left: {
        xOffset: -16,
        yOffset: 9,
        width: 20,
        height: 5,
      },
      up: {
        xOffset: 2,
        yOffset: -15,
        width: 5,
        height: 20,
      },
      down: {
        xOffset: 2,
        yOffset: 10,
        width: 5,
        height: 20,
      },
    }

    this.attackBox = {
      x: this.x + this.attackBoxes[this.facing].xOffset,
      y: this.y + this.attackBoxes[this.facing].yOffset,
      width: this.attackBoxes[this.facing].width,
      height: this.attackBoxes[this.facing].height,
    }

    this.hasHitEnemy = false
    this.isInvincible = false
    this.elapsedInvincibilityTime = 0
    this.invincibilityInterval = 0.8
  }


  usePotion() {
 // Find the index of a Health Potion in the inventory
 const potionIndex = this.inventory.findIndex(item => item.name === "Health Potion");

 if (potionIndex === -1) {
   console.warn("No potion available in inventory!");
   showDialogueBox("You don't have any health potions!");
   return false;
 }

 if (this.health >= this.maxHealth) { // Assuming max health is defined
   console.warn("Health is already full!");
   showDialogueBox("Your health is already full!");
   return false;
 }

 // Remove the potion from the inventory
 this.inventory.splice(potionIndex, 1);

 // Restore health
 this.health = Math.min(this.health + 1, 3); // Ensure health doesn't exceed max
 updateHealthUI(this.health); // Update the UI to reflect new health
 toggleInventoryBox(); // Refresh inventory UI if it's open

 showDialogueBox("You used a Health Potion and restored 1 health!");
 return true;
  }
  
  // Function to add items
  addItem(item) {
    if (this.inventory.length >= this.inventoryCapacity) {
      console.warn("Inventory is full! Cannot add item:", item.name);
      return false;
    }
    this.inventory.push(item); // Push item to inventory
    return true;
  }
  
  buyItem(item) {
    if (this.inventory.length >= this.inventoryCapacity) {
      console.warn("Inventory is full! Cannot add item:", item.name);
      return false;
    }
  
    if (this.currentGold < item.price) {
      console.warn("Not enough gold to buy this item:", item.name);
      showDialogueBox(`You don't have enough gold to buy ${item.name}!`);
      return false;
    }
  
    this.currentGold -= item.price; // Deduct item price from gold
    localStorage.setItem('gold', this.currentGold); // Update in localStorage
    this.inventory.push(item);
    showDialogueBox(`You bought ${item.name} for ${item.price} gold!`);
  
    // Optionally, update gold amount via API
    const data = {
      email: localStorage.getItem('email'),
      currentGold: this.currentGold,
    };
    fetch("http://127.0.0.1:5000/api/updatePlayerGold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to update gold");
        return response.json();
      })
      .then(() => {
        updateGoldAmount(); // Update UI
      })
      .catch(error => console.error("Error updating gold:", error));
  
    return true;
  }
  
  removeItem(itemName) {
    const index = this.inventory.findIndex(item => item.name === itemName);
    if (index === -1) {
      inspectBox(`Item ${itemName} not found in inventory.`);
      return false;
    }
    this.inventory.splice(index, 1);
    inspectBox(`Removed item: ${itemName}`);
    return true;
  }

  receiveHit() {
    if (this.isInvincible) return
    this.health--;
    this.isInvincible = true
  }

  switchBackToIdleState() {
    switch (this.facing) {
      case 'down':
        this.currentSprite = this.sprites.walkDown
        break
      case 'up':
        this.currentSprite = this.sprites.walkUp
        break
      case 'right':
        this.currentSprite = this.sprites.walkRight
        break
      case 'left':
        this.currentSprite = this.sprites.walkLeft
        break
    }
  }

  attack() {
    switch (this.facing) {
      case 'down':
        this.currentSprite = this.sprites.attackDown
        break
      case 'up':
        this.currentSprite = this.sprites.attackUp
        break
      case 'right':
        this.currentSprite = this.sprites.attackRight
        break
      case 'left':
        this.currentSprite = this.sprites.attackLeft
        break
    }

    this.currentFrame = 0
    this.isAttacking = true
  }

  draw(c) {
    if (!this.loaded || !this.weaponSpriteHasLoaded) return



    let alpha = 1
    if (this.isInvincible) alpha = 0.5

    c.save()
    c.globalAlpha = alpha
    c.drawImage(
      this.image,
      this.currentSprite.x,
      this.currentSprite.y +
        this.currentSprite.height * this.currentFrame +
        0.5,
      this.currentSprite.width,
      this.currentSprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    c.restore()

    // Draw out our weapon
    if (this.isAttacking) {
      let angle = 0
      let xOffset = 0
      let yOffset = 0
      switch (this.facing) {
        case 'down':
          angle = 0
          xOffset = 5
          yOffset = 22
          break
        case 'up':
          angle = Math.PI
          xOffset = 4
          yOffset = -7

          break
        case 'right':
          angle = (Math.PI * 3) / 2
          xOffset = 22
          yOffset = 11

          break
        case 'left':
          angle = Math.PI / 2
          xOffset = -8
          yOffset = 12

          break
      }
      c.save()
      c.globalAlpha = alpha
      c.translate(this.x + xOffset, this.y + yOffset)
      c.rotate(angle)
      c.drawImage(this.weaponSprite, -3, -8, 6, 16)
      c.restore()
    }
  }

  update(deltaTime, collisionBlocks) {
    if (!deltaTime) return

    // Update attack timer
    const timeToCompleteAttack = 0.3
    if (this.isAttacking && this.attackTimer < timeToCompleteAttack) {
      this.attackTimer += deltaTime
    } else if (this.isAttacking && this.attackTimer >= timeToCompleteAttack) {
      // Switch back to idle state
      this.isAttacking = false
      this.attackTimer = 0
      this.switchBackToIdleState()
      this.hasHitEnemy = false
    }

    this.elapsedTime += deltaTime

    if (this.isInvincible) {
      this.elapsedInvincibilityTime += deltaTime

      if (this.elapsedInvincibilityTime >= this.invincibilityInterval) {
        this.isInvincible = false
        this.elapsedInvincibilityTime = 0
      }
    }

    // 0 - 3
    const intervalToGoToNextFrame = 0.15

    if (this.elapsedTime > intervalToGoToNextFrame) {
      this.currentFrame =
        (this.currentFrame + 1) % this.currentSprite.frameCount
      this.elapsedTime -= intervalToGoToNextFrame
    }

    // Update horizontal position and check collisions
    this.updateHorizontalPosition(deltaTime)
    this.checkForHorizontalCollisions(collisionBlocks)

    // Update vertical position and check collisions
    this.updateVerticalPosition(deltaTime)
    this.checkForVerticalCollisions(collisionBlocks)

    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }

    this.attackBox = {
      x: this.x + this.attackBoxes[this.facing].xOffset,
      y: this.y + this.attackBoxes[this.facing].yOffset,
      width: this.attackBoxes[this.facing].width,
      height: this.attackBoxes[this.facing].height,
    }
  }

  updateHorizontalPosition(deltaTime) {
    this.x += this.velocity.x * deltaTime
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime
  }

  handleInput(keys) {
    if(this.health >= 0){
      this.velocity.x = 0
      this.velocity.y = 0

      if (this.isAttacking) return

      if (keys.d.pressed) {
        this.velocity.x = X_VELOCITY

        this.currentSprite = this.sprites.walkRight
        this.currentSprite.frameCount = 4
        this.facing = 'right'
      } else if (keys.a.pressed) {
        this.velocity.x = -X_VELOCITY

        this.currentSprite = this.sprites.walkLeft
        this.currentSprite.frameCount = 4
        this.facing = 'left'
      } else if (keys.w.pressed) {
        this.velocity.y = -Y_VELOCITY

        this.currentSprite = this.sprites.walkUp
        this.currentSprite.frameCount = 4
        this.facing = 'up'
      } else if (keys.s.pressed) {
        this.velocity.y = Y_VELOCITY

        this.currentSprite = this.sprites.walkDown
        this.currentSprite.frameCount = 4
        this.facing = 'down'
      } else {
        this.currentSprite.frameCount = 1
      }
    }  
  }

  checkForHorizontalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      // Check if a collision exists on all axes
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going left
        if (this.velocity.x < -0) {
          this.x = collisionBlock.x + collisionBlock.width + buffer
          break
        }

        // Check collision while player is going right
        if (this.velocity.x > 0) {
          this.x = collisionBlock.x - this.width - buffer

          break
        }
      }
    }
  }

  checkForVerticalCollisions(collisionBlocks) {
    const buffer = 0.0001
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      // If a collision exists
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.y = collisionBlock.y + collisionBlock.height + buffer
          break
        }

        // Check collision while player is going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.y = collisionBlock.y - this.height - buffer
          break
        }
      }
    }
  }
}
