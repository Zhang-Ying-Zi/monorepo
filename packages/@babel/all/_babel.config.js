module.exports = function (api) {
  // Cached based on the value of some function. If this function returns a value different from
  // a previously-encountered value, the plugins will re-evaluate.
  var env = api.cache(() => process.env.NODE_ENV);
  console.log(env);

  const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ];

  const presets = [
    [
      "@babel/env",
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage",
        corejs: "3",
        modules: "umd", //"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  return {
    presets,
    plugins,
  };
};
