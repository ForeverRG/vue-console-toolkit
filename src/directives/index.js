import dragDirective from "./r-drag";

export default {
  install(Vue) {
    Vue.use(dragDirective);
  },
  dragDirective,
};
