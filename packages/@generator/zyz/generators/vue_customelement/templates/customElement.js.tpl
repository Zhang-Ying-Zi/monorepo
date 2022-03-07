import { defineCustomElement } from "vue";

const MyVueElement = defineCustomElement({
  // 在此提供正常的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement 独有特性: CSS 会被注入到隐式根 (shadow root) 中
  styles: [`/* inlined css */`],
});

// 注册自定义元素
// 注册完成后，此页面上的所有的 `<my-vue-element>` 标签会被更新
customElements.define("my-vue-element", MyVueElement);

// 你也可以编程式地实例化这个元素：
// (只能在注册后完成此操作)
document.body.appendChild(
  new MyVueElement({
    // initial props (optional)
  })
);
