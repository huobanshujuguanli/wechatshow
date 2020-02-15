var MQTT = require("../../libs/mqtt/paho-mqtt.js");
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
    server_addr:"rancher.sdcsoft.com.cn"
  },
  startdebug: function () {
    wx.setEnableDebug({
      enableDebug: true
    })
  },
  enddebug: function () {
    wx.setEnableDebug({
      enableDebug: false
    })
  },
  conn: function () {
    var client = new MQTT.Client("wss://" + this.data.server_addr + "/mqtt", "clientId_" + Math.random().toString(36).substr(2));
    console.log(client)
    var connectOptions = {
      timeout: 10,
      useSSL: true,
      cleanSession: true,
      keepAliveInterval: 30,
      reconnect: true,
      onSuccess: function () {
        app.globalData.mqtt_client = client;
        client.onMessageArrived = function (msg) {
          console.log(msg.payloadString)
          /*
          if (typeof app.globalData.onMessageArrived === 'function') {
            return app.globalData.onMessageArrived(msg);
          }*/
          if (app.globalData.messages == null) {
            app.globalData.messages = [{ topic: msg.topic, message: msg.payloadString }];
          } else {
            app.globalData.messages =
              [{ topic: msg.topic, message: msg.payloadString }].concat(app.globalData.messages);
          }

        }
        client.subscribe("/ABC/01", {
          onSuccess: function () {
            console.log("subscribe  success")
          },
          onFailure: function () {
            wx.showToast({
              title: 'Failure',
              icon: 'loading',
              duration: 2000
            });
          },
        });
        client.onConnectionLost = function (responseObject) {
          if (typeof app.globalData.onConnectionLost === 'function') {
            return app.globalData.onConnectionLost(responseObject);
          }
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
          }
        }
        //去除按钮上的加载标志
        
      },
      onFailure: function (option) {
        var that = this
        console.log(option);
        //去除按钮上的加载标志
       
        wx.showModal({
          //title: msg.destinationName,
          content: option.errorMessage
        });
      }
    };
    if (this.data.switch_checked) {
      connectOptions.userName = "test1";
      connectOptions.password = "test1";
    }
    client.connect(connectOptions);
  },
  publish: function (options) {
    var that = this
    app.globalData.mqtt_client.publish("/ABC/01",
      "ADC",
      0,
      false
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that=this
    wx.getStorage({
      key: 'deviceList',
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  },

})