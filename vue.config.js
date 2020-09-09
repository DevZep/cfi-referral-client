module.exports = {
  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    devServer: {
      open: true
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
