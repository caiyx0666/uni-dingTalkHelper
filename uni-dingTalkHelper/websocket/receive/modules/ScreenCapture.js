import { uploadBase64 as uploadBase64Api } from '@/serve/api/common.js'

export default function JumpDingTalkApp (ws, vue) {
  this.ws = ws
  this.match = (dataJson) => {
    // const { LOGIN_CMD } = this.cmdList
    return dataJson.cmd === 102
  }

  this.processMessage = (dataJson) => {
    vue.isScreenCapture = true // 脚本会有定时器去检查 true进行截图
  }
  
  this.uploadBase64 = async (base64Data) => {
  	const res = await uploadBase64Api({ file: base64Data, groupId: 2 })
  	this.ws.webSocketSend({
  		cmd: 102,
  		data: res.data
  	})
  }
}
