import { new_fractal } from './rust_wasm_fractals.js'

export const DEFAULT_ZOOM = 0.006
export const DEFAULT_ITERATIONS = 100
export const DEFAULT_R = -0.5
export const DEFAULT_I = 0.0

// A wrapper around the WASM new_fractal function
export function createFractal() {
  const fractal = new_fractal()
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
    fractal.color_scale = storedFractal.color_scale
    fractal.inner_color_r = storedFractal.inner_color_r
    fractal.inner_color_g = storedFractal.inner_color_g
    fractal.inner_color_b = storedFractal.inner_color_b
  } else {
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
    })
  )
}
