#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");
const initial = require("../command/initial");
const generate = require("../command/generator");
const release = require("../command/release");
const releaseComponent = require("../command/releaseComponent");

const pkg = require("../package.json");

let config = {};
// 配置文件如果存在则读取
if (fs.existsSync(path.resolve("vslz.config.js"))) {
  config = require(path.resolve("vslz.config.js"));
}

program
  .version(pkg.version, "-v, --version")
  .command("init")
  .description("初始化 vslz config 配置文件")
  .action(initial);

program
  .command("create [template]")
  .description("生成 vslz 模板")
  .action(function (template) {
    generate(template);
  });

program
  .command("release")
  .description("发布模板")
  .action(function () {
    release();
  });

program
  .command("releaseComponent")
  .description("发布组件")
  .action(function () {
    releaseComponent();
  });

program.parse(process.argv);
