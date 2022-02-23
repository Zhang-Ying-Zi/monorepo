export function uniqueString(str) {
  return [...new Set(str)].join("");
}

export function isStr(str) {
  return typeof str === "string";
}
