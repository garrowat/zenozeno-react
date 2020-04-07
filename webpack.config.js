const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SocialTags = require('social-tags-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./public/index.html'),
      favicon: path.resolve('./src/favicons/zeno16.ico'),
    }),
    new SocialTags({
      appUrl: 'https://zenozeno.garrettwatson.io/',
      facebook: {
        'og:url': "https://zenozeno.garrettwatson.io/",
        'og:type': "website",
        'og:title': "Zenozeno",
        'og:image': "./src/images/zenozeno.png",
        'og:description': "AI Quote bot based on GPT-2",
        'og:site_name': "Zenozeno",
        'og:locale': "en_US",
        'og:article:author': "Garrett Watson",
      },
    }),
  ]
};


