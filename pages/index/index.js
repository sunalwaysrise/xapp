//index.js
//获取应用实例
var app = getApp(); //获取 main app.js 实例
var hello = require('../../utils/dialog.js');
Page({
  data: {
    IMGURL: app.IMGURL
      //页面数据
  },
  changeText: function() {
    this.setData({
      text: 'changed data'
    })
  },
  onLoad: function() {
    //生命周期函数--  页面加载/一个页面只会调用一次。
  },
  onReady: function() {
    //生命周期函数--  页面初次渲染完成/一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互/对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
    var that = this;
    wx.request({
      url: app.URL + "index/banner",
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function(r) {
        that.setData({
          banner: r.data
        })
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    });
  },
  onShow: function() {
    //生命周期函数--  页面显示/每次打开页面都会调用一次。
    // app.getUserInfo();
    this.products();
  },
  onHide: function() {
    //生命周期函数--  页面隐藏/当navigateTo或底部tab切换时调用
  },
  onUnload: function() {
    //生命周期函数--  页面卸载/当redirectTo或navigateBack的时候调用
  },
  onPullDownRefresh: function() {
    //页面相关事件处理函数--下拉刷新/监听用户下拉刷新事件
    //需要在config的window选项中开启enablePullDownRefresh。
    //当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
    this.products();
  },
  onReachBottom: function() {
    //页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    //只有定义了此事件处理函数，右上角菜单才会显示“分享”按钮
    return {
      title: '你要分享首页么',
      desc: '这是在分享首页',
      path: '/page/index'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(getCurrentPages());
  },
  products: function() {
    var that = this;
    wx.request({
      url: app.URL + "index/products",
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function(r) {
        r.data[0].cur = true;
        that.setData({
          products: r.data
        })
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    });
  },
  toggle: function(e) {
    var i = Number(e.target.id),
      products = this.data.products;
    if (products[i].cur == true) {
      products[i].cur = false;
    } else {
      products[i].cur = true;
    }
    this.setData({
      'products': products
    });
  },
  detail: function(e) {
    var id = Number(e.target.id);
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
    });
  }
})