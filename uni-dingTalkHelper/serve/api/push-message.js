import uniPlugin from '@/common/utils/uni-plugin.js'
import CONFIG from '@/common/config.js'
import request from '@/common/utils/request.js'

export function pushMessageEmail(data) {
	return new Promise((resolve, reject) => {
		if(!uni.getStorageSync('switchEmailChecked')) {
			uniPlugin.toast('邮箱提醒功能已关闭，可前往首页重新开启')
			resolve()
			return
		}
		uni.request({
			method: 'GET',
		    url: CONFIG.baseRequestUrl + '/push-message/email', // 更换为本地ip
		    data,
		    success: ({data}) => {
				if(data && data.code === 0) {
					uniPlugin.toast(data ? data.msg : '邮箱发送成功！')
					resolve(data)
				} else {
					uniPlugin.toast(data ? data.msg : '发送邮箱失败！')
					reject(data)
				}
		    },
			fail: (err) => {
				uniPlugin.toast('邮箱发送失败！err：' + JSON.stringify(err))
		        console.log(err);
				reject(err)
			}
		});
	})
}