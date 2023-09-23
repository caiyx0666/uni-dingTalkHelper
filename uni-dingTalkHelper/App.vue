<script>
import { deviceGetInfoByCode } from '@/serve/ext/device.js'
import { pushMessageEmail } from '@/serve/api/push-message.js'
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			await deviceGetInfoByCode()
		},
		onShow: function() {
			console.log('App Show')
			uni.$emit('appshow');
		},
		onHide: function() {
			console.log('App Hide')
			// ws.webSocket.close()
			pushMessageEmail({
				subject: '钉钉打卡助手-应用隐藏',
				text: "应用隐藏了~", // 文本内容
				html: "", // html 内容, 如果设置了html内容, 将忽略text内容
				to: uni.getStorageSync('email') || 'caiyx0666@163.com'
			})
			uni.$emit('apphide');
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.confirm-btn{
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
		margin-top: 40rpx;
	}
</style>
