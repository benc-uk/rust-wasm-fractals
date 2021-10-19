use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;
use num::complex::*;

// very fast rng
// use rand::Rng;
// extern crate rand_xoshiro;
// use rand_xoshiro::rand_core::SeedableRng;
// use rand_xoshiro::Xoroshiro128StarStar;

mod fractal;
use crate::fractal::*;
mod console;

static mut IMAGE: Vec<u8> = Vec::new();
static mut WIDTH: f64 = 0.0;
static mut HEIGHT: f64 = 0.0;

#[wasm_bindgen]
pub fn allocate(w: usize, h: usize) -> *const u8 {
  console_error_panic_hook::set_once();

  unsafe {
    IMAGE = vec![0; w * h * 4];
    WIDTH = w as f64;
    HEIGHT = h as f64;
    return IMAGE.as_ptr();
  }
}

#[wasm_bindgen]
pub fn render_fractal(f: &Fractal) {
  let color1 = (255, 255, 48, 255);
  unsafe {
    let scale = f.zoom / (WIDTH + HEIGHT);
    let r_offset = f.center_r - (WIDTH / 2.0) * scale;
    let i_offset = f.center_i - (HEIGHT / 2.0) * scale;

    let grad = colorgrad::viridis();

    for y in 0..HEIGHT as usize {
      for x in 0..WIDTH as usize {
        // This gibberish converts from image space (x, y) to complex plane (r, i)
        // Takes into account aspect ratio, magnification and centering
        let r = r_offset + (x as f64 / WIDTH) * WIDTH * scale;
        let i = i_offset + (y as f64 / HEIGHT) * HEIGHT * scale;
        let c = Complex64::new(r, i);

        let iters = mandlebrot(c, f.max_iters as u32);
        let color: (u8, u8, u8, u8);
        if iters >= f.max_iters {
          color = color1;
        } else {
          let ni = (iters / f.max_iters) * 2.0;
          color = grad.at(ni).to_linear_rgba_u8();
        }

        let index = ((x + y * WIDTH as usize) * 4) as usize;
        IMAGE[index] = color.0;
        IMAGE[index + 1] = color.1;
        IMAGE[index + 2] = color.2;
        IMAGE[index + 3] = 255;
      }
    }
  }
}
