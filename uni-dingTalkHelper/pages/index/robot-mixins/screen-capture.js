import { uploadBase64 as uploadBase64Api } from '@/serve/api/common.js'
export default {
	data() {
		return {
			isScreenCapture: false
		}
	},
	methods: {
		async uploadBase64 (base64Data) {
		  	const res = await uploadBase64Api({ file: base64Data, groupId: 2 })
		  	this.ws.webSocketSend({
		  		cmd: 102,
		  		data: res.data
		  	})
			this.isScreenCapture = false
		  }
	}
}