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
    path: resolvePath('dist/client'),
    filename: 'static/[name].js'
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
        template: resolvePath('src/client/index.html')
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
    hot: true
  }
}

module.exports = (env) => {
  const extraConf = env.dev === true ? devConfig : prodConfig
  return merge(baseConfig, extraConf)
}
