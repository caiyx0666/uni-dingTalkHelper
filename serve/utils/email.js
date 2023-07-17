const nodemailer = require("nodemailer");

// 使用async..await 创建执行函数
async function pushEmailMessage(sendInfo) {
  // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
  // let testAccount = await nodemailer.createTestAccount();

  // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 第三方邮箱的主机地址
    // port: 3000,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: '1601258964', // 发送方邮箱的账号
      pass: '', // 邮箱授权密码
    },
  });

  // 邮件服务器准备
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
    }else{
      console.log('email is ready')
    }
  })

  // 定义transport对象并发送邮件
  let info = await transporter.sendMail({
    from: '"(]﹏[)o" <1601258964@qq.com>', // 发送方邮箱的账号
    to: "caiyx0666@163.com", // 邮箱接受者的账号
    subject: "钉钉打卡助手通知", // Subject line
    text: "打卡成功", // 文本内容
    html: "", // html 内容, 如果设置了html内容, 将忽略text内容
    ...sendInfo
  });
}

module.exports = {
  pushEmailMessage
}