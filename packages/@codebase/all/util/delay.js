export function delay(timeout) {
  return new Promise((resolve) => {
    const timeoutHandle = setTimeout(() => {
      clearTimeout(timeoutHandle);
      resolve();
    }, timeout);
  });
}
