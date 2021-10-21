// You have to export init separate from exported functions
import init, { allocate, render_fractal, new_fractal } from '../pkg/rust_wasm_fractals.js'
import { updateSettings } from './settings.js'
import { showToast } from './toast.js'

let ctx
let canvasImageData
let imagePtr
let rustMemory
export let fractal

const runWasm = async () => {
  // Instantiate the WASM module
  const rust = await init()

  // Create a fractal
  fractal = new_fractal()
  if (localStorage.getItem('fractal')) {
    const storedFractal = JSON.parse(localStorage.getItem('fractal'))
    fractal.center_r = storedFractal.center_r
    fractal.center_i = storedFractal.center_i
    fractal.zoom = storedFractal.zoom
    fractal.max_iters = storedFractal.max_iters
    fractal.width = storedFractal.width
    fractal.height = storedFractal.height
    fractal.full_width = storedFractal.full_width
    fractal.palette = storedFractal.palette
    fractal.follow_zoom = storedFractal.follow_zoom
  } else {
    showToast('Right click anywhere, to open settings & instructions', 4000)
    fractal.center_r = -0.5
    fractal.center_i = 0
    fractal.zoom = 0.006
    fractal.max_iters = 120.0
    fractal.width = 800
    fractal.height = 600
    fractal.full_width = true
    fractal.palette = 0
    fractal.follow_zoom = true
  }

  // Set up our canvas, context and image data
  const canvas = document.getElementById('canvas')
  canvas.width = fractal.width
  canvas.height = fractal.height
  canvas.style.width = fractal.full_width ? '100%' : 'auto'

  canvas.addEventListener('wheel', wheelHandler)
  canvas.addEventListener('click', clickHandler)
  window.addEventListener('keydown', keyHandler)

  ctx = canvas.getContext('2d')
  canvasImageData = ctx.createImageData(fractal.width, fractal.height)

  // Allocate the memory on the Rust WASM side
  imagePtr = allocate(fractal.width, fractal.height)

  // Convert the Rust memory heap to a Uint8Array
  rustMemory = new Uint8Array(rust.memory.buffer)

  updateSettings()
  drawFractal()
}

runWasm()

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

  saveFractalState()
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
  const delta = Math.max(Math.abs(e.deltaY) / 400, 1)

  if (e.deltaY > 0) {
    fractal.zoom *= 1.1 * delta
    if (fractal.follow_zoom) {
      fractal.max_iters = (fractal.max_iters / (1.02 * delta)).toFixed(0)
    }
  } else {
    fractal.zoom /= 1.1 * delta
    if (fractal.follow_zoom) {
      fractal.max_iters = (fractal.max_iters * 1.02 * delta).toFixed(0)
    }
  }
  if (fractal.zoom < 0) fractal.zoom = 0

  updateSettings()
  drawFractal()
}

function keyHandler(e) {
  if (e.key === 'ArrowLeft') {
    fractal.center_r -= 0.1
  }
  if (e.key === 'ArrowRight') {
    fractal.center_r += 0.1
  }
  if (e.key === 'ArrowUp') {
    fractal.center_i -= 0.1
  }
  if (e.key === 'ArrowDown') {
    fractal.center_i += 0.1
  }
  drawFractal()
}

export function saveFractalState() {
  localStorage.setItem(
    'fractal',
    JSON.stringify({
      center_r: fractal.center_r,
      center_i: fractal.center_i,
      zoom: fractal.zoom,
      max_iters: fractal.max_iters,
      width: fractal.width,
      height: fractal.height,
      full_width: fractal.full_width,
      palette: fractal.palette,
      follow_zoom: fractal.follow_zoom,
    })
  )
}
