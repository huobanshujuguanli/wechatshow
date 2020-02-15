const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    realName: '',
    verificationCode: '',
    code: '',
    newChanges: '',
    newChangesAgain: '',
    state: '',
    handleEName: '',
    content: null,
    lang: false,
    inputValue: '',
    quhao: '',
    openid: '',
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },
  bindGetUserInfo: function (e) {
    var that = this
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              var code = res.code;//登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  success: function (res) {
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: 'https://apis.sdcsoft.com.cn/wechat/device/getUnionId',
                      method: 'get',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                      success: function (data) {
                        var unionId = data.data.data.unionId
                        app.globalData.unionId = unionId
                        wx.showToast({
                          title:"微信绑定成功",
                          icon: 'success',
                          duration: 2000,
                        });
                        console.log(unionId)
                      },
                      fail: function () {
                        console.log('系统错误')
                      }
                    })
                  },
                  fail: function () {
                    console.log('获取用户信息失败')
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function () {
              console.log('登陆失败')
            }
          })

        } else {
          console.log('获取用户信息失败')
        }

      }
    })
  },
  onShow: function () {
    var that = this
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        text: chinese.Content.register_getcode
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        text: english.Content.register_getcode,
        lang: true
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.login_title
    })
  },
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口 
          url: 'https://apis.sdcsoft.com.cn/wechat/device/wxshow/getopenid',
          data: {
            js_code: res.code,
          },
          method: 'GET',
          success: function (res) {
            var openid = res.data.openid;//获取到的openid 
            that.setData({
              openid: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            })
          }
        })
      }
    })
  },
 

  register: function (e) {
    var that=this
    wx.navigateTo({
      url: "/pages/register/register?openid=" + that.data.openid,
    })
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
})