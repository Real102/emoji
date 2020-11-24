const getItem = key => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        console.log('no emoji in storage!')
        reject()
      }
    })
  })
}

const setItem = (key, data) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        console.log('no emoji in storage!')
        reject()
      }
    })
  })
}

module.exports = {
  getItem,
  setItem
}