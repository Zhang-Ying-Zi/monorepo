const queuedObservers = new Set();

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => observer());
  return result;
}

export const observe = (fn) => queuedObservers.add(fn);
export const observable = (obj) => new Proxy(obj, { set });
