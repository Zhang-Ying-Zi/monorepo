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
      name: "sfcName",
      message: "single file component name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [],
  filesToMerge: [],
  dirsToCreate: [],
};
