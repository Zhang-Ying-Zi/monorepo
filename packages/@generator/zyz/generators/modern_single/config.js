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
    //   type: "confirm",
    //   name: "typescript",
    //   message: "需要编译TypeScript么？",
    // },
    // {
    //   type: "confirm",
    //   name: "react",
    //   message: "需要编译React么？",
    // },
    // {
    //   type: "confirm",
    //   name: "vue",
    //   message: "需要编译vue么？",
    // },
  ],
  filesToCopy: [
    {
      input: "tsconfig.json",
      output: "tsconfig.json",
    },
    {
      input: "babel.config.json",
      output: "babel.config.json",
    },
    {
      input: ".eslintignore",
      output: ".eslintignore",
    },
    {
      input: ".eslintrc.js",
      output: ".eslintrc.js",
    },
    {
      input: ".lintstagedrc.js",
      output: ".lintstagedrc.js",
    },
    {
      input: ".prettierignore",
      output: ".prettierignore",
    },
    {
      input: ".prettierrc.js",
      output: ".prettierrc.js",
    },
    {
      input: "commitlint.config.js",
      output: "commitlint.config.js",
    },
    {
      input: ".stylelintrc.js",
      output: ".stylelintrc.js",
    },
  ],
  filesToRender: [],
  filesToMerge: [
    {
      file: "package.json",
      default: {
        scripts: {
          prepare:
            "git init && npx husky install && npx husky add .husky/pre-commit 'npx lint-staged' && npx husky add .husky/commit-msg 'npx commitlint --edit ``$1``'",
          eslint: "eslint . --cache --fix",
          compileJS: "babel src --out-dir dist",
          compileTS: "babel src --out-dir dist --extensions '.ts'",
          compile: "npm run compileJS && npm run compileTS",
        },
        dependencies: {},
        devDependencies: {
          "core-js": "^3.10.1",
          "@babel/core": "^7.17.4",
          "@babel/eslint-parser": "^7.17.0",
          "@babel/plugin-proposal-class-properties": "^7.16.7",
          "@babel/plugin-proposal-private-property-in-object": "^7.16.7",
          "@babel/preset-env": "^7.16.11",
          "@babel/preset-react": "^7.16.7",
          "@babel/preset-typescript": "^7.16.7",
          "@commitlint/cli": "^16.1.0",
          "@commitlint/config-conventional": "^16.0.0",
          "@commitlint/config-lerna-scopes": "^16.0.0",
          "@typescript-eslint/eslint-plugin": "^5.12.0",
          "@typescript-eslint/parser": "^5.12.0",
          commitlint: "^16.1.0",
          eslint: "^8.7.0",
          "eslint-config-prettier": "^8.3.0",
          "eslint-plugin-prettier": "^4.0.0",
          "eslint-plugin-react": "^7.28.0",
          "eslint-plugin-vue": "^8.4.1",
          husky: "^7.0.4",
          "lint-staged": "^12.3.4",
          "postcss-less": "^6.0.0",
          "postcss-scss": "^4.0.3",
          prettier: "^2.5.1",
          stylelint: "^14.5.0",
          "stylelint-config-prettier": "^9.0.3",
          "stylelint-config-recommended-less": "^1.0.4",
          "stylelint-config-recommended-scss": "^5.0.2",
          "stylelint-config-standard": "^25.0.0",
          "stylelint-less": "^1.0.3",
          "stylelint-prettier": "^2.0.0",
          typescript: "^4.5.5",
        },
      },
      typescript: {
        scripts: {},
        devDependencies: {},
      },
      react: {
        devDependencies: {},
      },
      vue: {
        devDependencies: {},
      },
    },
  ],
  dirsToCreate: [],
};
