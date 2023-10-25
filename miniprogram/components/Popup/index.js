// components/Popup/index.ts

Component({
  options: {
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared',
    /** 启用多slot支持 */
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    show: {
      type: Boolean,
      value: false,
    },
    zIndex: {
      type: Number,
      value: 100000
    },
    overlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'bottom'
    },
    duration: {
      type: Number,
      optionalTypes: [Object, Number],
      value: 300
    },
    round: {
      type: Boolean,
      value: true
    },
    customStyle: {
      type: String,
    },
    overlayStyle	: {
      type: String,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeable: {
      type: Boolean,
      value: true
    },
    closeIcon: {
      type: String,
      value: 'close'
    },
    closeIconPosition: {
      type: String,
      value: 'top-right'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    },
    safeAreaTabBar: {
      type: Boolean,
      value: false
    },
    lockScroll: {
      type: Boolean,
      value: true
    },
    rootPortal: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(){
      this.triggerEvent('close')
    },
    onClickOverlay(){
      this.triggerEvent('click-overlay')
    },
    onBeforeEnter(){
      this.triggerEvent('before-enter')
    },
    onEnter(){
      this.triggerEvent('enter')
    },
    onAfterEnter(){
      this.triggerEvent('after-enter')
    },
    onBeforeLeave(){
      this.triggerEvent('before-leave')
    },
    onLeave(){
      this.triggerEvent('leave')
    },
    onAfterLeave(){
      this.triggerEvent('after-leave')
    }
  }
})
