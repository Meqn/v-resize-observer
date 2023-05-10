import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json' assert { type: 'json'}

const name = 'vResizeObserver'
const env = process.env.NODE_ENV
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const banner =
  '/*!\n' +
  ` * ${pkg.name} v${pkg.version}\n` +
  ` * (c) ${new Date().getFullYear()} Mervin<mengqing723@gmail.com>\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const outputs = [
  {
    name,
    file: pkg.unpkg,
    format: 'iife',
    banner,
    globals: {
      vue: 'Vue',
      'resize-observer-polyfill': 'ResizeObserver',
      'vue-demi': 'VueDemi'
    },
  },
  {
    file: pkg.main,
    format: 'cjs',
    banner
  },
  {
    file: pkg.module,
    format: 'esm',
    banner
  }
]

function generateLib(outputs) {
  return outputs.map(item => {
    const entryFile = ['es', 'esm', 'module'].includes(item.format) ? 'src/index.ts' : 'src/index.comm.ts'
    const config = defineConfig({
      input: path.resolve(__dirname, entryFile),
      output: item,
      plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
          useTsconfigDeclarationDir: true,
          cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache')
        })
      ]
    })

    if (item.format === 'iife') {
      config.external = [
        'vue-demi',
      ]
      // config.plugins.push(terser())
    } else {
      config.external = [
        'vue-demi',
        'resize-observer-polyfill'
      ]
    }
    
    return config
  })
}

export default [
  ...generateLib(outputs),
  {
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
      file: pkg.types,
      format: 'es'
    }
  }
]
