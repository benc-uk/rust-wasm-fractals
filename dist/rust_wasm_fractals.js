
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {number} width
* @param {number} height
* @returns {number}
*/
export function allocate(width, height) {
    var ret = wasm.allocate(width, height);
    return ret;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {Fractal} f
* @param {boolean} fast
*/
export function render_fractal(f, fast) {
    _assertClass(f, Fractal);
    wasm.render_fractal(f.ptr, fast);
}

/**
* @returns {Fractal}
*/
export function new_fractal() {
    var ret = wasm.new_fractal();
    return Fractal.__wrap(ret);
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
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

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
export class Fractal {

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
    /**
    */
    get width() {
        var ret = wasm.__wbg_get_fractal_width(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        wasm.__wbg_set_fractal_width(this.ptr, arg0);
    }
    /**
    */
    get height() {
        var ret = wasm.__wbg_get_fractal_height(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        wasm.__wbg_set_fractal_height(this.ptr, arg0);
    }
    /**
    */
    get zoom() {
        var ret = wasm.__wbg_get_fractal_zoom(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set zoom(arg0) {
        wasm.__wbg_set_fractal_zoom(this.ptr, arg0);
    }
    /**
    */
    get max_iters() {
        var ret = wasm.__wbg_get_fractal_max_iters(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_iters(arg0) {
        wasm.__wbg_set_fractal_max_iters(this.ptr, arg0);
    }
    /**
    */
    get center_r() {
        var ret = wasm.__wbg_get_fractal_center_r(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set center_r(arg0) {
        wasm.__wbg_set_fractal_center_r(this.ptr, arg0);
    }
    /**
    */
    get center_i() {
        var ret = wasm.__wbg_get_fractal_center_i(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set center_i(arg0) {
        wasm.__wbg_set_fractal_center_i(this.ptr, arg0);
    }
    /**
    */
    get inner_color_r() {
        var ret = wasm.__wbg_get_fractal_inner_color_r(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set inner_color_r(arg0) {
        wasm.__wbg_set_fractal_inner_color_r(this.ptr, arg0);
    }
    /**
    */
    get inner_color_g() {
        var ret = wasm.__wbg_get_fractal_inner_color_g(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set inner_color_g(arg0) {
        wasm.__wbg_set_fractal_inner_color_g(this.ptr, arg0);
    }
    /**
    */
    get inner_color_b() {
        var ret = wasm.__wbg_get_fractal_inner_color_b(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set inner_color_b(arg0) {
        wasm.__wbg_set_fractal_inner_color_b(this.ptr, arg0);
    }
    /**
    */
    get palette() {
        var ret = wasm.__wbg_get_fractal_palette(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set palette(arg0) {
        wasm.__wbg_set_fractal_palette(this.ptr, arg0);
    }
    /**
    */
    get color_scale() {
        var ret = wasm.__wbg_get_fractal_color_scale(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set color_scale(arg0) {
        wasm.__wbg_set_fractal_color_scale(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
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
    if (typeof input === 'undefined') {
        input = new URL('rust_wasm_fractals_bg.wasm', import.meta.url);
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

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

