import drag from "./directives";
import ConsoleToolkit from "./index.vue";

const install = function (Vue) {
  Vue.use(drag.dragDirective); // 注册指令
  // Vue.component(ConsoleToolkit.name, ConsoleToolkit);
};

/* istanbul ignore if */
// 自动注册
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(ConsoleToolkit.name, ConsoleToolkit); // 全局注册组件
}

export default { install, ConsoleToolkit };
// export default ConsoleToolkit;
