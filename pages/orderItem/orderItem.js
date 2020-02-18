var range = require('../../utils/range.js')
Page({
  data: {
    logs:'1235468',
    orderItem:[]
  },
   onLoad: function (options) {
     var that=this;
     var orderId = options.orderId
     wx.request({
       url: 'http://127.0.0.1:8080/webapi/wechat/JinRong_OrderItem/list',
       method: "GET",
       data: {
         OrderId: orderId,
       },

       success: function (res) {
         for (let i = 0; i < res.data.data.length; i++) {
           that.setData({
             ['orderItem[' + i + '].resourceName']: res.data.data[i].resourceName,
             ['orderItem[' + i + '].resourceId']: res.data.data[i].resourceId,
             ['orderItem[' + i + '].range']: res.data.data[i].range,
             ['orderItem[' + i + '].price']: res.data.data[i].price,
             ['orderItem[' + i + '].amount']: res.data.data[i].amount,
             ['orderItem[' + i + '].deviceNo']:res.data.data[i].deviceNo,
             ['orderItem[' + i + '].marker']: res.data.data[i].marker,
             ['orderItem[' + i + '].mobile']: res.data.data[i].mobile,
             ['orderItem[' + i + '].rangeType']: range.range(res.data.data[i].rangeType).x,
           })
         }
       }
     })
    // this.setData({
    //   orderItem:[
    //   {
    //      resourceName:'短信报警',
    //      range:100,
    //       price: 100,
    //       amount: 2,
    //       deviceNo: '0203100026',
    //       mobile: '100',
    //       marker: null,
    //       rangeType: range.range(1).x
    //   },
    // ]
    // })
  }
})