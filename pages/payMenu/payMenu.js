const app = getApp();
Page({
  data: {
    text: "Page main",
    background: [
      {
        color: 'green',
        sort: 1
      },
      {
        color: 'red',
        sort: 2
      },
      {
        color: 'yellow',
        sort: 3
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    'menus': [
      {
        id: 1,
        tag: 'aa',
        resId: '2',
        name: '报警信息',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 12,
            pic: 'dish-9.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 18,
          //   pic: 'dish-10.jpg',
          //   count: 0
          // }
        ]
      },
      {
        id: 2,
        tag: 'bb',
        resId: '3',
        name: '统计报表',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 39,
            pic: 'dish-5.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 23,
          //   pic: 'dish-6.jpg',
          //   count: 0
          // }
        ]
      },
      {
        id: 3,
        tag: 'cc',
        resId: '4',
        name: '管理控制',
        icon: '',
        dishs: [
          {
            id: 1,
            time: 30,
            price: 0,
            name: '一个月',
            sales: 34,
            pic: 'dish-3.jpg',
            count: 0
          },
          // {
          //   id: 2,
          //   time: 365,
          //   price: 0,
          //   name: '一年',
          //   sales: 38,
          //   pic: 'dish-4.jpg',
          //   count: 0
          // }
        ]
      },
      // {
      //   id: 4,
      //   tag: 'dd',
      //   resId: '5',
      //   name: '短信报警',
      //   icon: '',
      //   dishs: [
      //     {
      //       id: 1,
      //       time: 30,
      //       price: 16,
      //       name: '一个月',
      //       sales: 19,
      //       pic: 'dish-7.jpg',
      //       count: 0
      //     },
      //     {
      //       id: 2,
      //       time: 365,
      //       price: 10,
      //       name: '一年',
      //       sales: 12,
      //       pic: 'dish-8.jpg',
      //       count: 0
      //     }
      //   ]
      // }
    ],
    selectedMenuId: 1,
    total: {
      count: 0,
      money: 0
    },
    chooseDeviceWindow:false,
    deviceList:[],
    chooseDeviceList:[],
  },
  selectMenu: function (event) {
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
//   var menuList = that.data.menus
//     for(var i in menuList){
//   if (menuList[i].resId == mid) {
//     menuList[i].deviceList.push({ deviceNo: "0123123123" })
//   }
// }
// that.setData({
//   menus: menuList
// })
  addDevice: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    var title = data.price + "¥/" + data.name
    var deviceList=that.data.deviceList
    var chooseDeviceList =[]

    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
      
        if (list.length>0){
            for (var k in deviceList) {
              var index = that.findDevice(list, data.range, data.rangetype, deviceList[k].deviceNo, data.resid)
              if (index!=-1) {
                chooseDeviceList.push({ resId: data.resid, resName: data.resname, range: data.range, rangeType: data.rangetype, deviceNo: deviceList[k].deviceNo, title: title, price: data.price, count: list[index].amount })
            
              } else {
                chooseDeviceList.push({ resId: data.resid, resName: data.resname, range: data.range, rangeType: data.rangetype, deviceNo: deviceList[k].deviceNo, title: title, price: data.price, count: 0 })
               
              }
          }
        }else{
          for (var k in deviceList) {
            chooseDeviceList.push({ resId: data.resid, resName: data.resname, range: data.range, rangeType: data.rangetype, deviceNo: deviceList[k].deviceNo, title: title, price: data.price, count: 0 })
          }
        }
        that.setData({
          chooseDeviceWindow: true,
          chooseDeviceList: chooseDeviceList
        })
      },
    })
  },

  gotoOrder: function () {
    var that=this
    var total = that.data.total
    if (total.count>0){
      wx.navigateTo({ url: '/pages/order/order?count=' + total.count + "&money=" + total.money, }) 
    }
  },

  minusCount: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    var total = that.data.total
    var count = data.count
    var resName = data.name
    var range = data.range
    var rangeType = data.rangetype
    var deviceNo = data.deviceno
    var resId = data.resid
    var price = data.price
    if (count==0){
      return;
   }
  
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data

        if (list.length > 0) {
          
            if (that.findName(list, range, rangeType, deviceNo, resId)) {
              for (var i in list) {
                if (range == list[i].range && rangeType == list[i].rangeType && deviceNo == list[i].deviceNo && resId == list[i].resourceId) {
                  if (list[i].amount==1){
                    list.splice(i, 1);
                    that.chooseDeviceListremove(deviceNo);
                    break;
                  }else{
                    list[i].amount = list[i].amount - 1
                    that.chooseDeviceListremove(deviceNo);
                    break;
                  }
                
                }
              
             
            }
            
          }
        }
        wx.setStorage({
          key: "orders",
          data: list
        });
      },
    })
    
    total.count -= 1
    total.money -= price
    this.setData({
      'total': total
    })
  },
  addCount: function (event) {
    var that = this
    var data = event.currentTarget.dataset
    
    var total = that.data.total
    var resName = data.name
    var range = data.range
    var rangeType = data.rangetype
    var deviceNo = data.deviceno
    var resId = data.resid
    var price = data.price

    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var list = res.data
        if (list.length > 0) {

          if (that.findName(list, range, rangeType, deviceNo, resId)) {
            for (var i in list) {
              if (range == list[i].range && rangeType == list[i].rangeType && deviceNo == list[i].deviceNo && resId == list[i].resourceId) {
                list[i].amount = list[i].amount + 1
                break;
              }
            }
            that.chooseDeviceListAdd(deviceNo);
          
      
          } else {
            list.push({ resourceName: resName, resourceId: parseInt(resId), range: range, rangeType: rangeType, deviceNo: deviceNo, price: price, amount: 1 })
            that.chooseDeviceListAdd(deviceNo);
        
       
          }
            
          
        } else {
          list.push({ resourceName: resName, resourceId: parseInt(resId), range: range, rangeType: rangeType, deviceNo: deviceNo, price: price, amount: 1 })
          that.chooseDeviceListAdd(deviceNo);
       
        }
        
        wx.setStorage({
          key: "orders",
          data: list
        });
      },
    })
    
      total.count += 1
      total.money += price
      this.setData({
        'total': total
      })
    
  },
  findName: function (list, range, rangeType, deviceNo, resId) {
   
    for (var i in list) {
    
      if (range == list[i].range && rangeType == list[i].rangeType && deviceNo == list[i].deviceNo && resId == list[i].resourceId) {
        return true
        break;
      }
    }
    return false
  },
  findDevice: function (list, range, rangeType, deviceNo, resId) {

    for (var i in list) {
      if (range == list[i].range && rangeType == list[i].rangeType && deviceNo == list[i].deviceNo && resId == list[i].resourceId) {
        return i
        break;
      }
    }
    return -1
  },
  confirm: function (e) {
    var that = this;
    that.setData({
      chooseDeviceWindow: false,
    })
  },
  chooseDeviceListAdd: function (deviceNo) {
    var that = this;
    var chooseDeviceList = that.data.chooseDeviceList
    for (var i in chooseDeviceList){
      if (chooseDeviceList[i].deviceNo == deviceNo){
        chooseDeviceList[i].count = chooseDeviceList[i].count+1
      }
    }
    that.setData({
      chooseDeviceList: chooseDeviceList,
    })
  },
  chooseDeviceListremove: function (deviceNo) {
    var that = this;
    var chooseDeviceList = that.data.chooseDeviceList
    for (var i in chooseDeviceList) {
      if (chooseDeviceList[i].deviceNo == deviceNo) {
        chooseDeviceList[i].count = chooseDeviceList[i].count -1
      }
    }
    that.setData({
      chooseDeviceList: chooseDeviceList,
    })
  },
  
  onUnload: function () {
    console.log("---")
    wx.setStorage({
      key: "orders",
      data: []
    });
  },
 
  onLoad: function () {
    var that = this;
    wx.setStorage({
      key: "orders",
      data: []
    });
    wx.getStorage({
      key: 'orders',
      fail: function (res) {
        wx.setStorage({
          key: "orders",
          data: []
        });
      },
    })
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        that.setData({
          deviceList:res.data
        })
      }
    })
    
     wx.request({
      //获取openid接口  
       url: 'http://127.0.0.1:8080/webapi/wechat/Resource_Product/list',
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        var result = res.data.data
        var munuList=[]
        var ex = {
          id: 1,
          tag: 'aa',
          resId: '2',
          name: '报警信息',
          icon: '',
          dishs: [],
          deviceList:[]
        }
        var report = {
          id: 2,
          tag: 'bb',
          resId: '3',
          name: '统计报表',
          icon: '',
          dishs: []
        }
        var control = {
          id: 3,
          tag: 'cc',
          resId: '4',
          name: '管理控制',
          icon: '',
          dishs: []
        }
        for (var i in result){
          if (result[i].resourceId==2){
            var title;
            if (result[i].rangeType==1){
              title = result[i].range+"天"
            }else{
              title = result[i].range + "个月"
            }
            var index=1
            ex.dishs.push({
              id: index,
              range: result[i].range,
              rangeType: result[i].rangeType,
              price: result[i].price,
              name: title,
              count: 0
              })
            index++
          }
          if (result[i].resourceId == 3) {
            var title;
            if (result[i].rangeType == 1) {
              title = result[i].range + "天"
            } else {
              title = result[i].range + "个月"
            }
            var index = 1
            report.dishs.push({
              id: index,
              range: result[i].range,
              rangeType: result[i].rangeType,
              price: result[i].price,
              name: title,
              count: 0
            })
            index++
          }
          if (result[i].resourceId == 4) {
            var title;
            if (result[i].rangeType == 1) {
              title = result[i].range + "天"
            } else {
              title = result[i].range + "个月"
            }
            var index = 1
            control.dishs.push({
              id: index,
              range: result[i].range,
              rangeType: result[i].rangeType,
              price: result[i].price,
              name: title,
              count: 0
            })
            index++
          }
        }
        munuList.push(ex)
        munuList.push(report)
        munuList.push(control)
        that.setData({
          menus: munuList
        })
      }
    })
    
    // wx.request({
    //   //获取openid接口  
    //   url: 'https://apis.sdcsoft.com.cn/webapi/wechat/RoleResource/list',
    //   data: {
    //     openId: app.globalData.openid,
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     if (res.data.code == 0 & res.data.data.length > 0) {

    //       var list = res.data.data
    //       var menu = that.data.menus
    //       for (var i = 0; i < list.length; i++) {
    //         for (var k = 0; k < menu.length; k++) {
    //           if (list[i].resId == menu[k].resId) {
    //             menu.splice(k, 1);
    //           }
    //         }
    //       }
    //       that.setData({
    //         menus: menu
    //       })
    //     }
    //   }
    // })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onScroll: function (e) {
    console.log(e)
  }
})