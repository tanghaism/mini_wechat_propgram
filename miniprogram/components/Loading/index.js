// components/Loading/index.ts
const app = getApp()

Component({
  options: {
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /** 是否显示 */
    visible: {
      type: Boolean,
      value: true
    },
    /** 显隐动画时长 */
    duration: {
      type: Object,
      optionalTypes: [Number, Object],
      value: {enter: 0, leave: 500},
    },
    /** 是否盖住全屏 */
    fullScreen: {
      type: Boolean,
      value: true
    }
  }
})
