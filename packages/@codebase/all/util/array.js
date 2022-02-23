export function flatten(array) {
  function* flat(array) {
    for (let item of array) {
      if (Array.isArray(item)) yield* flat(item);
      else yield item;
    }
  }
  return [...flat(array)];
}

export function uniqueArray(array) {
  return [...new Set(array)];
}
