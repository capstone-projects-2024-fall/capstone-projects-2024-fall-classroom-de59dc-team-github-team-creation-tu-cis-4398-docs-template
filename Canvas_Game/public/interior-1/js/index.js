const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

canvas.width = 1024 * dpr
canvas.height = 576 * dpr

const MAP_COLS = 18
const MAP_WIDTH = 16 * MAP_COLS
const MAP_ROWS = 15
const MAP_SCALE = dpr + 1.5
const MAP_HEIGHT = 16 * MAP_ROWS
const VIEWPORT_WIDTH = canvas.width/MAP_SCALE
const VIEWPORT_HEIGHT = canvas.height/MAP_SCALE
const VIEWPORT_CENTER_X = VIEWPORT_WIDTH / 2
const VIEWPORT_CENTER_Y = VIEWPORT_HEIGHT / 2
const MAX_SCROLL_X = MAP_WIDTH - VIEWPORT_WIDTH
const MAX_SCROLL_Y = MAP_HEIGHT - VIEWPORT_HEIGHT


const layersData = {
   l_New_Layer_1: l_New_Layer_1,
   l_New_Layer_2: l_New_Layer_2,
   l_New_Layer_3: l_New_Layer_3,
   l_New_Layer_4: l_New_Layer_4,
   l_New_Layer_5: l_New_Layer_5,
   l_New_Layer_6: l_New_Layer_6,
   l_New_Layer_7: l_New_Layer_7,
};

const tilesets = {
  l_New_Layer_1: { imageUrl: './images/terrain.png', tileSize: 16 },
  l_New_Layer_2: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_New_Layer_3: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_New_Layer_4: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_New_Layer_5: { imageUrl: './images/characters.png', tileSize: 16 },
  l_New_Layer_7: { imageUrl: './images/public', tileSize: 16 },
};


// Tile setup
const collisionBlocks = []
const blockSize = 16 // Assuming each tile is 16x16 pixels

collisions.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      collisionBlocks.push(
        new CollisionBlock({
          x: x * blockSize,
          y: y * blockSize,
          size: blockSize,
        }),
      )
    }
  })
})

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
          16, // destination width, height
        )
      }
    })
  })
}

const renderStaticLayers = async () => {
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
          offscreenContext,
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
  y: 200,
  size: 15,
})

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
function animate(backgroundCanvas) {
  // Calculate delta time
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  // Update player position
  player.handleInput(keys)
  player.update(deltaTime, collisionBlocks)

  const horizontalScrollDistance = Math.max(0, player.center.x - VIEWPORT_CENTER_X)

  const verticalScrollDistance = Math.max(0, player.center.y - VIEWPORT_CENTER_Y)
  // Render scene
  c.save()
  c.scale(MAP_SCALE, MAP_SCALE)
  c.translate(-horizontalScrollDistance, -verticalScrollDistance)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.drawImage(backgroundCanvas, 0, 0)
  player.draw(c)
  c.restore()
  
  if(player.y >= 210){
    window.location.href = "../index.html"
  }


  requestAnimationFrame(() => animate(backgroundCanvas))
}

const startRendering = async () => {
  try {
    const backgroundCanvas = await renderStaticLayers()
    if (!backgroundCanvas) {
      console.error('Failed to create the background canvas')
      return
    }

    animate(backgroundCanvas)
  } catch (error) {
    console.error('Error during rendering:', error)
  }
}

startRendering()

