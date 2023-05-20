const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: './src/index.js', // Dẫn tới file index.js ta đã tạo
    output: {
      path: path.join(__dirname, '/build'), // Thư mục chứa file được build ra
      filename: 'bundle.js', // Tên file được build ra
      publicPath: '/',
    },
    devServer: {
      port: '3030',
      static: {
        directory: path.join(__dirname, 'public'),
      },
      open: true,
      hot: true,
      liveReload: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Sẽ sử dụng babel-loader cho những file .js
          exclude: /node_modules/, // Loại trừ thư mục node_modules
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        }
      ],
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],
    devtool : isProduction ?'source-map' : 'inline-source-map'
  };
};
