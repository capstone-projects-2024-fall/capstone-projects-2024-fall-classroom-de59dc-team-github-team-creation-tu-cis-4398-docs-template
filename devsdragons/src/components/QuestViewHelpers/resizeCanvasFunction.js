// If browser window dimensions are modified, resize the quest view as needed

import { drawBackgroundFunction } from "./drawBackgroundFunction"; // Import needed as draw background is used again

export const resizeCanvasFunction = (canvasRef, background) => {
  const canvas = canvasRef.current;

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackgroundFunction(canvasRef, background); // Draw the background after resizing
  }
};
