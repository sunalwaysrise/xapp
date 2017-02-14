App({
  CALL:['01083632657'],
  URL:"https://app.wenbin.lu/index/",
  IMGURL:"https://app.wenbin.lu/Public/Uploads/",
  onLaunch:function(){
    var that = this;
    wx.login({
      success:function(r){
        wx.request({
          url:"https://app.wenbin.lu/index/index/init",
          data:{code:r.code,uid:wx.getStorageSync('uid')},
          success: function(res){
            if(res.data.flag==1){
              wx.setStorageSync("uid",res.data.uid);
              wx.getUserInfo({
                success: function(rs){
                  wx.request({
                    url:"https://app.wenbin.lu/index/index/updateinfo",
                    data:{
                      nickname:rs.userInfo.nickName,
                      gender:rs.userInfo.gender,
                      language:rs.userInfo.language,
                      city:rs.userInfo.city,
                      province:rs.userInfo.province,
                      country:rs.userInfo.country,
                      avatarUrl:rs.userInfo.avatarUrl,
                      unionid:rs.userInfo.unionid,
                      uid:wx.getStorageSync('uid')
                    },
                    success: function(ok){
                      that.globalData.userInfo = res;
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  },
  onShow:function(){

  },
  onHide:function(){

  },
  onError:function(){

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success:function(r){
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  base:{}
})