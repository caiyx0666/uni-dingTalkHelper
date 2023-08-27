import Request from '@/common/plugins/luch-request/request.js'
import uniPlugin from '@/common/utils/uni-plugin.js'
const http = new Request()
import validate from './validate'

/**
 * 在请求之前拦截
 */
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    'accept': 'application/json; charset=utf-8'
  }
  return config
})

/**
 * 在请求之后拦截
 */
http.interceptor.response((res) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
  if (res.statusCode === 200) {
    if (!getCodeMsg(res.data)) {
      return Promise.reject(res.data)
    }
  }
  return res.data
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
  getStatusMsg(parseInt(response.statusCode))
  return response
})

export default {

  /**
   * GET 资源请求
   * 特别用于查询操作
   * @param url
   * @param params
   * @returns {*}
   */
  get(url, params) {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    return this.createForm(url, 'GET', headers, params)
  },
  /**
   * DELETE 资源请求
   * 特用于删除操作
   * @param url
   * @param params
   * @returns {*}
   */
  delete(url, params) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.createForm(url, 'DELETE', headers, params)
  },
  /**
   * POST 资源请求
   * 特用于保存操作，支持DTO
   * @param url
   * @param params
   * @returns {*}
   */
  postJson(url, params) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    params = JSON.stringify(params)
    return this.createJson(url, 'POST', headers, params)
  },
  /**
   * POST 资源请求
   * 特用于保存操作，支持FORM参数提交
   * @param url
   * @param params
   * @returns {*}
   */
  postForm(url, params) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.createForm(url, 'POST', headers, params)
  },
  /**
   * PUT 资源请求
   * 特用于保存操作，支持DTO
   * @param url
   * @param params
   * @returns {*}
   */
  putJson(url, params) {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    return this.createJson(url, 'PUT', headers, params)
  },
  /**
   * PUT 资源请求
   * 特用于保存操作，支持FORM参数提交
   * @param url
   * @param params
   * @returns {*}
   */
  putForm(url, params) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.createForm(url, 'PUT', headers, params)
  },
  /**
   * 原生请求 支持FORM表单参数提交
   * @param url
   * @param method
   * @param headers
   * @param params
   * @returns {Promise<any>}
   */
  createForm(url, method, headers, params) {
    headers = headers || {}
    return this.uniRequest(url, method, headers, params)
  },
  /**
   * 原生请求 支持DTO 提交
   * @param url
   * @param method
   * @param headers
   * @param params
   * @returns {Promise<any>}
   */
  createJson(url, method, headers, params) {
    return this.uniRequestBody(url, method, headers, params)
  },
  uniRequestBody(url, method, headers, params) {
    return new Promise((resolve, reject) => {
      http.request({
        method: method,
        url: url,
        data: params,
        // params: params,
        dataType: 'json'
      }).then((res) => {
        if (res) {
          if (res.code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  uniRequest(url, method, headers, params) {
    return new Promise((resolve, reject) => {
      http.request({
        method: method,
        url: url,
        // data: params,
        params: params,
        dataType: 'json'
      }).then((res) => {
        if (res) {
          if (res.code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
/**
 * 获取业务code 转移提醒
 * @param code
 * @returns {boolean}
 */
function getCodeMsg(data) {
  if (data.code === 0) {
    if (data.msg === 'ok') {
      data.msg = '操作成功'
    }
    return true
  }
  if (data.code === 401) {
    loginExpiredOnce()
    return false
  }
  if (data.code === -1) {
    if (!validate.isNull(data.msg)) {
      uniPlugin.toast(data.msg)
      return false
    }
    uniPlugin.toast('系统异常！')
    return false
  } else {
    uniPlugin.toast(data.msg)
    return false
  }
}

/**
 *  登录过期主方法 多次调用只执行一次
 */
const loginExpiredOnce = once(() => {
  return loginExpired()
})

function once(fn) {
  let done = false
  return () => {
    if(!done) {
      done = true
      fn.apply(this, arguments).then(() => done = false).catch(() => done = false)
    }
  }
}

/**
 * 登录过期主方法
 * @param code
 */
function loginExpired(code){
  return new Promise((resolve, reject) => {
 //    uni.redirectTo({
	// 	url: '/pages/personal/index'
	// })
  })
}
/**
 * 获取响应状态 转义提醒
 * @param code
 * @returns {boolean}
 */
function getStatusMsg(code) {
  switch (code) {
    case 400:
      uniPlugin.toast('请求参数异常！')
      return false
    case 401:
      loginExpiredOnce()
      return false
    case 403:
      uniPlugin.toast('您没有操作权限！')
      return false
    case 500:
      uniPlugin.toast('网络开小差啦！')
      return false
    case 503:
      uniPlugin.toast('服务未启动，请稍后重试！')
      // uniPlugin.toast('503')
      return false
    case 404:
      uniPlugin.toast('请求地址找不到！')
      return false
    default:
      uniPlugin.toast('网络开小差啦！')
      return true
  }
}
