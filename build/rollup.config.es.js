import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'ResizeObserver',
    file: 'dist/ResizeObserver.esm.js',
    format: 'es',
  },
  external: [
    ...base.external,
    'lodash/debounce',
    'lodash/throttle',
    'resize-observer-polyfill',
    /@babel\/runtime/,
  ],
})

export default config
