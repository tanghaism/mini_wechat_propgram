import { encodeUrl } from './url';

/** 指定每个页面自定义分享执行的函数 */
const PAGE_SHARE_CONFIG = {
  /** 首页 */
  'pages/index/index': (_page, shareEvent) => {
    const { item } = shareEvent.target.dataset;
    return buildShareParams({
      title: item.title,
      imageUrl: item.poster,
      path: `/pages/index/index?id=${item.id}`
    })
  },
  /** 未制定的默认分享当前页面 */
  'default': ({ route }) => {
    return {
      path: route
    }
  }
}

/** 组装分享数据 */
const buildShareParams = (params) => {
  const { options, ...shareParams } = params;
  shareParams.path = encodeUrl(options, shareParams.path);
  return {
    ...shareParams
  }
}

/** 暴露全局分享函数 */
export default (view, shareEvent) => {
  return PAGE_SHARE_CONFIG[view.route] ? PAGE_SHARE_CONFIG[view.route](view, shareEvent) : PAGE_SHARE_CONFIG['default'](view, shareEvent);
}
