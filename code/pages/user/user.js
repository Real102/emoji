// pages/user/user.js
const app = new getApp()
import {
    getUserInfo
} from '../../utils/userInfo.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 最新的好像直接使用open-data获取/显示，不再支持 getUserInfo 弹出授权后获取
        // 如果需要获取用户信息，并传给后端如何做？
        // if (!app.globalData.userInfo) {
        //     // 判断是否存在用户数据，不存在则请求接口获取
        //     getUserInfo().then(() => {
        //         this.setData({
        //             userInfo: app.globalData.userInfo
        //         })
        //     })
        // } else {
        //     this.userInfo = app.globalData.userInfo
        // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
})