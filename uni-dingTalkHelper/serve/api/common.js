import CONFIG from '@/common/config.js'
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
			  groupId: 'capture'
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