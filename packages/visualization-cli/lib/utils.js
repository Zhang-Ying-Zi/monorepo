const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");
const readPkg = require("read-pkg");
const { execSync } = require("child_process");
const sh = require("shelljs");
const download = require("download-git-repo");
const remote = require("yeoman-remote");

async function downLoadTemplate(repository, projectName, clone) {
  await new Promise((resolve, reject) => {
    download(
      repository,
      projectName,
      {
        clone,
      },
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

// 有缓存
// 缓存地址/Users/zhangyingzi/.cache/node-yeoman-remote-cache/
async function downLoadTemplateDir(repositoryUsername, projectName, sourcePath, destPath) {
  await new Promise((resolve, reject) => {
    remote(repositoryUsername, projectName, (err, cachePath) => {
      if (err) return reject(err);
      copyFolderRecursive(path.join(cachePath, sourcePath), destPath);
      resolve();
    });
  });
}

function writeFileTree(dir, files) {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name);
    fsExtra.ensureDirSync(path.dirname(filePath));
    fsExtra.writeFileSync(filePath, files[name]);
  });
}

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function copyFolderRecursive(sourcePath, destPath) {
  if (fs.existsSync(sourcePath)) {
    fs.readdirSync(sourcePath).forEach(function (file, index) {
      var curSourcePath = sourcePath + "/" + file;
      var curDestPath = destPath + "/" + file;
      if (fs.lstatSync(curSourcePath).isDirectory()) {
        // recurse
        copyFolderRecursive(curSourcePath, curDestPath);
      } else {
        // write file
        fsExtra.ensureDirSync(path.dirname(curDestPath));
        let contents = fs.readFileSync(curSourcePath, "utf8");
        // fs.writeFileSync(templatePath, contents, "utf8");
        fsExtra.writeFileSync(curDestPath, contents);
      }
    });
  }
}

function resolveJson(context, name = "package.json") {
  if (fs.existsSync(path.join(context, name))) {
    return readPkg.sync({
      cwd: context,
    });
  }
  return {};
}

function pushBranch() {
  try {
    execSync(`git add . && git commit -m 'release project' && git push origin master`);
  } catch (e) {
    console.log(e);
  }
}

class Shell {
  constructor() {
    this.shell = sh;
  }
  exec(command) {
    return new Promise((resolve, reject) => {
      sh.exec(
        command,
        {
          async: true,
        },
        (code, stdout, stderr) => {
          stdout = stdout.toString().trim();
          if (code === 0) {
            if (stderr) {
              console.error(stderr.toString().trim());
            }
            resolve(stdout);
          } else {
            if (stdout && stderr) {
              console.error(`\n${stdout}`);
            }
            reject(new Error(stderr || stdout));
          }
        }
      );
    });
  }
}

module.exports = {
  downLoadTemplate,
  downLoadTemplateDir,
  writeFileTree,
  deleteFolderRecursive,
  resolveJson,
  pushBranch,
  Shell,
};
