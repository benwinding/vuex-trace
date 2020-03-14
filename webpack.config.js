const path = require("path");

const isProd = process.argv.includes('production');

module.exports = [
  {
    entry: {
      index: "./src/index.js"
    },
    output: {
      filename: isProd ? "[name].min.js" : '[name]-dev.min.js',
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/"
    },
    devtool: isProd ? undefined : "inline-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  }
];
