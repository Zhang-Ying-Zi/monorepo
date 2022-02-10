module.exports = {
  options: {
    "skip-install": {
      desc: "跳过下载node_modules",
      type: Boolean,
      required: false,
    },
  },
  prompts: [
    // {
    //   type: "checkbox",
    //   name: "features",
    //   message: "checkbox type",
    //   choices: [
    //     {
    //       name: "value1",
    //       value: "value1",
    //       checked: true,
    //     },
    //     {
    //       name: "value2",
    //       value: "value2",
    //       checked: true,
    //     },
    //   ],
    // },
    // {
    //   type: "confirm",
    //   name: "features2",
    //   message: "confirm type",
    //   default: true,
    //   // when: (answers) => !answers.features.includes("includeBootstrap"),
    // },
    {
      type: "input",
      name: "storyComponentName",
      message: "input component name",
    },
  ],
  filesToCopy: [
    // {
    //   if: "typescript",
    //   input: "tsconfig.json",
    //   output: "tsconfig.json",
    // },
  ],
  filesToRender: [
    // {
    //   input: "storyVue2.js.tpl",
    //   output: "",
    // },
  ],
  filesToMerge: [
    // {
    //   file: "package.json",
    //   default: {},
    //   typescript: {},
    // },
  ],
  dirsToCreate: [],
};
