module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v-resize-observer/'
    : '/',
  outputDir: 'docs/.vuepress/dist/demo',
  assetsDir: 'assets',
  indexPath: 'index.html'
}
