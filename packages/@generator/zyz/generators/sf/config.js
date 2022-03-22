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
      type: "checkbox",
      name: "fileType",
      message: "file type :",
      choices: [
        {
          name: "html",
          value: "html",
          checked: true,
        },
        {
          name: "svg",
          value: "svg",
          checked: false,
        },
        {
          name: "canvas",
          value: "canvas",
          checked: false,
        },
      ],
    },
    {
      type: "input",
      name: "fileName",
      message: "file name :",
    },
  ],
  filesToCopy: [],
  filesToRender: [
    // {
    //   input: "svg.tpl",
    //   output: "svg.svg",
    // },
  ],
  filesToMerge: [],
  dirsToCreate: [],
};
