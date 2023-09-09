<template>
	<view class="page">
		<view class="user">
			<view class="user-main" @tap="editInfo">
				<image :src="deviceInfo.avatar" mode="aspectFill" class="avatar"></image>
				<text class="user-name">{{ deviceInfo.name }}</text>
				<uni-icons type="right" size="24" color="#fff"></uni-icons>				
			</view>
			<text class="user-desc">{{ deviceInfo.desc || '暂无简介~' }}</text>
		</view>
		<uni-list class="list">
			<uni-list-item title="绑定该设备" showArrow clickable @click="bindDevice" />
		</uni-list>
		<bind-device ref="bindDevice" />
	</view>
</template>

<script>
import validate from '@/common/utils/validate.js'
import { getHeadImage } from '@/common/utils/common.js'
import bindDevice from './components/bind-device.vue'
export default {
	components: {
		bindDevice
	},
	computed: {
		deviceInfo() {
			let deviceInfo = uni.getStorageSync('deviceInfo') || {}
			return {
				...deviceInfo,
				avatar: getHeadImage(deviceInfo.avatar)
			}
		}
	},
	methods: {
		editInfo() {
			uni.navigateTo({
				url: '/pages/personal/edit'
			})
		},
		bindDevice() {
			this.$refs.bindDevice.open()
		}
	}
}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}
	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #53a8ff;
	}
	.user {
		padding: 0 32rpx;
		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.user-main {
			display: flex;
			align-items: center;
			height: 100rpx;
			padding: 24rpx 0;
		}
		.user-name {
			flex: 1;
			padding-left: 24rpx;
			color: #fff;
			font-size: 32rpx;
		}
	}
	.user-desc {
		display: inline-block;
		color: $uni-text-color;
		font-size: 28rpx;
		color: #fff;
	}
	.list {
		flex: 1;
		margin-top: 32rpx;
		padding: 0 24rpx;
		background-color: #fff;
		border: none;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}
</style>