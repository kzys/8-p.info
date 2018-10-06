const postcss_nested = require('postcss-nested');

module.exports = {
  css: [
    "normalize.css",
    "@assets/style.css",
    "@fortawesome/fontawesome-free/css/all.css"
  ],
  head: {
      meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
  },
  build: {
    postcss: [ postcss_nested ]
  }
}
