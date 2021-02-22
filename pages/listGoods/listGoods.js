// pages/index/listGoods/listGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.cloud.callFunction({
      name:"selectGoods"
    }).then(res =>{
      console.log(res)
      var array = res.result.data
      var alist=[]
      for (let index = 0; index < array.length; index++) {
         alist.push({
           id: array[index]._id,
           name: array[index].name,
           realname: array[index].realname,
           content: array[index].content,
           image:array[index].image,
           phone: array[index].phone,
           location: array[index].location,
           date: array[index].date
         })
      }
      that.setData({
        list:alist
      })
    })
    .catch(erro =>{
      console.log('获取错误！',erro)
    })
  },
  showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},
inputTyping: function (e) {
    this.setData({
        inputVal: e.detail.value
    });
}

})