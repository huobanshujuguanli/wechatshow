//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menus: null,
    // 统计商品数量和价格
    count: 0,
    discount: null,
    bottomFlag: false,
    // 提交的订单
    orders: true,
    items: [],
    content: null,
  },

  pay: function() {
    let that = this;
    let str = '选中' + that.data.count + '件商品，共' + that.data.discount.paymentAmount + '元，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function(res) {
        // 至少选中一个商品才能支付
        if (that.data.count !== 0) {
          if (res.confirm) {
            that.createOrderAndItem(1)
          } else if (res.cancel) {
            that.createOrderAndItem(0)
            console.log('用户点击取消')
          }
        } else {
          wx.showToast({
            title: '您未选中任何商品',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  createOrderAndItem: function (status) {
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/webapi/wechat/JinRong_Order/create',
      method: "POST",
      data: {
        status: status,
        wechatOrderId: "temp",
        openId: app.globalData.openid,
        unionId: "temp",
        discount: that.data.discount.discount,
        total: that.data.discount.total,
        paymentAmount: that.data.discount.paymentAmount,
      },

      success: function(res) {
        var orderId = res.data.data.id
        wx.getStorage({
          key: 'orders',
          success: function(res) {
            var list = res.data
            var itemList = []
            for (var i in list) {
              itemList.push({
                orderId: orderId,
                resourceId: list[i].resourceId,
                resourceName: list[i].resourceName,
                range: list[i].range,
                price: list[i].price,
                amount: list[i].amount,
                deviceNo: list[i].deviceNo,
                rangeType: list[i].rangeType,
                mobile:"",
                marker:""
              })
            }
            wx.request({
              url: 'http://127.0.0.1:8080/webapi/wechat/JinRong_OrderItem/wx/create/many',
              method: "POST",
              data: {
                jinRong_OrderItemList: JSON.stringify(itemList)
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res) {
                console.log(res)
                if (status==1){
                  var resList = []
                  for (var i in list) {
                    resList.push({
                      openId: app.globalData.openid,
                      resId: list[i].resourceId,
                      deviceNo: list[i].deviceNo,
                      range: list[i].range,
                      rangeType: list[i].rangeType,
                      amount: list[i].amount,
                    })
                  }
                  wx.request({
                    url: 'http://127.0.0.1:8080/webapi/wechat/RoleResource/create/many',
                    method: "POST",
                    data: {
                      role_ResourceList: JSON.stringify(resList)
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {

                      wx.showToast({
                        title: '购买成功',
                        icon: 'success',
                        duration: 2000
                      })
                      wx.switchTab({
                        url: '../deviceList/deviceList'
                      })
                    }
                  })
                }
              }
            })

            
            wx.setStorage({
              key: "orders",
              data: []
            });
          },
        })
      }
    })

  },
  getDateStr: function getDateStr(addDayCount) {
    var dd = new Date();;

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
    var h = dd.getHours();
    var mm = dd.getMinutes();
    if (h < 10) {
      h = "0" + h;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return y + "-" + m + "-" + d + " " + h + ':' + mm;
  },
  onLoad: function(options) {
    let that = this;
    if (app.globalData.lang === 'zh-cn') {
      var chinese = require("../../utils/Chinses.js")
      that.setData({
        content: chinese.Content,
        menus: ['基本', '购买']
      })
    }
    if (app.globalData.lang === 'en-us') {
      var english = require("../../utils/English.js")
      that.setData({
        content: english.Content,
        menus: ['Run information', 'Purchasing service']
      })
    }
    wx.request({
      //获取openid接口  
      url: 'http://127.0.0.1:8080/webapi/wechat/DiscountStrategy/discount',
      data: {
        total: options.money,
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        var celue;
        if (res.data.data.discount != null) {
          celue = res.data.data.discount
        }else{
          celue = "不满足优惠条件"
        }
        var discount = {
          
          discount: celue,
          total: res.data.data.total,
          paymentAmount: res.data.data.paymentAmount,
        }
        that.setData({
          discount: discount
        })
      }
    })
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function(res) {
        that.setData({
          items: res.data
        });
        // 价格统计汇总
        let num = 0;
        res.data.forEach(item => {
          num += item.amount
        });

        // 设置显示对应的总数和全部价钱
        that.setData({
          count: num
        });
      }
    })
  }
})