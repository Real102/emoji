//index.js
//获取应用实例
import {
  emojiList
} from '../../utils/emoji.js'
import {
  getItem,
  setItem
} from '../../utils/storage.js'
import {
  emojiToCode,
  codeToEmoji
} from '../../utils/emoji.js'
const app = getApp()
Page({
  data: {
    systemEmojiList: emojiList,
    emojiList: [],
    recentlyList: [] // 近期使用emoji的列表
  },
  onLoad: function () {
    // this.initStorageEmojiList()
    // this.initRecentlyList()
    // 需要清空用户数据，请开启下面方法
    // setItem('userEmoji', [])
  },
  onShow: function () {
    this.initStorageEmojiList()
    this.initRecentlyList()
  },
  initStorageEmojiList: function () {
    let emojiList = []
    // 获取本地缓存的emoji
    getItem('userEmoji').then(data => {
      emojiList = data.map(item => {
        return {
          key: item.key,
          text: codeToEmoji(item.text)
        }
      })
      // 将自己本地缓存的数据至顶
      emojiList.push(...this.data.systemEmojiList)
      this.setData({
        emojiList
      })
    }).catch(err => {
      // 本地没有用户上传的Emoji，那么显示系统提供的Emoji
      this.setData({
        emojiList: this.data.systemEmojiList
      })
      wx.showToast({
        title: 'no emoji in storage!',
        icon: 'none'
      })
    })
  },
  initRecentlyList: function () {
    getItem('recentlyList').then(res => {
      // 获取最近使用的emoji码点列表，并将码点转换成emoji存到recentlyList中
      let recentlyList = res.map(item => {
        return {
          key: item.key,
          text: codeToEmoji(item.text)
        }
      })
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
      recentlyList = recentlyList.map(item => {
        return {
          key: item.key,
          text: emojiToCode(item.text)
        }
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