<template>
  <div
    v-r-drag="{ translate: 'y' }"
    :class="statusClass"
    class="console-base-toolkit"
  >
    <div class="cb-sub-tool">
      <div
        v-for="(tool, index) in toolList"
        :key="tool.id"
        class="cst-tool"
        :style="{ bottom: isExpand ? `${50 * (index + 1)}px` : '0px' }"
      >
        <button
          loading="0"
          :title="tool.title"
          class="cb-btn cb-big-btn"
          :class="[isExpand ? 'cst-expand-btn' : 'cst-btn']"
          @click="skipTo(tool.to)"
          :style="{ background: tool.btnColor, color: tool.fontColor }"
        >
          <i class="cst-i-font" :class="tool.iconClass" />
        </button>
      </div>
    </div>

    <div
      class="cb-toolkit-bar"
      @mouseenter="handleMouseover"
      @mouseleave="handleMouseleave"
    >
      <button
        class="cb-btn cb-big-btn ctb-btn"
        loading="0"
        title="拖拽调整位置，点击展开或收起"
        @click="expandToolkit"
      >
        <span class="ctb-shap">
          <span :class="[isExpand ? 'cs-expand-top' : 'cs-top']"></span>
          <span class="cs-top"></span>
        </span>
      </button>
      <button
        :class="[isShowMinimizeBtn ? 'ctb-mini-btn' : 'ctb-mini-btm']"
        class="cb-btn"
        @click="minimizeToolkit"
      >
        <i class="el-icon-minus" />
      </button>

      <!-- 回到顶部 -->
      <el-backtop :right="8" :bottom="-50" />
    </div>
  </div>
</template>
<script>
export default {
  name: "ConsoleToolkit",
  props: {
    toolList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isExpand: false, // 是否展开工具栏
      isShowMinimizeBtn: false, // 是否显示工具栏最小化按钮
      statusFlag: 1, // 1:工具栏正常状态 0：工具栏最小化
      statusClass: "toolkit-show", // 工具栏状态
    };
  },
  methods: {
    // 展开工具栏
    expandToolkit() {
      this.isExpand = !this.isExpand;
      this.statusFlag = 1;
      this.statusClass = "toolkit-show";
    },
    // 划过工具栏按钮
    handleMouseover() {
      this.statusClass = "toolkit-show";
      this.isShowMinimizeBtn = true;
    },
    // 离开工具栏按钮
    handleMouseleave() {
      this.statusClass = this.statusFlag ? "toolkit-show" : "toolkit-hidden";
      this.isShowMinimizeBtn = false;
    },
    // 最小化工具栏
    minimizeToolkit() {
      this.statusFlag = 0;
      this.statusClass = "toolkit-hidden";
    },
    // 链接地址
    skipTo(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style scoped>
:root {
  --cb-color-text-secondary: #666;
  --cb-color-bg-primary: #fff;
  --cb-color-shadow: rgba(0, 0, 0, 0.16);
  --cb-color-text-tertiary: #999;
  --cb-color-bg-tertiary: #eee;
  --cb-color-border-secondary: #e3e4e6;
}

.toolkit-show,
.toolkit-hidden {
  position: fixed;
  bottom: 128px;
  z-index: 9;
  opacity: 1;
  transform: translate(0px, 72px);
  transition: all 0.25s linear 0s;
}
.toolkit-show {
  right: 0px;
}
.toolkit-hidden {
  right: -28px;
}

.cb-sub-tool {
  position: absolute;
  bottom: 0px;
  left: 0px;
  transition: all 0.25s ease 0s;
}
.cst-tool {
  position: absolute;
  bottom: 0px;
  left: 0px;
  transition: all 0.25s ease 0s;
}
.cb-btn {
  padding: 0px;
  border: 1px solid transparent;
  box-sizing: border-box;
  outline: none;
  background: none;
  line-height: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease-out 0s;
}
.cb-big-btn {
  overflow: hidden;
  vertical-align: middle;
  border: none;
  border-radius: 0px;
  text-align: center;
  display: inline-block;
  width: auto;
  white-space: nowrap;
  cursor: pointer;
}
.cst-btn,
.cst-expand-btn,
.ctb-btn {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 1.2;
  overflow: unset;
  font-size: 14px;
  letter-spacing: 1px;
  white-space: normal;
  overflow-wrap: break-word;
  color: var(--cb-color-text-secondary, #666);
}
.cst-btn,
.cst-expand-btn {
  background-color: var(--cb-color-bg-primary, #fff);
}
.cst-btn {
  transform: scale(0.6);
}
.cst-expand-btn {
  transform: none;
  box-shadow: 0 0 8px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
}
.cst-expand-btn i {
  font-size: 20px;
}
.cst-i-font,
.cst-i-font::before {
  display: inline-block;
  line-height: 1;
  font-size: inherit;
  font-weight: 200;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  vertical-align: baseline;
  text-rendering: auto;
  transition: all 200ms linear 0s;
  -webkit-text-stroke-width: 0.2px;
}
.cb-toolkit-bar {
  position: relative;
  padding-right: 8px;
}
.ctb-btn {
  background-color: var(--cb-color-bg-accent, #0064c8);
  box-shadow: 0 0 8px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
}
.ctb-shap {
  display: block;
}
.cs-top {
  display: flex;
}
.cs-top::before,
.cs-top::after,
.cs-expand-top::before,
.cs-expand-top::after {
  content: "";
  display: block;
  margin: 1px;
  border: 1px solid rgb(255, 255, 255);
  box-sizing: border-box;
  width: 7px;
  height: 7px;
  transition: all 0.2s ease-out 0s;
}
.ctb-mini-btm,
.ctb-mini-btn {
  position: absolute;
  top: -14px;
  right: 1px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  color: var(--cb-color-text-tertiary, #999);
  background-color: var(--cb-color-bg-tertiary, #eee);
  border: 1px solid var(--cb-color-border-secondary, #e3e4e6);
  box-shadow: 0 0 8px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
}
.ctb-mini-btm {
  opacity: 0;
}
.ctb-mini-btn {
  opacity: 1;
}
.cs-expand-top {
  display: flex;
}
.cs-expand-top::after {
  transform: rotate(0.125turn) translate(0px, -1px);
}
.el-backtop:hover {
  background-color: #0064c8 !important;
  color: #fff !important;
}
</style>
