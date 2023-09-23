import { extend } from '@/common/utils/common'
import defaultMessage from './modules/defaultMessage'
import ScreenCapture from './modules/ScreenCapture'
import OpenDingTalkApp from './modules/OpenDingTalkApp'
import OpenCurApp from './modules/OpenCurApp'
const fnList = [
	ScreenCapture,
	OpenDingTalkApp,
	OpenCurApp
]

fnList.forEach(fn => {
	extend(fn, defaultMessage)
})

export default fnList