// export default {
//   mounted(el, binding) {
//     el.style.position = "fixed";
//     const s = binding.arg || "top";
//     el.style[s] = binding.value + "px";
//   },
//   updated(el, binding) {
//     // binding.arg 是我们传递给指令的参数
//     const s = binding.arg || "top";
//     el.style[s] = binding.value + "px";
//   },
// };

// 想在 mounted 和 updated 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个回调函数传递给指令来实现：
export default (el, binding) => {
  el.style.position = "fixed";
  const s = binding.arg || "top";
  el.style[s] = binding.value + "px";
};
