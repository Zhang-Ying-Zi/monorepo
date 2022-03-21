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
      message: "file name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [
    {
      input: "svg.tpl",
      output: "svg.svg",
    },
  ],
  filesToMerge: [],
  dirsToCreate: [],
};
