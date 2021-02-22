// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var obj = db.collection("lost_goods_table").add({
    data:{
      name: event.name,
      realname: event.realname,
      content: event.content,
      image: event.image,
      phone: event.phone,
      location: event.location,
      date: event.date
    }
  })
  return obj
}