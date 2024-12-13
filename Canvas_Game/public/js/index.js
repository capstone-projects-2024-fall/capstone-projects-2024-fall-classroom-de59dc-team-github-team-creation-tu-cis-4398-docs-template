window.onload = loadInAssignments()
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

canvas.width = 1024 * dpr
canvas.height = 576 * dpr

const MAP_ROWS = 28
const MAP_COLS = 28

const MAP_WIDTH = 16 * MAP_COLS
const MAP_HEIGHT = 16 * MAP_ROWS

const MAP_SCALE = dpr + 3

const VIEWPORT_WIDTH = canvas.width / MAP_SCALE
const VIEWPORT_HEIGHT = canvas.height / MAP_SCALE

const VIEWPORT_CENTER_X = VIEWPORT_WIDTH / 2
const VIEWPORT_CENTER_Y = VIEWPORT_HEIGHT / 2

const MAX_SCROLL_X = MAP_WIDTH - VIEWPORT_WIDTH
const MAX_SCROLL_Y = MAP_HEIGHT - VIEWPORT_HEIGHT

/*
if(localStorage.getItem("worldState")=== null){
  localStorage.setItem("worldState", 0)
}
const worldState = localStorage.getItem("worldState")
*/
const email = localStorage.getItem('email')

const worldState = localStorage.getItem('worldState')
//console.log(worldState)
//const worldState = 4
const goldContainer = document.getElementById('gold')
goldContainer.innerHTML = localStorage.getItem('gold')
const layersData = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses,
  l_House_Decorations: l_House_Decorations,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}

const layersData_WS0 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS0,
  l_House_Decorations: l_House_Decorations_WS0,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}

const layersData_WS1 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS1,
  l_House_Decorations: l_House_Decorations_WS1,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}
const layersData_WS2 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS2,
  l_House_Decorations: l_House_Decorations_WS1,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}

const layersData_WS3 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS3,
  l_House_Decorations: l_House_Decorations_WS1,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}

const layersData_WS4 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS4,
  l_House_Decorations: l_House_Decorations_WS4,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}

const layersData_WS5 = {
  l_Terrain: l_Terrain,
  l_Trees_1: l_Trees_1,
  l_Trees_2: l_Trees_2,
  l_Trees_3: l_Trees_3,
  l_Trees_4: l_Trees_4,
  l_Landscape_Decorations: l_Landscape_Decorations,
  l_Landscape_Decorations_2: l_Landscape_Decorations_2,
  l_Houses: l_Houses_WS5,
  l_House_Decorations: l_House_Decorations_WS5,
  l_Characters: l_Characters,
  l_Collisions: l_Collisions,
}


const frontRendersLayersData = {
  l_Front_Renders: l_Front_Renders,
  l_Front_Renders_2: l_Front_Renders_2,
  l_Front_Renders_3: l_Front_Renders_3,
}

const frontRendersLayersData_WS1 = {
  l_front_Renders: l_Front_Renders_WS1
}

const tilesets = {
  l_Terrain: { imageUrl: './images/terrain.png', tileSize: 16 },
  l_Front_Renders: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Front_Renders_2: { imageUrl: './images/characters.png', tileSize: 16 },
  l_Front_Renders_3: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Trees_1: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Trees_2: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Trees_3: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Trees_4: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Landscape_Decorations: {
    imageUrl: './images/decorations.png',
    tileSize: 16,
  },
  l_Landscape_Decorations_2: {
    imageUrl: './images/decorations.png',
    tileSize: 16,
  },
  l_Houses: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_House_Decorations: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_Characters: { imageUrl: './images/characters.png', tileSize: 16 },
  l_Collisions: { imageUrl: './images/characters.png', tileSize: 16 },
}

// Tile setup
const collisionBlocks = []
const blockSize = 16 // Assuming each tile is 16x16 pixels
if(worldState == 0){
  collisions_WS0.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}
else if (worldState == 1){
  collisions_WS1.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}
else if(worldState == 2){
  collisions_WS2.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}
else if(worldState == 3){
  collisions_WS3.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}
else if(worldState == 4){
  collisions_WS4.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}else if (worldState >= 5){
  collisions_WS5.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 1) {
        collisionBlocks.push(
          new CollisionBlock({
            x: x * blockSize,
            y: y * blockSize,
            size: blockSize,
          })
        )
      }
    })
  })
}
const renderLayer = (tilesData, tilesetImage, tileSize, context) => {
  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        const srcX = ((symbol - 1) % (tilesetImage.width / tileSize)) * tileSize
        const srcY =
          Math.floor((symbol - 1) / (tilesetImage.width / tileSize)) * tileSize

        context.drawImage(
          tilesetImage, // source image
          srcX,
          srcY, // source x, y
          tileSize,
          tileSize, // source width, height
          x * 16,
          y * 16, // destination x, y
          16,
          16 // destination width, height
        )
      }
    })
  })
}

const renderStaticLayers = async (layersData) => {
  const offscreenCanvas = document.createElement('canvas')
  offscreenCanvas.width = canvas.width
  offscreenCanvas.height = canvas.height
  const offscreenContext = offscreenCanvas.getContext('2d')

  for (const [layerName, tilesData] of Object.entries(layersData)) {
    const tilesetInfo = tilesets[layerName]
    if (tilesetInfo) {
      try {
        const tilesetImage = await loadImage(tilesetInfo.imageUrl)
        renderLayer(
          tilesData,
          tilesetImage,
          tilesetInfo.tileSize,
          offscreenContext
        )
      } catch (error) {
        console.error(`Failed to load image for layer ${layerName}:`, error)
      }
    }
  }

  // Optionally draw collision blocks and platforms for debugging
  // collisionBlocks.forEach(block => block.draw(offscreenContext));

  return offscreenCanvas
}
// END - Tile setup

// Change xy coordinates to move player's default position
const player = new Player({
  x: 100,
  y: 100,
  size: 15,
})
window.player=player;// Making player global

if (email) {
    fetchUserItems(email);
} else {
    console.error("Email not found in localStorage.");
}

const monsterSprites = {
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
}

// NPC setup 
const npc2 = [
  new NPC2({
    x: 370,
    y: 150,
    size: 15,
    imageSrc: './images/OldWoman/SpriteSheet.png', // purple old lady 
    sprites: monsterSprites,
    }),
  new NPC2({
    x: 85,
    y: 90,
    size: 15,
    imageSrc: './images/Princess/SpriteSheet.png', //princess near spawn
    sprites: monsterSprites,
    }),
    new NPC2({
      x: 300,
      y: 320,
      size: 15,
      imageSrc: './images/Samurai/SpriteSheet.png',
      sprites: monsterSprites,
      }),
      new NPC2({
        x: 80,
        y: 320,
        size: 15,
        imageSrc: './images/OldMan3/SpriteSheet.png',
        sprites: monsterSprites,
        })

]

const monsters = [
  new Monster({
    x: 200,
    y: 150,
    size: 15,
    imageSrc: './images/bamboo.png',
    sprites: monsterSprites,
  }),
  new Monster({
    x: 300,
    y: 150,
    size: 15,
    imageSrc: './images/dragon.png',
    sprites: monsterSprites,
  }),
  new Monster({
    x: 48,
    y: 400,
    size: 15,
    imageSrc: './images/bamboo.png',
    sprites: monsterSprites,
  }),
  new Monster({
    x: 288,
    y: 416,
    size: 15,
    imageSrc: './images/bamboo.png',
    sprites: monsterSprites,
  }),
  new Monster({
    x: 112,
    y: 416,
    size: 15,
    imageSrc: './images/dragon.png',
    sprites: monsterSprites,
  }),
  new Monster({
    x: 400,
    y: 400,
    size: 15,
    imageSrc: './images/dragon.png',
    sprites: monsterSprites,
  }),
]

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

let lastTime = performance.now()
let frontRendersCanvas
const hearts = [
  new Heart({
    x: 10,
    y: 10,
  }),
  new Heart({
    x: 32,
    y: 10,
  }),
  new Heart({
    x: 54,
    y: 10,
  }),
]

const leafs = [
  new Sprite({
    x: 20,
    y: 20,
    velocity: {
      x: 0.08,
      y: 0.08,
    },
  }),
]

let elapsedTime = 0

function animate(backgroundCanvas) {
  // Calculate delta time
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime
  elapsedTime += deltaTime

  if (elapsedTime > 1.5) {
    leafs.push(
      new Sprite({
        x: Math.random() * 150,
        y: Math.random() * 50,
        velocity: {
          x: 0.08,
          y: 0.08,
        },
      })
    )
    elapsedTime = 0
  }

  // Update player position
  player.handleInput(keys)
  player.update(deltaTime, collisionBlocks)

  const horizontalScrollDistance = Math.min(
    Math.max(0, player.center.x - VIEWPORT_CENTER_X),
    MAX_SCROLL_X
  )

  const verticalScrollDistance = Math.min(
    Math.max(0, player.center.y - VIEWPORT_CENTER_Y),
    MAX_SCROLL_Y
  )

  // Render scene
  c.save()
  c.scale(MAP_SCALE, MAP_SCALE)
  c.translate(-horizontalScrollDistance, -verticalScrollDistance)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.drawImage(backgroundCanvas, 0, 0)
  player.draw(c)
  //console.log(player.y)
  if(worldState >= 5){
    if(player.x >= 85 && player.x <= 98){
      if(player.y >= 300 && player.y <= 325){
        window.location.href = 'interior-1/index.html'
      }
    }
  }
  if(player.y >= 441 ){
    window.location.href = 'map-3/index.html'
  }

  // render out our monsters
  for (let i = monsters.length - 1; i >= 0; i--) {
    const monster = monsters[i]
    monster.update(deltaTime, collisionBlocks)
    monster.draw(c)

    // Detect for collision
    if (
      player.attackBox.x + player.attackBox.width >= monster.x &&
      player.attackBox.x <= monster.x + monster.width &&
      player.attackBox.y + player.attackBox.height >= monster.y &&
      player.attackBox.y <= monster.y + monster.height &&
      player.isAttacking &&
      !player.hasHitEnemy
    ) {
      monster.receiveHit()
      player.hasHitEnemy = true

      if (monster.health <= 0) {
        monsters.splice(i, 1)
        const amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        //showDialogueBox("You've found " + amount + " gold!")
        const data = {
          email: localStorage.getItem('email'),
          amount: amount
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
        fetch("http://127.0.0.1:5000/api/updatePlayerGold", requestOptions)
          .then(response=>{
            if(!response.ok){
              throw new Error('Bad Response');
            }
            return response.json();
          })
          .then(data=>{
            updateGoldAmount()
          })
          .catch(error=>{
            console.log(error)
          })
      }
    }

    if (
      player.x + player.width >= monster.x &&
      player.x <= monster.x + monster.width &&
      player.y + player.height >= monster.y &&
      player.y <= monster.y + monster.height &&
      !player.isInvincible
    ) {
      player.receiveHit(showDialogueBox('Ouch!'))

      const filledHearts = hearts.filter((heart) => heart.currentFrame === 4)

      if (filledHearts.length > 0) {
        filledHearts[filledHearts.length - 1].currentFrame = 0
      }

      if (filledHearts.length <= 1) {
        showDialogueBox('You have died buy a health potion to continue');
      }
    }
  }

  
  // render out our npc
  for (let i = npc2.length - 1; i >= 0; i--) {
    const npc = npc2[i];
    npc.update(deltaTime, player, (npc) => {
      if (npc === npc2[0]) { // Specific dialogue for the first NPC (princess)
        if(player.worldState == 0){
          showDialogueBox('Hello, traveler! Welcome to our village.');
        }else if(player.worldState >= 5){
          showDialogueBox('Thank you for your much needed aid, traveler. The villiage samurai and blacksmith are grateful for your help.')
        }
        
      }if (npc === npc2[1]) {// Specific dialogue for the second NPC (purple old lady )
        showDialogueBox('The forest is dangerous. Be cautious!');
      } else if (npc === npc2[2]) {
        if(player.worldState == 0){
          showDialogueBox('I am the samurai of the village. Help me build my dojo and I can make you stonger. :::: Complete an assignment to advance the world state');
        }else if (player.worldState >= 4){
          showDialogueBox('Thank you for helping build my dojo. Come by and I can train you to get stronger.')
        }
      } else if (npc === npc2[3]){
        if(player.worldState == 0){
          showDialogueBox('Please help me build my weapon forge, I can upgrade your weapon :::: Complete an assignment to advance the world state')
        }else if(player.worldState >= 5){
          showDialogueBox('Thank you for helping me build my weapon forge, as a reward you can pick a weapon of your choosing and I can make it for you')
        }
      }
    });
    npc.draw(c);
  }
  

  c.drawImage(frontRendersCanvas, 0, 0)

  for (let i = leafs.length - 1; i >= 0; i--) {
    const leaf = leafs[i]
    leaf.update(deltaTime)
    leaf.draw(c)

    if (leaf.alpha <= 0) {
      leafs.splice(i, 1)
    }
    //console.log('leafs')
  }

  c.restore()

  c.save()
  c.scale(MAP_SCALE, MAP_SCALE)
  /*
  hearts.forEach((heart) => {
    heart.draw(c)
  })
    */

  hearts.forEach((heart, index) => {
    heart.currentFrame = index < player.health ? 4 : 0; // Full or empty frame
    heart.draw(c); // Redraw the heart
  });
  c.restore()

  requestAnimationFrame(() => animate(backgroundCanvas))
}

//Dialogue Box
function showDialogueBox(message) {
  const dialogueBox = document.getElementById('dialogueBox');
  const dialogueText = document.getElementById('dialogueText')
  dialogueText.innerText = message;
  dialogueBox.style.display = 'block';
  dialogueBox.style.width = '940px'; 
  dialogueBox.style.height = '380px'; 
  /*document.onclick = function(e){
    if(e.target.id != 'dialogueBox' || e.target.id != 'dialogueText' || e.target.id != 'assignmentsList' || e.target.class != 'container'){
      dialogueText.innerHTML = ""
      //dialogueBox.style.display = "none"
    }
  }*/
  //setTimeout(hideDialogueBox, 5000); // Auto-hide after 5 seconds
}

//gets the amount of gold for current user from database
function updateGoldAmount(){
  fetch("http://127.0.0.1:5000/api/getPlayerData?email="+email)
.then(response=>{
  if (response.ok){
    return response.json();
  }else{
    throw new Error("Api call failed")
  }
})
.then(data=>{
  //console.log(data)
  const goldContainer = document.getElementById("gold")
  goldContainer.innerHTML = data[0].gold
  return data[1].world_state
})

}

let isInventoryVisible = false; // Tracks inventory visibility
let currentInspectItem = null; // Tracks the currently inspected item

function toggleInventoryBox() {
  /*
  const inventoryBox = document.getElementById("inventoryBox");
  const inventoryList = document.getElementById("inventoryList");
  const inspectBox = document.getElementById("inspectBox");

  if (isInventoryVisible) {
    // Hide the inventory box
    inventoryBox.style.display = "none";
    inspectBox.style.display = "none";
    isInventoryVisible = false;
  } else {
    // Show the inventory box and populate it
    inventoryList.innerHTML = ""; // Clear existing inventory items

    player.inventory.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} (${item.type})`;
      listItem.dataset.index = index; // Store index for reference

      // Add click event to inspect the item
      listItem.addEventListener("click", () => {
        currentInspectItem = item;
        showInspectBox(item);
      });

      inventoryList.appendChild(listItem);
    });

    inventoryBox.style.display = "block";
    isInventoryVisible = true;
  }
    */

  /*
  const inventoryBox = document.getElementById("inventoryBox");
    const inventoryList = document.getElementById("inventoryList");
    const inspectBox = document.getElementById("inspectBox");

    if (isInventoryVisible) {
        inventoryBox.style.display = "none";
        inspectBox.style.display = "none";
        isInventoryVisible = false;
    } else {
        inventoryList.innerHTML = ""; // Clear existing inventory of its items

        // Populate inventory items
        player.inventory.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name}`;
            listItem.dataset.index = index; // Store index for reference

            // Add click event to show description
            listItem.addEventListener("click", () => {
                showInspectBox(item);
            });

            inventoryList.appendChild(listItem);
        });

        inventoryBox.style.display = "block";
        isInventoryVisible = true;
    }
        */

    const inventoryBox = document.getElementById("inventoryBox");
    const inventoryList = document.getElementById("inventoryList");
  
    if (!inventoryBox || !inventoryList) {
      console.error("Inventory box or list not found.");
      return;
    }
  
    if (isInventoryVisible) {
      inventoryBox.style.display = "none";
      isInventoryVisible = false;
    } else {
      inventoryList.innerHTML = ""; // Clear the existing inventory items
  
      player.inventory.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name}`;
        listItem.dataset.index = index; // Store the item's index
  
        // Add click event to show item details
        listItem.addEventListener("click", () => showInspectBox(item));
  
        inventoryList.appendChild(listItem);
      });
  
      inventoryBox.style.display = "block";
      isInventoryVisible = true;
    }
}

function showInspectBox(item) {

  const inspectBox = document.getElementById("inspectBox");
  inspectBox.style.display = "block";
  inspectBox.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Description:</strong> ${item.description}</p>
  `;
}

// Add event listener for toggling the inventory
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "i") { // Press 'I' to toggle inventory
    toggleInventoryBox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "p") { // Press 'P' to use a potion
    if (window.player) {
      const success = window.player.usePotion();
      if (!success) {
        console.log("Potion use failed.");
      }
    } else {
      console.warn("Player object not found.");
    }
  }
});


function hideDialogueBox() {
  const dialogueBox = document.getElementById('dialogueBox');
  dialogueBox.style.display = 'none';
}


let isPopupVisible = false;
function togglePopupBox() {
	const popupBox = document.getElementById('popupBox');	//gets html container from index.html
	const popupBoxText = document.getElementById('popupBoxText')
  const popupBoxText2 = document.getElementById('popupBoxText2')
  const popupBoxText3 = document.getElementById('popupBoxText3')
  const popupBoxText4 = document.getElementById('popupBoxText4')
  if (isPopupVisible) {
    // Hide the inventory box
    popupBox.style.display = "none";
    isPopupVisible = false;
  } else {
    popupBoxText.innerText = "Lo! Upon you quest to complete all the assignments and become the best student, it appears you've fallen into a strange portal where down is up and up is down etc. etc. Upon further inspection you discover an evil wizard has stolen all of your assignments and evenly distributed them amongst the townsfolk. oh no! You will simply have to steal them back. sorry townfolk! Upon further inspection you discover the town you've found yourself in is very sparsely decorated. Upon further inspection you discover the evil wizard wil ONLY give these people their homes back if you complete your assignments!"
    popupBoxText2.innerText = "Will you help the villagers build back their village?"
    popupBoxText3.innerText = "Also watch out for the evil wizards minions! They will try to hurt you! Luckily you can fight back by pressing the spacebar!"
    popupBoxText4.innerText = "press Q to exit, press I for inventory"
    
    popupBox.style.display = "block";
    isPopupVisible = true;
  }
}
// Add event listener for toggling the inventory
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "q") { // Press 'Q' to get quest mission
    togglePopupBox();
  }
});


async function fetchUserItems(email) {
  try {
      const response = await fetch(`http://127.0.0.1:5000/api/getUserItems?email=${email}`);
      if (!response.ok) {
          throw new Error("Failed to fetch user items");
      }
      const items = await response.json();
      console.log("Fetched Items:", items);

      // Add the fetched items to the player's inventory
      items.forEach((item) => {
          player.addItem(new Item({
              name: item.name,
              type: "Bought Item",
              description: item.description
          }));
      });
  } catch (error) {
      console.error("Error fetching items:", error);
  }
}

function updateHealthUI(health) {
  /*
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    const heartObject = heartsArray[index]; // Assuming heartsArray contains Heart instances
    if (index < health) {
      heartObject.currentFrame = 4; // Full heart frame
    } else {
      heartObject.currentFrame = 0; // Empty heart frame
    }
  });
  */

  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    heart.classList.toggle("filled", index < health);
  });

  console.log(`Health: ${health}/${maxHealth}`)
}

const startRendering = async () => {
  try {
    /*const backgroundCanvas  = await renderStaticLayers(layersData)
    frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)*/
    let backgroundCanvas
    if(worldState == 0){
      backgroundCanvas = await renderStaticLayers(layersData_WS0)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)
    }else if(worldState == 1){
      backgroundCanvas = await renderStaticLayers(layersData_WS1)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)
    }else if(worldState == 2){
      backgroundCanvas = await renderStaticLayers(layersData_WS2)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)
    }
    else if(worldState == 3){
      backgroundCanvas = await renderStaticLayers(layersData_WS3)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)
    }
    else if(worldState == 4){
      backgroundCanvas = await renderStaticLayers(layersData_WS4)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData_WS1)
    }
    else if(worldState == 5){
      backgroundCanvas = await renderStaticLayers(layersData_WS5)
      frontRendersCanvas = await renderStaticLayers(frontRendersLayersData)
    }
    if (backgroundCanvas== null) {
      console.error('Failed to create the background canvas')
      return
    }

    animate(backgroundCanvas)
  } catch (error) {
    console.error('Error during rendering:', error)
  }
}

startRendering()