// components/Loading/index.ts
const app = getApp()

Component({
  options: {
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared'
  },
  externalClasses: ['image-class', 'class', 'loading-class', 'error-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      observer: function () {
        this.setData({
          error: false,
          loading: true,
        });
      },
    },
    round: Boolean,
    lazyLoad: Boolean,
    showMenuByLongpress: Boolean,
    mode: {
      type: String,
    },
    webp: {
      type: Boolean,
      value: true,
    }
  },
  data: {
    error: false,
    loading: true,
    viewStyle: '',
  },
  methods: {
    onLoad: function (event) {
      this.setData({
        loading: false,
      });
      this.triggerEvent('load', event.detail);
    },
    onError: function (event) {
      this.setData({
        loading: false,
        error: true,
      });
      this.triggerEvent('error', event.detail);
    },
    onClick: function (event) {
      this.triggerEvent('tap', event.detail);
    },
  },
})
