// You have to export init separate from exported functions
import init, { allocate, render_fractal, return_new_fractal } from './pkg/rust_wasm_fractals.js'

const runWasm = async () => {
  // Instantiate the WASM module
  const rust = await init()

  const fractal = return_new_fractal()
  fractal.center_r = 0.3
  fractal.center_i = 0.585
  fractal.zoom = 2
  fractal.max_iters = 100

  // Set up our canvas, context and image data
  var canvas = document.getElementById('canvas')
  const WIDTH = canvas.width
  const HEIGHT = canvas.height
  var ctx = canvas.getContext('2d')
  const canvasImageData = ctx.createImageData(WIDTH, HEIGHT)

  // Allocate the memory on the Rust WASM side
  let imagePtr = allocate(WIDTH, HEIGHT)

  // Convert the Rust memory heap to a Uint8Array
  const rustMemory = new Uint8Array(rust.memory.buffer)

  let start = performance.now()
  render_fractal(fractal)
  // Copy the updated buffer from Rust memory to the canvas image data
  canvasImageData.data.set(rustMemory.slice(imagePtr, imagePtr + WIDTH * HEIGHT * 4))

  // Finally, draw the image data on the canvas
  ctx.putImageData(canvasImageData, 0, 0)

  let end = performance.now()
  console.log(`### Fractal rendered in: ${end - start}`)
}

runWasm()
