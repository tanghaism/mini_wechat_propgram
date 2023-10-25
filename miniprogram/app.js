import { checkUpdate, injectPage, getSystemInfo } from './utils/index';
import globalConfig from './config';
import { AppProxy } from './utils/observe';

App({
  onLaunch(options){
    this.proxy = new AppProxy(this);
    /** 检查更新 */
    checkUpdate();
    /** 监听手机主题变化 */
    wx.onThemeChange(({theme}) => {
      this.globalData.theme = theme;
    })
    /** 监听路由变化 */
    wx.onAppRoute(() => {})
  },
  onShow(options) {

  },
  proxy: null,
  globalData: {
    ...globalConfig,
    ...getSystemInfo(),
  }
})
