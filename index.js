// You have to export init separate from exported functions
import init, { allocate, render_fractal } from "./pkg/rust_fract.js";

const runWasm = async () => {
  // Instantiate our wasm module
  const rust = await init();

  // Set up our canvas, context and image data
  var canvas = document.getElementById("canvas");
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  var ctx = canvas.getContext("2d");
  const canvasImageData = ctx.createImageData(WIDTH, HEIGHT);

  // Allocate the memory on the Rust WASM side
  let imagePtr = allocate(WIDTH, HEIGHT);

  // Convert the Rust memory heap to a Uint8Array
  const rustMemory = new Uint8Array(rust.memory.buffer);

  setInterval(() => {
    //const start = performance.now();
    render_fractal(BigInt(Date.now()));
    // Copy the updated buffer from Rust memory to the canvas image data
    canvasImageData.data.set(
      rustMemory.slice(imagePtr, imagePtr + WIDTH * HEIGHT * 4)
    );

    // Finally, draw the image data on the canvas
    ctx.putImageData(canvasImageData, 0, 0);
    //const end = performance.now();
    //console.log(`Time taken: ${end - start} ms`);
  }, 60);
};

runWasm();
