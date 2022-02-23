// 节流函数
export default function throttle(fn, ms) {
  let ready = true;
  return (...args) => {
    if (!ready) return;
    ready = false;
    fn(...args);
    setTimeout(() => {
      ready = true;
    }, ms);
  };
}
