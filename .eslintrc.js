module.exports = {
  extends: [
    "eslint:recommended", // eslint 自己的推荐规则，最佳实践最小集
    "plugin:react/recommended",
    // "prettier",
    "plugin:prettier/recommended", // 禁用 eslint 关于代码的风格的规则，使用 prettier 的风格
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    // 识别 ES 的代码，使用 ECMAScript 2021 自动设置 ecmaVersion parser 为 12，
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    // 使用 Prettier 的代码风格规则
    // 并用 Prettier 来自动修复代码
    // "prettier"
  ],
  // 解决规则冲突
  rules: {
    // "prettier/prettier": "error",
    // "arrow-body-style": "off",
    // "prefer-arrow-callback": "off",
    // 每行不能超过 120 个字符
    "max-len": ["error", { code: 120 }],
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  overrides: [
    // 处理 JS 文件
    {
      files: ["**/*.{js,jsx}"], // 只处理 js 和 jsx 文件
      parser: "@babel/eslint-parser", // 使用 babel 来解析 js 文件
      parserOptions: {
        sourceType: "module", // 支持 import/export
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
        babelOptions: {
          rootMode: "upward",
        },
      },
    },
    // 处理 TS 文件
    {
      files: ["**/*.{ts,tsx}"], // 只处理 ts 和 js 文件
      excludedFiles: [".eslintrc.js"], // 这里禁用了 .eslintrc.js 的类型检查
      parser: "@typescript-eslint/parser", // 能看懂 TypeScript
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"], // 告诉 eslint：tsconfig 在哪
      },
      extends: [
        // typescript-eslint 的推荐规则，只是这些最佳规则都是针对 TS 的
        "plugin:@typescript-eslint/recommended",
        // tsconfig.json 里 Type Checking 的推荐规则
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: [
        // 使用 typescript x eslint 的插件
        "@typescript-eslint",
      ],
    },
    // 处理 vue 文件
    {
      files: ["**/*.vue"], // 只处理 vue 文件
      extends: [
        // "plugin:vue/vue3-recommended",
        "plugin:vue/recommended", // Use this if you are using Vue.js 2.x.
        "plugin:prettier/recommended",
      ],
    },
  ],
};
