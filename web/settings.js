// ========================================================
// Code for the settings dialog
// ========================================================

import { fractal, drawFractal, version } from './main.js'
import { reset, saveFractalState } from './fractal.js'
import { showToast } from './toast.js'

const settingsDiv = document.createElement('div')
settingsDiv.id = 'settings'
settingsDiv.classList.add('hidden', 'dialog')
document.body.appendChild(settingsDiv)
settingsDiv.innerHTML = `
<h3>⚙️ FractalRust</h3>
<hr />

<div style="display: flex">
  <span class="label">Type</span>
  <span>&nbsp;&nbsp;</span>
  <div class="onoffswitch">
    <input type="checkbox" class="onoffswitch-checkbox" id="setType" tabindex="0" checked />
    <label class="onoffswitch-label" for="setType">
      <span class="onoffswitch-inner"></span>
      <span class="onoffswitch-switch"></span>
    </label>
  </div>
</div>

<div class="row">
  <label for="setIter" class="label">Iterations</label>
  <input type="number" id="setIter" min="20" step="20" style="width: 5rem" />
  <label for="setFollowZoom" style="padding-top: 0.6rem">Link</label>
  <input type="checkbox" id="setFollowZoom" class="larger" />
</div>

<div class="row">
  <label for="setZoom" class="label">Zoom</label>
  <input type="number" id="setZoom" step="0.1" min="0" style="width: 8rem" />
</div>

<div class="row">
  <label for="setSize" class="label">Size</label>
  <select id="setSize">
    <optgroup label="4:3">
      <option value="320_240">320 x 240</option>
      <option value="640_480">640 x 480</option>
      <option value="800_600">800 x 600</option>
      <option value="1024_768">1024 × 768</option>
      <option value="1400_1050">1400 × 1050</option>
      <option value="1600_1200">1600 × 1200</option>
      <option value="2048_1536">2048 × 1536</option>
    </optgroup>
    <optgroup label="16:9">
      <option value="854_480">854 x 480</option>
      <option value="1024_576">1024 x 576</option>
      <option value="1280_720">1280 x 720</option>
      <option value="1920_1080">1920 x 1080</option>
      <option value="2560_1440">2560 x 1440</option>
    </optgroup>
    <optgroup label="21:9">
      <option value="1280_540">1280 x 540</option>
      <option value="2560_1080">2560 x 1080</option>
      <option value="3440_1440">3440 x 1440</option>
    </optgroup>
  </select>
</div>

<div class="row">
  <label for="setPalette" class="label">Palette</label>
  <select id="setPalette">
    <option value="0">Sinebow</option>
    <option value="1">Rainbow</option>
    <option value="2">Magma</option>
    <option value="3">Viridis</option>
    <option value="4">Spectral</option>
    <option value="5">Turbo</option>
    <option value="6">Warm</option>
    <option value="7">Cool</option>
    <option value="8">Plasma</option>
    <option value="9">Spectral</option>
    <option value="10">CubeHelix</option>
    <option value="11">Custom</option>
  </select>
</div>

<div class="row">
  <label for="setCustomPalette" class="label">Custom</label>
  <input type="text" id="setCustomPalette" size="20" style="font-size: 0.8rem" />
</div>

<div class="row">
  <label for="setColorScale" class="label">Color Scale</label>
  <input type="range" min="0.1" max="2" step="0.05" value="1.0" id="setColorScale" />
</div>

<div class="row">
  <label for="setInnerColor" class="label">Inner</label>
  <input type="color" id="setInnerColor" value="#8966" />
</div>

<div class="row">
  <label for="setStretch" class="label">Stretch</label>
  <input type="checkbox" id="setStretch" class="larger" />
</div>

<div class="row button-row">
  <button id="setReset">Reset</button>
  <button id="setDownload">Save</button>
  <button id="setHelp">Help</button>
</div>
<footer>v${version()} - Ben Coleman, 2021 <a target="_blank" href="https://github.com/benc-uk/rust-wasm-fractals">[GitHub]</a></footer>
`

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
const setCustomPalette = document.getElementById('setCustomPalette')
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
    - Use the cursor keys to modify & explore the Julia set seed<br><br>
    Click to dismiss this popup`,
    90000
  )
})

setType.addEventListener('change', (e) => {
  fractal.fractal_type = e.target.checked ? 0 : 1
  reset()
  updateSettings()
  saveFractalState(fractal)
  drawFractal()
})

setCustomPalette.addEventListener('change', (e) => {
  fractal.custom_gradient = e.target.value
  updateSettings()
  saveFractalState(fractal)
})

// ============================================================

window.addEventListener('contextmenu', toggleSettings)

export function updateSettings() {
  setStretch.checked = fractal.full_width
  setPalette.value = fractal.palette
  setSize.value = `${fractal.width}_${fractal.height}`
  setIter.value = fractal.max_iters
  setFollowZoom.checked = fractal.follow_zoom
  setZoom.value = (fractal.zoom * ZOOM_RESCALE).toFixed(10)
  setColorScale.value = fractal.color_scale
  setInnerColor.value = rgbToHex(fractal.inner_color_r, fractal.inner_color_g, fractal.inner_color_b)
  setType.checked = fractal.fractal_type === 0
  setCustomPalette.value = fractal.custom_gradient
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
