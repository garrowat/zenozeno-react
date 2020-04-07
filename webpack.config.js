const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SocialTags = require('social-tags-webpack-plugin');

// const env = dotenv.config().parsed;

// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom'  },
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [
    new SocialTags({
      appUrl: 'https://zenozeno.garrettwatson.io/',
      facebook: {
        'og:url': "https://zenozeno.garrettwatson.io/",
        'og:type': "website",
        'og:title': "Zenozeno",
        'og:image': 'src/images/zenozeno.png',
        'og:description': "AI Quote bot based on GPT-2",
        'og:site_name': "Zenozeno",
        'og:locale': "en_US",
        'og:article:author': "Garrett Watson",
      },
    }),
    new HtmlWebpackPlugin({
      favicon: "./src/favicons/zeno16.ico"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ]
};


