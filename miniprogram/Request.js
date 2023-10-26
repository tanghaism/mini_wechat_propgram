import { WxPromise } from './WxPromise'
import { encodeUrl } from './utils/url'

export class Request {
  constructor(props = {}) {
    const {header = {}, ...otherProps} = props;
    this.defaultConfig = {
      baseUrl: '',
      timeout: 60000,
      dataType: 'json',
      responseType: 'text',
      header: {
        'content-type': 'application/json',
        ...header,
      },
      ...otherProps
    }

    this.interceptors = {
      request: [],
      response: [],
    };
  }

  useRequestInterceptor(resolved, rejected){
    this.interceptors.request.push({ resolved, rejected });
  }

  useResponseInterceptor(resolved, rejected) {
    this.interceptors.response.push({ resolved, rejected });
  }

  async _requestFn(options) {
    const { url, header: customHeader = {}, showLoading, hideError, needResponse, params = {}, method, data = {}, noAuth, ...otherOptions } = options;
    const { baseUrl, header = {}, ...otherConfig } = this.defaultConfig;
    let fullUrl = `${baseUrl}${url}`;
    if(method !== 'POST' && method !== 'PUT' && method !== 'PATCH'){
      fullUrl = encodeUrl({...params, ...data},`${baseUrl}${url}`)
    }
    const mergeHeader = {
      ...header,
      ...customHeader
    }
    const config = {
      ...this.defaultConfig,
      ...options,
      header: mergeHeader
    }
    return new Promise((resolve, reject) => {
      showLoading && WxPromise.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: fullUrl,
        header: mergeHeader,
        method,
        data,
        ...otherConfig,
        ...otherOptions,
        success(res){
          return resolve({...res, config});
        },
        fail(error){
          reject({...error, config});
        },
      })
    })
  }

  run(config){
    const chain = [
      {
        resolved: this._requestFn,
        rejected: undefined,
      },
    ];
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });
    let promise = Promise.resolve({ ...config });
    while (chain.length) {
      const { resolved, rejected } = chain.shift();
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }

  request = (options) => {
    return this.run(options)
  }

  get = (url, data = {}, options = {}) => {
    return this.run({
      method: 'GET',
      ...options,
      url,
      data,
    })
  }

  post = (url, data = {}, options = {}) => {
    return this.run({
      method: 'POST',
      ...options,
      url,
      data,
    })
  }

  put = (url, data = {}, options = {}) => {
    return this.run({
      method: 'PUT',
      ...options,
      url,
      data,
    })
  }

  delete = (url, data = {}, options = {}) => {
    return this.run({
      method: 'DELETE',
      ...options,
      url,
      data,
    })
  }

  options = (url, data = {}, options) => {
    return this.run({
      method: 'OPTIONS',
      ...options,
      url,
      data,
    })
  }

  head = (url, data = {}, options) => {
    return this.run({
      method: 'HEAD',
      ...options,
      url,
      data,
    })
  }

  trace = (url, data = {}, options= {}) => {
    return this.run({
      method: 'TRACE',
      ...options,
      url,
      data,
    })
  }

  connect = (url, data= {}, options = {}) => {
    return this.run({
      method: 'CONNECT',
      ...options,
      url,
      data,
    })
  }
}
