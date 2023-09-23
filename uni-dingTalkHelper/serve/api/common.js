import CONFIG from '@/common/config.js'
import request from '@/common/utils/request.js'
import uniPlugin from '@/common/utils/uni-plugin.js'

export function uploadFile(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
		  url: CONFIG.baseRequestUrl + '/api/upload',
		  fileType: 'image',
		  filePath,
		  name: 'file',
		  header: {},
		  formData: {
			  groupId: 1
		  },
		  success(uploadFileRes) {
			const res = uploadFileRes.data ? JSON.parse(uploadFileRes.data) : {}
			if (res.code === 0) {
				uniPlugin.toast('文件上传成功')
				console.log('file-res', res.data)
				resolve()
			} else {
				uniPlugin.toast(res.msg)
			}
		  },
		  fail() {
			uniPlugin.toast('文件上传失败')
			resolve()
		  }
		})		
	})
}


// 修改个人信息
export function uploadBase64(data) {
	return request.postJson(CONFIG.baseRequestUrl + '/api/upload/base64', data)
}