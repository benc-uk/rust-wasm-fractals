use num::complex::*;
use std::f64;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Fractal {
  // pub w: f64,
  // pub h: f64,
  pub ratio: f64,
  pub zoom: f64,
  pub max_iters: f64,
  pub center_r: f64,
  pub center_i: f64,
}

#[wasm_bindgen]
pub fn return_new_fractal() -> Fractal {
  Fractal {
    // h: 3.0,
    // w: 4.0,
    ratio: 1.333,
    max_iters: 50.0,
    zoom: 1.0,
    center_r: -1.2,
    center_i: 0.2,
  }
}

static LOG2: f64 = 0.693147180559945309417232121458176568075;

pub fn mandlebrot(a: Complex64, max_iter: u32) -> f64 {
  let mut z: Complex64 = Complex64::new(0.0, 0.0);
  let mut mag: f64 = 1110.0;
  let mut iter: u32 = u32::max_value();

  for i in 0..max_iter {
    z = z * z + a;
    mag = z.re * z.re + z.im * z.im;
    if mag > 4.0 {
      iter = i;
      break;
    }
  }

  if iter >= max_iter {
    return max_iter as f64;
  }

  // I have NO IDEA if this is correct but it looks good
  let smooth_iter = iter as f64 + 2.0 - f64::ln(f64::ln(mag)) / LOG2;
  return smooth_iter as f64;
}
