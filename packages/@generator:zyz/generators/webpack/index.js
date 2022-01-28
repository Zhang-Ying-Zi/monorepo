const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.composeWith("zyz:init", {});
    this.composeWith("zyz-babel:babel", {});
    this.composeWith("zyz-eslint:eslint", {});
    this.composeWith("zyz:@webpack", {});
  }

  prompting() {}

  writing() {}

  install() {}
};
