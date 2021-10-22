module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v-resize-observer/example/'
    : '/',
  outputDir: 'docs/.vuepress/dist/example',
  assetsDir: 'assets',
  indexPath: 'index.html'
}
