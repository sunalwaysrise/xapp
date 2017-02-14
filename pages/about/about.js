//index.js
//获取应用实例
var app = getApp()
Page({
  data:{},
  call:function (e) {
    var i=Number(e.target.id);
    wx.makePhoneCall({phoneNumber:app.CALL[i]});
  }
})
