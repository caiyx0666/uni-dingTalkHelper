<script>
import { deviceGetInfoByCode } from '@/serve/ext/device.js'
import VueWebSocket from '@/websocket/index.js'
	export default {
		onLaunch: async function() {
			await deviceGetInfoByCode()
			const ws = new VueWebSocket()
			ws.webSocketInit()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.$emit('appshow');
		},
		onHide: function() {
			console.log('App Hide')
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
