module.exports = {
  "**/!(*min).{ts,tsx}": [
    "tsc --noEmit --skipLibCheck", // 检查 TypeScript
    "eslint --cache --fix",
    "prettier --write",
  ],
  "**/!(*min).{js,jsx}": ["eslint --cache --fix", "prettier --write"],
  "**/*.vue": ["eslint --cache --fix", "prettier --write"],
  "**/!(*min).{css,less,scss}": ["stylelint --cache --fix", "prettier --write"],
};
