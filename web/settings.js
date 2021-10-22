import { fractal, drawFractal } from './main.js'
import { DEFAULT_I, DEFAULT_ITERATIONS, DEFAULT_R, DEFAULT_ZOOM, saveFractalState } from './fractal.js'

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
  fractal.center_r = DEFAULT_R
  fractal.center_i = DEFAULT_I
  fractal.zoom = DEFAULT_ZOOM
  fractal.max_iters = DEFAULT_ITERATIONS
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
  fractal.zoom = e.target.value / 10000
  saveFractalState(fractal)
  drawFractal()
})

setColorScale.addEventListener('change', (e) => {
  fractal.color_scale = e.target.value
  saveFractalState(fractal)
  drawFractal()
})

// End of handlers

window.addEventListener('contextmenu', toggleSettings)

export function updateSettings() {
  setStretch.checked = fractal.full_width
  setPalette.value = fractal.palette
  setSize.value = `${fractal.width}_${fractal.height}`
  setIter.value = fractal.max_iters
  setFollowZoom.checked = fractal.follow_zoom
  setZoom.value = fractal.zoom * 10000
  setColorScale.value = fractal.color_scale
}

function toggleSettings(e) {
  e.preventDefault()
  if (!settingsOpen) {
    document.getElementById('settings').style.display = 'block'
    settingsOpen = true
  } else {
    document.getElementById('settings').style.display = 'none'
    settingsOpen = false
  }
}

export function hideSettings() {
  document.getElementById('settings').style.display = 'none'
  settingsOpen = false
}
