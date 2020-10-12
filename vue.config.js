module.exports = {
  pwa: {
    name: 'Todo List App',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};
