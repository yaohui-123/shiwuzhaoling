// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lost:'/image/lost.jpeg',
    find:'/image/find.jpeg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  lostBind(){
    wx.navigateTo({
      url: '/pages/addGoods/addGoods'
    })
  },
  findBind(){
    wx.navigateTo({
      url: '/pages/listGoods/listGoods'
    })
  }
})