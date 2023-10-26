import { Request } from '../Request'
import { WxPromise } from '../WxPromise'

const app = getApp();

const {apiHost, apiPrefix} = app.globalData;

export const request = new Request({
  timeout: 600000,
  baseUrl: `${apiHost}${apiPrefix}`,
})

request.useRequestInterceptor(async (config) => {
  const { noAuth } = config;
  let auth = app.globalData.auth || wx.getStorageSync('auth');
  /** 如果不依赖token，则跳过token过期检测，一般仅用于刷新token和获取token接口 */
  if(!noAuth) {
    if(!app.globalData.isRefreshToken){
      if(auth){
        const { expireTime } = auth || {};
        if(!expireTime || (expireTime && expireTime - Date.now() < 900000)){
          app.globalData.isRefreshToken = refreshRequestToken();
          let result = await app.globalData.isRefreshToken;
          if(result){
            auth = result
          }
        }
      }
    }else{
      let result = await app.globalData.isRefreshToken;
      if(result){
        auth = result
      }
    }
  }
  config.header.Authorization = auth?.token || ''

  return config
})

request.useResponseInterceptor(async (res) => {
  const { config = {}, ...result } = res || {};
  const { showLoading, hideError, needResponse } = config;
  if(result.statusCode > 299 && result.statusCode < 200){
    showLoading && wx.hideLoading();
    !hideError && WxPromise.showToast({
      icon: 'error',
      title: res.errMsg
    })
    return Promise.reject(res)
  }
  return Promise.resolve(needResponse ? result : result.data)
}, (err) => {
  const { config = {} } = err || {};
  const { showLoading, hideError } = config;
  showLoading && wx.hideLoading();
  !hideError && WxPromise.showToast({
    icon: 'none',
    title: '服务器繁忙，请稍后再试！'
  })
  return Promise.reject(err);
})

export const refreshRequestToken = async () => {
  try{
    const code = await WxPromise.login();
    const res = await request.post('/login', { code }, {noAuth: true, showLoading: true, hideError: true});
    app.globalData.auth = res;
    wx.setStorageSync('auth', res);
    return Promise.resolve(res);
  }catch (e) {
    return Promise.resolve(null);
  }
}
