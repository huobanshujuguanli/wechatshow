const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    content: null,
  },
  bindPickerChange: function (e) {
    var that = this
    wx.setStorage({
      key: 'warningType',
      data: e.detail.value
    })
    wx.showToast({
      title: that.data.content.warningType_updatesuccess,
      icon: 'success',
      duration: 2000,
       success(res) {
         wx.switchTab({
           url: '../deviceList/deviceList'
         }) 
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var warningType=0
    wx.getStorage({
      key: 'warningType',
      success(res) {
        that.setData({
          index: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        array: ["无", "振动", "响铃", "震动+响铃"],
        content: chinese.Content
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        array: ["None", "Vibration", "Ring the bell", "Vibration+Ring the bell"],
        content: english.Content
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.warningType_title
    })
  },
})