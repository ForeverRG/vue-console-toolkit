// v-drag 通用拖拽
const dragDirective = {};
dragDirective.install = (Vue) => {
  const drag = {
    bind: function (el, binding) {
      // //禁止选择网页上的文字
      // document.onselectstart = function() {
      //   return false
      // }
      const element = el;
      /* 定义距离尺寸的存储池 */
      const elementSizer = {};

      element.onmousedown = function (e) {
        const maxTranslateY =
          document.body.offsetHeight -
          element.offsetTop -
          element.offsetHeight * 2.4;
        const minTranslateY = -element.offsetTop;

        // 阻止冒泡
        e.stopPropagation();
        // 阻止默认事件
        e.preventDefault();

        // 解析matrix的正则
        let matrix3dReg =
          /^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/;
        let matrixReg = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/;

        // 获取解析后的transform样式属性值(计算后的样式)
        let matrix3dSourceValue;
        if (typeof window.getComputedStyle !== "undefined") {
          matrix3dSourceValue = window.getComputedStyle(el, null)["transform"];
        } else if (typeof e.target.currentStyle !== "undefiend") {
          matrix3dSourceValue = e.target.currentStyle["transform"];
        } else {
          matrix3dSourceValue = "";
        }
        // 使用正则解析matrix
        let matrix3dArrValue =
          matrix3dSourceValue.match(matrix3dReg) ||
          matrix3dSourceValue.match(matrixReg);

        // 记录鼠标点击时的坐标
        elementSizer["clientX"] = e.clientX;
        elementSizer["clientY"] = e.clientY;

        // 记录matrix解析后的translateX & translateY的值
        elementSizer["targetX"] = matrix3dArrValue[1];
        elementSizer["targetY"] = matrix3dArrValue[2];

        // 计算坐标边界距离
        elementSizer["distX"] =
          elementSizer["clientX"] - elementSizer["targetX"];
        elementSizer["distY"] =
          elementSizer["clientY"] - elementSizer["targetY"];

        document.onmousemove = function (e) {
          e.stopPropagation();
          e.preventDefault();

          let moveX =
            binding.value.translate === "y"
              ? 0
              : e.clientX - elementSizer["distX"];
          let moveY =
            binding.value.translate === "x"
              ? 0
              : e.clientY - elementSizer["distY"];

          // 限制高度
          if (moveY < minTranslateY) {
            moveY = -element.offsetTop;
          } else if (moveY > maxTranslateY) {
            moveY = maxTranslateY;
          }

          // 写入style
          element.style.transform =
            element.style.mozTransform =
            element.style.webkitTransform =
              `translate3d(${moveX}px, ${moveY}px, 1px)`;
          // element.style.transform = `translate(${moveX}px, ${moveY}px)`
        };

        document.onmouseup = function (e) {
          e.stopPropagation();
          e.preventDefault();
          document.onmouseup = document.onmousemove = null;
        };

        return false; // 防止鼠标黏贴鼠标
      };
    },
  };

  Vue.directive("r-drag", drag);
};

export default dragDirective;
