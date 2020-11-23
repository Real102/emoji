//app.js
// const app = new getApp()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户数据，如果不存在则获取
    if (!this.globalData.userInfo) {
      this.getUserInfo()
    }
  },
  onPageNotFound(res) {
    // 页面不存在时跳转到首页
    wx.switchTab({
      url: 'pages/index/index'
    })
  },
  getUserInfo: function () {
    // 需要使用function() {} 形式，箭头函数在此处获取不到this对象(为 undefined)
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        // 获取成功，存入全局数据
        this.globalData.userInfo = res.userInfo
        console.log(res.userInfo)
      },
      fail: err => {
        // 获取失败，提示用户
        wx.showToast({
          title: '获取用户信息失败，请退出后重新登录',
          duration: 2000
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})