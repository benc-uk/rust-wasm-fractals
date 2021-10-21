use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;
use colorgrad::Gradient;
use num::complex::*;

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
pub fn render_fractal(f: &Fractal) {
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
    6 => grad = colorgrad::cubehelix_default(),
    _ => grad = colorgrad::rainbow(),
  }

  for y in 0..f.height as usize {
    for x in 0..f.width as usize {
      let r = r_offset + (x as f64 / f.width) * f.width * f.zoom;
      let i = i_offset + (y as f64 / f.height) * f.height * f.zoom;
      let c = Complex64::new(r, i);

      // Compute the number of iterations in the Mandelbrot set at the given point
      let iters = mandlebrot(c, f.max_iters as u32);

      // Now calculate the color based on the iteration count
      let color: (u8, u8, u8, u8);
      if iters >= f.max_iters.floor() {
        color = (f.inner_color_r, f.inner_color_g, f.inner_color_b, 255);
      } else {
        // The sqrt is to make the colors more visible
        let gradient_index = (iters / f.max_iters).sqrt();
        color = grad.at(gradient_index).to_linear_rgba_u8();
      }

      let index = ((x + y * f.width as usize) * 4) as usize;
      unsafe {
        IMAGE[index] = color.0;
        IMAGE[index + 1] = color.1;
        IMAGE[index + 2] = color.2;
        IMAGE[index + 3] = 255;
      }
    }
  }
}
