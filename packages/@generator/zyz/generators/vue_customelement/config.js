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
      type: "input",
      name: "pluginName",
      message: "plugin name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [
    {
      input: "plugin.js.tpl",
      output: "plugin.js",
    },
  ],
  filesToMerge: [],
  dirsToCreate: [],
};
