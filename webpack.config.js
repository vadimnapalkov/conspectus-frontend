const path = require('path');

const webpack = require('webpack');
const WebpackModules = require('webpack-modules');
const config = require('sapper/config/webpack.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pkg = require('./package.json');

const mode = process.env.NODE_ENV || 'production';
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte'), Api: path.resolve('./src/api/'), Stores: path.resolve('./src/stores') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];
const fileLoaderRule = {
  test: /\.(png|jpe?g|gif)$/i,
  use: ['file-loader']
};

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              onwarn: (warning, handler) => {
                const { code } = warning;
                if (code === 'css-unused-selector') return;
                handler(warning);
              },
              hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
              preprocess: require('svelte-preprocess')({
                defaults: {
                  style: 'scss'
                }
              })
            }
          }
        },
        fileLoaderRule,
        {
          test: /\.(s*)css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new MiniCssExtractPlugin()
    ].filter(Boolean),
    devtool: dev && 'inline-source-map'
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              css: false,
              onwarn: (warning, handler) => {
                const { code } = warning;
                if (code === 'css-unused-selector') return;
                handler(warning);
              },
              generate: 'ssr',
              hydratable: true,
              dev
            }
          }
        },
        fileLoaderRule,
        {
          test: /\.(s*)css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    mode,
    plugins: [new WebpackModules(), new MiniCssExtractPlugin()],
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode
  }
};
