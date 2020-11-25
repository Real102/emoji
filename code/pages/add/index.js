// pages/add/index.js
import {
  getItem,
  setItem
} from '../../utils/storage.js'
import {
  emojiToCode
} from '../../utils/emoji.js'
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
      let arr = this.data.inputValue.split('') // emoji表情
      let index = 0
      let temp = []
      getItem('userEmoji').then(res => {
        // 取出本地缓存的数据，计算下标开始位置index
        temp.push(res)
        index = res.length
      }).catch(err => {
        index = 0
      })
      // 将空格干掉
      arr = arr.filter(item => item && item != ' ');
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 1) {
          // 将表情转换成码点，并存在本地
          let text = emojiToCode([arr[i - 1], arr[i]])
          temp.unshift({
            text,
            key: `u-${Math.floor(i/2) + index}`
          })
        }
      }
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