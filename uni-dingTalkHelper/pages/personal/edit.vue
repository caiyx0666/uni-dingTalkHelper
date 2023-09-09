<template>
	<view class="form-wrapper">
		<uni-forms ref="baseForm" :model="baseFormData" :label-width="80" :rules="rules">
			<uni-forms-item label="选择头像" name="avatar">
				<image class="avatar" :src="fileObj.url" mode="aspectFill" @tap="selectAvatar"></image>
			</uni-forms-item>
			<uni-forms-item label="名称" name="name">
				<uni-easyinput v-model="baseFormData.name" placeholder="请输入名称" />
			</uni-forms-item>
			<uni-forms-item label="简介" name="desc">
				<uni-easyinput type="textarea" v-model="baseFormData.desc" placeholder="介绍一下自己吧" />
			</uni-forms-item>
			<uni-forms-item label="设备绑定校验码" name="verifyCode" required>
				<uni-easyinput v-model="baseFormData.verifyCode" placeholder="请输入设备绑定校验码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit" :loading="submitLoading">提交</button>
	</view>
</template>

<script>
import CONFIG from '@/common/config.js'
import uniPlugin from '@/common/utils/uni-plugin.js'
import { deviceUpdate } from '@/serve/api/device.js'
import { deviceGetInfoByCode } from '@/serve/ext/device.js'
import validate from '@/common/utils/validate.js'
import constant from '@/constant/modules/system.js'
import { getHeadImage } from '@/common/utils/common.js'
export default {
	data () {
		return {
			fileObj: {
				url: '',
				extname: '',
				name: ''
			},
			avatarTempFiles: [],
			baseFormData: {
				name: '',
				avatar: '',
				desc: '',
				verifyCode: ''
			},
			rules: {
				verifyCode: {
					rules: [{
						required: true,
						errorMessage: '设备绑定校验码不能为空'
					}]
				}
			},
			submitLoading: false
		}
	},
	computed: {
		deviceInfo() {
			const deviceInfo = uni.getStorageSync('deviceInfo') || {}
			return {
				...deviceInfo,
				avatar: deviceInfo.avatar || ''
			}
		}
	},
	onLoad() {
		const { avatar } = this.deviceInfo || {}
		this.fileObj.url = getHeadImage(avatar)
		this.fileObj.extname = avatar.substring(avatar.lastIndexOf('.') + 1)
		this.fileObj.name = avatar.substring(avatar.lastIndexOf('/') + 1)
		this.baseFormData = {
			...this.baseFormData,
			...this.deviceInfo
		}
	},
	methods: {
		async submit() {
			if (!validate.isNull(this.avatarTempFiles)) {
				await this.uploadAvatar()
			}
			this.$refs.baseForm.validate([], async () => {
				const { id, name, avatar, desc, verifyCode } = this.baseFormData
				this.submitLoading = true
				const res = await deviceUpdate({ id, name, avatar, desc, verifyCode }).catch(() => {
					this.submitLoading = false
				})
				this.submitLoading = false
				uniPlugin.successToast(res.msg)
				deviceGetInfoByCode()
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, constant.delayedOperationTime)
			})
		},
		selectAvatar() {
			uniPlugin.chooseImage({
				success: (res) => {
					this.avatarTempFiles = res
					this.fileObj.url = res.tempFilePaths[0]
				}
				
			})
		},
		uploadAvatar (){
			return new Promise((resolve, reject) => {
				uni.uploadFile({
				  url: CONFIG.baseRequestUrl + '/api/upload',
				  fileType: 'image',
				  filePath: this.avatarTempFiles.tempFilePaths[0],
				  name: 'file',
				  header: {},
				  formData: {
					  groupId: 'avatar'
				  },
				  success: (uploadFileRes) => {
					const res = uploadFileRes.data ? JSON.parse(uploadFileRes.data) : {}
					if (res.code === 0) {
						this.baseFormData.avatar = res.data[0].path
						resolve()
					} else {
						uniPlugin.toast(res.msg)
					}
				  },
				  fail() {
					uniPlugin.toast('头像上传失败')
					resolve()
				  }
				})		
			})
		}
	}
}
</script>

<style scoped lang="scss">
	.form-wrapper {
		padding: 0 32rpx;
	}
	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 1rpx solid #ccc;
	}
</style>