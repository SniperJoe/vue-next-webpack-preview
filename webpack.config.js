const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IntlifyVuePlugin = require('@intlify/vue-i18n-loader/lib/plugin').default

module.exports = (env = {}) => ({
  mode: 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom',
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    },
    extensions: ['.png', '.js', '.vue', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.png$/,
        type: 'asset/inline'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
        loader: '@intlify/vue-i18n-loader',
        type: 'javascript/auto',
        // Use `Rule.include` to specify the files of locale messages to be pre-compiled
        include: [
          path.resolve(__dirname, './src/locales')
        ]
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new IntlifyVuePlugin({
      __INTLIFY__DEBUG__: (dep) => {
        return 'intlify-debug'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  devServer: {
    hot: true,
    static: __dirname,
    client: {
      overlay: true
    }
  },
  stats: 'minimal'
})
