const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  // This ensures assets are loaded from /vue-test-app/ instead of the root
  publicPath: process.env.NODE_ENV === 'production'
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