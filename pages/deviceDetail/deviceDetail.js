const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
import {
  DateUtil
} from '@sdcsoft/utils'

import {
  GroupKeys
} from '@sdcsoft/comms'
var gfrm = require('@sdcsoft/gfrm');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '00:00',
    imgstyle: '',
    deviceNo: '',
    src: '',
    errorList: [],
    baseInfoMap: [],
    mockInfoMap: [],
    exceptionInfoMap: [], 
    deviceInfoMap: [],
    settingInfoMap: [],
    weeksettingMap: [],
    startstoptimeMap: [],
    switchquantityMap: [],
    bengAnimationList: [],
    fanAnimationList: [],
    bengList: [],
    fanList: [],
    runInfoMoList:[],
    timer: '',
    timerStates: true,
    // 展开折叠
    selectedFlag: [false, false, false, false, false, false, false, false],
    navbar: [],
    currentTab: 0,
    control: false,
    havedata: true,
    report: false,
    ifedit: false,
    placeholder: '',
    controlList: [],
    showList: [],
    inputmin: 0,
    inputmax: 0,
    inputvalue: 0,
    inputValue: '',
    index: -1,
    index1: -1,
    zuotian: "",
    qiantian: "",
    daqiantian: "",
    tian: -1,
    deviceType: '',
    systemStateCategories: ["2018-0405", "2018-0405"],
    systemStateData: [1, 2],
    mockList: [],
    mock1: null,
    mock1Name: "",
    zuotianList: [],
    qiantianList: [],
    daqiantianList: [],
    content: null,
    lang: '',
    jiarezu:null,
    mqttname:"",
    runinfoMenu: -1,
    payMenu: -1,
    exceptionMenu: -1,
    reportMenu: -1,
    controlMenu: -1,
    smsMenu: -1,
    baseNavbar:[],
  },

  switchChange: function(e) {
    var that = this
    var state = -1;
    if (e.detail.value) {
      state = 2
    } else {
      state = 1
    }
    let cList = []
    cList = that.data.controlList
    let temp = cList[e.currentTarget.dataset.index][e.currentTarget.dataset.index1];
    temp.setValue(state)
    that.setData({
      controlList: cList,
      'inputValue': ''
    })
  },
  editData: function(e) {
    var that = this;
    that.setData({
      ifedit: true,
      index: e.currentTarget.dataset.index,
      index1: e.currentTarget.dataset.index1,
      inputmin: e.currentTarget.dataset.min,
      inputmax: e.currentTarget.dataset.max,
      placeholder: that.data.content.detail_pl1 + e.currentTarget.dataset.min + '-' + e.currentTarget.dataset.max + that.data.content.detail_pl2,
    })
  },
  cancel: function(e) {
    var that = this;
    that.setData({
      ifedit: false,
      'inputValue': ''
    })
  },
  dName: function(e) {
    var that = this;
    this.setData({
      inputvalue: e.detail.value
    })
  },
  confirm: function(e) {
    var that = this;
    if (that.data.inputmax < that.data.inputvalue || that.data.inputmin > that.data.inputvalue) {
      wx.showToast({
        title: that.data.content.detail_pl1 + that.data.inputmin + '-' + that.data.inputmax + that.data.content.detail_pl2,
        icon: 'none',
        duration: 2000
      })
    } else {
      let cList = []
      cList = that.data.controlList
      //console.log(cList)
      let temp = cList[that.data.index][that.data.index1];
  
      temp.setValue(parseFloat(that.data.inputvalue))
      // cList[index].splice(that.data.index, 1);
      // cList[index].push(temp)
      that.setData({
        controlList: cList,
        ifedit: false,
        'inputValue': ''
      })
    }

  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  str2ab: function (str) {
    var buf=new ArrayBuffer(str.length*2)
    var bufView=new Uint16Array(buf)
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i)
    }
    return bufView;
  },
  //提交
  formSubmit: function(e) {
    var that = this
    let str = ''
    for (var i in that.data.controlList) {
      for (var commmd in that.data.controlList[i]) {
        str += that.data.controlList[i][commmd].getCommandString();
      }
    }
    
    if (str!=''){
      if (that.data.deviceNo.substr(0, 2) == '20') {
        var strlist = []; 
        var n = 2; 
        for (var i = 0, l = str.length; i < l / n; i++) { 
          var a = str.slice(n * i, n * (i + 1)); 
          strlist.push(a)
        }

        var strarray = new Uint8Array(strlist.length);
        for (let i = 0; i < strlist.length; i++) {
          strarray[i]=parseInt(strlist[i], 16)
        }
        
        var client = app.globalData.client;
        if (client.connected != null & client.connected) {
          var cmdName = "/CTL/"+that.data.mqttname.substr(5, 16)
          client.publish(cmdName, strarray.buffer, function (err) {
            //console.log(err)
            if (!err) {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000,
                mask: true
              })
            }
            else {
              wx.showToast({
                title: '发布失败',
                icon: 'error',
                duration: 1000,
                mask: true
              })
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
      }else{
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
                wx.request({
                  url: 'https://apis.sdcsoft.com.cn/wechat/device/sendcmd',
                  method: "GET",
                  data: {
                    command: str,
                    deviceSuffix: that.data.deviceNo,
                    userId: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
                  },
                  success: function (res) {
                    if (res.statusCode) {
                      wx.showToast({
                        title: that.data.content.detail_zhixing,
                        icon: 'success',
                        duration: 2000
                      });
                    }
                  }
                })
              }
            })

          }
        })
      }
      that.setData({
        currentTab: 0,
        timerStates: true,
      })
     
    }
    //console.log(that.data.controlList)
    console.log(str)
  },
  
  navbarTap: function (e) {
    var that = this
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    var menuName = e.currentTarget.dataset.name
    if (menuName == that.data.content.detail_controlMenu) {
      that.setData({
        timerStates: false,
      })
    }
    if (menuName == that.data.content.detail_runinfoMenu) {
      that.setData({
        timerStates: true,
      })
    }
    if (menuName == that.data.content.detail_reportMenu) {
      that.getreportdatabyday(that.data.mock1)
    }
    if (menuName == that.data.content.detail_payMenu) {
      that.setData({
        currentTab: e.currentTarget.dataset.idx - 1
      })
      wx.navigateTo({
        url: '../payMenu/payMenu'
      })
    }
  },
  onHide: function() {
    app.globalData.callBack[1] = null
    this.setData({
      timerStates: false
    })
  },
  onUnload: function() {
    app.globalData.callBack[1] = null
    this.setData({
      timerStates: false
    })
    
  },
  chooseMenu: function (num) {
    var that = this;
    var list = that.data.baseNavbar
    if (num == 2) {
      list.push(that.data.content.detail_exceptionMenu)
    }
    if (num == 3) {
      list.push(that.data.content.detail_reportMenu)
    }
    if (num == 4) {
      list.push(that.data.content.detail_controlMenu)
    }
    if (num == 5) {
      list.push(that.data.content.detail_smsMenu)
    }
    that.setData({
      navbar:list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
    wx.showLoading({
      title: "loading...",
    })
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        lang: 'zh-cn',
        baseNavbar: ['基本', '购买']
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        lang: 'en-us',
        baseNavbar: ['Run information', 'Purchasing service']
      })
    }
    wx.request({
      //获取openid接口  
      url: 'http://127.0.01:8080/webapi/wechat/RoleResource/list/deviceNo',
      data: {
        deviceNo: options.deviceNo,
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 0 & res.data.data.length > 0) {
          var currentTime = new Date();
          var list = res.data.data
          for (var i = 0; i < list.length; i++) {
            var dt = list[i].dueTime
            var format = dt.replace(/-/g, '/')
            var dt = new Date(Date.parse(format))
            if (currentTime < dt) {
              that.chooseMenu(list[i].resId)
            }
          }
        }else{
          that.setData({
            navbar :that.data.baseNavbar
          })
        }
        var munuList = that.data.navbar
        for (var i in munuList) {
          var munu = munuList[i]
          if (munu == that.data.content.detail_runinfoMenu) {
            that.setData({
              runinfoMenu: i,
            })
          }
          if (munu == that.data.content.detail_payMenu) {
            that.setData({
              payMenu: i
            })
          }
          if (munu == that.data.content.detail_exceptionMenu) {
            that.setData({
              exceptionMenu: i
            })
          }
          if (munu == that.data.content.detail_reportMenu) {
            that.setData({
              reportMenu: i
            })
          }
          if (munu == that.data.content.detail_controlMenu) {
            that.setData({
              controlMenu: i,
            })
          }
          if (munu == that.data.content.detail_smsMenu) {
            that.setData({
              smsMenu: i
            })
          }
        }
      }
    })
    
    // wx.login({
    //   success: function(res) {
    //     wx.request({
    //       //获取openid接口  
    //       url: 'https://apis.sdcsoft.com.cn/wechat/device/getopenid',
    //       data: {
    //         js_code: res.code,
    //       },
    //       method: 'GET',
    //       success: function(res) {
    //         console.log()
    //         wx.request({
    //           //获取openid接口   
    //           url: 'https://apis.sdcsoft.com.cn/wechat/device/control/List',
    //           data: {
    //             openid: res.data.openid.substr(0, 10) + '_' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
    //           },
    //           method: 'GET',
    //           success: function(res) {
    //             console.log(res)
    //             for (var index in res.data.data) {
    //               if (res.data.data[index].deviceNo == options.deviceNo) {
    //                 that.setData({
    //                   control: true,
    //                   navbar: that.data.content.detail_cnavbar,
    //                 })
    //                 return
    //               }
    //             }
    //           }
    //         })
    //       }
    //     })
    //   }
    // })

    var keylist = GroupKeys.getKeys();
  
    that.setData({
      detail_base: GroupKeys.getTitle(keylist[0]),
      detail_mock: GroupKeys.getTitle(keylist[1]),
      detail_ex: GroupKeys.getTitle(keylist[2]),
      detail_deviceinfo: GroupKeys.getTitle(keylist[3]),
      detail_deviceparameters: GroupKeys.getTitle(keylist[4]),
      detail_weeksetting: GroupKeys.getTitle(keylist[5]),
      detail_startstoptime: GroupKeys.getTitle(keylist[6]),
      detail_switchquantity: GroupKeys.getTitle(keylist[7]),
        deviceNo: options.deviceNo,
        imgstyle: options.imgstyle,
        jiarezu: options.jiarezu,
        deviceType: options.type,
        zuotian: that.getDateStr(null, -1),
        qiantian: that.getDateStr(null, -2),
        daqiantian: that.getDateStr(null, -3)
      }),
      wx.setNavigationBarTitle({
        title: options.title
      })
    if (options.deviceNo.substr(0, 2) != '20') {
      that.timer();
    } else {
      that.setData({
        mqttname: "/RPT/" + options.deviceNo.substr(0, 2) + "/" + options.deviceNo.substr(2, 3) + "/" + options.deviceNo.substr(5, 5)
      })
      that.dataparse(app.globalData.device)
      app.globalData.callBack[1] = function(t, m) {
        console.log(that.data.mqttname)
        if (that.data.mqttname == t) {
          // console.log('详情页收到数据：' + t + ':=' + m);
          let data = app.globalData.deviceAdapter.getSdcSoftDevice(that.data.deviceType, new Uint8Array(m))
          console.log(data)
          that.dataparse(data, options.deviceNo)

        }

      }
    }

  },
  subTopic: function (topic) {
    var client = app.globalData.client;
    if (client.connected != null & client.connected) {
      client.subscribe(topic, null, function (err, granted) {
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
  dataparse: function (data, deviceNo) {
    var that = this
    var errorList = []
    var clist = data.getCommands().map
    var media = -1
    for (var index in data.getBaseInfoFields().map) {
      if (data.getBaseInfoFields().map[index].name === "o_media") {
        media = data.getBaseInfoFields().map[index].value
      }
    }
    
    // if (media == 0 || media == 1) {
    //   that.setData({
    //     control: true,
    //   })
    // }
    if (JSON.stringify(clist) != '{}') {
      that.setData({
        controlList: clist,
        control: true,
      })
    }

    var myDate = new Date();
    for (var index in data.getExceptionFields().map) {
      errorList.push({
        deviceNo: deviceNo,
        title: data.getExceptionFields().map[index].title,
        date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '-' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
        states: that.data.content.detail_nochuli
      })
    }
    that.getException(errorList);
    var imgstyle1 = that.data.imgstyle
    var keylist = GroupKeys.getKeys();
   
    that.setData({
      src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif',
      bengAnimationList: data.getBeng(),
      exceptionInfoMap: data.getExceptionFields().map,
      fanAnimationList: data.getFan(),
      baseInfoMap: data.getBaseInfoFields().map,
      mockInfoMap: data.getMockFields().map,
      settingInfoMap: data.getSettingFields().map,
      deviceInfoMap: data.getDeviceFields().map,
      weeksettingMap: data.getFieldsMap(keylist[5]),
      startstoptimeMap: data.getFieldsMap(keylist[6]),
      switchquantityMap: data.getFieldsMap(keylist[7]),
    })
    wx.hideLoading()
   
    for (var i = 0; i < that.data.bengAnimationList.length; i++) {
      console.log()
      var src = 'bengList[' + i + '].src'
      var title = 'bengList[' + i + '].title'

      that.setData({
        [title]: that.data.bengAnimationList[i].getTitle(),
        [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/beng/' + that.data.bengAnimationList[i].getElementPrefixAndValuesString() + '.gif'
      })
    }

    for (var i = 0; i < that.data.fanAnimationList.length; i++) {
      var src = 'fanList[' + i + '].src'
      var title = 'fanList[' + i + '].title'
      that.setData({
        [title]: that.data.fanAnimationList[i].getTitle(),
        [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/fan/' + that.data.fanAnimationList[i].getElementPrefixAndValuesString() + '.gif'
      })
    }
  },
  // 展开折叠选择  
  changeToggle: function(e) {
  
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag,
    })
   
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShow: function() {
    var that = this;
    var type = that.data.deviceType
    var deviceNo = that.data.deviceNo
    if (deviceNo.substr(0, 2) != '20') {
      wx.request({
        //获取openid接口    
        url: 'https://apis.sdcsoft.com.cn/wechat/device/getdata',
        data: {
          deviceNo: deviceNo,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        responseType: 'arraybuffer',
        success: function(res) {
          var errorList = []
          let data = app.globalData.deviceAdapter.getSdcSoftDevice(that.data.deviceType, new Uint8Array(res.data))
         
         
          var clist = data.getCommands().map
          data.getDeviceFocusFields()
          var media=-1
          for (var index in data.getBaseInfoFields().map) {
            if (data.getBaseInfoFields().map[index].name === "o_media") {
              media = data.getBaseInfoFields().map[index].value
            }
          }
          // if (media == 0 || media == 4) {
          //   that.setData({
          //     control: true,
          //   })
          // }
          if (JSON.stringify(clist) != '{}') {
            that.setData({
              controlList: clist,
              control: true,
            })
          }
          var myDate = new Date();
          for (var index in data.getExceptionFields().map) {
            errorList.push({
              deviceNo: deviceNo,
              title: data.getExceptionFields().map[index].title,
              date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '-' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds(),
              states: that.data.content.detail_nochuli
            })
          }
          that.getException(errorList);
          var imgstyle1 = that.data.imgstyle

          if (that.data.mock1 == null){
            var gf = new gfrm.GroupFieldsRelationalMapping;
            var moMap = gf.groupMap.getItem("mockInfo")["map"]["map"]
            var runInfoMoList = []
            for (var index in data.getMockFields().map) {
              for (var mo in moMap) {
                if (moMap[mo] == data.getMockFields().map[index].name) {
                  runInfoMoList.push({ name: moMap[mo], title: data.getMockFields().map[index].title })
                }
              }
            }
            if (runInfoMoList.length > 0) {
              that.setData({
                report:true,
                runInfoMoList: runInfoMoList,
                mock1: runInfoMoList[0].name,
                mock1Name: runInfoMoList[0].title
              })
            }

          }
         

          var keylist = GroupKeys.getKeys();
          that.setData({
            src: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/stove/' + data.getStoveElement().getElementPrefixAndValuesString().substr(0, 8) + imgstyle1 + data.getStoveElement().getElementPrefixAndValuesString().substr(9, 2) + '.gif',
            bengAnimationList: data.getBeng(),
            exceptionInfoMap: data.getExceptionFields().map,
            fanAnimationList: data.getFan(),
            baseInfoMap: data.getBaseInfoFields().map,
            mockInfoMap: data.getMockFields().map,
            settingInfoMap: data.getSettingFields().map,
            deviceInfoMap: data.getDeviceFields().map,
            weeksettingMap: data.getFieldsMap(keylist[5]).map,
            startstoptimeMap: data.getFieldsMap(keylist[6]).map,
            switchquantityMap: data.getFieldsMap(keylist[7]).map,
          })
          wx.hideLoading()
          for (var i = 0; i < that.data.bengAnimationList.length; i++) {
            var src = 'bengList[' + i + '].src'
            var title = 'bengList[' + i + '].title'
            that.setData({
              [title]: that.data.bengAnimationList[i].title,
              [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/beng/' + that.data.bengAnimationList[i].getElementPrefixAndValuesString() + '.gif'
            })
          }

          for (var i = 0; i < that.data.fanAnimationList.length; i++) {
            var src = 'fanList[' + i + '].src'
            var title = 'fanList[' + i + '].title'
            that.setData({
              [title]: that.data.fanAnimationList[i].title,
              [src]: 'http://www.sdcsoft.com.cn/app/gl/animation/animation/fan/' + that.data.fanAnimationList[i].getElementPrefixAndValuesString() + '.gif'
            })
          }
        }
      })
    } else {
      wx.hideLoading()
    }
  },
  timer: function() {
    var that = this
    wx.getStorage({
      key: 'time',
      success(res) {
        that.setData({
          timer: setInterval(function() {
            if (that.data.timerStates) {
              console.log("timerStates")
              that.onShow()
            }
          }, res.data * 1000)
        })
      }
    })
  },
  getException: function(errorList) {
    var that = this
    var deviceNo = that.data.deviceNo
    // 没有异常 
    if (errorList.length == 0) {
      wx.getStorage({
        key: 'errorList',
        success(res) {
          if (res.data.length > 0) {
            var eList = res.data
            for (var i = 0; i < eList.length; i++) {
              if (eList[i].deviceNo == deviceNo) {
                eList[i].states = that.data.content.detail_treated
              }
            }
            wx.setStorage({
              key: 'errorList',
              data: eList
            })
          }
        }
      })
    } else {
      wx.getStorage({
        key: 'errorList',
        success(res) {
          var oldList = res.data
          if (oldList.length > 0) {
            for (var k = 0; k < oldList.length; k++) {
              if (oldList[k].deviceNo == deviceNo && oldList[k].states == that.data.content.detail_nochuli) {
                if (that.findx(errorList, oldList[k])) {
                  oldList.push({
                    deviceNo: oldList[k].deviceNo,
                    title: oldList[k].title,
                    date: oldList[k].date,
                    states: that.data.content.detail_treated
                  })
                  oldList.splice(k, 1);
                  wx.setStorage({
                    key: 'errorList',
                    data: oldList
                  })
                }
                for (var i = 0; i < errorList.length; i++) {
                  if (errorList[i].title == oldList[k].title && errorList[i].states == oldList[k].states) {
                    errorList.splice(i, 1);
                    break;
                  } else if (errorList[i].title == oldList[k].title && oldList[k].states == that.data.content.detail_treated) {
                    oldList.push({
                      deviceNo: errorList[i].deviceNo,
                      title: errorList[i].title,
                      date: errorList[i].date,
                      states: that.data.content.detail_nochuli
                    })
                    wx.getStorage({
                      key: 'warningType',
                      success(res) {
                        console.log(22)
                        if (res.data == 1) {
                          wx.vibrateLong()
                        } else if (app.globalData.warningType == 2) {
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
                    errorList.splice(i, 1);
                    break;
                  }
                }
              }
            }
            for (var i = 0; i < errorList.length; i++) {
              oldList.push({
                deviceNo: errorList[i].deviceNo,
                title: errorList[i].title,
                date: errorList[i].date,
                states: that.data.content.detail_nochuli
              })
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
            wx.setStorage({
              key: 'errorList',
              data: oldList
            })
          } else if (oldList.length == 0) {
            wx.setStorage({
              key: 'errorList',
              data: errorList
            })
          }
          wx.getStorage({
            key: 'errorList',
            success(res) {
              var elist = []

              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].deviceNo == that.data.deviceNo) {
                  elist.push(res.data[i])
                }
              }
              that.setData({
                errorList: elist
              })
            }
          })
        }
      })
    }
  },
  findx: function(list, ex) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === ex.title) {
        return false;
      }
    }
    return true;
  },
  //wxchart
  getreportdatabykey: function (key) {
    var that = this
    if (that.data.tian == -1) {
      var beginDate = that.getDateStr(null, -1)
    }
    if (that.data.tian == -2) {
      var beginDate = that.getDateStr(null, -2)
    }
    if (that.data.tian == -3) {
      var beginDate = that.getDateStr(null, -3)
    }
    var endDate = that.getDateStr(beginDate, 1)
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/report/device/wechat/mock',
      data: {
        key: key,
        begintime: beginDate,
        endtime: endDate,
        deviceNo: that.data.deviceNo
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            havedata: true
          })
          var systemStateCategories = []
          var systemStateData = res.data.data.data[0]
          var detelist = res.data.data.date
          for (var d in detelist) {
            systemStateCategories.push(DateUtil.dateFormat(new Date(DateUtil.stringToDate(detelist[d]).getTime() - 8 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"))
          }

          if (systemStateData.length > 0) {
            var windowWidth = 320;
            try {
              var res = wx.getSystemInfoSync();
              windowWidth = res.windowWidth;
            } catch (e) {
              console.error('getSystemInfoSync failed!');
            }

            lineChart = new wxCharts({
              canvasId: 'mockLine',
              type: 'line',
              categories: systemStateCategories,
              animation: false,
              series: [{
                name: that.data.mock1Name,
                data: systemStateData,
                format: function (val, name) {
                  var fomatFloat = parseFloat(val);
                  return fomatFloat.toFixed(2);
                }
              }],
              xAxis: {
                disableGrid: false
              },
              yAxis: {
                title: that.data.content.detail_y,
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: windowWidth,
              height: 200,
              dataLabel: true,
              dataPointShape: true,
              enableScroll: true,
              extra: {
                lineStyle: 'curve'
              }
            });
          }
        } else {
          wx.showToast({
            title: "未查询到符合条件的数据",
            icon: 'none',
            duration: 5000
          });
          // that.setData({
          //   havedata: false
          // })
        }
      }
    })


  },
  getreportdatabyday: function (key) {
    var that = this
    if (that.data.tian == -1) {
      var beginDate = that.getDateStr(null, -1)
    }
    if (that.data.tian == -2) {
      var beginDate = that.getDateStr(null, -2)
    }
    if (that.data.tian == -3) {
      var beginDate = that.getDateStr(null, -3)
    }
    var endDate = that.getDateStr(beginDate, 1)
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/webapi/report/device/wechat/mock',
      data: {
        key: key,
        begintime: beginDate,
        endtime: endDate,
        deviceNo: that.data.deviceNo
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            havedata: true
          })
          var systemStateCategories = []
          var systemStateData = res.data.data.data[0]
          var detelist = res.data.data.date
          for (var d in detelist) {
            systemStateCategories.push(DateUtil.dateFormat(new Date(DateUtil.stringToDate(detelist[d]).getTime() - 8 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss"))
          }

          if (systemStateData.length > 0) {
            var windowWidth = 320;
            try {
              var res = wx.getSystemInfoSync();
              windowWidth = res.windowWidth;
            } catch (e) {
              console.error('getSystemInfoSync failed!');
            }

            lineChart = new wxCharts({
              canvasId: 'mockLine',
              type: 'line',
              categories: systemStateCategories,
              animation: false,
              series: [{
                name: that.data.mock1Name,
                data: systemStateData,
                format: function (val, name) {
                  var fomatFloat = parseFloat(val);
                  return fomatFloat.toFixed(2);
                }
              }],
              xAxis: {
                disableGrid: false
              },
              yAxis: {
                title: that.data.content.detail_y,
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: windowWidth,
              height: 200,
              dataLabel: true,
              dataPointShape: true,
              enableScroll: true,
              extra: {
                lineStyle: 'curve'
              }
            });
          }
        } else {
          wx.showToast({
            title: "此设备在" + beginDate + "未开机",
            icon: 'none',
            duration: 5000
          });
          that.setData({
            havedata: false
          })
        }
      }
    })


  },
  radiochange: function(res) {
    var that = this
    that.setData({
      mock1Name: that.data.mockInfoMap[res.detail.value].title
    })
    that.getreportdatabykey(res.detail.value)
  },
  getDatefmt: function getDateStr(today) {
    var dd;
    dd = new Date(today);
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };

    var h = dd.getHours();
    var m = dd.getMinutes();
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    return y + "-" + m + "-" + d + " " + h + ':' + m;
  },
  getDateStr: function getDateStr(today, addDayCount) {
    var dd;
    if (today) {
      dd = new Date(today);
    } else {
      dd = new Date();
    }
    dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期
   
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    return y + "-" + m + "-" + d;
  },
  choosedata: function(e) {
    var that = this
    that.setData({
      tian: e.currentTarget.dataset.tian,
    })
    that.getreportdatabyday(that.data.mock1)
  },
  //wxchart  方法 
  touchHandler: function(e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function(e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function(e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
})