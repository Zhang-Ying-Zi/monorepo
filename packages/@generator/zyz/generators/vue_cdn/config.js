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
      name: "fileName",
      message: "file name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [
    {
      input: "cdn.html",
      output: "index.html",
    },
  ],
  filesToMerge: [],
  dirsToCreate: [],
};
