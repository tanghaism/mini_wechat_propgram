/** 将字符串解析成对应类型的值 */
export const parseString = (str) => {
  try {
    if (!str) return str;
    /** 数字 */
    if (!isNaN(parseFloat(str)) && isFinite(Number(str))) {
      return Number(str)
    }
    /** 布尔 */
    else if (str === 'true' || str === 'false') {
      return str === 'true'
    }
    /** 对象 */
    else if (str.indexOf('{') === 0 || str.indexOf('[') === 0) {
      return JSON.parse(str);
    }
    /** 字符串 */
    return str;
  } catch (e) {
    return str;
  }
}
