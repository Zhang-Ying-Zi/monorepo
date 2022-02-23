function nextFrame() {
  const nextTick = requestAnimationFrame || setImmediate;
  return new Promise((resolve) => nextTick(() => resolve()));
}

// each 5th step of this function makes a way for other application’s code to be processed.
async function longRunningTask() {
  let step = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (++step % 5 === 0) {
      await nextFrame();
    }
  }
}
longRunningTask();
console.log("The first log");
