use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;

// very fast rng
use rand::Rng;
extern crate rand_xoshiro;
use rand_xoshiro::rand_core::SeedableRng;
use rand_xoshiro::Xoroshiro128StarStar;

//
mod fractals;
use crate::fractals::*;

static mut IMAGE: Vec<u8> = Vec::new();
static mut WIDTH: u32 = 0;
static mut HEIGHT: u32 = 0;

#[wasm_bindgen]
pub fn allocate(w: usize, h: usize) -> *const u8 {
  console_error_panic_hook::set_once();

  unsafe {
    IMAGE = vec![0; w * h * 4];
    WIDTH = w as u32;
    HEIGHT = h as u32;
    return IMAGE.as_ptr();
  }
}

#[wasm_bindgen]
pub fn render_fractal(u: u64) {
  let mut rng = Xoroshiro128StarStar::seed_from_u64(u);

  let g = mandlebrot();

  unsafe {
    for i in (0..IMAGE.len()).step_by(4) {
      let f: u8 = rng.gen();
      IMAGE[i + 0] = g as u8;
      IMAGE[i + 1] = f;
      IMAGE[i + 2] = f;
      IMAGE[i + 3] = 255;
    }
  }
}
