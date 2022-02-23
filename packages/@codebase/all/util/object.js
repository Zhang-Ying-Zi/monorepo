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
