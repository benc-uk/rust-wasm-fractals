// pkg/rust_wasm_fractals.js
var wasm;
var heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
function getObject(idx) {
  return heap[idx];
}
var heap_next = heap.length;
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function allocate(width, height) {
  var ret = wasm.allocate(width, height);
  return ret;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function render_fractal(f, fast) {
  _assertClass(f, Fractal);
  wasm.render_fractal(f.ptr, fast);
}
var cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder("utf-8");
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function new_fractal() {
  var ret = wasm.new_fractal();
  return Fractal.__wrap(ret);
}
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
var Fractal = class {
  static __wrap(ptr) {
    const obj = Object.create(Fractal.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_fractal_free(ptr);
  }
  get fractal_type() {
    var ret = wasm.__wbg_get_fractal_fractal_type(this.ptr);
    return ret;
  }
  set fractal_type(arg0) {
    wasm.__wbg_set_fractal_fractal_type(this.ptr, arg0);
  }
  get width() {
    var ret = wasm.__wbg_get_fractal_width(this.ptr);
    return ret;
  }
  set width(arg0) {
    wasm.__wbg_set_fractal_width(this.ptr, arg0);
  }
  get height() {
    var ret = wasm.__wbg_get_fractal_height(this.ptr);
    return ret;
  }
  set height(arg0) {
    wasm.__wbg_set_fractal_height(this.ptr, arg0);
  }
  get zoom() {
    var ret = wasm.__wbg_get_fractal_zoom(this.ptr);
    return ret;
  }
  set zoom(arg0) {
    wasm.__wbg_set_fractal_zoom(this.ptr, arg0);
  }
  get max_iters() {
    var ret = wasm.__wbg_get_fractal_max_iters(this.ptr);
    return ret;
  }
  set max_iters(arg0) {
    wasm.__wbg_set_fractal_max_iters(this.ptr, arg0);
  }
  get center_r() {
    var ret = wasm.__wbg_get_fractal_center_r(this.ptr);
    return ret;
  }
  set center_r(arg0) {
    wasm.__wbg_set_fractal_center_r(this.ptr, arg0);
  }
  get center_i() {
    var ret = wasm.__wbg_get_fractal_center_i(this.ptr);
    return ret;
  }
  set center_i(arg0) {
    wasm.__wbg_set_fractal_center_i(this.ptr, arg0);
  }
  get inner_color_r() {
    var ret = wasm.__wbg_get_fractal_inner_color_r(this.ptr);
    return ret;
  }
  set inner_color_r(arg0) {
    wasm.__wbg_set_fractal_inner_color_r(this.ptr, arg0);
  }
  get inner_color_g() {
    var ret = wasm.__wbg_get_fractal_inner_color_g(this.ptr);
    return ret;
  }
  set inner_color_g(arg0) {
    wasm.__wbg_set_fractal_inner_color_g(this.ptr, arg0);
  }
  get inner_color_b() {
    var ret = wasm.__wbg_get_fractal_inner_color_b(this.ptr);
    return ret;
  }
  set inner_color_b(arg0) {
    wasm.__wbg_set_fractal_inner_color_b(this.ptr, arg0);
  }
  get palette() {
    var ret = wasm.__wbg_get_fractal_palette(this.ptr);
    return ret;
  }
  set palette(arg0) {
    wasm.__wbg_set_fractal_palette(this.ptr, arg0);
  }
  get color_scale() {
    var ret = wasm.__wbg_get_fractal_color_scale(this.ptr);
    return ret;
  }
  set color_scale(arg0) {
    wasm.__wbg_set_fractal_color_scale(this.ptr, arg0);
  }
  get julia_seed_r() {
    var ret = wasm.__wbg_get_fractal_julia_seed_r(this.ptr);
    return ret;
  }
  set julia_seed_r(arg0) {
    wasm.__wbg_set_fractal_julia_seed_r(this.ptr, arg0);
  }
  get julia_seed_i() {
    var ret = wasm.__wbg_get_fractal_julia_seed_i(this.ptr);
    return ret;
  }
  set julia_seed_i(arg0) {
    wasm.__wbg_set_fractal_julia_seed_i(this.ptr, arg0);
  }
  get custom_gradient() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.fractal_custom_gradient(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  set custom_gradient(cg) {
    var ptr0 = passStringToWasm0(cg, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.fractal_set_custom_gradient(this.ptr, ptr0, len0);
  }
};
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
async function init(input) {
  if (typeof input === "undefined") {
    input = new URL("rust_wasm_fractals_bg.wasm", import.meta.url);
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_new_693216e109162396 = function() {
    var ret = new Error();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_stack_0ddaca5d1abfb52f = function(arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_error_09919627ac0992f5 = function(arg0, arg1) {
    try {
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(arg0, arg1);
    }
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  const { instance, module } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  return wasm;
}
var rust_wasm_fractals_default = init;

// web/fractal.js
var DEFAULT_ZOOM = 6e-3;
var DEFAULT_ITERATIONS = 100;
var DEFAULT_R = -0.5;
var DEFAULT_I = 0;
var DEFAULT_JULIA_I = -1.012;
var DEFAULT_JULIA_R = 0.268;
var DEFAULT_CUSTOM = "#000033,#111166,#44FF22,#AAFF77";
function createFractal() {
  const fractal2 = new_fractal();
  if (localStorage.getItem("fractal")) {
    const storedFractal = JSON.parse(localStorage.getItem("fractal"));
    fractal2.fractal_type = storedFractal.fractal_type;
    fractal2.center_r = storedFractal.center_r;
    fractal2.center_i = storedFractal.center_i;
    fractal2.zoom = storedFractal.zoom;
    fractal2.max_iters = storedFractal.max_iters;
    fractal2.width = storedFractal.width;
    fractal2.height = storedFractal.height;
    fractal2.full_width = storedFractal.full_width;
    fractal2.palette = storedFractal.palette;
    fractal2.follow_zoom = storedFractal.follow_zoom;
    fractal2.color_scale = storedFractal.color_scale;
    fractal2.inner_color_r = storedFractal.inner_color_r;
    fractal2.inner_color_g = storedFractal.inner_color_g;
    fractal2.inner_color_b = storedFractal.inner_color_b;
    fractal2.julia_seed_i = storedFractal.julia_seed_i;
    fractal2.julia_seed_r = storedFractal.julia_seed_r;
    fractal2.custom_gradient = storedFractal.custom_gradient;
  } else {
    fractal2.fractal_type = 0;
    fractal2.center_r = DEFAULT_R;
    fractal2.center_i = DEFAULT_I;
    fractal2.zoom = DEFAULT_ZOOM;
    fractal2.max_iters = DEFAULT_ITERATIONS;
    fractal2.width = 800;
    fractal2.height = 600;
    fractal2.full_width = true;
    fractal2.palette = 2;
    fractal2.follow_zoom = false;
    fractal2.color_scale = 0.5;
    fractal2.inner_color_r = 0;
    fractal2.inner_color_g = 0;
    fractal2.inner_color_b = 0;
    fractal2.julia_seed_i = DEFAULT_JULIA_I;
    fractal2.julia_seed_r = DEFAULT_JULIA_R;
    fractal2.custom_gradient = DEFAULT_CUSTOM;
  }
  return fractal2;
}
function saveFractalState(fractal2) {
  localStorage.setItem("fractal", JSON.stringify({
    center_r: fractal2.center_r,
    center_i: fractal2.center_i,
    zoom: fractal2.zoom,
    max_iters: fractal2.max_iters,
    width: fractal2.width,
    height: fractal2.height,
    full_width: fractal2.full_width,
    palette: fractal2.palette,
    follow_zoom: fractal2.follow_zoom,
    color_scale: fractal2.color_scale,
    inner_color_r: fractal2.inner_color_r,
    inner_color_g: fractal2.inner_color_g,
    inner_color_b: fractal2.inner_color_b,
    fractal_type: fractal2.fractal_type,
    julia_seed_i: fractal2.julia_seed_i,
    julia_seed_r: fractal2.julia_seed_r,
    custom_gradient: fractal2.custom_gradient
  }));
}
function reset() {
  fractal.center_r = DEFAULT_R;
  fractal.center_i = DEFAULT_I;
  fractal.zoom = DEFAULT_ZOOM;
  fractal.max_iters = DEFAULT_ITERATIONS;
  fractal.julia_seed_i = DEFAULT_JULIA_I;
  fractal.julia_seed_r = DEFAULT_JULIA_R;
}

// web/toast.js
var toastStyles = document.createElement("style");
toastStyles.innerHTML = `
.toast {
  background-color: #444;
  position: fixed;
  z-index: 50;
  padding: 1rem;
  box-shadow: 0.2rem 0.5rem 0.8rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  cursor: default;
}
.toastShown {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s linear;
}
.toastHidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.5s, opacity 0.3s linear;
}`;
document.body.appendChild(toastStyles);
function showToast(message, duration = 2e3, pos = "top-center") {
  const toast = document.createElement(`div`);
  toast.classList.add(`toast`);
  toast.classList.add(`toastHidden`);
  toast.innerHTML = message;
  toast.addEventListener("click", () => {
    toast.classList.add(`toastHidden`);
  });
  document.body.appendChild(toast);
  switch (pos) {
    case "top-center":
      toast.style.top = "2rem";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      break;
    case "top-right":
      toast.style.top = "2rem";
      toast.style.right = "2rem";
      break;
    case "top-left":
      toast.style.top = "2rem";
      toast.style.left = "2rem";
      break;
    case "bottom-center":
      toast.style.bottom = "2rem";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      break;
    case "bottom-right":
      toast.style.bottom = "2rem";
      toast.style.right = "2rem";
      break;
    case "bottom-left":
      toast.style.bottom = "2rem";
      toast.style.left = "2rem";
      break;
    default:
      toast.style.top = "2rem";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
  }
  toast.classList.replace("toastHidden", "toastShown");
  setTimeout(function() {
    toast.classList.replace("toastShown", "toastHidden");
    setTimeout(function() {
      document.body.removeChild(toast);
    }, 1e3);
  }, duration);
}

// web/settings.js
var settingsDiv = document.createElement("div");
settingsDiv.id = "settings";
settingsDiv.classList.add("hidden", "dialog");
document.body.appendChild(settingsDiv);
settingsDiv.innerHTML = `
<h3>\u2699\uFE0F FractalRust</h3>
<hr />

<div style="display: flex">
  <span class="label">Type</span>
  <span>&nbsp;&nbsp;</span>
  <div class="onoffswitch">
    <input type="checkbox" class="onoffswitch-checkbox" id="setType" tabindex="0" checked />
    <label class="onoffswitch-label" for="setType">
      <span class="onoffswitch-inner"></span>
      <span class="onoffswitch-switch"></span>
    </label>
  </div>
</div>

<div class="row">
  <label for="setIter" class="label">Iterations</label>
  <input type="number" id="setIter" min="20" step="20" style="width: 5rem" />
  <label for="setFollowZoom" style="padding-top: 0.6rem">Link</label>
  <input type="checkbox" id="setFollowZoom" class="larger" />
</div>

<div class="row">
  <label for="setZoom" class="label">Zoom</label>
  <input type="number" id="setZoom" step="0.1" min="0" style="width: 8rem" />
</div>

<div class="row">
  <label for="setSize" class="label">Size</label>
  <select id="setSize">
    <optgroup label="4:3">
      <option value="320_240">320 x 240</option>
      <option value="640_480">640 x 480</option>
      <option value="800_600">800 x 600</option>
      <option value="1024_768">1024 \xD7 768</option>
      <option value="1400_1050">1400 \xD7 1050</option>
      <option value="1600_1200">1600 \xD7 1200</option>
      <option value="2048_1536">2048 \xD7 1536</option>
    </optgroup>
    <optgroup label="16:9">
      <option value="854_480">854 x 480</option>
      <option value="1024_576">1024 x 576</option>
      <option value="1280_720">1280 x 720</option>
      <option value="1920_1080">1920 x 1080</option>
      <option value="2560_1440">2560 x 1440</option>
    </optgroup>
    <optgroup label="21:9">
      <option value="1280_540">1280 x 540</option>
      <option value="2560_1080">2560 x 1080</option>
      <option value="3440_1440">3440 x 1440</option>
    </optgroup>
  </select>
</div>

<div class="row">
  <label for="setPalette" class="label">Palette</label>
  <select id="setPalette">
    <option value="0">Sinebow</option>
    <option value="1">Rainbow</option>
    <option value="2">Magma</option>
    <option value="3">Viridis</option>
    <option value="4">Spectral</option>
    <option value="5">Turbo</option>
    <option value="6">Warm</option>
    <option value="7">Cool</option>
    <option value="8">Plasma</option>
    <option value="9">Spectral</option>
    <option value="10">CubeHelix</option>
    <option value="11">Custom</option>
  </select>
</div>

<div class="row">
  <label for="setCustomPalette" class="label">Custom</label>
  <input type="text" id="setCustomPalette" size="20" style="font-size: 0.8rem" />
</div>

<div class="row">
  <label for="setColorScale" class="label">Color Scale</label>
  <input type="range" min="0.1" max="2" step="0.05" value="1.0" id="setColorScale" />
</div>

<div class="row">
  <label for="setInnerColor" class="label">Inner</label>
  <input type="color" id="setInnerColor" value="#8966" />
</div>

<div class="row">
  <label for="setStretch" class="label">Stretch</label>
  <input type="checkbox" id="setStretch" class="larger" />
</div>

<div class="row button-row">
  <button id="setReset">Reset</button>
  <button id="setDownload">Save</button>
  <button id="setHelp">Help</button>
</div>
<footer>v0.2.1 - Ben Coleman, 2021 <a target="_blank" href="https://github.com/benc-uk/rust-wasm-fractals">[GitHub]</a></footer>
`;
var settingsOpen = false;
var setStretch = document.getElementById("setStretch");
var setPalette = document.getElementById("setPalette");
var setReset = document.getElementById("setReset");
var setDownload = document.getElementById("setDownload");
var setSize = document.getElementById("setSize");
var setIter = document.getElementById("setIter");
var setFollowZoom = document.getElementById("setFollowZoom");
var setZoom = document.getElementById("setZoom");
var setColorScale = document.getElementById("setColorScale");
var setInnerColor = document.getElementById("setInnerColor");
var setHelp = document.getElementById("setHelp");
var setType = document.getElementById("setType");
var setCustomPalette = document.getElementById("setCustomPalette");
var ZOOM_RESCALE = 1e6;
setIter.addEventListener("change", (e) => {
  fractal.max_iters = e.target.value;
  drawFractal();
});
setPalette.addEventListener("change", (e) => {
  console.log(e.target.value);
  fractal.palette = e.target.value;
  drawFractal();
});
setStretch.addEventListener("change", (e) => {
  fractal.full_width = e.target.checked;
  saveFractalState(fractal);
  document.getElementById("canvas").style.width = fractal.full_width ? "100%" : "auto";
});
setReset.addEventListener("click", (e) => {
  reset();
  saveFractalState(fractal);
  window.location.reload();
});
setDownload.addEventListener("click", (e) => {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "fractal.png");
  let canvas = document.getElementById("canvas");
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
  hideSettings();
});
setSize.addEventListener("change", (e) => {
  const width = e.target.value.split("_")[0];
  const height = e.target.value.split("_")[1];
  fractal.width = width;
  fractal.height = height;
  saveFractalState(fractal);
  window.location.reload();
});
setFollowZoom.addEventListener("change", (e) => {
  fractal.follow_zoom = e.target.checked;
  saveFractalState(fractal);
});
setZoom.addEventListener("change", (e) => {
  fractal.zoom = e.target.value / ZOOM_RESCALE;
  saveFractalState(fractal);
  drawFractal();
});
setColorScale.addEventListener("change", (e) => {
  fractal.color_scale = e.target.value;
  saveFractalState(fractal);
  drawFractal();
});
setInnerColor.addEventListener("change", (e) => {
  const hexCode = e.target.value.split("");
  const red = parseInt(hexCode[1] + hexCode[2], 16);
  const green = parseInt(hexCode[3] + hexCode[4], 16);
  const blue = parseInt(hexCode[5] + hexCode[6], 16);
  fractal.inner_color_r = red;
  fractal.inner_color_g = green;
  fractal.inner_color_b = blue;
  saveFractalState(fractal);
  drawFractal();
});
setHelp.addEventListener("click", (e) => {
  hideSettings();
  showToast(`<h3>\u2753 Help</h3>
    <hr>
    - Left click anywhere to recenter the view on that point<br>
    - Right click anywhere to open the settings panel<br>
    - If you get "lost", open the settings and click reset<br>
    - Use the mouse scroll wheel to zoom in and out<br>
    - Use the cursor keys to modify & explore the Julia set seed<br><br>
    Click to dismiss this popup`, 9e4);
});
setType.addEventListener("change", (e) => {
  fractal.fractal_type = e.target.checked ? 0 : 1;
  reset();
  updateSettings();
  saveFractalState(fractal);
  drawFractal();
});
setCustomPalette.addEventListener("change", (e) => {
  fractal.custom_gradient = e.target.value;
  updateSettings();
  saveFractalState(fractal);
});
window.addEventListener("contextmenu", toggleSettings);
function updateSettings() {
  setStretch.checked = fractal.full_width;
  setPalette.value = fractal.palette;
  setSize.value = `${fractal.width}_${fractal.height}`;
  setIter.value = fractal.max_iters;
  setFollowZoom.checked = fractal.follow_zoom;
  setZoom.value = (fractal.zoom * ZOOM_RESCALE).toFixed(10);
  setColorScale.value = fractal.color_scale;
  setInnerColor.value = rgbToHex(fractal.inner_color_r, fractal.inner_color_g, fractal.inner_color_b);
  setType.checked = fractal.fractal_type === 0;
  setCustomPalette.value = fractal.custom_gradient;
}
function toggleSettings(e) {
  e.preventDefault();
  if (!settingsOpen) {
    document.getElementById("settings").classList.replace("hidden", "shown");
    settingsOpen = true;
  } else {
    document.getElementById("settings").classList.replace("shown", "hidden");
    settingsOpen = false;
  }
}
function hideSettings() {
  document.getElementById("settings").classList.replace("shown", "hidden");
  settingsOpen = false;
}
function rgbToHex(r = 0, g = 0, b = 0) {
  let hr = Math.max(0, Math.min(255, Math.round(r))).toString(16);
  let hg = Math.max(0, Math.min(255, Math.round(g))).toString(16);
  let hb = Math.max(0, Math.min(255, Math.round(b))).toString(16);
  return "#" + (hr.length < 2 ? "0" : "") + hr + (hg.length < 2 ? "0" : "") + hg + (hb.length < 2 ? "0" : "") + hb;
}

// web/main.js
var ctx;
var canvasImageData;
var imagePtr;
var rustMemory;
var fractal;
(async function runWasm() {
  const rust = await rust_wasm_fractals_default();
  fractal = createFractal();
  if (!localStorage.getItem("fractal")) {
    showToast("Right click anywhere, to open settings & instructions", 4e3);
  }
  const canvas = document.getElementById("canvas");
  canvas.width = fractal.width;
  canvas.height = fractal.height;
  canvas.style.width = fractal.full_width ? "100%" : "auto";
  canvas.addEventListener("wheel", wheelHandler);
  canvas.addEventListener("click", clickHandler);
  window.addEventListener("keydown", keyHandler);
  ctx = canvas.getContext("2d");
  canvasImageData = ctx.createImageData(fractal.width, fractal.height);
  imagePtr = allocate(fractal.width, fractal.height);
  rustMemory = new Uint8Array(rust.memory.buffer);
  updateSettings();
  drawFractal();
})();
var timerId = -1;
function drawFractal(fast = true) {
  const start = performance.now();
  if (fast) {
    clearInterval(timerId);
    timerId = setInterval(() => {
      drawFractal(false);
      clearInterval(timerId);
    }, 800);
  }
  render_fractal(fractal, fast);
  canvasImageData.data.set(rustMemory.slice(imagePtr, imagePtr + fractal.width * fractal.height * 4));
  ctx.putImageData(canvasImageData, 0, 0);
  const end = performance.now();
  console.log(`### Fractal rendered in ${Math.round(end - start)}ms`);
  saveFractalState(fractal);
}
function clickHandler(e) {
  const x = fractal.width / e.target.getBoundingClientRect().width * e.offsetX;
  const y = fractal.height / e.target.getBoundingClientRect().height * e.offsetY;
  fractal.center_r += (x / fractal.width - 0.5) * fractal.zoom * fractal.width;
  fractal.center_i += (y / fractal.height - 0.5) * fractal.zoom * fractal.height;
  drawFractal();
}
function wheelHandler(e) {
  e.preventDefault();
  const delta = Math.max(Math.abs(e.deltaY) / 500, 1);
  if (e.deltaY > 0) {
    fractal.zoom *= 1.1 * delta;
    if (fractal.follow_zoom) {
      fractal.max_iters /= 1.001 * delta;
    }
  } else {
    fractal.zoom /= 1.1 * delta;
    if (fractal.follow_zoom) {
      fractal.max_iters *= 1.001 * delta;
    }
  }
  if (fractal.zoom < 0)
    fractal.zoom = 0;
  updateSettings();
  drawFractal();
}
function keyHandler(e) {
  if (fractal.fractal_type === 0) {
    return;
  }
  if (e.key === "ArrowRight") {
    fractal.julia_seed_r += 0.3 * fractal.zoom;
  }
  if (e.key === "ArrowLeft") {
    fractal.julia_seed_r -= 0.3 * fractal.zoom;
  }
  if (e.key === "ArrowUp") {
    fractal.julia_seed_i -= 0.3 * fractal.zoom;
  }
  if (e.key === "ArrowDown") {
    fractal.julia_seed_i += 0.3 * fractal.zoom;
  }
  updateSettings();
  drawFractal();
}
export {
  drawFractal,
  fractal
};
