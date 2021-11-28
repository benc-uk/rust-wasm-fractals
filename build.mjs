#!/usr/bin/env node

// =================================
// ESBuild & deployment script
// =================================

import esbuild from 'esbuild'
import htmlPlugin from '@chialab/esbuild-plugin-html'
import { copyFile } from 'fs'

const OUT_DIR = 'dist'

await esbuild.build({
  plugins: [htmlPlugin()],
  entryPoints: ['web/index.html'],
  bundle: true,
  minify: false,
  platform: 'browser',
  format: 'esm',
  outdir: OUT_DIR,
  loader: {
    '.wasm': 'file',
  },
})

console.log('### 🔨 ESBuild complete')

copyFile('pkg/rust_wasm_fractals_bg.wasm', `${OUT_DIR}/esm/rust_wasm_fractals_bg.wasm`, (err) => {
  if (err) throw err
  console.log(`### 💾 Copied WASM bundle to ${OUT_DIR}`)
})
