module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Todo List',
    },
  },
  pwa: {
    name: 'Todo List',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};
