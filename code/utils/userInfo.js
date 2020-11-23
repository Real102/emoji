  const app = new getApp()
  const getUserInfo = function () {
    // 需要使用function() {} 形式，箭头函数在此处获取不到this对象(为 undefined)
    return new Promise((resolve, reject) => {
      // 返回一个promise函数
      // getSetting获取已经授权的权限列表
      wx.getSetting({
        success: res => {
          console.log(res)
        }
      })
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
          // 获取成功，存入全局数据
          app.globalData.userInfo = res.userInfo
          resolve()
        },
        fail: err => {
          // 获取失败，提示用户
          wx.showToast({
            title: '获取用户信息失败，请退出后重新登录',
            icon: "none",
            duration: 2000
          })
          reject()
        }
      })
    })
  }

  module.exports = {
    getUserInfo
  }