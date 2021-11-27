import { new_fractal } from '../pkg/rust_wasm_fractals.js'
import { fractal } from './main.js'

const DEFAULT_ZOOM = 0.006
const DEFAULT_ITERATIONS = 100
const DEFAULT_R = -0.5
const DEFAULT_I = 0.0
const DEFAULT_JULIA_I = -1.012
const DEFAULT_JULIA_R = 0.268
const DEFAULT_CUSTOM = '#000033,#111166,#44FF22,#AAFF77'

// A wrapper around the WASM new_fractal function
export function createFractal() {
  // Get a pointer to a new fractal
  const fractal = new_fractal()

  if (localStorage.getItem('fractal')) {
    const storedFractal = JSON.parse(localStorage.getItem('fractal'))
    fractal.fractal_type = storedFractal.fractal_type
    fractal.center_r = storedFractal.center_r
    fractal.center_i = storedFractal.center_i
    fractal.zoom = storedFractal.zoom
    fractal.max_iters = storedFractal.max_iters
    fractal.width = storedFractal.width
    fractal.height = storedFractal.height
    fractal.full_width = storedFractal.full_width
    fractal.palette = storedFractal.palette
    fractal.follow_zoom = storedFractal.follow_zoom
    fractal.color_scale = storedFractal.color_scale
    fractal.inner_color_r = storedFractal.inner_color_r
    fractal.inner_color_g = storedFractal.inner_color_g
    fractal.inner_color_b = storedFractal.inner_color_b
    fractal.julia_seed_i = storedFractal.julia_seed_i
    fractal.julia_seed_r = storedFractal.julia_seed_r
    fractal.custom_gradient = storedFractal.custom_gradient
  } else {
    fractal.fractal_type = 0
    fractal.center_r = DEFAULT_R
    fractal.center_i = DEFAULT_I
    fractal.zoom = DEFAULT_ZOOM
    fractal.max_iters = DEFAULT_ITERATIONS
    fractal.width = 800
    fractal.height = 600
    fractal.full_width = true
    fractal.palette = 2
    fractal.follow_zoom = false
    fractal.color_scale = 0.5
    fractal.inner_color_r = 0.0
    fractal.inner_color_g = 0.0
    fractal.inner_color_b = 0.0
    fractal.julia_seed_i = DEFAULT_JULIA_I
    fractal.julia_seed_r = DEFAULT_JULIA_R
    fractal.custom_gradient = DEFAULT_CUSTOM
  }

  return fractal
}

export function saveFractalState(fractal) {
  localStorage.setItem(
    'fractal',
    // Note. We can't use JSON.stringify because the fractal is a pointer
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
      color_scale: fractal.color_scale,
      inner_color_r: fractal.inner_color_r,
      inner_color_g: fractal.inner_color_g,
      inner_color_b: fractal.inner_color_b,
      fractal_type: fractal.fractal_type,
      julia_seed_i: fractal.julia_seed_i,
      julia_seed_r: fractal.julia_seed_r,
      custom_gradient: fractal.custom_gradient,
    })
  )
}

export function reset() {
  fractal.center_r = DEFAULT_R
  fractal.center_i = DEFAULT_I
  fractal.zoom = DEFAULT_ZOOM
  fractal.max_iters = DEFAULT_ITERATIONS
  fractal.julia_seed_i = DEFAULT_JULIA_I
  fractal.julia_seed_r = DEFAULT_JULIA_R
}
