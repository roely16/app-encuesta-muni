module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ?
      '/apps/app-encuesta-muni/' : '/',
  pwa: {
      workboxOptions: {
          skipWaiting: true
      }
  }
}
