const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({

  publicPath: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS
    ? '/vue-test-app/'
    : '/',
    
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
});