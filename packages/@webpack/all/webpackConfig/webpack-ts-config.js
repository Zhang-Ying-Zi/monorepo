const path = require("path");

// eslint-disable-next-line no-unused-vars
module.exports = function (BuildMode) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                configFile: path.resolve(__dirname, "../babel.config.json"),
              },
            },
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [],
  };
};
