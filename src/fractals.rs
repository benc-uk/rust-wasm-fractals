pub fn mandlebrot() -> f64 {
  return 2.8;
}

/*pub fn mandlebrot(a complex128, f Fractal) f64 {
  var z complex128 // zero
  var iter float64
  var mag float64
  for iter <= f.MaxIter {
    z = z*z + a
    mag = real(z)*real(z)+imag(z)*imag(z)
    if mag > escape2 {
      break
    }
    iter++
  }

  if iter >= f.MaxIter {
    return float64(f.MaxIter)
  }

  // I have NO IDEA if this is correct but it looks good
  smoothIter := iter + 2.0 - math.Log(math.Log(mag/math.Log(escape)))/log2
  return smoothIter
}
*/
