//获取客户端ID
export function getClientId() {
	const sysPlatform = uni.getSystemInfoSync().platform
	return new Promise((resolve, reject) => {
		//获取客户端ID和版本号
		let clientid = '';
		switch(sysPlatform) {
			case 'android':
				// 安卓系统
				plus.device.getAAID({
					success: function(e) {
						clientid = e.aaid;
						resolve(clientid)
						uni.setStorageSync('clientid', clientid);
					},
					fail: function(e) {
						reject(e)
					}
				});
				break
			case 'ios':
				// 苹果系统
				plus.device.getInfo({
					success: function(e) {
						clientid = e.uuid;
						resolve(clientid)
						uni.setStorageSync('clientid', clientid);
					},
					fail: function(e) {
						reject(e)
					}
				});
				break
			default:
				// #ifdef APP-PLUS
				//老版本、安卓模拟器
				if (!clientid) {
					clientid = plus.device.uuid;
					resolve(clientid)
					uni.setStorageSync('clientid', clientid);
				}
			// #endif
		}
	})
}
