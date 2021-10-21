// You have to export init separate from exported functions
import init, { allocate, render_fractal } from '../pkg/rust_wasm_fractals.js'
import { updateSettings } from './settings.js'
import { createFractal, saveFractalState } from './fractal.js'
import { showToast } from './toast.js'

let ctx
let canvasImageData
let imagePtr
let rustMemory
export let fractal
;(async function runWasm() {
  // Instantiate the WASM module
  const rust = await init()

  // Create a fractal
  fractal = createFractal()
  if (!localStorage.getItem('fractal')) {
    showToast('Right click anywhere, to open settings & instructions', 4000)
  }

  // Set up our canvas, context and image data
  const canvas = document.getElementById('canvas')
  canvas.width = fractal.width
  canvas.height = fractal.height
  canvas.style.width = fractal.full_width ? '100%' : 'auto'

  canvas.addEventListener('wheel', wheelHandler)
  canvas.addEventListener('click', clickHandler)

  ctx = canvas.getContext('2d')
  canvasImageData = ctx.createImageData(fractal.width, fractal.height)

  // Allocate the memory on the Rust WASM side
  imagePtr = allocate(fractal.width, fractal.height)

  // Convert the Rust memory heap to a Uint8Array
  rustMemory = new Uint8Array(rust.memory.buffer)

  updateSettings()
  drawFractal()
})()

export function drawFractal() {
  const start = performance.now()

  // Now draw the fractal
  render_fractal(fractal)
  // Copy the updated buffer from Rust memory to the canvas image data
  canvasImageData.data.set(rustMemory.slice(imagePtr, imagePtr + fractal.width * fractal.height * 4))
  // Finally, draw the image data on the canvas
  ctx.putImageData(canvasImageData, 0, 0)

  const end = performance.now()
  console.log(`### Fractal rendered in ${Math.round(end - start)}ms`)

  saveFractalState(fractal)
}

function clickHandler(e) {
  const x = (fractal.width / e.target.getBoundingClientRect().width) * e.offsetX
  const y = (fractal.height / e.target.getBoundingClientRect().height) * e.offsetY

  fractal.center_r += (x / fractal.width - 0.5) * fractal.zoom * fractal.width
  fractal.center_i += (y / fractal.height - 0.5) * fractal.zoom * fractal.height

  drawFractal()
}

function wheelHandler(e) {
  e.preventDefault()
  const delta = Math.max(Math.abs(e.deltaY) / 500, 1)

  if (e.deltaY > 0) {
    fractal.zoom *= 1.1 * delta
    if (fractal.follow_zoom) {
      fractal.max_iters = fractal.max_iters * 0.999 * delta
    }
  } else {
    fractal.zoom *= 0.9 * delta
    if (fractal.follow_zoom) {
      fractal.max_iters = fractal.max_iters * 1.001 * delta
    }
  }
  if (fractal.zoom < 0) fractal.zoom = 0

  updateSettings()
  drawFractal()
}
