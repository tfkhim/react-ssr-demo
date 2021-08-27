const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolvePath(...segments) {
  return path.resolve(__dirname, ...segments)
}

const baseConfig = {
  target: 'web',
  entry: {
    client: resolvePath('src/client/index.tsx')
  },
  output: {
    clean: true,
    path: resolvePath('dist/client/static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        include: resolvePath('src/client'),
        use: 'ts-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: resolvePath('src/client/index.html'),
        filename: resolvePath('dist/client/index.html')
      }
    )
  ]
}

const prodConfig = {
  mode: 'production'
}

const devConfig = {
  mode: 'development',
  devServer: {
    open: '/',
    hot: true,
    devMiddleware: {
      index: false,
      writeToDisk: true
    },
    proxy: [
      {
        context: (pathName) => {
          return pathName === '/' || pathName === '/index.html'
        },
        target: 'http://localhost:3000',
        pathRewrite: {'.*': '/'},
      }
    ]
  }
}

module.exports = (env) => {
  const extraConf = env.dev === true ? devConfig : prodConfig
  return merge(baseConfig, extraConf)
}
