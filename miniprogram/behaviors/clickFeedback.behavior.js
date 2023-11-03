import { WxPromise } from '@/WxPromise'
import { transferVar } from '@/utils/utils';

const app = getApp();

export const clickFeedbackBehavior = Behavior({
  /** 是否点击过，如果点击过需要等待按钮有反馈后才能再次点击 */
  isClickFeedback: false,
  data: {
    /** 点击按钮popup弹窗 */
    clickFeedbackPopup: {
      visible: false,
      /** 内容类型: -1：初始化，0：富文本，1：纯文本，2：图片 */
      contentType: -1,
      /** popup标题 */
      title: '',
      /** popup内容 */
      content: '',
    }
  },
  methods: {
    async handleClickFeedback(options = {}, customClick){
      if(this.isClickFeedback) return;
      this.isClickFeedback = true;
      /**
       * type: -1：暂未开放，0：跳小程序内部页面，1：跳外部小程序，2：跳H5链接地址，3：弹出底部弹窗
       * path: 跳转路径，type为0，1，2时有值；1，2时需要判断路径上是否需要拼接动态参数
       * appid: 外部小程序appid，type为1时有值
       * method：跳转方式，默认navigateTo，type为0，2时有值
       * contentType: popup渲染内容类型，type为3时有值，-1：初始化，0：富文本，1：纯文本，2：图片
       * title: popup渲染内容标题，type为3时可能有值
       * content: popup渲染内容标题，type为3时有值
       */
      const { type, path, appid, method = 'navigateTo', contentType, title, content } = options;
      const that = this;
      switch (type){
        case -1:
          try{
            await WxPromise.showToast({
              title: '暂未开放！敬请期待～'
            });
          }catch(err){}
          that.isClickFeedback = false
          break;
        case 0:
          wx[that._transferNavigatorMethod(method)]({
            url: `/${path}`,
            fail(){
              WxPromise.showToast({
                title: '跳转失败，请联系客服！'
              });
            },
            complete(){
              that.isClickFeedback = false
            }
          })
          break;
        case 1:
          wx.navigateToMiniProgram({
            appId: appid,
            path: that._transferPath(path),
            fail(){
              WxPromise.showToast({
                title: '跳转失败，请联系客服！'
              });
            },
            complete(){
              that.isClickFeedback = false
            }
          })
          break;
        case 2:
          wx[that._transferNavigatorMethod(method)]({
            url: `/pages/h5/index?url=${that._transferPath(path)}`,
            fail(){
              WxPromise.showToast({
                title: '跳转失败，请联系客服！'
              });
            },
            complete(){
              that.isClickFeedback = false
            }
          })
          break;
        case 3:
          that.setData({
            clickFeedbackPopup: {
              visible: true,
              contentType,
              title,
              content
            }
          }, () => {
            that.isClickFeedback = false
          })
          break;
        default:
          try{
            if(typeof customClick === 'function'){
              await customClick()
            }
          }catch (e) {}
          that.isClickFeedback = false
          break;
      }
    },
    handleClickFeedbackPopupClose(){
      this.setData({
        visible: false,
        contentType: -1,
        title: '',
        content: ''
      })
    },
    _transferPath(path){
      return transferVar(app.globalData.userInfo, path, (val = '') => encodeURIComponent(val || ''))
    },
    _transferNavigatorMethod(method = 'navigateTo'){
      if(method !== 'navigateTo'){
        return method
      }
      if(getCurrentPages().length >= 10){
        return 'redirectTo'
      }
      return 'navigateTo'
    }
  }
})
