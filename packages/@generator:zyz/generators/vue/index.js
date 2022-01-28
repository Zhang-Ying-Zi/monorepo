const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.composeWith("zyz:init", {});
    this.composeWith("zyz:babel_single", { react: false, typescript: true });
    this.composeWith("zyz:eslint_babel", { vue: true });
    this.composeWith("zyz:webpack", {});
    this.composeWith("zyz:vue_single", {});
  }

  prompting() {}

  writing() {}

  install() {}
};
