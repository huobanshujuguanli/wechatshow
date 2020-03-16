const app = getApp();
let map = new Map()

Page({
  data: {
    imgList: [],
    errorOldList: [],
    errorNewList: [],
    opend: '',
    ifName: false,
    lock: false,
    ifstyle: false,
    ifdelete: false,
    deviceTitle: '',
    deviceNo: '',
    timer: '',
    timerStates: true,
    content: null,
    devices: map,
    mqttif: false,
  },
  onHide: function() {
    var that = this
    that.setData({
      timerStates: false
    })
  },
  timer: function() {
    var that = this
    wx.getStorage({
      key: 'time',
      success(res) {
        that.setData({
          timer: setInterval(function() {
            if (that.data.timerStates) {
              that.httptimer()
            }
          }, res.data * 1000)
        })
      }
    })
  },
  
  httptimer: function() {
    var that = this
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var httplist = res.data
        if (res.data.length == 0) {
          wx.showLoading({
            title: 'Loading',
          })
          wx.login({
            success: function(res) {
              wx.request({
                //获取openid接口  
                url: 'https://apis.sdcsoft.com.cn/wechat/device/wxshow/getopenid',
                data: {
                  js_code: res.code,
                },
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                  var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
                 
                  wx.request({
                    //获取openid接口   
                    url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/list',
                    data: {
                      openId: openid,
                    },
                    method: 'GET',
                    success: function(res) {
                      wx.hideLoading();
                      if (res.data.data.length == 0) {
                        return;
                      } else {
                        var templist = res.data.data
                        for (var i = 0; i < templist.length; i++) {
                          if (templist[i].mqttName != null) {
                            templist.splice(i, 1);
                            continue
                          }
                          httplist.push({
                            deviceNo: templist[i].deviceNo,
                            deviceName: templist[i].deviceName,
                            deviceType: templist[i].deviceType,
                            imgStyle: templist[i].imgStyle
                          });
                        }
                        that.getdata(httplist, 0);
                        wx.setStorageSync('deviceList', httplist)
                        wx.setStorageSync('cachedVersion', 1.0)
                        wx.hideLoading();
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          for (var i = 0; i < httplist.length; i++) {
            if (typeof(httplist[i].mqttName) != "undefined") {
              httplist.splice(i, 1);
            }
          }
          that.getdata(httplist, 0);
        }
      }
    })
    that.errorLing();
  },
  longTap: function(e) {
    var that = this;
    that.setData({
      ifName: true,
      lock: true,
      deviceNo: e.currentTarget.dataset.id
    })
  },
  closeTap: function(e) {
    var that = this;
    that.setData({
      ifName: false,
      lock: false,
    })
  },
  closeStyle: function(e) {
    var that = this;
    that.setData({
      ifstyle: false,
      lock: false,
    })
  },
  handleTap: function(e) {
    var deviceNo = e.currentTarget.dataset.id
    var imgstyle = e.currentTarget.dataset.imgstyle
    var control = e.currentTarget.dataset.control
    var title = e.currentTarget.dataset.title
    var type = e.currentTarget.dataset.type
    var jiarezu = e.currentTarget.dataset.jiarezu
    var device = map.get(deviceNo)
    //var device = this.data.devices.get(deviceNo)
    app.globalData.device = device
    //检查锁
    if (this.data.lock) {
      return;
    } else {
      wx.navigateTo({
        url: "/pages/deviceDetail/deviceDetail?deviceNo=" + deviceNo + "&imgstyle=" + imgstyle + "&control=" + control + "&title=" + title + "&type=" + type + "&jiarezu=" + jiarezu,
      })
    }
  },
  rename: function(e) {
    var that = this;
    that.setData({
      ifrename: true,
      ifName: false,
    })
  },
  deleteDevice: function(e) {
    var that = this;
    that.setData({
      ifdelete: true,
      ifName: false,
    })
  },
  nodelete: function(e) {
    var that = this;
    that.setData({
      ifdelete: false,
      lock: false,
    })
  },
  yesdelete: function(e) {
    var that = this
    var deviceList = []
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            if (deviceList[i].deviceNo.substr(0, 2) === '20') {
              that.unSubTopic(deviceList[i].mqttName)
            }

            deviceList.splice(i, 1);
            break;
          }
        }
        for (var i = 0; i < that.data.imgList.length; i++) {
          if (that.data.imgList[i].deviceNo === that.data.deviceNo) {
            that.data.imgList.splice(i, 1);
            break;
          }
        }
        that.setData({
          imgList: that.data.imgList,
          lock: false,
        });


        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.request({
          //获取openid接口   
          url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/remove',
          data: {
            openId: app.globalData.openid,
            deviceNo: that.data.deviceNo
          },
          method: 'GET',
          success: function(res) {}
        })
        wx.showToast({
          title: that.data.content.list_deletesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifdelete: false,
            })
          }
        });
      }
    })
  },
  imgstyle: function(e) {
    var that = this;
    that.setData({
      ifstyle: true,
      ifName: false,
    })
  },
  dName: function(e) {
    this.setData({
      deviceTitle: e.detail.value
    })
  },
  renameconfirm: function(e) {
    var that = this
    var deviceList = []
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].title = that.data.deviceTitle
            break
          }
        }
        that.setData({
          imgList: imglist
        })
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].deviceName = that.data.deviceTitle
            wx.request({
              //获取openid接口   
              url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/modify',
              data: {
                openId: app.globalData.openid,
                deviceNo: that.data.deviceNo,
                deviceType: deviceList[i].deviceType,
                mqttName: deviceList[i].mqttName,
                deviceName: that.data.deviceTitle,
                imgStyle: deviceList[i].imgStyle
              },
              method: 'POST',
              success: function(res) {
                console.log(res)
              }
            })
            break
          }
        }
        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
          success(res) {
            that.setData({
              ifrename: false,
              lock: false,
            })
            //that.onLoad();
          }
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
            })
          }
        });
      }
    })
  },
  listyle: function(e) {
    var that = this
    var deviceList = []
    wx.showLoading({
      title: that.data.content.list_refresh,
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].imgstyle = 1
            imglist[i].src = imglist[i].src.substr(0, 67) + "1" + '.gif'
            var ilist = that.data.imgList
          }
        }
        that.setData({
          imgList: imglist
        })
        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].imgstyle = 1
          }
        }
        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
              lock: false,
            })
          }
        });
      }
    })
  },
  wostyle: function(e) {
    var that = this
    var deviceList = []

    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var imglist = that.data.imgList
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].deviceNo === that.data.deviceNo) {
            imglist[i].imgstyle = 0
            imglist[i].src = imglist[i].src.substr(0, 67) + "0" + '.gif'
          }
        }
        that.setData({
          imgList: imglist
        })

        deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceNo === that.data.deviceNo) {
            deviceList[i].imgstyle = 0
          }
        }

        wx.setStorage({
          key: 'deviceList',
          data: deviceList,
        })
        wx.showToast({
          title: that.data.content.list_updatesuccess,
          icon: 'success',
          duration: 2000,
          success(res) {
            that.setData({
              ifstyle: false,
              lock: false,
            })
          }
        });
      }
    })
  },
  renamecance: function(e) {
    var that = this;
    that.setData({
      ifrename: false,
      lock: false,
    })
  },
  updateDevice: function(e) {
    var that = this;
    wx.login({
      success: function(res) {
        wx.request({
          //获取openid接口  
          url: 'https://apis.sdcsoft.com.cn/wechat/device/wxshow/getopenid',
          data: {
            js_code: res.code,
          },
          method: 'GET',
          success: function(res) {
            var openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            wx.request({
              //获取openid接口 
              url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/check/openId',
              data: {
                openId: openid,
              },
              method: 'GET',
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              success: function (res) {
                if(res.data.code==1){
                  wx.getStorage({
                  key: 'deviceList',
                  success(res) {
                    var list = res.data
                    for (var i = 0; i < list.length; i++) {
                      list[i].openId = openid
                      list[i].deviceName = null
                    }
                    if (list.length > 0) {
                      wx.request({
                        //获取openid接口   
                        url: 'https://apis.sdcsoft.com.cn/webapi/wechat/devicestore/create/many',
                        data: {
                          storeList: JSON.stringify(list).replace(/imgstyle/g, "imgStyle"),
                        },
                        method: 'POST',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                        },
                        success: function (res) {
                        }
                      })
                    }
                  }
                })
                }
              }
            })
           
          }
        })
      }
    })
  },
  /* 支付  */
  pay: function (param) {
    console.log("支付")
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        console.log(res)
        // success
        // wx.navigateBack({
        //   delta: 1, // 回退前 delta(默认为1) 页面
        //   success: function (res) {
        //     wx.showToast({
        //       title: '支付成功',
        //       icon: 'success',
        //       duration: 2000
        //     })
        //   },
        //   fail: function () {
        //     // fail

        //   },
        //   complete: function () {
        //     // complete
        //   }
        // })
      },
      fail: function (res) {
        console.log(res)
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  onLoad: function(options) {
    var that = this;
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
           var  openid = res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length)
            app.globalData.openid = openid
            wx.request({
              url: 'http://127.0.0.1:8080/webapi/wechat/PayOrder/createPayOrder',
              method: 'POST',
              data: {
                money: '0.1',
                openId: openid
              },
              success: function (res) {
                var pay = res.data.data
                console.log(pay)
                //发起支付
                var timeStamp = pay.timeStamp;
                var packages = pay.package;
                var paySign = pay.paySign;
                var nonceStr = pay.nonceStr;
                var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
                that.pay(param)
              },
            })
            wx.request({
              //获取openid接口 
              url: 'https://apis.sdcsoft.com.cn/wechat/user/wxShow/check/openId',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                if (res.data.code == 1) {
                  wx.request({
                    url: 'https://apis.sdcsoft.com.cn/wechat/user/wxShow/saveEmployee',
                    method: "GET",
                    data: {
                      realName: openid,
                      openid: openid,
                    },
                    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        empower: false
                      })
                    }
                  })
                }
              }
            }) 
           
            
          }
        })
      }
    })



    // getApp().conmqtt().then(function () {
    //   //that.subTopic("ABC/01")
    //   app.globalData.client.publish("ABC/01", "123", function (err) {
    //     //console.log(err)
    //     if (!err) {
    //       wx.showToast({
    //         title: '发布成功',
    //         icon: 'success',
    //         duration: 1000,
    //         mask: true
    //       })
    //     }
    //     else {
    //       wx.showToast({
    //         title: '发布失败',
    //         icon: 'error',
    //         duration: 1000,
    //         mask: true
    //       })
    //     }
    //   })
    // })
   
    that.updateDevice();
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content
      })
      
      wx.setTabBarItem({
          index: 0,
          text: '设备',
          iconPath: 'images/tab_activity.png',
          selectedIconPath: 'images/tab_activity_selected.png'
        }),
        wx.setTabBarItem({
          index: 1,
          text: '主页',
          iconPath: 'images/tab_home.png',
          selectedIconPath: 'images/tab_home_selected.png'
        }),
        wx.setTabBarItem({
          index: 2,
          text: '添加',
          iconPath: 'images/add.png',
          selectedIconPath: 'images/add_select.png'
        })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content
      })
     
      wx.setTabBarItem({
          index: 0,
          text: 'Devices',
          iconPath: 'images/tab_activity.png',
          selectedIconPath: 'images/tab_activity_selected.png'
        }),
        wx.setTabBarItem({
          index: 1,
          text: 'Home',
          iconPath: 'images/tab_home.png',
          selectedIconPath: 'images/tab_home_selected.png'
        }),
        wx.setTabBarItem({
          index: 2,
          text: 'Add',
          iconPath: 'images/add.png',
          selectedIconPath: 'images/add_select.png'
        })
    }
    wx.setNavigationBarTitle({
      title: that.data.content.list_title
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var httplist = res.data
        var imglist = []
        for (var i = 0; i < httplist.length; i++) {
          if (typeof(httplist[i].mqttName) != "undefined") {
            getApp().conmqtt().then(function() {
              wx.getStorage({
                key: 'deviceList',
                success(res) {
                  var mqttlist = res.data
                  for (var i = 0; i < mqttlist.length; i++) {

                    if (typeof(mqttlist[i].mqttName) != "undefined") {
                      that.subTopic(mqttlist[i].mqttName)
                    }
                  }
                }
              })
            })
          }
        }
      }
    })
    that.timer();
    app.globalData.callBack[0] = function(t, m) {
      console.log('列表页收到数据：' + t + ':=' + m);
      that.getmqttdata(t, m)
    }
  },
  tologin: function() {
    wx.redirectTo({
      url: '../loginChoose/loginChoose'
    })
  },

  subTopic: function(topic) {
    var client = app.globalData.client;
    if (client.connected != null & client.connected) {
      client.subscribe(topic, null, function(err, granted) {
        if (!err) {
          console.log('订阅成功' + topic)
        } else {
          console.log('订阅失败')
        }
      })
    } else {
      wx.showToast({
        title: '连接失败，请稍后再试',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  unSubTopic: function(topic) {
    var client = app.globalData.client;
    if (client.connected) {
      client.unsubscribe(topic, function(err) {
        if (!err) {
          console.log('取消订阅成功' + topic)
        } else {
          console.log('取消订阅失败' + topic)
        }
      })
      //var bf = new ArrayBuffer(2);
      //client.publish('/RPT/01/001',bf)
    } else {
      wx.showToast({
        title: '连接失败，请稍后再试',
        icon: 'waring',
        duration: 1000,
        mask: true
      })
    }
  },
  finddevice: function(list, deviceNo) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].deviceNo === deviceNo) {
        return true;
      }
    }
    return false;
  },
  findx: function(list, ex) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === ex.title) {
        return true;
      }
    }
    return false;
  },
  errorLing: function() {
    var that = this
    for (var i = 0; i < that.data.errorOldList.length; i++) {
      if (!that.findx(that.data.errorNewList, that.data.errorOldList[i])) {
        that.data.errorOldList.splice(i, 1);
        break;
      }
    }
    if (that.data.errorNewList.length > that.data.errorOldList.length) {
      wx.getStorage({
        key: 'warningType',
        success(res) {
          if (res.data == 1) {
            wx.vibrateLong()
          } else if (res.data == 2) {
            const innerAudioContext = wx.createInnerAudioContext(); //新建一个createInnerAudioContext;
            innerAudioContext.autoplay = true; //音频自动播放设置
            innerAudioContext.src = 'http://www.sdcsoft.com.cn/app/gl/error.mp3'; //链接到音频的地址
            innerAudioContext.onPlay(() => {}); //播放音效
            innerAudioContext.onError((res) => { //打印错误
              console.log(res.errMsg); //错误信息
              console.log(res.errCode); //错误码
            })
          } else if (res.data == 3) {
            wx.vibrateLong()
            const innerAudioContext = wx.createInnerAudioContext(); //新建一个createInnerAudioContext(;
            innerAudioContext.autoplay = true; //音频自动播放设置
            innerAudioContext.src = 'http://www.sdcsoft.com.cn/app/gl/error.mp3'; //链接到音频的地址
            innerAudioContext.onPlay(() => {}); //播放音效
            innerAudioContext.onError((res) => { //打印错误
              console.log(res.errMsg); //错误信息
              console.log(res.errCode); //错误码
            })
          }
        }
      })

    }
    that.setData({
      errorOldList: that.data.errorNewList,
      errorNewList: []
    })
  },
  onShow: function() {
    var that = this
    that.httptimer()
    that.setData({
      timerStates: true
    })
   
   
  },
  
  getDeviceFromBytes(deviceNo, deviceType, data) {
    var that = this;
    let d = app.globalData.deviceAdapter.getSdcSoftDevice(deviceType, new Uint8Array(data))
    console.log(data)
    map.set(deviceNo, d)
    return d
  },
  getdata(deviceNos, index) {
    var that = this;
    if (index == deviceNos.length) {
      return;
    }
    var runstate = ''
    var title = ''
    var deviceNo = ''
    var src = ''
    var mock1 = ''
    var mock2 = ''
    var mock3 = ''
    var errcount = ''
    var imgstyle = ''
    var runday = ''
    var jiarezu = ''
    var control = ''
    var type = ''
    var lang = ''
    var deviceno = deviceNos[index].deviceNo
    if (typeof(deviceNos[index].mqttName) == "undefined" || deviceNos[index].mqttName == null) {
      var title1 = ''
      var deviceType = deviceNos[index].deviceType
      var runstate1 = ''
      var src1 = ''
      var errcount1 = 0
      if (deviceNos[index].deviceName == '' || deviceNos[index].deviceName == null) {
        title1 = deviceNos[index].deviceNo
      } else {
        title1 = deviceNos[index].deviceName +"——"+ deviceNos[index].deviceNo
      }
      var imgstyle1 = deviceNos[index].imgStyle

      wx.getStorage({
        key: 'deviceList',
        success(res) {
          var deviceList = res.data
          // for (var i = 0; i < deviceList.length; i++) {
          //   if (deviceList[i].deviceNo === deviceno) {
          //     deviceType = deviceList[i].deviceType
          //     break;
          //   }
          // }
          wx.request({
            url: 'https://apis.sdcsoft.com.cn/wechat/device/getdata',
            data: {
              deviceNo: deviceno,
            },
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            responseType: 'arraybuffer',
            success: function(res) {
              if (res.data == null ||res.data.byteLength == 0) {
                var ilist = that.data.imgList
                if (that.finddevice(ilist, deviceno)) {
                  for (var i = 0; i < ilist.length; i++) {
                    if (ilist[i].deviceNo === deviceno) {
                      ilist[i].deviceNo = deviceno
                      ilist[i].title = title1
                      ilist[i].runstate = that.data.content.list_runstate
                      ilist[i].imgstyle = imgstyle1
                      ilist[i].errcount = errcount1
                      ilist[i].src = src1
                      ilist[i].mock1 = ""
                      ilist[i].mock2 = ""
                      that.setData({
                        imgList: ilist
                      })
                      break;
                    }
                  }
                } else {
                  ilist.push({
                    title: deviceno,
                    runstate: that.data.content.list_runstate,
                    deviceNo: deviceno,
                    imgstyle: imgstyle1
                  })
                  that.setData({
                    imgList: ilist
                  })
                }
              } else {
                try {
                  let data = that.getDeviceFromBytes(deviceno, deviceType, res.data)
                  //data.setModbusNo 设置Modbus站号 默认1 1-255
                  if (data.getTypeName() != deviceType) {
                    wx.request({
                      //获取openid接口   
                      url: 'https://apis.sdcsoft.com.cn/wechat/device/modify/type',
                      data: {
                        suffix: deviceno,
                        deviceType: deviceType,
                        subType: data.getTypeName(),
                      },
                      method: 'GET',
                      success: function(res) {
                        deviceType = data.getTypeName()
                      }
                    })
                  }
                  var errorList = []
                  for (var index in data.getExceptionFields().map) {
                    errorList.push({
                      deviceNo: deviceNo,
                      title: data.getExceptionFields().map[index].title
                    })
                  }
                  that.setData({
                    errorNewList: that.data.errorNewList.concat(errorList)
                  })
                  var day = ''
                  var hour = ''
                  var jiarezu1 = ''
                  var mock11 = ''
                  var mock22 = ''
                  for (var index in data.getDeviceFocusFields()) {
                    if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
                      jiarezu1 = data.getDeviceFocusFields()[index].value
                    }
                    if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
                      day = data.getDeviceFocusFields()[index].valueString
                    }
                    if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
                      hour = data.getDeviceFocusFields()[index].valueString
                    }
                  }
                  for (var index in data.getBaseInfoFields().map) {
                    if (data.getBaseInfoFields().map[index].name === "o_system_status") {
                      runstate1 = data.getBaseInfoFields().map[index].valueString
                      //console.log(data.getBaseInfoFields().map[index].valueString)
                    }
                  }
                  for (var index in data.getMockFields().map) {
                    if (mock11 === "") {
                      mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                      continue;
                    }
                    if (mock22 === "") {
                      mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                      break;
                    }
                  }
                  errcount1 = errorList.length,
                    src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'
                  var ilist = that.data.imgList
                  if (that.finddevice(ilist, deviceno)) {
                    for (var i = 0; i < ilist.length; i++) {
                      if (ilist[i].deviceNo === deviceno) {
                        ilist[i].deviceNo = deviceno
                        ilist[i].title = title1
                        ilist[i].runstate = runstate1
                        ilist[i].imgstyle = imgstyle1
                        ilist[i].errcount = errcount1
                        ilist[i].src = src1
                        ilist[i].mock1 = mock11
                        ilist[i].mock2 = mock22
                        ilist[i].runday = day + hour
                        ilist[i].type = deviceType
                        ilist[i].lang = app.globalData.lang
                        ilist[i].jiarezu = jiarezu1
                        that.setData({
                          imgList: ilist
                        })
                        break;
                      }
                    }
                  } else {
                    ilist.push({
                      title: title1,
                      runstate: runstate1,
                      deviceNo: deviceno,
                      imgstyle: imgstyle1,
                      errcount: errcount1,
                      src: src1,
                      mock1: mock11,
                      mock2: mock22,
                      runday: day + hour,
                      type: deviceType,
                      lang: app.globalData.lang,
                      jiarezu: jiarezu1
                    })
                    that.setData({
                      imgList: ilist
                    })
                  }


                } catch (e) {
                  console.log(e)
                  var ilist = that.data.imgList
                  if (that.finddevice(ilist, deviceno)) {
                    for (var i = 0; i < ilist.length; i++) {
                      if (ilist[i].deviceNo === deviceno) {
                        if (ilist[i].runstate != "Error") {
                          ilist[i].deviceNo = deviceno
                          ilist[i].title = deviceno
                          ilist[i].runstate = "Error"
                          ilist[i].error = 1
                          that.setData({
                            imgList: ilist
                          })
                          wx.showModal({
                            title: that.data.content.list_prompt,
                            content: that.data.content.list_error1 + deviceno + that.data.content.list_error2,
                            success(res) {}
                          })
                        }
                        break;
                      }
                    }
                  } else {
                    var ilist = that.data.imgList
                    ilist.push({
                      title: deviceno,
                      runstate: "Error",
                      deviceNo: deviceno,
                      lang: app.globalData.lang
                    })
                  }
                  that.setData({
                    imgList: ilist
                  })
                }
              }
            }
          })
        }
      })
    }
    index++
    that.getdata(deviceNos, index)
  },
  getmqttdata(deviceNo, byte) {
    var that = this;
    var runstate1 = ''
    var title = ''
    var src1 = ''
    var mock1 = ''
    var mock2 = ''
    var errcount1 = ''
    var imgstyle = ''
    var runday = ''
    var jiarezu = ''
    var control = ''
    var type = ''
    var title1 = ''
    var imgstyle1 = 0
    var deviceType = ''
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        var deviceList = res.data
        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].mqttName === deviceNo) {
            deviceType = deviceList[i].deviceType
            deviceNo = deviceList[i].deviceNo
            if (deviceList[i].deviceName === '') {
              title1 = deviceList[i].deviceNo
            } else {
              title1 = deviceNos[index].deviceName + "——" + deviceNos[index].deviceNo
            }
            break;
          }
        }
        try {
          var databyte = new Uint8Array(byte)
          let data = that.getDeviceFromBytes(deviceNo, deviceType, databyte);

          // data.getMockFields().each((key, value) => {
          //   console.log('title:=' + value.getTitle() + ' value:=' + value.getValueString());
          // });
          if (data == null) {
            title1: title1,
            runstate1 = that.data.content.list_runstate,
            deviceNo = deviceNo,
            imgstyle = 0,
            errcount1 = 0,
            src1 = '',
            mock1 = ''
            if (byte.length > 5) {
              wx.showToast({
                title: deviceNo + '号设备，数据异常',
                icon: 'none',
                duration: 2000
              })
            }

          }
          else {
            var errorList = []
            for (var index in data.getExceptionFields().map) {
              errorList.push({
                deviceNo: deviceNo,
                title: data.getExceptionFields().map[index].title
              })
            }
            that.setData({
              errorNewList: that.data.errorNewList.concat(errorList)
            })
            var day = ''
            var hour = ''
            var jiarezu1 = ''
            var mock11 = ''
            var mock22 = ''
            for (var index in data.getBaseInfoFields().map) {
              if (data.getBaseInfoFields().map[index].name === "o_system_status") {
                runstate1 = data.getBaseInfoFields().map[index].valueString
              }
            }

            for (var index in data.getDeviceFocusFields()) {
              if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
                jiarezu1 = data.getDeviceFocusFields()[index].value
              }
              if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
                day = data.getDeviceFocusFields()[index].valueString
              }
              if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
                hour = data.getDeviceFocusFields()[index].valueString
              }
            }

            for (var index in data.getMockFields().map) {
              if (mock11 === "") {
                mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                continue;
              }
              if (mock22 === "") {
                mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
                break;
              }
            }
            errcount1 = errorList.length,
              src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'

          }
          var ilist = that.data.imgList
          if (that.finddevice(ilist, deviceNo)) {
            for (var i = 0; i < ilist.length; i++) {
              if (ilist[i].deviceNo === deviceNo) {
                ilist[i].deviceNo = deviceNo
                ilist[i].title = title1
                ilist[i].runstate = runstate1
                ilist[i].imgstyle = imgstyle1
                ilist[i].errcount = errcount1
                ilist[i].src = src1
                ilist[i].mock1 = mock11
                ilist[i].mock2 = mock22
                ilist[i].runday = day + hour
                ilist[i].type = deviceType
                ilist[i].lang = app.globalData.lang
                ilist[i].jiarezu = jiarezu1
                that.setData({
                  imgList: ilist
                })
                break;
              }
            }
          } else {
            ilist.push({
              title: title1,
              runstate: runstate1,
              deviceNo: deviceNo,
              imgstyle: imgstyle1,
              errcount: errcount1,
              src: src1,
              mock1: mock11,
              mock2: mock22,
              runday: day + hour,
              type: deviceType,
              lang: app.globalData.lang,
              jiarezu: jiarezu1
            })
            that.setData({
              imgList: ilist
            })
          }
        } catch (e) {
          console.log(e)
          var ilist = that.data.imgList
          if (that.finddevice(ilist, deviceNo)) {
            for (var i = 0; i < ilist.length; i++) {
              if (ilist[i].deviceNo === deviceNo) {
                ilist[i].deviceNo = deviceNo
                ilist[i].title = deviceNo
                ilist[i].runstate = "Error"
                that.setData({
                  imgList: ilist
                })
                wx.showModal({
                  title: that.data.content.list_prompt,
                  content: that.data.content.list_error1 + deviceno + that.data.content.list_error2,
                  success(res) {}
                })
                break;
              }
            }
          } else {
            var ilist = that.data.imgList
            ilist.push({
              title: deviceNo,
              runstate: "Error",
              deviceNo: deviceNo,
              lang: app.globalData.lang
            })
          }
          that.setData({
            imgList: ilist
          })

        }
      }
    })
  },
  // onShow: function () {
  //   var that = this
  //   that.errorLing();
  //   wx.getStorage({
  //     key: 'deviceList',
  //     success(res) {
  //       if (res.data.length == 0) {
  //         wx.showToast({
  //           title: '设备列表为空！请在主页添加设备',
  //           icon: 'none',
  //           duration: 2000
  //         })
  //         return;
  //       } else {
  //         app.connmqtt();
  //         var deviceList = res.data
  //         var client = app.globalData.client;
  //         console.log("555")
  //         // for (var i = 0; i < deviceList.length; i++) {
  //         //   that.subTopic(deviceList[i].mqttName)
  //         // }
  //         if (client == null) {
  //           wx.showLoading({
  //             title: '正在获取...',
  //           })
  //           var timeOut = setTimeout(function () {
  //             for (var i = 0; i < deviceList.length; i++) {
  //               that.subTopic(deviceList[i].mqttName)
  //             }
  //             wx.navigateBack()
  //             wx.hideLoading()
  //           }, 8000)
  //         }
  //       }
  //     }
  //   })
  //   app.globalData.callBack[0] = function (t, m) {
  //     console.log('列表页收到数据：' + t + ':=' + m);
  //     that.getdata(t.substr(5, 2) + t.substr(8, 3) + t.substr(12, 5), m)
  //   }
  // },
  // getdata(deviceNos, index) {
  //   console.log(deviceNos)
  //   var that = this;
  //   if (index == deviceNos.length) {
  //     return;
  //   }
  //   var runstate = 'imgList[' + index + '].runstate'
  //   var title = 'imgList[' + index + '].title'
  //   var deviceNo = 'imgList[' + index + '].deviceNo'
  //   var src = 'imgList[' + index + '].src'
  //   var mock1 = 'imgList[' + index + '].mock1'
  //   var mock2 = 'imgList[' + index + '].mock2'
  //   var mock3 = 'imgList[' + index + '].mock3'
  //   var errcount = 'imgList[' + index + '].errcount'
  //   var imgstyle = 'imgList[' + index + '].imgstyle'
  //   var runday = 'imgList[' + index + '].runday'
  //   var jiarezu = 'imgList[' + index + '].jiarezu'
  //   var control = 'imgList[' + index + '].control'
  //   var type = 'imgList[' + index + '].type'
  //   var lang = 'imgList[' + index + '].lang'
  //   var deviceno = deviceNos[index].deviceNo
  //   if (deviceNos[index].type == 1) {
  //     var title1 = ''
  //     var deviceType = ''
  //     var runstate1 = ''
  //     var src1 = ''
  //     var errcount1 = ''
  //     if (deviceNos[index].deviceName == '') {
  //       title1 = deviceNos[index].deviceNo
  //     } else {
  //       title1 = deviceNos[index].deviceName
  //     }
  //     var imgstyle1 = deviceNos[index].imgstyle
  //     wx.getStorage({
  //       key: 'deviceList',
  //       success(res) {
  //         var deviceList = res.data
  //         for (var i = 0; i < deviceList.length; i++) {
  //           if (deviceList[i].deviceNo === deviceno) {
  //             deviceType = deviceList[i].deviceType
  //             break;
  //           }
  //         }
  //         wx.request({
  //           url: 'https://app.weixin.sdcsoft.cn/device/getdata',
  //           data: {
  //             deviceNo: deviceno,
  //           },
  //           method: 'GET',
  //           header: {
  //             "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  //           },
  //           responseType: 'arraybuffer',
  //           success: function (res) {
  //             if (res.data.byteLength == 0) {
  //               that.setData({
  //                 [title]: deviceno,
  //                 [runstate]: that.data.content.list_runstate,
  //                 [deviceNo]: deviceno,
  //                 [imgstyle]: imgstyle1,
  //                 [errcount]: errcount1,
  //                 [src]: ''
  //               })
  //               return
  //             }
  //             else {
  //               let data = that.getDeviceFromBytes(deviceno, deviceType, res.data)
  //               var errorList = []
  //               for (var index in data.getExceptionFields().map) {
  //                 errorList.push({
  //                   deviceNo: deviceNo,
  //                   title: data.getExceptionFields().map[index].title
  //                 })
  //               }
  //               that.setData({
  //                 errorNewList: that.data.errorNewList.concat(errorList)
  //               })
  //               var day = ''
  //               var hour = ''
  //               var jiarezu1 = ''
  //               var mock11 = ''
  //               var mock22 = ''
  //               for (var index in data.getBaseInfoFields().map) {
  //                 if (data.getBaseInfoFields().map[index].name === "o_system_status") {
  //                   runstate1 = data.getBaseInfoFields().map[index].valueString
  //                 }
  //               }

  //               for (var index in data.getDeviceFocusFields()) {
  //                 if (data.getDeviceFocusFields()[index].name === "jia_re_zu_count") {
  //                   jiarezu1 = data.getDeviceFocusFields()[index].valueString
  //                 }
  //                 if (data.getDeviceFocusFields()[index].name === "ba_yunxingtianshu") {
  //                   day = data.getDeviceFocusFields()[index].valueString
  //                 }
  //                 if (data.getDeviceFocusFields()[index].name === "ba_yunxingxiaoshishu") {
  //                   hour = data.getDeviceFocusFields()[index].valueString
  //                 }
  //               }

  //               for (var index in data.getMockFields().map) {
  //                 if (mock11 === "") {
  //                   mock11 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
  //                   continue;
  //                 }
  //                 if (mock22 === "") {
  //                   mock22 = data.getMockFields().map[index].title + ":" + data.getMockFields().map[index].valueString
  //                   break;
  //                 }
  //               }
  //               errcount1 = errorList.length,
  //                 src1 = 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif'
  //             }

  //             that.setData({
  //               [lang]: app.globalData.lang,
  //               [jiarezu]: jiarezu1,
  //               [title]: title1,
  //               [runstate]: runstate1,
  //               [deviceNo]: deviceno,
  //               [imgstyle]: imgstyle1,
  //               [errcount]: errcount1,
  //               [src]: src1,
  //               [mock1]: mock11,
  //               [mock2]: mock22,
  //               [runday]: day + hour,
  //               [type]: deviceType
  //             })
  //           }
  //         })
  //       }
  //     })

  //   }
  //   index++
  //   that.getdata(deviceNos, index)
  // }, 
})