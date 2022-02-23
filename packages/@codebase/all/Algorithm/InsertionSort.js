import BaseSort from "./BaseSort.js";

export class InsertionSort extends BaseSort {
  sort(originalArray) {
    const array = [...originalArray];

    // Go through all array elements...
    for (let i = 1; i < array.length; i++) {
      let currentIndex = i;

      // Call visiting callback.
      this.callbacks.visitingCallback(array[i]);

      // Go and check if previous elements and greater then current one.
      // If this is the case then swap that elements.
      while (
        array[currentIndex - 1] !== undefined &&
        this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      ) {
        // Call visiting callback.
        this.callbacks.visitingCallback(array[currentIndex - 1]);

        // Swap the elements.
        const tmp = array[currentIndex - 1];
        array[currentIndex - 1] = array[currentIndex];
        array[currentIndex] = tmp;

        // Shift current index left.
        currentIndex -= 1;
      }
    }

    return array;
  }
}

export function InsertionSortSimple(originalArray) {
  const array = [...originalArray];

  // Go through all array elements...
  for (let i = 1; i < array.length; i++) {
    let currentIndex = i;

    // Go and check if previous elements and greater then current one.
    // If this is the case then swap that elements.
    while (
      array[currentIndex - 1] !== undefined &&
      array[currentIndex - 1] > array[currentIndex]
    ) {
      // Swap the elements.
      const tmp = array[currentIndex - 1];
      array[currentIndex - 1] = array[currentIndex];
      array[currentIndex] = tmp;

      // Shift current index left.
      currentIndex -= 1;
    }
  }

  return array;
}
