// pages/salesChange/salesChange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix:0,
    prefixarray: [],
    deviceNo:0,
    deviceType:0,
    statesarray: [],
    status: 0,
    typearray: [],
    type:"",
    powerarray: [],
    power: 0,
    mediaarray: [],
    media: 0,
    sim:"",
    commarray: ["DTU","Wifi"],
    comm:0,
    ctlTypeList:[],
    plcTypeList:[],
  },
  bindsim: function (e) {
    this.setData({
      sim: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that= this
    if (that.data.comm==0){
      if (typeof (that.data.sim) == "undefined" || that.data.sim == '898607B61518900') {
        wx.showToast({
          title: "请补全Sim卡号",
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/device/modify',
      data: {
        deviceNo: that.data.deviceNo,
        status: that.data.status,
        prefix: that.data.prefix,
        deviceType: that.data.type,
        power: that.data.power,
        media: that.data.media,
        iMEI: that.data.sim,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success(res) {
            wx.switchTab({
              url: '../index/index'
            })
          }
        });
      }
    })
  },
  bindPickerChange_comm: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      comm: e.detail.value,
    })
  },
  bindPickerChange_prefix: function (e) {
    var that = this
    that.setData({
      prefix: e.detail.value,
    })
    if (e.detail.value==1) {
      that.setData({
        typearray: that.data.ctlTypeList,
      })
    }
    if (e.detail.value == 2) {
      that.setData({
        typearray: that.data.plcTypeList,
      })
    }
  },
  bindPickerChange_status: function (e) {
    var that = this
    that.setData({
      status:e.detail.value,
    })
  },
  bindPickerChange_power: function (e) {
    var that = this
    that.setData({
      power: e.detail.value,
    })
  },
  bindPickerChange_media: function (e) {
    var that = this
    that.setData({
      media: e.detail.value,
    })
  },
  bindPickerChange_deviceType: function (e) {
    var that = this
    that.setData({
      type: that.data.typearray[e.detail.value],
      deviceType: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://apis.sdcsoft.com.cn/wechat/device/type/list',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'GET',
      success: function (res) {
        var list=[]
        for (var i in res.data.data){
          list.push(res.data.data[i].deviceType)
        }
       
        wx.request({
          url: 'https://apis.sdcsoft.com.cn/wechat/device/getsuffix',
          data: {
            deviceNo: options.deviceNo
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          method: 'GET',
          success: function (res) {
           
            var simtemp=""
            if (res.data.data.iMEI == null || res.data.data.iMEI =='null'){
              simtemp ="898607B61518900"
            }else{res.data.data.iMEI
              simtemp = res.data.data.iMEI
            }

            var plcTypeList=[]
            var ctlTypeList = []
            for (var i in list) {
              if (list[i].substr(0, 3) == 'PLC') {
                plcTypeList.push(list[i])
              }
              if (list[i].substr(0, 3) == 'CTL') {
                ctlTypeList.push(list[i])
              }
            }
            var deviceType=0
            if (res.data.data.devicePrefix==1){
              that.setData({
                deviceType: ctlTypeList.indexOf(res.data.data.deviceType),
                typearray: ctlTypeList
              })
            }
            if (res.data.data.devicePrefix == 2) {
              that.setData({
                deviceType: plcTypeList.indexOf(res.data.data.deviceType),
                typearray: plcTypeList
              })
            }
            that.setData({
              plcTypeList: plcTypeList,
              ctlTypeList: ctlTypeList,
              deviceNo: options.deviceNo,
              type: res.data.data.deviceType,
              prefix: res.data.data.devicePrefix,
              status: res.data.data.status,
              power: res.data.data.power,
              media: res.data.data.media,
              statesarray: ["未销售", "已销售"],
              prefixarray: ["","控制器", "PLC"],
              powerarray: ["油气", "电", "煤", "生物质"],
              mediaarray: ["热水", "蒸汽", "导热油", "热风", "真空"],
              sim: simtemp
            })
          }
        })
      }
    })
  },
})