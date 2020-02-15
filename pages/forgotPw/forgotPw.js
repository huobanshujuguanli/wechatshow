const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    verificationCode: '',
    code: '',
    state: '',
    content: null,
  },
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.forgotPw_title
    })
  },
  /**
    * 获取验证码
    */
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this
    var phone = that.data.phone;
    if (phone == '') {
      wx.showToast({
        title: that.data.content.forgotPw_nonull,
        icon: 'none',
        duration: 2000
      })
    } 
    // else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
    //   wx.showToast({
    //     title: that.data.content.forgotPw_falsephone,
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    else {
      wx.request({
        url: 'https://app.weixin.sdcsoft.cn/employee/findEmployee',
        method: "GET",
        data: {
          mobile: that.data.phone,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          console.log(res)
          // if (!res.data) {
          //   wx.showToast({
          //     icon: 'none',
          //     title: that.data.content.forgotPw_nouser,
          //     duration: 2000
          //   })
          // }else{
            wx.request({
              url: 'https://app.weixin.sdcsoft.cn/getNewPd',
              method: "GET",
              data: {
                number: that.data.phone
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                that.setData({
                  verificationCode: res.data.validate
                })
                wx.showToast({
                  title: that.data.content.forgotPw_newpw,
                  icon: 'none',
                  duration: 2000
                });
                
              }
            })
          // }
        }
      })
    };
 
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})