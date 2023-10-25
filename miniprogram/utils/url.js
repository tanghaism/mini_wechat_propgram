import { parseString } from './utils';

/** 将url的参数解析成对象 */
export const decodeUrl = (url = '', query = {}) => {
  try{
    if (url === undefined) return query;
    let scene = url.indexOf('?') > -1 ? decodeURIComponent(url.split('?')[1]) : decodeURIComponent(url);
    let arr = scene.split("&")
    for (let i = 0; i < arr.length; i++) {
      let [key, value] = arr[i].split("=");
      query[key] = parseString(value);
    }
    return query;
  }catch(e){
    return query
  }
}

/** 将url参数对象拼接成字符串 */
export const encodeUrl = (query = {}, url = '') => {
  try{
    const hasQuery = url.indexOf('?') > -1;
    let queryStr = '';
    Object.keys(query).forEach((key, index, arr) => {
      queryStr += `${key}=${encodeURIComponent(query[key] || '')}${index !== arr.length - 1 ? '&' : ''}`
    });
    url += `${hasQuery ? '&' : '?'}${queryStr}`;
    return url;
  }catch (e) {
    return url;
  }
}
