const path = require("path");

// eslint-disable-next-line no-unused-vars
module.exports = function (BuildMode) {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, "../babel.config.json"),
              // presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [],
  };
};
