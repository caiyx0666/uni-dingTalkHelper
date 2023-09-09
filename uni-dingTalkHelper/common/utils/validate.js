/**
 * 验证工具类
 */
export default {
  /**
   * 合法uri
   * @param textval
   * @returns {boolean}
   */
  isURL(textval) {
    const urlregex = /^(http:\/\/|^https:\/\/|^\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return urlregex.test(textval)
  },
  /**
   * validate email
   * @param email
   * @returns {boolean}
   */
  isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },
  /**
   * 判断手机号码是否正确
   */
  isMobile(phone) {
    const obj = {
        flag: true,
        msg: ''
    }
    // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    if (!this.isNull(phone)) {
        if (phone.length === 11) {
            const isPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (!isPhone.test(phone)) {
                obj.msg = '手机号码格式不正确'
                obj.flag = false
            }
        } else {
            obj.msg = '手机号码长度不为11位'
            obj.flag = false
        }
    } else {
        obj.msg = '手机号码不能为空'
        obj.flag = false
    }
    return obj
  },
  /**
   * 判断是否为整数
   */
  isNum(num, type) {
    let regName = /[^\d.]/g
    if (type === 1) {
      if (!regName.test(num)) return false
    } else if (type === 2) {
      regName = /[^\d]/g
      if (!regName.test(num)) return false
    }
    return true
  },
  /**
   * 判断是否为小数
   */
  isDecimals(num, type) {
    let regName = /[^\d.]/g
    if (type === 1) {
      if (!regName.test(num)) return false
    } else if (type === 2) {
      regName = /[^\d.]/g
      if (!regName.test(num)) return false
    }
    return true
  },
  /**
   * 清除字符串前后空格
   * @param {String} str
   */
  trim(str) { // 去字符串首尾空格
    if (typeof (str) === 'string') {
      str = str.replace(/(^\s*)|(\s*)$/g, '')
    }
    return str
  },
  /**
   * 判断是否为空
   * 为空 true, 不为空 false
   */
  isNull(val) {
    val = this.trim(val)
    if (Object.prototype.toString.call(val) === '[object Array]') {
      if (val.length === 0) return true
    } else if (Object.prototype.toString.call(val) === '[object Object]') {
      if (JSON.stringify(val) === '{}') return true
    } else {
      if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '' || val === '[]' || val === '{}') return true
      return false
    }
    /**
     *  else if (typeof (val) === 'string' || typeof (val) === 'number') {
          return false
        }
     */
  },
  /**
   * 判断数据类型
   * @param {各种数据类型} o
   */
  judgeTypeOf(o) {
    var typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol']
    let name = ''
    for (const a of typeArr) {
      name = '[object ' + a + ']'
      if (Object.prototype.toString.call(o) === name) {
        return a
      }
    }
  }
}
