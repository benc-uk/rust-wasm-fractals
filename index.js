// You have to export init separate from exported functions
import init, { allocate, render_fractal, return_new_fractal } from './pkg/rust_wasm_fractals.js'

const runWasm = async () => {
  // Instantiate the WASM module
  const rust = await init()

  // Create a fractal
  const fractal = return_new_fractal()
  fractal.center_r = 0.37
  fractal.center_i = -0.28
  fractal.zoom = 0.004
  fractal.max_iters = 160.0
  fractal.width = 640
  fractal.height = 480
  fractal.inner_color_b = 100

  const drawFractal = (fractal) => {
    // Now draw the f**king fractal
    render_fractal(fractal)
    // Copy the updated buffer from Rust memory to the canvas image data
    canvasImageData.data.set(rustMemory.slice(imagePtr, imagePtr + fractal.width * fractal.height * 4))
    // Finally, draw the image data on the canvas
    ctx.putImageData(canvasImageData, 0, 0)
  }

  // Set up our canvas, context and image data
  document.body.innerHTML = `<canvas width="${fractal.width}" height="${fractal.height}" id="canvas" style="width:100%">`
  const canvas = document.getElementById('canvas')

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      fractal.zoom *= 1.1
      fractal.max_iters /= 1.01
    } else {
      fractal.zoom /= 1.1
      fractal.max_iters *= 1.01
    }
    if (fractal.zoom < 0) fractal.zoom = 0

    drawFractal(fractal)
  })

  const ctx = canvas.getContext('2d')
  const canvasImageData = ctx.createImageData(fractal.width, fractal.height)

  // Allocate the memory on the Rust WASM side
  const imagePtr = allocate(fractal.width, fractal.height)

  // Convert the Rust memory heap to a Uint8Array
  const rustMemory = new Uint8Array(rust.memory.buffer)

  const start = performance.now()
  drawFractal(fractal)
  const end = performance.now()
  console.log(`### Fractal rendered in ${Math.round(end - start)}ms`)
}

runWasm()
