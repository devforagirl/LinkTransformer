module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  // 关闭生产环境console
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
};
