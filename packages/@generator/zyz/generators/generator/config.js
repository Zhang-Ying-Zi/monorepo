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
      name: "appname",
      message: "请输入要生成的 generate 的 name : ",
    },
  ],
  filesToCopy: [
    {
      input: "gitignore.tpl",
      output: ".gitignore",
    },
    {
      input: "npmignore.tpl",
      output: ".npmignore",
    },
    {
      input: "composeIndex.js.tpl",
      output: "generators/app/index.js",
    },
    {
      input: "config.js.tpl",
      output: "generators/sub/config.js",
    },
  ],
  filesToRender: [
    {
      input: "package.json.tpl",
      output: "package.json",
    },
    {
      input: "README.md.tpl",
      output: "README.md",
    },
    {
      input: "index.js.tpl",
      output: "generators/sub/index.js",
    },
  ],
  dirsToCreate: ["generators/sub", "generators/sub/templates"],
};
