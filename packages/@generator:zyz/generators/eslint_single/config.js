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
      name: "react",
      message: "需要编译React么？",
    },
    {
      type: "confirm",
      name: "vue",
      message: "需要编译vue么？",
    },
  ],
  filesToCopy: [
    {
      input: ".eslintignore",
      output: ".eslintignore",
    },
  ],
  filesToRender: [
    {
      input: ".eslintrc.js.tpl",
      output: ".eslintrc.js",
    },
  ],
  filesToMerge: [
    {
      file: "package.json",
      default: {
        devDependencies: {
          eslint: "^7.24.0",
          "eslint-config-prettier": "^8.2.0",
        },
      },
      react: {
        devDependencies: {
          "eslint-plugin-react": "^7.23.2",
        },
      },
      vue: {
        devDependencies: {
          "eslint-plugin-vue": "^7.9.0",
        },
      },
    },
  ],
  dirsToCreate: [],
};
