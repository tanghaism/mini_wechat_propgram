export class WxPromise {
  static errorMessage = '您的微信版本太低，无法使用此功能'

  /** 是否可以使用组件属性或者API */
  static async canIUse(schema = 'canIUse', message = WxPromise.errorMessage){
    const result = wx.canIUse ? wx.canIUse(schema) : false;
    if(!result){
      WxPromise.showToast({
        title: message
      })
    }
    return result;
  }

  /** wx.login */
  static async login(){
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res.code);
        },
        fail(err){
          reject(err)
        }
      });
    });
  }

  /** wx.showToast */
  static async showToast(options){
    wx.hideLoading();
    return new Promise((resolve, reject) => {
      wx.showToast({
        icon: 'none',
        mask: 'true',
        ...options,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
  /** wx.showLoading */
  static async showLoading(options){
    return new Promise((resolve, reject) => {
      wx.showLoading({
        icon: 'none',
        mask: 'true',
        ...options,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
  /** wx.downloadFile */
  static async downloadFile(options){
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        timeout: 300000,
        ...options,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
  /** wx.saveVideoToPhotosAlbum */
  static async saveVideoToPhotosAlbum(options){
    return new Promise((resolve, reject) => {
      wx.saveVideoToPhotosAlbum({
        ...options,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
  /** wx.saveImageToPhotosAlbum */
  static async saveImageToPhotosAlbum(options){
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        ...options,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
}
