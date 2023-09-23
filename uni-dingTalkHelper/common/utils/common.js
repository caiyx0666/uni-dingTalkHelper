import { uploadFile } from '@/serve/api/common.js'
import config from '@/common/config.js'
//获取客户端ID
export function getClientId() {
	const sysPlatform = uni.getSystemInfoSync().platform
	return new Promise((resolve, reject) => {
		//获取客户端ID和版本号
		let clientid = '';
		switch (sysPlatform) {
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

// 截屏（当前app）
export function capture() {
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	console.log("当前页" + pages.length - 1);
	var bitmap = null;
	var currentWebview = page.$getAppWebview();
	bitmap = new plus.nativeObj.Bitmap('amway_img');
	// 将webview内容绘制到Bitmap对象中  
	currentWebview.draw(bitmap, function() {
		console.log('截屏绘制图片成功');
		bitmap.save("_doc/a.jpg", {}, function(i) {
			console.log('保存图片成功：' + JSON.stringify(i));
			uploadFile(i.target)
			// uni.saveImageToPhotosAlbum({
			// 	filePath: i.target,
			// 	success: function() {
			// 		bitmap.clear(); //销毁Bitmap图片  
			// 		uni.showToast({
			// 			title: '保存图片成功',
			// 			mask: false,
			// 			duration: 1500
			// 		});
			// 	}
			// });
		}, function(e) {
			console.log('保存图片失败：' + JSON.stringify(e));
		});
	}, function(e) {
		console.log('截屏绘制图片失败：' + JSON.stringify(e));
	});
	//currentWebview.append(amway_bit);    
}

// 获取固定长度的随机字符
export function getRandomCode(length) {
    length || (length = 8); //指定长度： 默认长度8位
    const numbers  = '0123456789';                  //指定数字范围，
    const letters  = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';  //指定字母范围，（也可以指定字符或者小写字母）
    let total = '';
        total += numbers + letters;            //将数字和字母合并成一个字符串
    let result = '';

    //从合并的字符串里随机取出一个值
    while (length > 0) { //循环次数是指定长度
        length--;
        result += total[Math.floor(Math.random() * total.length)];
    }
    return result;
}

/**
 * 拼接头像参数，获取头像地址
 * @param img
 * @returns {*}
 */
export function getHeadImage(imgUrl) {
    if (imgUrl && imgUrl.indexOf('http') === -1) {
        imgUrl = config.file_ctx + imgUrl
    }
    return imgUrl
}

/**
 * 获取默认头像
 */
export function getDefaultHeadImage(obj) {
    return config.file_ctx + 'avatar/24c59a5f25ac3b3fe6de02873470a5c1.png'
}

/**
 * 遍历对象绑定到指定函数原型链上
 * @param {*} fn 指定函数
 * @param {*} obj 需要遍历的对象
 */
export function extend (fn, obj) {
  if (!(fn instanceof Function)) {
    throw('fn must be a Function')
  }
  Object.keys(obj).forEach(key => {
    fn.prototype[key] = obj[key]
  })
}