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
    // console.log(this.data.inputValue.replace(/\s/ig, ','))
    if (this.data.inputValue) {
      // emoji表情，这里替换成','隔开，然后再遍历转换成码点
      // 这里主要解决多码点（超过2个）的情况
      let str = this.data.inputValue.replace(/\s/ig, ',')
      let index = 0
      let temp = []
      getItem('userEmoji').then(res => {
        // 取出本地缓存的数据，计算下标开始位置index
        // 这里是异步，且需要处理error情况，否则不会进入到下一个then
        temp.push(...res)
        index = res.length
      }, err => {
        index = 0
      }).then(() => {
        // 将空数据干掉，只留下表情
        let arr = str.split(',').filter(item => item != '')
        arr.forEach((item, i) => {
          let text = emojiToCode(item)
          temp.unshift({
            text,
            key: `u-${++i + index}`
          })
        })
        setItem('userEmoji', temp)
        wx.switchTab({
          url: '/pages/index/index',
        })
      })
    } else {
      wx.showToast({
        title: '还没输入内容呢！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  clearEmoji: function () {
    wx.showModal({
      title: '提示',
      content: '请再次确认是否清空 Emoji',
      success: res => {
        if (res.confirm) {
          // 需要清空用户数据，请开启下面方法
          setItem('userEmoji', [])
          wx.showToast({
            title: '已清空',
          })
        }
      }
    })
  }
})