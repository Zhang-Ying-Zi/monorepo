module.exports = {
  options: {
    "skip-install": {
      desc: "跳过下载node_modules",
      type: Boolean,
      required: false,
    },
  },
  prompts: [
    {
      type: "confirm",
      name: "typescript",
      message: "需要编译TypeScript么？",
    },
    {
      type: "confirm",
      name: "react",
      message: "需要编译React么？",
    },
  ],
  filesToCopy: [
    {
      if: "typescript",
      input: "packages/@babel/all/tsconfig.json",
      output: "tsconfig.json",
    },
  ],
  filesToRender: [
    {
      input: "babel.config.json.tpl",
      output: "babel.config.json",
    },
  ],
  filesToMerge: [
    {
      file: "package.json",
      default: {
        scripts: {
          compileJS: "babel src --out-dir dist",
          compile: "npm run compileJS",
        },
        dependencies: {},
        devDependencies: {
          "@babel/cli": "^7.13.10",
          "@babel/core": "^7.13.10",
          "@babel/plugin-proposal-class-properties": "^7.13.0",
          "@babel/plugin-proposal-object-rest-spread": "^7.13.8",
          "@babel/preset-env": "^7.13.12",
          "core-js": "^3.10.1",
        },
      },
      typescript: {
        scripts: {
          compileTS: "babel src --out-dir dist --extensions '.ts'",
          compile: "npm run compileJS && npm run compileTS",
        },
        devDependencies: {
          "@babel/preset-typescript": "^7.13.0",
          typescript: "^4.2.4",
        },
      },
      react: {
        devDependencies: {
          "@babel/preset-react": "^7.12.13",
        },
      },
    },
  ],
  dirsToCreate: [],
};
