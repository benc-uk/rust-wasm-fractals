# FractalRust - Fractals in Rust with WASM

This is a experiment and learning project for rendering Mandelbrot and Julia sets using Rust and displaying them in a web browser via WASM.

Features:

- Interactively explore the fractal via the mouse with pan and zooming
- Mandelbrot and Julia sets
- A range of colour pallettes to pick from 
- Configurable options such as image size, colour scaling, inner set colour.
- Export images as PNG

A couple of supporting projects are used, [WASM-Pack](https://github.com/rustwasm/wasm-pack) and [wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/)

One principal was to keep the Rust code loosely coupled, and free from any dependencies on the WASM/hosting layer, which in this case is JavaScript. So although wasm-bindgen is used, there is no use of js-sys or web-sys, the exported Rust code exposes just simple arrays of basic types (e.g. integers and floats).

The web layer is pure JavaScript & HTML, and requires no bundling, WebPack or transpiling.

## Screenshots

<img src="https://user-images.githubusercontent.com/14982936/138573056-c48aa6d0-a3a9-4db4-8b1a-3402ede2536f.png" style="width: 440px; height: 300px; border-radius:10px; object-fit: cover">


<img src="https://user-images.githubusercontent.com/14982936/138572971-a91edb9a-ab93-449e-b110-5f41cdc1ccf7.png" style="width: 440px; height: 300px; border-radius:10px; object-fit: cover">


<img src="https://user-images.githubusercontent.com/14982936/138573064-2cd0c215-8120-4a7e-a706-55ae151c87ed.png" style="width: 440px; height: 300px; border-radius:10px; object-fit: cover">

<img src="https://user-images.githubusercontent.com/14982936/138572972-973d7387-2635-4fc7-be4c-7acad193d189.png" style="width: 440px; height: 300px; border-radius:10px; object-fit: cover">

See the [examples](./examples) folder for more

## Running Locally

### Pre-reqs
- Rust & Cargo (see https://www.rust-lang.org/tools/install)
- Make
- Something that can act as a local HTTP server, e.g. https://www.npmjs.com/package/http-server or https://github.com/m3ng9i/ran

### Steps

- Run `make build`
- Start HTTP server in root of repo
- Open `/web` path on local server address e.g. http://localhost:8080/web/