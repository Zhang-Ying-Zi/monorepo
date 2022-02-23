/* eslint-disable no-unused-vars */
// 订阅者
class Watcher {
  constructor(vm, value, callback) {
    this.vm = vm; // 实例
    this.value = value; // 数据当前值
    this.callback = callback; // 调用的更新视图的方法
    this.oldValue = this.get(); // 数据的旧值
  }

  /* 获取数据旧值 */
  get() {
    Dep.target = this; // 将订阅者实例赋值给 target
    const value = compileUtils.getValue(this.vm, this.value);
    Dep.target = null;
    return value;
  }

  /* 更新视图 */
  update() {
    const newVal = compileUtils.getValue(this.vm, this.value);
    const oldVal = this.oldValue;
    this.callback(newVal);
  }
}

// 订阅者数组
class Dep {
  constructor() {
    this.subs = []; // 订阅者数组
  }

  /* 添加订阅者 */
  addSub(watcher) {
    this.subs.push(watcher);
  }

  /* 通知订阅者 */
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update(); // 更新视图
    });
  }
}

// 观察者
class Observer {
  constructor(data) {
    this.observer(data);
  }

  /* data 处理 */
  observer(data) {
    if (!data || typeof data !== "object") return; // data 必须为 Object 类型
    for (const key in data) {
      this.defineReactive(data, key, data[key]);
      this.observer(data[key]); // 递归处理 data 中的 Object 类型
    }
  }

  /* 数据劫持 */
  defineReactive(obj, key, value) {
    const that = this;
    const dep = new Dep(); // 每一个数据都对应一个订阅者们数组

    Object.defineProperty(obj, key, {
      configurable: true, // 可删除
      enumerable: true, // 可枚举
      get() {
        Dep.target && dep.addSub(Dep.target); // 每当 DOM 中使用该值时，添加一个订阅者
        return value;
      },
      set(newVal) {
        if (newVal === value) return;
        that.observer(newVal); // 如果修改的新值是 Object 类型，递归进行数据劫持
        value = newVal;
        dep.notify(); // 通知所有订阅者数据更新了
      },
    });
  }
}

//  解析函数
class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 进行编译
    if (this.el) {
      // 使用文档片段存储节点
      let fragment = this.node2fragment(this.el);
      // 执行解析器函数，识别 v-model 和 {{}} 语法
      this.compile(fragment);
      // 将编译完成的节点插入到 DOM 中
      this.el.appendChild(fragment);
    }
  }

  /* 判断传入的挂载元素是否是 HTML 元素 */
  isElementNode(node) {
    return node.nodeType === 1;
  }

  /* 将 el 中的节点放入文档片段中 */
  node2fragment(el) {
    const fragment = document.createDocumentFragment();
    while (el.firstChild) {
      // 是子节点才插入
      fragment.appendChild(el.firstChild);
    }
    return fragment;
  }

  /* 编译节点 */
  compile(fragment) {
    let childNodes = Array.from(fragment.childNodes);
    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 元素节点
        this.compileElement(node);
      } else if (node.nodeType === 3) {
        // 文本节点
        this.compileText(node);
      } else {
        return;
      }
    });
  }

  /* 编译元素，识别 v-model  */
  compileElement(node) {
    const attrs = Array.from(node.attributes); // 获取元素绑定的所有属性
    attrs.forEach((attr) => {
      if (attr.name.includes("v-")) {
        // 判断是否为自定义的指令
        const value = attr.value; // 属性的值
        let type = attr.name.split("-")[1];
        compileUtils[type](node, this.vm, value);
      }
    });
  }

  /* 编译文本，识别 {{}} */
  compileText(node) {
    const reg = /\{\{([^}]+)\}\}/g; // {{}} 正则表达式
    const value = node.textContent;
    if (reg.test(value)) {
      compileUtils["text"](node, this.vm, value);
    }
  }
}

const compileUtils = {
  /* 获取 data 中数据对应的值 */
  getValue(vm, value) {
    value = value.split("."); // 所有的数据都是 data 的属性
    return value.reduce((prev, next) => prev[next], vm.$data);
  },

  /* 获取编译后的文本内容 */
  getTextValue(vm, value) {
    return value.replace(/\{\{([^}]+)\}\}/g, (...args) =>
      this.getValue(vm, args[1])
    );
  },

  /* 给数据设置新值 */
  setVal(vm, value, newValue) {
    value = value.split(".");
    return value.reduce((prev, next, currentIndex) => {
      if (currentIndex === value.length - 1) {
        return (prev[next] = newValue);
      }
      return prev[next];
    }, vm.$data);
  },

  /* v-model 处理*/
  model(node, vm, value) {
    const doUpdate = this.updater.modelUpdater; // 定义更新视图的方法
    new Watcher(vm, value, (newValue) => {
      // 实例化一个观察者
      doUpdate && doUpdate(node, this.getValue(vm, value));
    });
    // 绑定 input 事件，输入值时更新数据
    node.addEventListener("input", (e) => {
      const newValue = e.target.value;
      this.setVal(vm, value, newValue);
    });
  },

  /* 文本处理 */
  text(node, vm, value) {
    const doUpdate = this.updater.textUpdater; // 定义更新视图的方法
    const pureValue = this.getTextValue(vm, value); // 获取 {{}} 内的纯值
    value.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      // 实例化一个观察者
      // eslint-disable-next-line no-unused-vars
      new Watcher(vm, args[1], (newValue) => {
        doUpdate && doUpdate(node, this.getTextValue(vm, value));
      });
    });
    doUpdate && doUpdate(node, pureValue);
  },

  /* 更新 DOM */
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};

class VueMock {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    if (this.$el) {
      new Observer(this.$data);
      this.proxyData(this.$data);
      new Compile(this.$el, this);
    }
  }

  /* 将 this.$data 上的数据代理到 this 上 */
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}
