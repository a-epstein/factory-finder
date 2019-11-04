const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    publicPath: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? '/factory-finder/' : '/',
    devServer: {
      port: 3000,
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true
        },
        '/auth': {
          target: 'http://localhost:8080',
          changeOrigin: true
        }
      },
    },
    chainWebpack: (config) => {
      config.module
        .rule('images')
        .use('url-loader')
        .tap(options => Object.assign({}, options, { name: 'img/[name].[ext]' }));
    },
    configureWebpack: {
      output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
      },
      plugins: [
        new SWPrecacheWebpackPlugin({
          cacheId: 'pokemon-filter',
          filename: 'service-worker-cache.js',
          staticFileGlobs: ['dist/**/*.{js,css}', '/'],
          minify: true,
          stripPrefix: 'dist/',
          dontCacheBustUrlsMatching: /\.\w{6}\./
        }),
      ]
    },
    css: {
      loaderOptions: {
        sass: {
          sassOptions: {
            includePaths: [],
          }
        },
      }
    }
}