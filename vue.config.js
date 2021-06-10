const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  //  process.env.VUE_APP_PROJECT_NAME
  outputDir: './dist',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: false,

  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@/publicPath': './',
        '@c': './src/components'
      }
    }
  }
}