import uniPlugin from '@/common/util/uni-plugin.js'

export function pushMessageEmail(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'GET',
		    url: 'http://192.168.3.18:3000/push-message/email', // 更换为本地ip
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