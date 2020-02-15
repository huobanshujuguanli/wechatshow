const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
  },
  onShow: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: "设备管理"
    })
  },
  scanCode: function (e) {
    var that = this
    var deviceNo;
    wx.scanCode({
      success: (res) => {
        if (res.result.indexOf('?') > 0) {
          deviceNo = res.result.substr(43, 55);
        } else {
          deviceNo = res.result;
        }
        var deviceList = []
        var type = ''
        wx.getStorage({
          key: 'deviceList',
          success(res) {
            deviceList = res.data;
            wx.request({
              url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
              data: {
                deviceNo: deviceNo,
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              method: 'GET',
              success: function (res) {
                if (res.data.code != 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  });
                  return;
                }
                deviceNo = res.data.data.deviceSuffix
                wx.navigateTo({
                  url: "/pages/salesChange/salesChange?deviceNo=" + deviceNo,
                })
              }
            })
          }
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
  },
  
  /**
   *  表单功能
   */
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表数据
    if (formData.deviceNo == null || formData.deviceNo == '') {
      wx.showToast({
        title: that.data.content.operation_pleasedeviceno,
        icon: 'none',
        duration: 2000
      });
    } else {
      var deviceList = []
      var type = ''
      var deviceNo = formData.deviceNo
      wx.getStorage({
        key: 'deviceList',
        success(res) {
          deviceList = res.data;

          var deviceNo = formData.deviceNo
          wx.request({
            url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
            data: {
              deviceNo: deviceNo,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                });
                return;
              }
              deviceNo = res.data.data.deviceSuffix
              wx.navigateTo({
                url: "/pages/salesChange/salesChange?deviceNo=" + deviceNo,
              })
            }
          })
        }
      })
    }
  }
})