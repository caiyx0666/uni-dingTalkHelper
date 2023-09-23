import utils from '@/utils/index.js'
import config from '@/config/index.js'
export default function JumpDingTalkApp (ws, vue) {
  this.match = (dataJson) => {
    // const { LOGIN_CMD } = this.cmdList
    return dataJson.cmd === 103
  }

  this.processMessage = (dataJson) => {
    vue.isOpenDingtalkApp = true
  }
}
