const Generator = require("yeoman-generator");
const config = require("./config");
const mkdirp = require("mkdirp");
const path = require("path");
const _ = require("lodash");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--skip-install` flag
    for (let optionName in config.options) {
      this.option(optionName, config.options[optionName]);
    }

    // // This makes `appname` a required argument.
    // this.argument("appname", {
    //   type: String,
    //   required: false,
    // });

    // this.config.set("appname", this.options.appname);

    // this.fs.read(this.templatePath('__tests__/index.js'));
    // this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    // this.fs.exists(this.destinationPath('.babelrc'))
    // JSON.parse(this.fs.read(this.destinationPath('.babelrc')))
    // this.fs.write(this.destinationPath('.babelrc'), (JSON.stringify(result) + '\n'));
    // this.fs.writeJSON('package.json', _.merge(pkgJsonFields, this.pkg));
  }

  prompting() {
    return this.prompt(config.prompts).then((answers) => {
      this.answers = answers;

      // this.config.set("typescript", this.answers.typescript);
      // this.config.set("react", this.answers.react);
    });
  }

  writing() {
    const templateData = {
      appname: this.answers.appname,
    };
    const copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output));
    };
    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), data);
    };

    // Create extra directories
    config.dirsToCreate.forEach((item) => {
      mkdirp(item);
    });

    // Render Files
    config.filesToRender.forEach((file) => {
      if (!file.if || templateData[file.if]) {
        copyTpl(file.input, file.output, templateData);
      }
    });

    // Copy Files
    config.filesToCopy.forEach((file) => {
      if (!file.if || templateData[file.if]) {
        copy(file.input, file.output);
      }
    });
  }

  // install() {
  //   if (!this.options["skip-install"]) {
  //     this.npmInstall();
  //   }
  // }
};
