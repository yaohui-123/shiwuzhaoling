// pages/addGoods/addGoods.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'/image/upload.png',
    formData:{
      name:null
    },
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  formSubmit(e) {
    var date = this.data.dateTimeArray1[0][this.data.dateTime1[0]]+'-'+this.data.dateTimeArray1[1][this.data.dateTime1[1]]+'-'+this.data.dateTimeArray1[2][this.data.dateTime1[2]]+' '+this.data.dateTimeArray1[3][this.data.dateTime1[3]]+':'+this.data.dateTimeArray1[4][this.data.dateTime1[4]]
    console.log(date)
    console.log()
    const that = this
    var input = e.detail.value;
    if(input.name&&input.phone&&input.realname&&input.location&&input.content&&this.data.imageUrl){
      console.log(input)
      wx.cloud.callFunction({
        name:"addLostGoods",
        data:{
          name:input.name,
          phone:input.phone,
          realname:input.realname,
          location:input.location,
          content:input.content,
          image:that.data.imageUrl,
          date:date
        }
      }).then(res =>{
        console.log('提交成功')
        wx.redirectTo({
          url: '/pages/listGoods/listGoods'
        })
      }).catch(err =>{
        console.log(err)
      })
    }else{
      wx.showToast({
        title: '请完善全部信息',
        icon: 'none'
      })
    }
  },
  changeSearch(e){
    this.setData({
      formData:{
        name:e.detail.value
      }
    })
  },
  addImage(e){
    var that = this;
    if(this.data.formData.name){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          // tempFilePath可以作为img标签的src属性显示图片
          this.upImgs(res.tempFilePaths[0])
        }
      })
    }else{
      wx.showToast({
        title: '请先输入物品名！',
        icon: 'none'
      })
    }
    
  },
  upImgs(temFile){
    const that = this
    wx.cloud.uploadFile({
      cloudPath: that.data.formData.name+'.jpg',
      filePath: temFile, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        this.setData({
          imageUrl: res.fileID
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
       var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
       arr[e.detail.column] = e.detail.value;
       dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);     
       this.setData({ 
        dateTimeArray1: dateArr,
        dateTime1: arr
       });
  }



})