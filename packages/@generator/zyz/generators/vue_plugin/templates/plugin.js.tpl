export default {
  install: (app, options) => {
    
    // 添加全局方法或 property
    app.myGlobalMethod = function () {
      // 逻辑...
    };

    app.directive("my-directive", {
      mounted(el, binding, vnode, oldVnode) {
        // 逻辑...
      },
    });

    app.mixin({
      created() {
        // 逻辑...
      },
    });

    // 添加实例方法
    app.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    };
  }
}
