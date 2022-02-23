/* eslint-disable no-unused-vars */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
// 使用方式：
// function Child (name, age) {
//     Parent.call(this, name);
//     ...
// }
// prototype(Child, Parent);

// 利用空对象作为中介,只继承父构造函数原型的属性和方法
function extend(Child, Parent) {
  var F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
