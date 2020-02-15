
const app = getApp()
Page({
  data: {
    openid: '',
    wxEnterpriseName:'',
    content:null,
    sole: false,
    canIUse: true,
  },
  // getPhoneNumber: function (e) {
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code;//登录凭证
  //       if (code) {
  //         //2、调用获取用户信息接口
  //         wx.getUserInfo({
  //           success: function (res) {
  //             //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
  //             wx.request({
  //               url: 'http://127.0.0.1:8080/wechat/device/getUnionId',
  //               method: 'get',
  //               header: {
  //                 'content-type': 'application/x-www-form-urlencoded'
  //               },
  //               data: { encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: code },
  //               success: function (data) {
  //                 var unionId = data.data.data.unionId
  //                 app.globalData.unionId = unionId
  //                 that.setData({
  //                   empower: false
  //                 })
  //                 console.log(unionId)
  //               },
  //               fail: function () {
  //                 console.log('系统错误')
  //               }
  //             })
  //           },
  //           fail: function () {
  //             console.log('获取用户信息失败')
  //           }
  //         })

  //       } else {
  //         console.log('获取用户登录态失败！' + r.errMsg)
  //       }
  //     },
  //     fail: function () {
  //       console.log('登陆失败')
  //     }
  //   })
  // },
  error: function () {
    wx.navigateTo({
      url: '../reports/reports'
    })
  },
  //事件处理函数
  tologin: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  tolist: function () {
    wx.redirectTo({
      url: '/pages/deviceList/deviceList'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/employee/getSoldPermissions',
      data: {
        openid: app.globalData.openid,
      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          that.setData({
            sole: true
          })
        }
      }
    })

   
    wx.getStorage({
      key: 'wxEnterpriseName',
      success(res) {
        that.setData({
          wxEnterpriseName: res.data
        })
      }
    })
   
  },

  onShow: function () {
    var that =this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content
      })
    }
    wx.request({
      //获取openid接口   
      url: 'https://apis.sdcsoft.com.cn/wechat/user/find/openId',
      data: {
        openId: app.globalData.openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 0) {
          var list = res.data.data
          if (list.length > 0) {
            for (var i in list) {
              if (list[i].unionId != null) {
                that.setData({
                  canIUse: false
                })
              }
            }
          }
        }
      }
    })
  }
})
