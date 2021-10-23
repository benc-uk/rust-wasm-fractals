import { fractal, drawFractal } from './main.js'
import { DEFAULT_I, DEFAULT_ITERATIONS, DEFAULT_R, DEFAULT_ZOOM, saveFractalState } from './fractal.js'
import { showToast } from './toast.js'

let settingsOpen = false

const setStretch = document.getElementById('setStretch')
const setPalette = document.getElementById('setPalette')
const setReset = document.getElementById('setReset')
const setDownload = document.getElementById('setDownload')
const setSize = document.getElementById('setSize')
const setIter = document.getElementById('setIter')
const setFollowZoom = document.getElementById('setFollowZoom')
const setZoom = document.getElementById('setZoom')
const setColorScale = document.getElementById('setColorScale')
const setInnerColor = document.getElementById('setInnerColor')
const setHelp = document.getElementById('setHelp')
const setType = document.getElementById('setType')
const ZOOM_RESCALE = 1000000

setIter.addEventListener('change', (e) => {
  fractal.max_iters = e.target.value
  drawFractal()
})

setPalette.addEventListener('change', (e) => {
  console.log(e.target.value)
  fractal.palette = e.target.value
  drawFractal()
})

setStretch.addEventListener('change', (e) => {
  fractal.full_width = e.target.checked
  saveFractalState(fractal)
  document.getElementById('canvas').style.width = fractal.full_width ? '100%' : 'auto'
})

setReset.addEventListener('click', (e) => {
  reset()
  saveFractalState(fractal)
  window.location.reload()
})

setDownload.addEventListener('click', (e) => {
  let downloadLink = document.createElement('a')
  downloadLink.setAttribute('download', 'fractal.png')
  let canvas = document.getElementById('canvas')
  let dataURL = canvas.toDataURL('image/png')
  let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')
  downloadLink.setAttribute('href', url)
  downloadLink.click()

  hideSettings()
})

setSize.addEventListener('change', (e) => {
  const width = e.target.value.split('_')[0]
  const height = e.target.value.split('_')[1]
  fractal.width = width
  fractal.height = height
  saveFractalState(fractal)
  window.location.reload()
})

setFollowZoom.addEventListener('change', (e) => {
  fractal.follow_zoom = e.target.checked
  saveFractalState(fractal)
})

setZoom.addEventListener('change', (e) => {
  fractal.zoom = e.target.value / ZOOM_RESCALE
  saveFractalState(fractal)
  drawFractal()
})

setColorScale.addEventListener('change', (e) => {
  fractal.color_scale = e.target.value
  saveFractalState(fractal)
  drawFractal()
})

setInnerColor.addEventListener('change', (e) => {
  const hexCode = e.target.value.split('')
  const red = parseInt(hexCode[1] + hexCode[2], 16)
  const green = parseInt(hexCode[3] + hexCode[4], 16)
  const blue = parseInt(hexCode[5] + hexCode[6], 16)
  fractal.inner_color_r = red
  fractal.inner_color_g = green
  fractal.inner_color_b = blue

  saveFractalState(fractal)
  drawFractal()
})

setHelp.addEventListener('click', (e) => {
  hideSettings()
  showToast(
    `<h3>❓ Help</h3>
    <hr>
    - Left click anywhere to recenter the view on that point<br>
    - Right click anywhere to open the settings panel<br>
    - If you get "lost", open the settings and click reset<br>
    - Use the mouse scroll wheel to zoom in and out<br>
    - Use the cursor keys to modify the Julia set seed (i & r)<br><br>
    Click to dismiss this popup`,
    90000
  )
})

setType.addEventListener('change', (e) => {
  fractal.fractal_type = e.target.checked ? 0 : 1
  reset()
  saveFractalState(fractal)
  drawFractal()
})

// ============================================================
// End of handlers
// ============================================================

window.addEventListener('contextmenu', toggleSettings)

export function updateSettings() {
  setStretch.checked = fractal.full_width
  setPalette.value = fractal.palette
  setSize.value = `${fractal.width}_${fractal.height}`
  setIter.value = fractal.max_iters
  setFollowZoom.checked = fractal.follow_zoom
  setZoom.value = fractal.zoom * ZOOM_RESCALE
  setColorScale.value = fractal.color_scale
  setInnerColor.value = rgbToHex(fractal.inner_color_r, fractal.inner_color_g, fractal.inner_color_b)
  setType.checked = fractal.fractal_type === 0
}

function reset() {
  fractal.center_r = DEFAULT_R
  fractal.center_i = DEFAULT_I
  fractal.zoom = DEFAULT_ZOOM
  fractal.max_iters = DEFAULT_ITERATIONS
}

function toggleSettings(e) {
  e.preventDefault()
  if (!settingsOpen) {
    document.getElementById('settings').classList.replace('hidden', 'shown')
    settingsOpen = true
  } else {
    document.getElementById('settings').classList.replace('shown', 'hidden')
    settingsOpen = false
  }
}

export function hideSettings() {
  document.getElementById('settings').classList.replace('shown', 'hidden')
  settingsOpen = false
}

function rgbToHex(r = 0, g = 0, b = 0) {
  let hr = Math.max(0, Math.min(255, Math.round(r))).toString(16)
  let hg = Math.max(0, Math.min(255, Math.round(g))).toString(16)
  let hb = Math.max(0, Math.min(255, Math.round(b))).toString(16)
  return '#' + (hr.length < 2 ? '0' : '') + hr + (hg.length < 2 ? '0' : '') + hg + (hb.length < 2 ? '0' : '') + hb
}
