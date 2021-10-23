# FractalRust - Fractals in Rust with WASM

This is a experiment in rendering Mandelbrot and Julia sets using Rust and displaying them in a web browser via WASM.

A couple of supporting projects are used

- https://rustwasm.github.io/wasm-bindgen/
- https://github.com/rustwasm/wasm-pack

One principal was to keep the Rust code 'clean' and without any references to the WASM/hosting layer, which in this case is JavaScript. So although wasm-bindgen is used, there is no use of js-sys or web-sys, the exported interfaces from the Rust code are simple arrays of basic types (e.g. integers and floats).

The web layer is pure JavaScript & HTML, and requires no bundling, WebPack or transpiling.

## Screenshots

![](https://user-images.githubusercontent.com/14982936/138573056-c48aa6d0-a3a9-4db4-8b1a-3402ede2536f.png)

![](https://user-images.githubusercontent.com/14982936/138572971-a91edb9a-ab93-449e-b110-5f41cdc1ccf7.png)

![](https://user-images.githubusercontent.com/14982936/138572972-973d7387-2635-4fc7-be4c-7acad193d189.png)

![](https://user-images.githubusercontent.com/14982936/138573064-2cd0c215-8120-4a7e-a706-55ae151c87ed.png)

## Running Locally

### Pre-reqs
- Rust & Cargo
- Make
- Something that can act as a local HTTP server, e.g. https://www.npmjs.com/package/http-server or https://github.com/m3ng9i/ran

### Steps

- Run `make build`
- Start HTTP server in root of repo
- Open `/web` path on local server address e.g. http://localhost:8080/web/