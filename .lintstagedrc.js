module.exports = {
  "**/*.{ts,tsx}": [
    "tsc --noEmit --skipLibCheck", // 检查 TypeScript
    "eslint --cache --fix",
    "prettier --write",
  ],
  "**/*.{js,jsx}": ["eslint --cache --fix", "prettier --write"],
  "**/*.vue": ["eslint --cache --fix", "prettier --write"],
  "**/*.{css,less,scss}": ["stylelint --cache --fix", "prettier --write"],
};
