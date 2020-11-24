// pages/add/index.js
import {
  getItem,
  setItem
} from '../../utils/storage.js'
Page({
  data: {
    inputValue: ''
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  },
  handleInput: function (e) {
    this.data.inputValue = e.detail.value
  },
  addEmoji: function () {
    if (this.data.inputValue) {
      let arr = this.data.inputValue.split('')
      let index = 0
      getItem('userEmoji').then(res => {
        index = res.length
      }).catch(err => {
        index = 0
      })
      let temp = []
      arr.forEach((item, i) => {
        if (item != '' || item != ' ') {
          temp.push({
            text: item,
            key: `u-${++i + index}`
          })
        }
      })
      setItem('userEmoji', temp)
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: '还没输入内容呢！',
        icon: 'none',
        duration: 2000
      })
    }
  }
})