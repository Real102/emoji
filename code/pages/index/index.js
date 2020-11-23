//index.js
//获取应用实例
import {
  emojiList
} from '../../utils/emoji.js'
const app = getApp()
Page({
  data: {
    emojiList: emojiList
  },
  onLoad: function () {

  },
  copyText: function(event) {
    let text = event.target.dataset.text
    wx.setClipboardData({
      data: text
    })
  }
})