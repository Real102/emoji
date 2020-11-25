const getItem = key => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
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
        reject(err)
      }
    })
  })
}

module.exports = {
  getItem,
  setItem
}