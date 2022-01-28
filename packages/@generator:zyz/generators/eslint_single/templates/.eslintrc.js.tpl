module.exports = {
  extends: [
    // "eslint:recommended",
    <%_ if(vue) { -%>
    "plugin:vue/recommended",
    <%_ } -%>
    <%_ if(react) { -%>
    "plugin:react/recommended",
    <%_ } -%>
    "prettier",
  ],
  rules: {},
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    es6: true,
  },
};
