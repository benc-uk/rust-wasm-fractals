use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;
use colorgrad::*;
use num::complex::*;
use std::cmp;

mod fractal;
use crate::fractal::*;
mod console;

static mut IMAGE: Vec<u8> = Vec::new();

#[wasm_bindgen]
pub fn allocate(width: usize, height: usize) -> *const u8 {
  console_error_panic_hook::set_once();

  unsafe {
    IMAGE = vec![0; width * height * 4];
    return IMAGE.as_ptr();
  }
}

#[wasm_bindgen]
pub fn render_fractal(f: &Fractal, fast: bool) {
  let r_offset = f.center_r - (f.width / 2.0) * f.zoom;
  let i_offset = f.center_i - (f.height / 2.0) * f.zoom;

  let grad: Gradient;
  match f.palette {
    0 => grad = colorgrad::sinebow(),
    1 => grad = colorgrad::rainbow(),
    2 => grad = colorgrad::magma(),
    3 => grad = colorgrad::viridis(),
    4 => grad = colorgrad::spectral(),
    5 => grad = colorgrad::turbo(),
    6 => grad = colorgrad::warm(),
    7 => grad = colorgrad::cool(),
    8 => grad = colorgrad::plasma(),
    9 => grad = colorgrad::spectral(),
    10 => grad = colorgrad::cubehelix_default(),
    _ => grad = colorgrad::rainbow(),
  }

  unsafe {
    let step: usize = if fast {
      cmp::max((IMAGE.len() as f64 / 500000.0).floor() as usize, 1)
    } else {
      1
    };

    let julia_seed = Complex64::new(f.julia_seed_i, f.julia_seed_r);
    for y in (0..f.height as usize).step_by(step) {
      for x in (0..f.width as usize).step_by(step) {
        let r = r_offset + (x as f64 / f.width) * f.width * f.zoom;
        let i = i_offset + (y as f64 / f.height) * f.height * f.zoom;
        let c = Complex64::new(r, i);

        // Compute the number of iterations in the Mandelbrot set at the given point
        let mut iters = 0.0;
        if f.fractal_type == 0 {
          iters = mandlebrot(c, f.max_iters as u32);
        } else {
          iters = julia(c, julia_seed, f.max_iters as u32);
        }

        // Now calculate the color based on the iteration count
        let color: (u8, u8, u8, u8);
        if iters >= f.max_iters.floor() {
          color = (f.inner_color_r, f.inner_color_g, f.inner_color_b, 255);
        } else {
          let mut gradient_index = iters / f.max_iters;
          // This lets us get more creative with colouring
          gradient_index = gradient_index.powf(f.color_scale);
          color = grad.at(gradient_index).to_linear_rgba_u8();
        }

        // render a block of pixels if in fast mode, or just one pixel if not
        if fast {
          for xd in 0..step {
            for yd in 0..step {
              set_pixel(x + xd, y + yd, f.width, color);
            }
          }
        } else {
          set_pixel(x, y, f.width, color);
        }
      }
    }
  }
}

fn set_pixel(x: usize, y: usize, width: f64, color: (u8, u8, u8, u8)) {
  let index = (y * (width as usize) + x) * 4 as usize;

  unsafe {
    if index >= IMAGE.len() {
      return;
    }
  }

  unsafe {
    IMAGE[index] = color.0;
    IMAGE[index + 1] = color.1;
    IMAGE[index + 2] = color.2;
    IMAGE[index + 3] = 255;
  }
}
