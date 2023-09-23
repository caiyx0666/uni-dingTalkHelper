import utils from '@/utils/index.js'
export default function openCurApp (ws, vue) {
  this.match = (dataJson) => {
    // const { LOGIN_CMD } = this.cmdList
    return dataJson.cmd === 104
  }

  this.processMessage = (dataJson) => {
    vue.isOpenCurApp = true
  }
}
