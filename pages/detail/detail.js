//index.js
//获取应用实例
var app = getApp(); //获取 main app.js 实例
var U = require('../../utils/util.js');
Page({
  data: {
    id: null,
    IMGURL: app.IMGURL,
    hasNext: false,
    openComment: false,
    banner: [],
    data: {},
    comments: {},
    p: 0,
    pages: 1
  },
  onLoad: function(option) {
    this.setData({
      id: option.id
    });
  },
  onReady: function() {},
  onShow: function() {
    var that = this;
    wx.request({
      url: app.URL + "index/detail",
      data: {
        uid: wx.getStorageSync('uid'),
        id: that.data.id
      },
      success: function(r) {
        var img = r.data.data.image,
          banner = [];
        img = img.split('$');
        img.forEach(function(v, i, a) {
          if (v) {
            banner.push(v)
          }
        });
        that.setData({
          banner: banner,
          data: r.data.data
        });
        that.comments();
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    });
  },
  onHide: function() {
    this.setData({
      banner: [],
      data: {},
      comments: {}
    });
  },
  onUnload: function() {},
  onShareAppMessage: function() {
    //只有定义了此事件处理函数，右上角菜单才会显示“分享”按钮
    return {
      title: '你要分享首页么',
      desc: '这是在分享首页',
      path: '/page/detail/detail'
    }
  },
  openComment: function() {
    this.setData({
      openComment: true
    })
  },
  closeComment: function() {
    this.setData({
      openComment: false
    })
  },
  comments: function() {
    var that = this;
    wx.request({
      url: app.URL + "index/comment",
      data: {
        pid: this.data.id,
        p: this.data.p
      },
      success: function(r) {
        var l = r.data.list;
        if (l) {
          that.setData({
            hascomment: true
          });
          l.forEach(function(i, v) {
            i.time = U.formatTime(i.time * 1000);
          });
        }
        that.setData({
          comments: l,
          totalpage: r.data.pages
        })
      }
    });
  },
  comment: function(e) {
    var content = e.detail.value.textarea,
      that = this;
    wx.request({
      url: app.URL + "index/addcomment",
      data: {
        uid: wx.getStorageSync('uid'),
        pid: this.data.id,
        content: content
      },
      success: function(r) {
        var icon;
        if (r.data.flag == 1) {
          that.setData({
            p: 0,
            openComment: false
          });
          that.comments();
          icon = "success";
        } else {
          icon = "loading";
        }
        wx.showToast({
          title: r.data.msg,
          icon: icon,
          duration: 2000
        });
      },
      complete: function() {}
    });
  },
  prevPage: function() {
    var p = this.data.p;
    p--;
    if (p < 0) {
      p = 0
    }
    this.setData({
      p: p
    });
    this.comments();
  },
  nextPage: function() {
    var p = this.data.p,
      totalpage = this.data.totalpage;
    p++;
    if (p > (totalpage - 1)) {
      p = totalpage - 1;
    }
    this.setData({
      p: p
    });
    this.comments();
  }
});