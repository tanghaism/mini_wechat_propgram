// components/Poster/index.ts
import { WxPromise } from '/WxPromise'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 375,
    },
    height: {
      type: Number,
      value: 500
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderCanvas: true
  },

  observers:{
    'width, height':function() {
      this.setData({
        renderCanvas: false
      }, () => {
        wx.nextTick(() => {
          this.setData({
            renderCanvas: true
          })
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 绘制海报 */
    renderPoster(wxmlFunc ,wxssFunc){
      const component = this.selectComponent('.wxml-to-canvas');
      const wxml = typeof wxmlFunc === 'function' ? wxmlFunc() : wxmlFunc;
      const style = typeof wxssFunc === 'function' ? wxssFunc() : wxssFunc;
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try{
            this.container = await component.renderToCanvas({
              wxml,
              style
            })
            resolve(component)
          }catch (e) {
            reject(e)
          }
        }, 300)
      })
    },
    /** 生成本地海报图片 */
    createPoster(component) {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try{
            const res = await component.canvasToTempFilePath();
            resolve(res)
          }catch (e) {
            reject(e)
          }
        }, 300)
      })
    },
    /** 保存图片到相册 */
    async savePoster(wxmlFunc, wxssFunc) {
      try{
        WxPromise.showLoading({
          title: '海报生成中...'
        });
        const component = await this.renderPoster(wxmlFunc, wxssFunc);
        const { tempFilePath } = await this.createPoster(component);
        const { errMsg } = await WxPromise.saveImageToPhotosAlbum({
          filePath: tempFilePath
        });
        const result = {
          filePath: tempFilePath,
          errMsg
        }
        this.triggerEvent('success', result)
        WxPromise.showToast({
          title: '海报保存成功',
          icon: 'success'
        })
        return Promise.resolve(result)
      }catch (e) {
        this.triggerEvent('fail', e)
        WxPromise.showToast({
          title: '海报保存失败',
          icon: 'error'
        })
        return Promise.reject(e)
      }
    }
  }
})
