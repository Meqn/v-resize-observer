import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named', // 文档：https://www.rollupjs.com/guide/big-list-of-options#exports
    name: 'ResizeObserver',
    file: 'dist/ResizeObserver.umd.js',
    format: 'umd',
  },
})

export default config
