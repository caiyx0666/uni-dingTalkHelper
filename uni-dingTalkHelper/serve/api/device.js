import CONFIG from '@/common/config.js'
import request from '@/common/utils/request.js'

// 根据设备code获取当前设备信息（不存在则创建）
export function deviceGetInfoByCode(data) {
	return request.get(CONFIG.baseRequestUrl + '/api/device/get/info/by/code', data)
}

// 修改个人信息
export function userUpdate(data) {
	return request.postJson(CONFIG.baseRequestUrl + '/api/user/update', data)
}