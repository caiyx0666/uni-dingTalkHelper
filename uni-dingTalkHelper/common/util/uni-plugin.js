/**
 * uni框架工具类
 */
let needLoadingRequestCount = 0 // 用于处理loading当前有多少条打开的计算
let loadingTimer // 用于处理loading打开后10秒自动关闭的定时器
export default {
  /**
   * 获取网络类型
   * @param success
   * @param fail
   * wifi 网络
   2g	2g 网络
   3g	3g 网络
   4g	4g 网络
   ethernet	有线网络	App
   unknown	Android 下不常见的网络类型
   none	无网络
   */
  getNetworkType(success, fail) {
    uni.getNetworkType({
      success: function(res) {
        success(res.networkType)
      }
    })
  },
  /**
   * 显示消息提示框
   * @param msg
   * @param time
   */
  toast(msg, mask, time) {
    time = time || 5000
    // 支付宝小程序端的时间延迟设置不了，这里单独处理
    // #ifdef MP-ALIPAY
    my.showToast({
      type: 'none',
      duration: time,
      content: msg,
    })
    // #endif
    
    // #ifndef MP-ALIPAY
    uni.showToast({
      icon: 'none',
      title: msg,
      duration: time,
      mask: mask || false // 是否显示透明蒙层，防止触摸穿透，默认：false
    })
    // #endif
    
  },
  /**
   * 成功提醒提示框
   * @param msg
   * @param time
   */
  successToast(msg, mask, time) {
    time = time || 2000
    uni.showToast({
      icon: 'success',
      title: msg,
      duration: time,
      mask: mask || false // 是否显示透明蒙层，防止触摸穿透，默认：false
    })
  },
  /**
   * 失败提醒提示框
   * @param msg
   * @param time
   */
  errorToast(msg, mask, time) {
    time = time || 2000
    uni.showToast({
      icon: 'error',
      title: msg,
      duration: time,
      mask: mask || false // 是否显示透明蒙层，防止触摸穿透，默认：false
    })
  },
  /**
   * hideToast
   * 隐藏消息提示框
   */
  hideToast() {
    uni.hideToast()
  },

  /**
   * loading
   * @param {String} title
   * @param {Boolean} mask
   */
  loading(title, mask) {
    if (needLoadingRequestCount === 0) {
      uni.showLoading({
        title: title || '加载中...',
        mask: mask || false // 是否显示透明蒙层，防止触摸穿透，默认：false
      })

      // 最长5s自动关闭
      loadingTimer = setTimeout(() => {
        if (needLoadingRequestCount > 0) {
          uni.hideLoading()
        }
      }, 15000)
    }
    needLoadingRequestCount++
  },
  /**
   * hideLoading
   * 隐藏 loading 提示框
   */
  hideLoading() {
    if (needLoadingRequestCount <= 0) return;

    needLoadingRequestCount--

    if (needLoadingRequestCount === 0) {
      loadingTimer && clearTimeout(loadingTimer)
      uni.hideLoading()
    }
  },
  /**
   * 显示模态弹窗，类似于标准 html 的消息框：alert、confirm
   * @param {String} title
   * @param {String} content
   * @otherParam {objec} otherParam
   */
  modal(title, content, otherParam) {
    otherParam = otherParam || {
      showCancel: false, // 是否显示取消按钮，默认为 true
      cancelText: '取消', //  取消按钮的文字，默认为"取消"，最多 4 个字符
      cancelColor: '#000000', //  取消按钮的文字颜色，默认为"#000000"(H5、微信小程序、百度小程序)
      confirmText: '确定', //  确定按钮的文字，默认为"确定"，最多 4 个字符
      confirmColor: otherParam.confirmColor //  确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"（H5、微信小程序、百度小程序）
    }
    uni.showModal({
      title: title,
      content: content,
      showCancel: otherParam.showCancel,
      cancelText: otherParam.cancelText || '取消',
      cancelColor: otherParam.cancelColor || '#000000',
      confirmText: otherParam.confirmText,
      confirmColor: otherParam.confirmColor,
      success: function(res) {
        if (res.confirm) {
          otherParam.fn(true)
        } else if (res.cancel) {
          otherParam.fn(false)
        }
      }

    })
  },
  /**
   * actionSheet
   * 显示模态弹窗，类似于标准 html 的消息框：alert、confirm
   * @param {Array<String>} itemList  按钮的文字数组，数组长度最大为6个
   * @param {HexColor} itemColor 按钮的文字颜色，默认为"#000000"
   * @otherParam {Function} fn
   */
  actionSheet(itemList, itemColor, success = () => {}, fail = () => {}) {
    uni.showActionSheet({
      itemList: itemList,
      itemColor: itemColor || '#000000',
      success: function(res) {
        success(res)
      },
      fail: function(res) {
        fail(res)
      }
    })
  },
  /**
   * 获取当前的地理位置、速度。 在微信小程序中，当用户离开应用后，此接口无法调用，
   * 除非申请后台持续定位权限；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   *
   * latitude	纬度，浮点数，范围为-90~90，负数表示南纬
   longitude	经度，浮点数，范围为-180~180，负数表示西经
   speed	速度，浮点数，单位m/s
   accuracy	位置的精确度
   altitude	高度，单位 m
   verticalAccuracy	垂直精度，单位 m（Android 无法获取，返回 0）
   horizontalAccuracy	水平精度，单位 m
   */
  getLocation(success, fail) {
    uni.getLocation({
      type: 'gcj02',
      success: function(res) {
        success(res)
      },
      fail: function(err) {
        fail(err)
      }
    })
  },
  /**
   * 使用应用内置地图查看位置
   * @param longitude
   * @param latitude
   */
  openLocation(latitude, longitude, name, address, success, fail) {
    uni.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
      success() {
        // console.log('success')
      },
      fail() {
        // console.log('fail')
      }
    })
  },
  /**
   * 从本地相册选择图片或使用相机拍照
   * @param success
   * @param fail
   */
  chooseImage(count, sizeType, sourceType, success, fail) {
    sizeType = sizeType.length > 0 ? sizeType : ['original', 'compressed']
    sourceType = sourceType.length > 0 ? sourceType : ['camera', 'album']
    uni.chooseImage({
      sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 从相册选择
      count: count,
      success: (res) => {
        success(res)
      },
      fail: (err) => {
        fail(err)
      }
    })
  },
  /**
   * 获取用户的当前设置
   * @param success
   * @param fail
   */
  getSetting(success, fail) {
    uni.getSetting({
      withSubscriptions: true,
      success(res) {
        success(res)
      },
      fail(err) {
        fail(err)
      }
    })
  },
  /**
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   * @param success
   * @param fail
   */
  openSetting(success, fail) {
    uni.openSetting({
      success(res) {
        success(res)
      },
      fail(err) {
        fail(err)
      }
    })
  },
  /**
   * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。
   * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。如果用户之前拒绝了授权，此接口会直接进入失败回调，一般搭配uni.getSetting和uni.openSetting使用。
   * @scope 需要获取权限的 scope，详见 uniapp官网scope 列表
   * @param success
   * @param fail
   */
  authorize(scope, success, fail) {
    uni.authorize({
      scope: scope,
      success(res) {
        success(res)
      },
      fail(err) {
        fail(err)
      }
    })
  },
  /**
   * 动态设置当前页面的标题。
   * @param title
   */
  setNavigationBarTitle(title) {
    uni.setNavigationBarTitle({
      title: title
    })
  },
  /**
   * 设置页面导航条颜色。如果需要进入页面就设置颜色，请延迟执行，防止被框架内设置颜色逻辑覆盖。
   * @param frontColor
   * @param backgroundColor
   * @param animation
   */
  setNavigationBarColor(frontColor, backgroundColor) {
    uni.setNavigationBarColor({
      frontColor: frontColor,
      backgroundColor: backgroundColor,
      animation: {
        duration: 400,
        timingFunc: 'linear'
      }
    })
  },
  /**
   * 打开另一个小程序。
   */
  navigateToMiniProgram(item = { appId: '', path: '', envVersion: 'release', extraData: {} }, success = () => {}, fail = () => {}) {
    // envVersion要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版：默认）。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
    uni.navigateToMiniProgram({
      appId: item.appId,
      path: item.path,
      envVersion: item.envVersion,
      extraData: item.extraData,
      success(res) {
        success(res)
      },
      fail(res) {
        fail(res)
      }
    })
  },
  /**
   * 在当前页面显示导航条加载动画。
   */
  showNavigationBarLoading() {
    uni.showNavigationBarLoading()
  },
  /**
   * 在当前页面隐藏导航条加载动画
   */
  hideNavigationBarLoading() {
    uni.hideNavigationBarLoading()
  },
  /**
   * 设置是否打开调试开关。此开关对正式版也能生效。
   * @param isDebug boolean
   */
  setEnableDebug(isDebug) {
    uni.setEnableDebug({
      enableDebug: isDebug
    })
  },
  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果。
   * @param success
   */
  scanCode(callback) {
    uni.scanCode({
      success: function(res) {
        callback(res.result)
      }
    })
  },
  /**
   *  设置底部导航数字
   * @param index
   * @param text
   */
  setTabBarBadge(index, text) {
    uni.setTabBarBadge({
      index: index,
      text: text
    })
  },
  /**
   * 清楚底部导航数字
   * @param index
   */
  removeTabBarBadge(index) {
    uni.removeTabBarBadge({
      index: index
    })
  },
  /**
   * 小程序的原生菜单中显示分享按钮
   */
  showShareMenu(callback, fail) {
    uni.showShareMenu({
      success: function(res) {
        callback(res.result)
      }, fail: function(err) {
        fail(err)
      }
    })
  },
  login(callback, fail) {
    uni.login({
      provider: 'weixin',
      success: function(res) {
        callback(res)
      }, fail: function(err) {
        fail(err)
      }
    })
  },
  /**
   * 订阅消息
   * @param tmplIds
   * @param callback
   * @param fail
   */
  requestSubscribeMessage(tmplIds, callback) {
    uni.requestSubscribeMessage({
      tmplIds: tmplIds,
      success(res) {
        callback(res)
      }
    })
  }
}
