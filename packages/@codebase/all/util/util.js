/****************************** Number ******************************/

export function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Get a random boolean
export const getRandomBoolean = () => Math.random() >= 0.5;

// Check if a number is even or odd
export const isEven = (num) => num % 2 === 0;

// Generate a random number between two numbers
export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/****************************** String ******************************/

// Make the first character of a string lowercase
export const lowercaseFirst = (str) =>
  `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

// Capitalizing a string
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Repeat a string
export const repeat = (str, numberOfTimes) => str.repeat(numberOfTimes);

// Generate a random string using the Node crypto module
// export const randomStr = () =>
//   require("crypto").randomBytes(32).toString("hex");

export function uniqueString(str) {
  return [...new Set(str)].join("");
}

export function isStr(str) {
  return typeof str === "string";
}

export const randomString = () => Math.random().toString(36).slice(2);

// Generate a random id using the Node crypto module
// export const uuid = () =>
//   ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );

// Get the actual type of javascript primitives
export const trueTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
// console.log(trueTypeOf(''));
// // string
// console.log(trueTypeOf(0));
// // number
// console.log(trueTypeOf());
// // undefined
// console.log(trueTypeOf(null));
// // null
// console.log(trueTypeOf({}));
// // object
// console.log(trueTypeOf([]));
// // array
// console.log(trueTypeOf(() => {}));
// // function

// Truncate string at the end
export const truncateString = (string, length) => {
  return string.length < length ? string : `${string.slice(0, length - 3)}...`;
};

// Truncate string from the middle
export const truncateStringMiddle = (string, start, end) => {
  return `${string.slice(0, start)}...${string.slice(string.length - end)}`;
};

export function is32Bit(c) {
  return c.codePointAt(0) > 0xffff;
}

// 正确返回字符串长度的函数, 支持UTF-16
export function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

/****************************** Array ******************************/

// Check if an object is an array
export const isArray = (obj) => Array.isArray(obj);

// Check if an array is not empty
export const isNotEmpty = (arr) =>
  Array.isArray(arr) && Object.keys(arr).length > 0;

export function uniqueArray(array) {
  return [...new Set(array)];
}

export function flatten(array) {
  function* flat(array) {
    for (let item of array) {
      if (Array.isArray(item)) yield* flat(item);
      else yield item;
    }
  }
  return [...flat(array)];
}

// Merge but don't remove the duplications
export const merge = (a, b) => a.concat(b);
export const mergeAnother = (a, b) => [...a, ...b];
// Merge and remove the duplications
export const mergeNoDuplication = (a, b) => [...new Set(a.concat(b))];
export const mergeNoDuplicationAnother = (a, b) => [...new Set([...a, ...b])];

// Compare two arrays
export const isEqualArray = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const isEqualArrayAnother = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

// Convert an array of objects to a single object
export const toObject = (arr, key) =>
  arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});
export const toObjectAnother = (arr, key) =>
  Object.fromEntries(arr.map((it) => [it[key], it]));
// Example
// toObject(
//   [
//     { id: "1", name: "Alpha", gender: "Male" },
//     { id: "2", name: "Bravo", gender: "Male" },
//     { id: "3", name: "Charlie", gender: "Female" },
//   ],
//   "id"
// );
/*
  {
  '1': { id: '1', name: 'Alpha', gender: 'Male' },
  '2': { id: '2', name: 'Bravo', gender: 'Male' },
  '3': { id: '3', name: 'Charlie', gender: 'Female' }
  }
  */

// Count by the properties of an array of objects
export const countElementsByProp = (arr, prop) =>
  arr.reduce(
    (prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev),
    {}
  );
// Example
// countElementsByProp(
//   [
//     { branch: "audi", model: "q8", year: "2019" },
//     { branch: "audi", model: "rs7", year: "2020" },
//     { branch: "ford", model: "mustang", year: "2019" },
//     { branch: "ford", model: "explorer", year: "2020" },
//     { branch: "bmw", model: "x7", year: "2020" },
//   ],
//   "branch"
// );
// { 'audi': 2, 'ford': 2, 'bmw': 1 }

export const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

export const toArray = (() =>
  Array.from ? Array.from : (obj) => [].slice.call(obj))();

export function ArrayOf() {
  return [].slice.call(arguments);
}

/****************************** Object ******************************/

// 遍历对象
export function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

// 遍历对象 赋值Symbol.iterator
export function* objectEntries2() {
  let propKeys = Reflect.ownKeys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

// 将对象彻底冻结
export function constantize(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
}

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Check if multiple objects are equal
export const isEqualObject = (...objects) =>
  objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

// Check if an object is a Promise
export const isPromise = (obj) =>
  !!obj &&
  (typeof obj === "object" || typeof obj === "function") &&
  typeof obj.then === "function";

// Extract values of a property from an array of objects
export const pluck = (objs, property) => objs.map((obj) => obj[property]);
// Example
// pluck(
//   [
//     { name: "John", age: 20 },
//     { name: "Smith", age: 25 },
//     { name: "Peter", age: 30 },
//   ],
//   "name"
// );
// ['John', 'Smith', 'Peter']

// Invert keys and values of an object
export const invert = (obj) =>
  Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
export const invertAnother = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
// Example
// invert({ a: "1", b: "2", c: "3" }); // { 1: 'a', 2: 'b', 3: 'c' }

// Remove all null and undefined properties from an object
export const removeNullUndefined = (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
export const removeNullUndefinedAnother = (obj) =>
  Object.entries(obj)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
export const removeNullUndefinedAnotherYet = (obj) =>
  // eslint-disable-next-line no-unused-vars
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
// Example
// removeNullUndefined({
//   foo: null,
//   bar: undefined,
//   fuzz: 42,
// });
// { fuzz: 42 }

// Sort an object by its properties
export const sort = (obj) =>
  Object.keys(obj)
    .sort()
    .reduce((p, c) => ((p[c] = obj[c]), p), {});
// Example
// const colors = {
//   white: "#ffffff",
//   black: "#000000",
//   red: "#ff0000",
//   green: "#008000",
//   blue: "#0000ff",
// };
// sort(colors);
/*
{
black: '#000000',
blue: '#0000ff',
green: '#008000',
red: '#ff0000',
white: '#ffffff',
}
*/

/****************************** Color ******************************/

// Check if a string is a hexadecimal color
export const isHexColor = (color) =>
  /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
// Examples
// isHexColor("#012"); // true
// isHexColor("#A1B2C3"); // true
// isHexColor("012"); // false
// isHexColor("#GHIJKL"); // false

// Convert RGB to Hex
export const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// Example
// rgbToHex(0, 51, 255); // #0033ff

// Generate a random hex color
export const randomColor = () =>
  `#${Math.random().toString(16).slice(2, 8).padEnd(6, "0")}`;
export const randomColorAnother = () =>
  `#${(~~(Math.random() * (1 << 24))).toString(16)}`;

/****************************** Date ******************************/

// Add “am/pm” suffix to an hour
// `h` is an hour number between 0 and 23
export const suffixAmPm = (h) =>
  `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;
// Examples
// suffixAmPm(0); // '12am'
// suffixAmPm(5); // '5am'
// suffixAmPm(12); // '12pm'
// suffixAmPm(15); // '3pm'
// suffixAmPm(23); // '11pm'

// Calculate the number of different days between two dates
export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
// Example
// diffDays(new Date("2014-12-19"), new Date("2020-01-01")); // 1839

// Check if a date is valid
export const isDateValid = (...val) =>
  !Number.isNaN(new Date(...val).valueOf());
// Example
// isDateValid("December 17, 1995 03:24:00"); // true

// 获取某个月的总天数
export function getDaysOfMonth(year, month) {
  var date = new Date(year, month, 0);
  var days = date.getDate();
  return days;
}

//获取当前月份的总天数
export function getDays() {
  var date = new Date();
  //将当前月份加1，下移到下一个月
  date.setMonth(date.getMonth() + 1);
  //将当前的日期置为0，
  date.setDate(0);
  //再获取天数即取上个月的最后一天的天数
  var days = date.getDate();
  return days;
}

// Check if the date is Weekend
export const isWeekend = (date) => [0, 6].indexOf(date.getDay()) !== -1;

Date.prototype.format = function (fmt) {
  var o = {
    "m+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "i+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

/****************************** Miscellaneous ******************************/

// Check if the code is running in Node.js
export const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

// Check if the code is running in the browser
export const isBrowser =
  typeof window === "object" && typeof document === "object";

// Check if the user is on an Apple device
export const isAppleDevice = () =>
  /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// Detect dark mode
export const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Copy to clipboard
export const copyToClipboard = (text) => navigator.clipboard.writeText(text);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/****************************** URL ******************************/

// Check if a path is relative
export const isRelative = (path) => !/^([a-z]+:)?[\\/]/i.test(path);

// Convert URL parameters to object
export const getUrlParams = (query) =>
  Array.from(new URLSearchParams(query)).reduce(
    (p, [k, v]) =>
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v,
      }),
    {}
  );

// Generate a random IP address
export const randomIp = () =>
  Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join(".");

/****************************** DOM ******************************/

// Check if an element is focused
export const hasFocus = (ele) => ele === document.activeElement;

// Get all siblings of an element
export const siblings = (ele) =>
  [].slice.call(ele.parentNode.children).filter((child) => child !== ele);

// Get selected text
export const getSelectedText = () => window.getSelection().toString();

// Go back to the previous page
// history.back();
// history.go(-1);

// Get Value of a brower Cookie
export const cookie = (name) =>
  `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();

// Clear all cookies
export const clearCookies = () =>
  document.cookie
    .split(";")
    .forEach(
      (c) =>
        (document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`))
    );

// Convert cookie to object
export const cookies = document.cookie
  .split(";")
  .map((item) => item.split("="))
  .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});

// Scroll to the top of the page
export const scrollToTop = () => window.scrollTo(0, 0);

// Check if the current tab is in view/focus
export const isTabInView = () => !document.hidden;

export const navigateBack = () => history.back();
export const navigateBack2 = () => history.go(-1);
