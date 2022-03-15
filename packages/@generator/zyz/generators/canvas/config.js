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
      name: "templateName",
      message: "template name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [
    {
      input: "index.html.tpl",
      output: "index.html",
    },
  ],
  filesToMerge: [],
  dirsToCreate: [],
};
