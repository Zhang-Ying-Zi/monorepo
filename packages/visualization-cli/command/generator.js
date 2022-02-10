const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const genConfig = require("../tpl/getConfig");
const { downLoadTemplate, writeFileTree, resolveJson, deleteFolderRecursive } = require("../lib/utils");

// 目标文件夹根路径
let targetRootPath = process.cwd();

function copyTemplates(name, config) {
  async function readAndCopyFile(parentPath, tempPath) {
    const spinner = ora("🗃 开始下载模版...").start();
    await downLoadTemplate(`direct:git@github.com:Zhang-Ying-Zi/monorepo.git`, name, true);
    spinner.succeed("🎉 模版下载完成");
    console.log();
    console.info("🚀 初始化文件配置信息...");
    console.log();
    console.log(parentPath);

    const pkg = {
      name,
      version: "0.1.0",
      private: true,
    };

    await writeFileTree(parentPath, {
      "package.json": JSON.stringify(
        {
          ...resolveJson(parentPath),
          ...pkg,
        },
        null,
        2
      ),
    });

    await writeFileTree(parentPath, {
      "vslz.config.js": genConfig({
        name: this.name,
        templateName: config.templateName,
        author: config.author,
      }),
    });
    console.log();
    console.log(chalk.green(`🎉 你的项目 ${name} 已创建成功！`));
    console.log();
  }

  readAndCopyFile(path.join(targetRootPath, name), name);
}

async function getTemplateName() {
  return await inquirer.prompt([
    {
      name: "author",
      type: "input",
      message: "模版作者",
      default: "",
    },
    {
      name: "templateName",
      type: "input",
      message: "模版中文名",
      default: "",
    },
  ]);
}

async function generate(name) {
  const config = await getTemplateName();
  const targetDir = path.join(targetRootPath, name, "/packages/visualiztion-template");

  if (fs.existsSync(targetDir)) {
    // 如果已存在改模块，提问开发者是否覆盖该模块
    inquirer
      .prompt([
        {
          name: "template-overwrite",
          type: "confirm",
          message: `模板 ${name} 已经存在, 是否确认覆盖?`,
          validate: function (input) {
            if (input.lowerCase !== "y" && input.lowerCase !== "n") {
              return "Please input y/n !";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        console.log("answers", answers);

        // 如果确定覆盖
        if (answers["template-overwrite"]) {
          // 删除文件夹
          deleteFolderRecursive(targetDir);
          console.log(chalk.yellow(`template already existed , removing!`));

          //创建新模块文件夹
          fs.mkdirSync(targetDir);
          copyTemplates(name, config);
          console.log(chalk.green(`生成模板 "${name}" 完成!`));
        }
      })
      .catch((err) => {
        console.log(chalk.red(err));
      });
  } else {
    //创建新模块文件夹
    fs.mkdirSync(targetDir);
    copyTemplates(name, config);
    console.log(chalk.green(`生成模板 "${name}" 完成!`));
  }
}

module.exports = generate;