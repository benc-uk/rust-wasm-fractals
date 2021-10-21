import { fractal, drawFractal, saveFractalState } from './main.js'

let settingsOpen = false

const setStretch = document.getElementById('setStretch')
const setPalette = document.getElementById('setPalette')
const setReset = document.getElementById('setReset')
const setDownload = document.getElementById('setDownload')
const setSize = document.getElementById('setSize')
const setIter = document.getElementById('setIter')
const setFollowZoom = document.getElementById('setFollowZoom')

setIter.addEventListener('change', (e) => {
  fractal.max_iters = e.target.value
  drawFractal()
})

setPalette.addEventListener('change', (e) => {
  console.log(e.target.value)
  fractal.palette = e.target.value
  //hideSettings()
  drawFractal()
})

setStretch.addEventListener('change', (e) => {
  fractal.full_width = e.target.checked
  saveFractalState()
  document.getElementById('canvas').style.width = fractal.full_width ? '100%' : 'auto'
  //hideSettings()
})

setReset.addEventListener('click', (e) => {
  fractal.center_r = -0.5
  fractal.center_i = 0
  fractal.zoom = 0.006
  fractal.max_iters = 120.0
  saveFractalState()
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
  saveFractalState()
  window.location.reload()
})

setFollowZoom.addEventListener('change', (e) => {
  fractal.follow_zoom = e.target.checked
  saveFractalState()
})

window.addEventListener('contextmenu', toggleSettings)

export function updateSettings() {
  setStretch.checked = fractal.full_width
  setPalette.value = fractal.palette
  setSize.value = `${fractal.width}_${fractal.height}`
  setIter.value = fractal.max_iters
  setFollowZoom.checked = fractal.follow_zoom
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
