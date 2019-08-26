var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: path.resolve(__dirname, ""),
    publicPath: "/",
    filename: "docs/build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            sass: [
              "vue-style-loader",
              "css-loader",
              {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                  data: `
                  @import "./src/styles/_variables.scss";
                  @import "./src/styles/_mixins.scss";
                  @import "./src/styles/_animations.scss";
                  `
                }
              }
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        ie8: false,
        output: {
          comments: false
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
