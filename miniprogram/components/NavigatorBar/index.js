// components/NavigatorBar/index.ts
const app = getApp();
/** 获取屏幕样式 */
const { navigatorStyle, windowStyle, theme: globalTheme = 'light' } = app.globalData;

Component(app.proxy.connect({
  /**
   * 组件的属性列表
   */
  options: {
    /** 启用多slot支持 */
    multipleSlots: true,
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared'
  },
  properties: {
    /** 是否显示组件 */
    visible: {
      type: Boolean,
      value: true
    },
    /** 是否显示左侧按钮容器 */
    showLeftBox: {
      type: Boolean,
      value: true
    },
    /** 是否显示返回按钮，若传入false则会渲染传入的自定义插槽 <slot name="left" /> */
    showBack: {
      type: Boolean,
      value: true
    },
    /** 点击返回icon的执行函数 */
    onClickBack: {
      type: null,
      value: undefined
    },
    /** 页面标题 */
    title: {
      type: String,
      value: ''
    },
    /** 是否显示下边框 */
    showBorder: {
      type: Boolean,
      value: false
    },
    /** 背景样式 */
    background: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: navigatorStyle?.height || 0,
    btnWidth: navigatorStyle?.btnWidth || 0,
    statusBarHeight: windowStyle?.statusBarHeight || 0,
    /** 当前页面是否可以返回，-1：尚未初始化，0：不能返回，直接跳转到首页，1：可以返回 */
    isAppLaunchPage: -1,
  },

  pageLifetimes: {
    show() {
      /** 判断当前页面是否可以返回 */
      const routes = getCurrentPages();
      let isAppLaunchPage = routes.length > 1 ? 1 : 0;
      /** 如果当前页面没有上一页，且当前页面就是小程序默认首页，则重置为尚未初始化，不显示返回按钮 */
      if(isAppLaunchPage === 0 && routes[0].route === app.globalData.entryPagePath){
        isAppLaunchPage = -1
      }
      if(isAppLaunchPage !== this.data.isAppLaunchPage){
        data.isAppLaunchPage = isAppLaunchPage
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 点击返回按钮 */
    handleClickBack(){
      /** 如果传入了自定义返回函数，则执行自定义返回函数，不执行默认的返回流程 */
      if(this.properties.onClickBack && typeof this.properties.onClickBack === 'function'){
        return this.properties.onClickBack();
      }
      /** 当未初始化完成时，点击无效 */
      if(this.data.isAppLaunchPage === -1) return;
      /** 返回默认逻辑 */
      if(this.data.isAppLaunchPage === 1){
        wx.navigateBack()
      }else{
        /** tab页和普通页面用不同的API跳转 */
        if(app.globalData.entryPagePathIsTab){
          wx.switchTab({
            url: app.globalData.entryPagePath
          })
        }else{
          wx.redirectTo({
            url: app.globalData.entryPagePath
          })
        }
      }
    }
  },
}))
