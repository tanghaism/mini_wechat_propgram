/** test代表内部开发/测试小程序 */
/** production代表客户生产小程序 */
export const envMap = {
  'wx00fe18a34c9967ad': 'production',
  'wxb8c3244bb369896f': 'test',
}

/** 开发环境/生产环境域名配置 */
export const hostMap = {
  /** 生产小程序 */
  'production': {
    /** 开发版接口配置 */
    develop: {
      apiHost: '',
      apiPrefix: ''
    },
    /** 体验版接口配置 */
    trial: {
      apiHost: '',
      apiPrefix: ''
    },
    /** 正式版接口配置 */
    release: {
      apiHost: '',
      apiPrefix: ''
    }
  },
  /** 测试小程序 */
  'test': {
    /** 开发版接口配置 */
    develop: {
      apiHost: '',
      apiPrefix: ''
    },
    /** 体验版接口配置 */
    trial: {
      apiHost: '',
      apiPrefix: ''
    },
    /** 正式版接口配置 */
    release: {
      apiHost: '',
      apiPrefix: ''
    }
  }
}

const { accountInfo, envVersion, platform, entryPagePath, tabBar } = __wxConfig;
const { appId, nickname, icon } = accountInfo;
const env = envMap[appId];

/** 真实的小程序首页地址，获取到的地址携带.html后缀，需要处理 */
const realEntryPagePath = (entryPagePath || '').split('.html')[0];
/** 判断小程序首页是否是tab页面 */
const entryPagePathIsTab = (tabBar?.list || []).some(item => item.pagePath === realEntryPagePath);
export default {
  appId,
  appName: nickname,
  appLogo: icon,
  platform,
  env,
  envVersion,
  entryPagePath: realEntryPagePath,
  entryPagePathIsTab: entryPagePathIsTab,
  ...hostMap[env][envVersion],
}
