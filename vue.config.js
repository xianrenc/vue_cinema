module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.103.194.52:8085/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
