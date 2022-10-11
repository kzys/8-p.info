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
    postcss: {
      plugins: {
        'postcss-nested': {},
      }
    },
    extend: function(c, x) {
      // https://stackoverflow.com/a/73027407
      c.output.hashFunction = 'sha1';
    }
  },

  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-329758-1' } ]
  ]
}
