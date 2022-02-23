export function BinarySearch(list, item) {
  // if list is sorted in ascending order
  let low = 0;
  let high = list.length;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = list[mid];
    if (guess === item) {
      return mid;
    }
    if (guess < item) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return false;
}
