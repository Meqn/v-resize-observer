module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v-resize-observer/example/'
    : '/',
  outputDir: 'docs/.vuepress/dist/example',
  assetsDir: 'assets',
  indexPath: 'index.html',
  chainWebpack (config) {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = 'example/template.html'
        return args
      })
  }
}
