import { checkUpdate, getSystemInfo } from './utils/index';
import globalConfig from './config';
import { AppProxy } from './AppProxy';

App({
  onLaunch(options){
    this.proxy = new AppProxy(this);
    const NewPage = Page;
    Page = (pageOptions) => {
      NewPage(this.proxy.connect(pageOptions))
    }
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
