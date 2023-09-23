auto();

//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

//setScreenMetrics(1080, 1920);
(function timerFn() {
  timerTaskFn()
  // 到达指定时间范围 唤醒手机
  if (isRun()) {
    runMainFn()
  } else {
	setTimeout(() => {
	  timerFn()
	}, 10000)
  }
})()

// events.on("exit", () => {
//   log("结束运行");
//   log(app.vue.screenStatus)
//   log(app.vue.ws.websocket.close())
// });

/** 脚本定时检查方法 */
function timerTaskFn() {
  // 是否进行截图
  if(app.vue.isScreenCapture && app.vue.isScreenCapture === true) {
	var img = captureScreen();
	var base64Data = images.toBase64(img, 'png', 1)
	app.vue.uploadBase64(base64Data)
  }
  
  if(app.vue.isOpenDingtalkApp && app.vue.isOpenDingtalkApp === true) {
  	rouseDingTalkApp()
  }
  
  if(app.vue.isOpenCurApp && app.vue.isOpenCurApp === true) {
  	rouseApp()
  }
}

// 脚本主要方法
function runMainFn() {
  //觉得碍眼，就注释掉这几行。（悬浮半透明日志窗口） 
  console.useNew();
  console.show(); //日志输出到屏幕
  sleep(10 * 1000);
  if (device.isScreenOn()) {
      log("屏幕开着");
  } else {
      log("屏幕关着");
      device.wakeUpIfNeeded(); // 唤醒设备
      device.keepScreenOn(5 * 60 * 1000);
      // device.wakeUp();
  }
  sleep(3000);
  // swipe(1, 1, 10, 10, 100);
  // slidingByLine();
  swipe(500, 1000, 500, 500, 500);


  log(isDeviceLocked())
  if (isDeviceLocked()) {
    unlockScreen()
  }

  log("执行结束");
}

// 是否到指定执行时间（每周一到周五 早上8点40到9点）
function isRun() {
  var date = new Date()
  var day = date.getDay() // 星期
  var house = date.getHours() // 小时
  var min = date.getMinutes() // 分钟
  log('现在是星期' + day + ' ' + house + '小时' + min + '分钟')
  if ((day === 1 || day === 2 || day === 3 || day === 4 || day === 5) && house === 17 && min >= 19) {
    return true
  } else {
    return false
  }
}

// 解锁屏幕
function unlockScreen() {
	// gesture(
	//     320, // 滑动时间：毫秒
	//     [
	//         device.width  * 0.5,    // 滑动起点 x 坐标：屏幕宽度的一半
	//         device.height * 0.9     // 滑动起点 y 坐标：距离屏幕底部 10% 的位置, 华为系统需要往上一些
	//     ],
	//     [
	//         device.width / 2,       // 滑动终点 x 坐标：屏幕宽度的一半
	//         device.height * 0.1     // 滑动终点 y 坐标：距离屏幕顶部 10% 的位置
	//     ]
	// )
	// swipe(device.width / 2, device.height - 500, device.width / 2, 0, random(16, 18) * 50);
	sleep(2000); // 防止充电动画阻挡解锁
	swipe(500, 1700, 500, 300, 300); //上滑进入输密码页面
	sleep(1000) // 等待解锁动画完成
	home()
	sleep(1000) // 等待返回动画完成
	
	if (isDeviceLocked()) {
		app.vue.pushMessageEmail({
			subject: '钉钉打卡助手-上滑解锁',
			text: "上滑解锁失败", // 文本内容
			html: "", // html 内容, 如果设置了html内容, 将忽略text内容
			to: app.vue.formData.email
		})
    log("上滑解锁失败")
		unlockScreen()
	} else {
		app.vue.pushMessageEmail({
			subject: '钉钉打卡助手-上滑解锁',
			text: "上滑解锁成功", // 文本内容
			html: "", // html 内容, 如果设置了html内容, 将忽略text内容
			to: app.vue.formData.email
		})
		rouseApp()
	}
}

// 打开钉钉
function rouseDingTalkApp() {
  var startFlag = launchApp("钉钉");
  if (!startFlag) {
    setTimeout(() => {
      rouseApp()
    }, 1000)
  }
}

// 打开钉钉打卡助手
function rouseApp() {
  var startFlag = launchApp("钉钉打卡助手");
  if (!startFlag) {
    setTimeout(() => {
      rouseApp()
    }, 1000)
  }
}

function isDeviceLocked() {
    importClass(android.app.KeyguardManager)
    importClass(android.content.Context)
    var km = context.getSystemService(Context.KEYGUARD_SERVICE)
    return km.isKeyguardLocked()
}


/**
 * 从下往上滑动，直线滑动
 */
function slidingByLine() {
    // top X,Y范围
    tx = randomPointLoc(500, 600);
    ty = randomPointLoc(300, 400);
    // bottom X，Y 范围
    bx = randomPointLoc(400, 700);
    by = randomPointLoc(1880, 2000);

    log("X: " + Math.abs(bx - tx) + " Y: " + Math.abs(by - ty));
    slidingTime = randomRangeTime(0.8, 1.3);
    log("sliding (" + bx + "," + by + "), (" + tx + "," + ty + ")" + "slidingTime=", slidingTime)
    swipe(bx, by, tx, ty, slidingTime);

}
/**
 * 随机位置点
 * @param {起始值} start 
 * @param {结束值} end
 * @returns 
 */
function randomPointLoc(start, end) {
    len = end - start;
    loc = Math.floor(Math.random() * len) + start;
    return loc;
}

/**
 * 从几秒到几秒
 * @param {开始秒} start 
 * @param {结束秒} end 
 * @returns
 */
function randomRangeTime(start, end) {
    len = (end - start) * 1000;
    ms = Math.floor(Math.random() * len) + start * 1000;
    return ms;
}

/**
 * 秒转毫秒 
 * @param {秒} sec 
 * @returns 
 */
function secToMs(sec) {
    return sec * 1000;
}

/**
 * 仿真随机带曲线滑动 
 * @param {起点x} qx 
 * @param {起点y} qy 
 * @param {终点x} zx 
 * @param {终点y} zy 
 * @param {滑动时间，单位毫秒} time 
 */
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    // log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    // log(xxy);
    gesture.apply(null, xxy);
}

function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};



