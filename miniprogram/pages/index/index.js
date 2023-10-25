Page({
  data: {
    showLoading: true
  },
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        showLoading: false
      })
    }, 20000)
  }
});
