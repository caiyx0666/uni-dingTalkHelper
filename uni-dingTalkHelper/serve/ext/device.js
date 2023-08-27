import { getClientId } from '@/common/utils/common.js'
import { deviceGetInfoByCode as deviceGetInfoByCodeApi } from '../api/device.js'
import uniPlugin from '@/common/utils/uni-plugin.js'

export async function deviceGetInfoByCode() {
	const locationInfo = await uniPlugin.getLocation()
	console.log('locationInfo--------', locationInfo)
	const code = await getClientId()
	const res = await deviceGetInfoByCodeApi({ code })
	uni.setStorageSync('deviceInfo', res.data)
}