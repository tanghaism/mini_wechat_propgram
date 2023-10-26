/** 自动检查更新 */
export const checkUpdate = () => {
  const updateManager = wx.getUpdateManager()

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
}

/** 获取手机屏幕尺寸及其他信息 */
export const getSystemInfo = () => {
  const {windowWidth, windowHeight, statusBarHeight, theme} = wx.getSystemInfoSync();
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
  /** 页面标题在Y轴上的空白高度 */
  const pageTitlePaddingY = (menuButtonInfo.top - statusBarHeight) * 2;
  /** 页面导航栏高度（不包含状态栏高度） */
  const pageNavigatorBarHeight = pageTitlePaddingY + menuButtonInfo.height;
  /** 页面导航栏左/右按钮距离屏幕的padding */
  const pageTitlePaddingX = windowWidth - menuButtonInfo.right;
  /** 页面导航栏左/右按钮的宽度 */
  const pageNavigatorBtnWidth = pageTitlePaddingX * 2 + menuButtonInfo.width;

  return {
    /** 导航条样式 */
    navigatorStyle: {
      btnWidth: pageNavigatorBtnWidth,
      height: pageNavigatorBarHeight,
      btnPaddingX: pageTitlePaddingX,
    },
    /** 屏幕样式 */
    windowStyle: {
      statusBarHeight: statusBarHeight,
      width: windowWidth,
      height: windowHeight,
    },
    /** 当前的主题色 */
    theme
  }
}
