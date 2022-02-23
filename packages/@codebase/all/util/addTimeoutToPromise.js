export function addTimeoutToPromise(targetPromise, timeout) {
  let timeoutHandle;
  const timeoutLimitPromise = new Promise((res, rej) => {
    timeoutHandle = setTimeout(
      () => rej(new Error("Timeout exceeded")),
      timeout
    );
  });
  return Promise.race([targetPromise, timeoutLimitPromise])
    .then((res) => {
      clearTimeout(timeoutHandle);
      return res;
    })
    .catch((e) => {
      clearTimeout(timeoutHandle);
      return e;
    });
}
