//index.js
//获取应用实例
import {
  emojiList
} from '../../utils/emoji.js'
const app = getApp()
Page({
  data: {
    emojiList: emojiList,
    recentlyList: [] // 近期使用emoji的列表
  },
  onLoad: function () {
    wx.getStorage({
      key: 'recentlyList',
      success: res => {
        this.setData({
          recentlyList: res.data
        })
      },
      fail: err => {
        this.setData({
          recentlyList: []
        })
      }
    })
  },
  copyText: function (event) {
    let {
      text,
      key
    } = event.target.dataset
    if (text && key) {
      wx.setClipboardData({
        data: text
      })
      // 只能通过data选项来访问数据？
      let recentlyList = this.data.recentlyList
      // 查询是否已存在
      let index = recentlyList.findIndex(item => item.key === key)
      if (index > -1) {
        // 如果已存在，那么直接删除，然后在头部重新插入
        recentlyList.splice(index, 1)
      } else if (recentlyList.length > 6) {
        recentlyList.pop()
      }
      recentlyList.unshift({
        key,
        text
      })
      this.setData({
        recentlyList
      })
      wx.setStorage({
        data: recentlyList,
        key: 'recentlyList',
      })
    }
  }
})