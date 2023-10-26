export class AppProxy {
  constructor(app) {
    this.globalData = app.globalData;
    this.observeMap = {};
  }

  connect(pageOrComponentObj = {}) {
    const { watch, onShareAppMessage, onLoad, created, detached, onUnload } = pageOrComponentObj;
    const _this = this;

    if(onShareAppMessage){
      this._sendShareAppMessage(pageOrComponentObj)
    }
    if(typeof watch === 'object'){
      pageOrComponentObj.onLoad = function(options){
        _this._initObserve(watch, this)
        return onLoad ? onLoad.call(this, options) : undefined
      }
      pageOrComponentObj.created = function (){
        _this._initObserve(watch, this)
        return created ? created.call(this) : undefined
      }
      pageOrComponentObj.detached = function() {
        _this._destroyObserve(watch, this);
        return detached ? detached.apply(this) : undefined
      }
      pageOrComponentObj.onUnload = function() {
        _this._destroyObserve(watch, this);
        return onUnload ? onUnload.apply(this) : undefined
      }
    }
    return pageOrComponentObj
  }

  // 页面或组件初始化时，开始监听
  _initObserve(watch, instance){
    Object.keys(watch).map(key => {
      let observeKeyMap = this.observeMap[key];
      if(!observeKeyMap){
        this.observeMap[key] = observeKeyMap = {
          fn: [],
          fnMap: new WeakMap()
        }
      }
      observeKeyMap.fn.push(watch[key].bind(instance));
      observeKeyMap.fnMap.set(watch[key], observeKeyMap.fn.length - 1);
      Object.defineProperty(this.globalData, key, {
        configurable: true,
        enumerable: true,
        set: (value) => {
          if(this.globalData[`_${key}`] !== value){
            this.observeMap[key].fn.forEach(cb => {
              typeof cb === 'function' && cb(value, this.globalData[`_${key}`])
            })
          }
          this.globalData[`_${key}`] = value;
        },
        get: () => {
          return this.globalData[`_${key}`]
        }
      })
    });
  }

  // 清除页面内的watch监听
  _destroyObserve(watch, instance){
    Object.keys(watch).forEach(key => {
      if(this.observeMap[key] && this.observeMap[key].fnMap && this.observeMap[key].fn){
        const index = this.observeMap[key].fnMap.get(watch[key]);
        if(index >= 0){
          this.observeMap[key].fn.splice(index, 1);
          this.observeMap[key].fnMap.delete(watch[key])
        }
      }
    })
  }
  // 代理页面内的分享卡片钩子，在这里统一处理逻辑
  _sendShareAppMessage(pageOrComponentObj = {}) {
    const {onShareAppMessage} = pageOrComponentObj;
    pageOrComponentObj.onShareAppMessage = async function(shareEvent){
      const shareObject = await onShareAppMessage.call(this, shareEvent);
      console.log(this, shareEvent);
      return shareObject;
    }
    return pageOrComponentObj
  }
}
