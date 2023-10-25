// custom-tab-bar/index.ts
import { TAB_BAR } from '@/constants/tabbar';

const app = getApp();

const { theme = 'light' } = app.globalData;

Component(app.proxy.connect({
  options: {
    /** 引用页面样式影响组件内样式 */
    styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /** tabbar配置 */
    config: {
      type: Object,
      value: TAB_BAR,
      observer(){
        const { theme = 'light' } = app.globalData;
        this.handleSetTheme(theme)
        this.handleSetActive();
      }
    },
    /** 选中的索引 */
    selected: {
      type: Number,
      value: -1,
      observer(value){
        if(value !== this.data.active){
          this.setData({
            active: value
          })
        }
      }
    },
    /** 红点标记的颜色 */
    dotColor: {
      type: String,
      value: '#ff5566'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: -1,
    tabBar: {
      ...TAB_BAR[theme]
    }
  },

  attached(){
    const { theme = 'light' } = app.globalData;
    this.handleSetTheme(theme)
  },

  ready(){
    this.handleSetActive()
  },

  watch: {
    theme(newVal, oldVal){
      this.handleSetTheme(newVal)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSetActive() {
      const routes = getCurrentPages();
      const currentPath = routes[routes.length - 1].route;
      const index = this.data.tabBar.list.findIndex(item => item.pagePath === currentPath);
      if(index >= 0){
        this.setData({
          active: index
        })
      }
    },
    handleSetTheme(theme){
      this.setData({
        tabBar: this.properties.config ? this.properties.config[theme] : TAB_BAR[theme]
      })
    },
    /** 点击item，跳转到对应页面 */
    handleToPage(event){
      const { index } = event.currentTarget.dataset || {};
      const item = this.data.tabBar.list[index];
      if(!isNaN(index) && index >= 0) {
        const { pagePath, jumpMethod } = item || {};
        if(jumpMethod === 'switch' || !jumpMethod){
          wx.switchTab({
            url: `/${pagePath}`
          })
        }else{
          if(jumpMethod === 'navigator'){
            wx.navigateTo({
              url: `/${pagePath}`
            })
          }else if(jumpMethod === 'redirect'){
            wx.redirectTo({
              url: `/${pagePath}`
            })
          }else if(jumpMethod === 'relaunch'){
            wx.reLaunch({
              url: `/${pagePath}`
            })
          }
        }
      }
    }
  }
}))
