import chatCmd from './constant.js'
import validate from '@/common/utils/validate.js'
import receiveMessageList from './receive/index'

const { LOGIN_CMD, PING_CMD } = chatCmd
const ws_ctx = 'ws://192.168.3.18:3001'
// const ws_ctx = 'ws://192.168.31.127:3001'

export default class VueWebSocket {
  handlerList = []

  constructor() {
	if (new.target !== VueWebSocket) {
	  return
	}
	if (!VueWebSocket._instance) {
	  this.webSocket = null
	  this.webSocketReconnectCount = 0
	  this.webSocketIsReconnect = true // 是否重连
	  this.webSocketWarningText = "连接断开,正在尝试重连"
	  this.webSocketIsOpen = false
	  // 心跳定时器
	  this.webSocketPingTimer = null
	  this.webSocketPingTime = 10000 // 心跳的间隔，当前为 10秒,
	  // 尝试重新连接的最大次数
	  this.webSocketReconnectMaxCount = 5
	  VueWebSocket._instance = this
	}
	return VueWebSocket._instance
    
  }

  /**
   * ws初始化
   */
  webSocketInit() {
	const deviceInfo = uni.getStorageSync('deviceInfo') || {}
    // #ifdef H5
    if (typeof (WebSocket) === 'undefined') {
      console.log("您的浏览器不支持WebSocket，无法获取数据");
      return false
    }
    // #endif

    // #ifndef H5
    if (typeof (uni.connectSocket) === 'undefined') {
      // 您的浏览器不支持WebSocket，无法获取数据
      return false
    }
    // #endif

    // 修改是否重连为 true
    this.webSocketIsReconnect = true;
    this.webSocketWarningText = "连接断开,正在尝试重连";
    console.log("ws_ctx:", ws_ctx)
    try {
      this.initHandlerList()
      // #ifdef H5
      this.webSocket = new WebSocket(ws_ctx + `?id=${deviceInfo.id}`);
      this.webSocket.onopen = this.webSocketHandleOpen.bind(this);
      this.webSocket.onerror = this.webSocketHandleError.bind(this);
      this.webSocket.onmessage = this.webSocketHandleMessage.bind(this);
      this.webSocket.onclose = this.webSocketHandleClose.bind(this);
      // #endif

      // #ifndef H5
      this.webSocket = uni.connectSocket({
        url: ws_ctx + `?id=${deviceInfo.id}`,
        success: (data) => {
          console.log("websocket连接成功", data);
          console.log('this.webSocket-------------', this.webSocket)
          // this.webSocket.onSocketOpen = this.webSocketHandleOpen.bind(this);
          // this.webSocket.onSocketError = this.webSocketHandleError.bind(this);
          // this.webSocket.sendSocketMessage = this.webSocketHandleMessage.bind(this);
          // this.webSocket.onSocketClose = this.webSocketHandleClose.bind(this);
        },
        header: {
          'content-type': 'application/json'
        },
        fail: (err) => {
          console.log('websocket连接错误', err)
        },
        multiple: true
      })

      this.webSocket.onOpen((data) => {
        this.webSocketHandleOpen(data)
      })
      this.webSocket.onError((data) => {
        this.webSocketHandleError(data)
      })
      this.webSocket.onMessage((data) => {
        this.webSocketHandleMessage(data)
      })
      this.webSocket.onClose((data) => {
        this.webSocketHandleClose(data)
      })
      // #endif
    } catch (e) {
      console.log('初始化失败-----------------', e)
      // 每过 5 秒尝试一次，检查是否连接成功，直到超过最大重连次数
      let timer = setTimeout(() => {
        this.webSocketReconnect();
        clearTimeout(timer);
      }, 5000);
    }

  }

  // WebSocket 重连
  webSocketReconnect() {
    if (this.webSocketIsOpen) {
      return false;
    }
    this.webSocketReconnectCount += 1;
    // 判断是否到了最大重连次数
    if (
      this.webSocketReconnectCount >= this.webSocketReconnectMaxCount
    ) {
      this.webSocketWarningText = "重连次数超限,请检查终端网络";
      return false;
    }
    // 初始化
    this.webSocketInit();
  }

  //设置发送时时间戳
  setTime(dto) {
    if (validate.judgeTypeOf(dto) === 'Object') {
      dto['time'] = new Date().getTime()
    }
  }

  // WebSocket 打开成功后
  webSocketHandleOpen() {
    console.log("连接打开", this);
    this.webSocketIsOpen = true;
    this.webSocketWarningText = ''
    // 清空重连的次数
    this.webSocketReconnectCount = 0;
    this.webSocketLogin()
    // 开启定时心跳
    this.webSocketPing();
  }

  webSocketLogin() {
	const deviceInfo = uni.getStorageSync('deviceInfo') || {}
    // 发送登录信息
    const payload = {
      cmd: LOGIN_CMD,
      data: {
		onLineStatus: 1,
		id: deviceInfo.id,
		code: deviceInfo.code
      }
    };
    this.webSocketSend(LOGIN_CMD, payload);
  }

  // WebSocket 关闭
  webSocketHandleClose() {
    console.log("连接断开");
    // 关闭心跳
    this.webSocketClose();
  }

  // WebSocket 发生错误时
  webSocketHandleError(err) {
    console.log("连接报错：", err);
    // 关闭心跳
    this.webSocketClose();
  }

  // 定时心跳
  webSocketPing() {
    this.webSocketPingTimer = setTimeout(() => {
      if (!this.webSocketIsOpen) {
        return false;
      }
      console.log("心跳");
      const payload = {
        cmd: PING_CMD
      };
      this.webSocketSend(PING_CMD, payload);
      clearTimeout(this.webSocketPingTimer);
      // 重新执行
      this.webSocketPing();
    }, this.webSocketPingTime);
  }

  // 断开连接时
  webSocketClose() {
    // 修改状态为未连接
    this.webSocketIsOpen = false;
    this.webSocket = null;
    // 判断是否重连
    if (
      this.webSocketIsReconnect &&
      this.webSocketReconnectCount === 0
    ) {
      // 第一次直接尝试重连
      // this.webSocketReconnect();
    }
  }

  initHandlerList() {
    this.handlerList = []
    receiveMessageList.forEach(item => {
      this.handlerList.push(new item(this))
    })
  }

  // 接收到消息时
  webSocketHandleMessage(event) {
    console.log('接收消息-------------------------', event)
    // 响应体的message
    let data = event.data;
    // 支付宝小程序多一层
    // #ifdef MP-ALIPAY
    data = data.data
    // #endif
    let dataJson = JSON.parse(data)
    for (let i = 0; i < this.handlerList.length; i++) {
      if (this.handlerList[i].match(dataJson)) {
        this.handlerList[i].processMessage(dataJson);
      }
    }
  }

  // 发送文本消息
  webSocketMessageText(dto) {
    this.dtoMsgTemplate(dto)
    return dto
  }

  // 交互DTO模板
  dtoMsgTemplate(dto) {
    // dto.time = dto.data.createTime
  }

  webSocketOut() {
    this.webSocketWarningText = "异地登录请重新登录";
    // 修改重连状态
    this.webSocketIsReconnect = false;
    this.webSocketPingTimer = null
    if (this.webSocket) {
      console.log("关闭websocket");
      // 关闭 websocket
      this.webSocket.close();
    }
  }

  // 发送ws消息
  webSocketSend(cmd, payload) {
    let message = payload
    switch (cmd) {
      // 登录
      case LOGIN_CMD:
        break
      // 心跳
      case PING_CMD:
        break
      default:
    }
    this.setTime(message)
    console.log("send dto:", message)

    // #ifdef H5
    this.webSocket.send(JSON.stringify(message));
    // #endif

    // #ifndef H5
	console.log('message--------', message)
    this.webSocket.send({
      data: JSON.stringify(message),
	  success() {
		  console.log('消息发送成功')
	  },
	  fail(err) {
		  console.log('消息发送失败', err)
	  }
    })
    // #endif

  }
}
