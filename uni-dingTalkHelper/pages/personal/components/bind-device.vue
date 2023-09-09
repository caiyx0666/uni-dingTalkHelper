<template>
	<!-- 普通弹窗 -->
	<uni-popup ref="popup" background-color="#fff" type="center">
		<view
			class="popup-content"
		>
			<view class="tip-box">
				<text class="text">
					使用客户端扫码绑定
				</text>
				<text class="text">
					tip：如无法扫码绑定可在客户端设备列表根据设备信息找到该设备再输入设备验证码进行绑定
				</text>
				<text class="text">当前设备验证码：{{ deviceInfo.verifyCode }}</text>
			</view>
			<uv-qrcode ref="qrcode" :value="qrcodeVal"></uv-qrcode>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		computed: {
			deviceInfo() {
				return uni.getStorageSync('deviceInfo') || {}
			},
			qrcodeVal() {
				const { id = '', code = '' } = this.deviceInfo
				return `mode=bind&id=${id}&code=${code}`
			}
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32rpx;
		width: 500rpx;
		box-sizing: border-box;
	}
	.tip-box {
		display: flex;
		flex-direction: column;
		padding-bottom: 24rpx;
		align-items: center;
	}
	.text {
		font-size: 14px;
	}
</style>