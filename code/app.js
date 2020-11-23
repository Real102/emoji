//app.js
// const app = new getApp()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onPageNotFound(res) {
    // 页面不存在时跳转到首页
    wx.switchTab({
      url: 'pages/index/index'
    })
  },
  globalData: {
    userInfo: null
  }
})