const router = require('koa-router')()
const { pushEmailMessage } = require('../utils/email')

router.prefix('/push-message')

router.get('/email', async function (ctx, next) {
  try {
    let query = ctx.query
    if(Object.prototype.toString.call(query) !== '[object Object]') {
      ctx.body = {
        code: -1,
        msg: '参数格式错误'
      }
      return
    }
    if(!query.to) {
      console.log('接收邮箱不得为空！')
      ctx.body = {
        code: -1,
        msg: '接收邮箱不得为空！'
      }
      return
    }
    pushEmailMessage({
      from: '"(]﹏[)o" <1601258964@qq.com>', // 发送方邮箱的账号
      to: "caiyx0666@163.com", // 邮箱接受者的账号
      subject: "钉钉打卡助手通知", // Subject line
      text: "打卡成功", // 文本内容
      html: "", // html 内容, 如果设置了html内容, 将忽略text内容
      ...query
    })
    ctx.body = {
      code: 0,
      msg: '邮箱发送成功！'
    }
  } catch(err){
    console.log('err：', err)
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: -1,
      msg: '邮箱发送失败！ err：' + err
    }
  }
  
})

module.exports = router
