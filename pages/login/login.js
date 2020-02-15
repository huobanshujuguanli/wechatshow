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
    openid:'',
    empower: true,
    adapterSource: ["Albania", "Andorra", "Austria", "Australia", "	Algeria", "Angola", "Argentina", "Antigua and Barbuda", "Afghanistan", "Azerbaijan", "Alaska(U.S.A)", "Armenia", "Anguilla I.", "Aruba I.", "Ascension", "Belarus", "Bulgaria", "Belgium", "Benin", "Botswana", "Burkina Faso", "Burundi", "Barbados", "Brazil", "Bolivia", "Belize", "Bahrain", "Bhutan", "Bangladesh", "Brunei Darussalam", "Bermuda Is.", "Bosnia And Herzegovina", "	Czech", "Croatia", "Cook Islands", "Cape Verde", "238", "Congo", "Cameroon", "	Comoro", "Chad", "Central Africa", "Commonwealth of The Bahamas", "Colombia", "	Costa Rica", "Cuba", "Canada", "1", "Chile", "Cyprus", "China", "Canaries Is.", "Christmas I.", "Denmark", "Estonia", "Egypt", "France", "Finland", "Germany", "Iraq", "Israel", "India", "Indonesia", "Japan", "Kenya", "Korea(dpr of)", "Kazakhstan", "Korea(republic of)", "Kyrgyzstan", "Kampuchea", "Kuwait", "Libya", "Laos", "Myanmar", "New Zealand", "Portugal", "Paraguay", "Pakistan", "Palestinian", "Philippines", "Sweden", "Switzerland", "South Africa", "Saudi Arabia", "The Democratic Republic of Congo", "Tanzania", "Vietnam"],
    adapterSourcemap: [
      { name: "Albania", code: "355" }, { name: "Andorra", code: "376" }, { name: "Austria", code: "43" },
      { name: "Australia", code: "61" }, { name: "	Algeria", code: "213" }, { name: "Angola", code: "244" },
      { name: "Argentina", code: "54" }, { name: "Antigua and Barbuda", code: "1268" }, { name: "Afghanistan", code: "93" },
      { name: "Azerbaijan", code: "994" }, { name: "Alaska(U.S.A)", code: "1907" }, { name: "Armenia", code: "374" },
      { name: "Anguilla I.", code: "1264" }, { name: "Aruba I.", code: "297" }, { name: "Ascension", code: "247" },
      { name: "Belarus", code: "375" }, { name: "Bulgaria", code: "359" }, { name: "Belgium", code: "32" },
      { name: "Benin", code: "229" }, { name: "Botswana", code: "267" }, { name: "Burkina Faso", code: "226" },
      { name: "Burundi", code: "257" }, { name: "Barbados", code: "1246" }, { name: "	Brazil", code: "55" },
      { name: "Bolivia", code: "591" }, { name: "Belize", code: "501" }, { name: "Bahrain", code: "973" },
      { name: "Bhutan", code: "975" }, { name: "Bangladesh", code: "880" }, { name: "Brunei Darussalam", code: "673" },
      { name: "Bermuda Is.", code: "1441" }, { name: "Bosnia And Herzegovina", code: "387" }, { name: "	Czech", code: "420" },
      { name: "Croatia", code: "383" }, { name: "Cook Islands", code: "682" }, { name: "Cape Verde", code: "1111" },
      { name: "Congo", code: "242" }, { name: "Cameroon", code: "237" }, { name: "	Comoro", code: "269" },
      { name: "Chad", code: "235" }, { name: "Central Africa", code: "236" }, { name: "Commonwealth of The Bahamas", code: "1809" },
      { name: "Colombia", code: "57" }, { name: "	Costa Rica", code: "506" }, { name: "Cuba", code: "53" },
      { name: "	Canada", code: "1" }, { name: "	Chile", code: "56" }, { name: "Cyprus", code: "357" },
      { name: "China", code: "86" }, { name: "	Canaries Is.", code: "34" }, { name: "Christmas I.", code: "61 9164" },
      { name: "Denmark", code: "45" }, { name: "	Estonia", code: "372" }, { name: "Egypt", code: "20" },
      { name: "France", code: "33" }, { name: "Finland", code: "358" }, { name: "	Germany", code: "49" }, { name: "	Greece", code: "30" },
      { name: "	Iraq", code: "964" }, { name: "Israel", code: "972" }, { name: "	India", code: "91" }, { name: "Indonesia", code: "62" },
      { name: "	Japan", code: "81" }, { name: "Kenya", code: "254" }, { name: "	Korea(dpr of)", code: "85" }, { name: "Kazakhstan", code: "7" },
      { name: "	Korea(republic of)", code: "82" }, { name: "Kyrgyzstan", code: "996" }, { name: "Kampuchea", code: "855" }, { name: "Kuwait", code: "965" },
      { name: "Libya", code: "218" }, { name: "Laos", code: "856" }, { name: "Myanmar", code: "95" }, { name: "New Zealand", code: "64" },
      { name: "	Portugal", code: "351" }, { name: "Paraguay", code: "595" }, { name: "Pakistan", code: "92" }, { name: "Palestinian", code: "930" },
      { name: "	Philippines", code: "63" }, { name: "Sweden", code: "46" }, { name: "Switzerland", code: "41" }, { name: "South Africa", code: "27" },
      { name: "	Saudi Arabia", code: "966" }, { name: "The Democratic Republic of Congo", code: "243" }, { name: "Tanzania", code: "255" }, { name: "Vietnam", code: "84" }],
    bindSource: []//绑定到页面的数据，根据用户输入动态变化
  },
  bindinput: function (e) {
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          newSource.push(e)
        }
      })
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
    }

  },
  itemtap: function (e) {
    this.setData({
      inputValue: e.target.id,
      bindSource: []
    })
    var map = this.data.adapterSourcemap
    for (var i = 0; i < map.length; i++) {
      if (map[i].name == e.target.id) {
        this.setData({
          quhao: map[i].code
        })
      }
    }
    console.log(this.data.quhao)
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
  
  },
  /**
    * 获取验证码
    */
  return_home: function (e) {
    wx.switchTab({
      url: '/pages/login/login',
    })

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    if (phone == '') {
      warn = that.data.content.register_pleasephone;
    }
    else {
      if (app.globalData.lang === 'zh-cn') {
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/user/bind/sms/zh',
          method: "GET",
          data: {
            mobileNumber: that.data.phone
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data.code==1){
              wx.showToast({
                title: that.data.content.register_nouser,
                icon: 'none',
                duration: 2000
              });
            }else{
              that.setData({
                verificationCode: res.data.data
              })
              wx.showToast({
                title: that.data.content.register_sendmsg,
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's', //按钮文字变成倒计时对应秒数

                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    text: that.data.content.register_resend,
                    currentTime: 61,
                    disabled: false,
                    color: '#1AAD19'
                  })
                }
              }, 1000);
            }
            
          }
        })
      }
      if (app.globalData.lang === 'en-us') {
        var phone = that.data.quhao + that.data.phone
        console.log(phone)
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/user/bind/sms/en',
          method: "GET",
          data: {
            mobileNumber: phone
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              verificationCode: res.data.data
            })
            wx.showToast({
              title: that.data.content.register_sendmsg,
              icon: 'none',
              duration: 2000
            });
            //设置一分钟的倒计时
            var interval = setInterval(function () {
              currentTime--; //每执行一次让倒计时秒数减一
              that.setData({
                text: currentTime + 's', //按钮文字变成倒计时对应秒数

              })
              //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
              if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                  text: that.data.content.register_resend,
                  currentTime: 61,
                  disabled: false,
                  color: '#1AAD19'
                })
              }
            }, 1000);
          }
        })
      }

    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: that.data.content.register_prompt,
        content: warn
      })
      that.setData({
        disabled: false,
        color: '#1AAD19'
      })
      return;
    }
  },
  submit: function (e) {
    var that = this
    if (this.data.phone == '') {
      wx.showToast({
        title: that.data.content.register_plphone,
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.code == '') {
      wx.showToast({
        title: that.data.content.register_plcode,
        icon: 'none',
        duration: 2000
      })
      return
    }
    else if (this.data.code != this.data.verificationCode) {
      wx.showToast({
        title: that.data.content.register_falsecode,
        icon: 'none',
        duration: 2000
      })
      return
    }else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: 'https://apis.sdcsoft.com.cn/wechat/user/bind/wechat',
        method: "GET",
        data: {
          mobileNumber: that.data.phone,
          openId: app.globalData.openid,
          unionId: app.globalData.unionId
        },
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.showToast({
              icon: 'none',
              title: that.data.content.register_existuser,
              duration: 2000
            })
          }
          if (res.data.code == 0) {
            wx.showToast({
              title: that.data.content.login_sccess,
              duration: 2000,
              success(res) {
                wx.switchTab({
                  url: '/pages/deviceList/deviceList'
                })
              }
            })
            wx.setStorage({
              key: 'wxEnterpriseName',
              data: that.data.handleEName
            })
          }
        }
      })

    }
  },
  bindGetUserInfo: function (e) {
    var that = this
    wx.getSetting({
      success: res => {
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
                        that.setData({
                          empower:false
                          })
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
  refusedEmpower: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  tolist: function () {
    wx.switchTab({
      url: '/pages/operation/operation'
    })
  },

})