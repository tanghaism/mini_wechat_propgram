const app = getApp();


Page({
  data: {
    theme: app.globalData.theme
  },
  onLoad: function (options) {
    
  },
  watch:{
    theme(newVal){
      this.setData({
        theme: newVal
      })
    }
  }
});
