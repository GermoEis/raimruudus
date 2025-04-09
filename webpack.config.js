const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');  // Vue-loader plugin

module.exports = {
  mode: 'development',
  entry: './src/main.js', // Siin on sinu sisendfail
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm-bundler.js',  // Vue 3 esm-bundler versioon
    },
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // Vue-failide töötlemine
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),  // Vue-loader plugin
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Uus `static` määrang
    },
    port: 8080,
    hot: true,  // Reaalajas uuendused
    open: true, // Ava brauseri aken, kui server käivitatakse
  },
};
