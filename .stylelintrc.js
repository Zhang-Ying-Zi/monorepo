module.exports = {
  plugins: ["stylelint-prettier"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "prettier/prettier": true,
    "no-descending-specificity": null,
  },
  ignoreFiles: ["**/node_modules/**"],
  overrides: [
    {
      files: ["*.less", "**/*.less"],
      extends: ["stylelint-config-recommended-less"],
      customSyntax: "postcss-less",
    },
    {
      files: ["*.scss", "**/*.scss"],
      extends: ["stylelint-config-recommended-scss"],
      customSyntax: "postcss-scss",
    },
  ],
};
