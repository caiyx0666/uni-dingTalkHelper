import { getClientId } from '@/common/utils/common.js'
import { deviceGetInfoByCode as deviceGetInfoByCodeApi } from '../api/device.js'
import uniPlugin from '@/common/utils/uni-plugin.js'
import { getRandomCode } from '@/common/utils/common.js'

export async function deviceGetInfoByCode() {
	const code = await getClientId()
	const verifyCode = getRandomCode(8)
	const res = await deviceGetInfoByCodeApi({ code, verifyCode })
	uni.setStorageSync('deviceInfo', res.data)
}