//index.js
//获取应用实例
import {
  emojiList
} from '../../utils/emoji.js'
import {
  getItem,
  setItem
} from '../../utils/storage.js'
const app = getApp()
Page({
  data: {
    emojiList: emojiList,
    recentlyList: [] // 近期使用emoji的列表
  },
  onLoad: function () {
    this.initStorageEmojiList()
    this.initRecentlyList()
  },
  onShow: function () {
    this.initRecentlyList()
  },
  initStorageEmojiList: function () {
    let emojiList = []
    // 获取本地缓存的emoji
    getItem('userEmoji').then(data => {
      emojiList = data
      // 将自己本地缓存的数据至顶
      emojiList.push(...this.data.emojiList)
      this.setData({
        emojiList
      })
    }).catch(err => {
      console.log('no emoji in storage!')
    })
  },
  initRecentlyList: function () {
    getItem('recentlyList').then(recentlyList => {
      this.setData({
        recentlyList
      })
    }).catch(err => {
      this.setData({
        recentlyList: []
      })
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
      setItem('recentlyList', recentlyList)
    }
  },
  turnToAddEmoji: function () {
    // 跳转到添加 Emoji 页面
    wx.navigateTo({
      url: '/pages/add/index',
    })
  }
})