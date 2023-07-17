# uni-dingTalkHelper
> [原项目地址](https://github.com/SmileZXLee/uni-dingTalkHelper)，这里只是在原来项目的基础上添加发送邮箱提醒功能，后端代码使用node.js书写，后端项目代码位于`serve`目录下

钉钉打卡助手uni-app版，支持iOS和安卓

## 【说明】此应用仅用于定时跳转钉钉，非定位修改软件，只有定时打开钉钉这一个功能，并且打开后要手动切回原App，否则只能定时跳转钉钉一次。仅限用于学习和测试uniapp开发的用途，禁止商用！

## 功能&特点
- [x] 支持自定义设置上班/下班打卡时间区间
- [x] 通过定时打开钉钉，并在钉钉中设置极速打卡以达到远程打卡的效果
- [x] 在指定范围内随机生成打卡时间
- [x] 自动打卡记录自动存储
- [x] 密码保护，隐私无忧

 ## 运行&安装
 ### ①下载HbuilderX：[https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html)，注意要选择App开发版。
 ### ②下载此项目代码，将与README.MD同级的`uni-dingTalkHelper`拖入HbuilderX中。
 ### ③打开项目，选中任一`.vue`结尾的文件，如`App.vue`，将手机连接至电脑，iPhone需要允许电脑访问，安卓需要开启USB调试。
 ### ④点击顶部：运行->运行到手机或模拟器->选择自己的手机。
 ### ⑤若提示预编译错误：代码使用了scss/sass语言，但未安装响应的编译器插件...，需要点击顶部工具->插件安装->安装新插件->前往插件市场安装->搜索sass并点击第一项->点击右侧【使用HbuilderX导入插件】(需要注册DCloud账号)。
 ### ⑥运行成功后，手机上会有一个Hbuilder的App，打开这个App即可。注意：iPhone首次打开时会提示“未受信任的企业级开发者XXX”，打开手机设置->通用->描述文件与设备管理->Digtal Heaven(Beijing) Internet & Te...，点击信任即可。（ps：iOS现已不支持，需要签名，必须有证书才可以）

 ### 点击此处直接安装安卓版：https://www.pgyer.com/dingTalkHelper

***
 # 若HbuilderX无法找到手机，请参阅文档：[https://ask.dcloud.net.cn/article/97](https://ask.dcloud.net.cn/article/97)
***

 ## 注意
* 此应用【钉钉定时打卡助手】仅限用于定时打开钉钉，非定位修改软件，需要把手机放在公司。
* 【首次跳转】部分设备第一次跳转至钉钉时需要点击“允许”才可以正常使用定时跳转功能。
* 手机系统时间必须修改为24小时制。
* 请设置“打卡起始时间”与“打卡结束时间”，【钉钉定时打卡助手】将在此时间段内生成随机的时间：“下次打卡时间”，并在“下次打卡时间”到来的时候跳转至钉钉。
* 请设置“星期”，默认为每天，“下次打卡时间”受“打卡起始时间”、“打卡结束时间”与“星期”三者共同制约，“下次打卡时间”的生成规则为在“打卡起始时间”与“打卡结束时间”之间，且在“星期”之间。
* 设定的打开钉钉的时间必须在极速打卡的有效时间范围之内(钉钉默认的极速打卡时间为上班时间-上班时间后1小时，下班时间-下班时间后1小时，若您设置的打卡钉钉时间不在此范围内，请先在钉钉-考勤打卡-设置-快捷打卡方式中更改)。
* 【钉钉定时打卡助手】会自动保持屏幕常亮，您无需更改系统设置，若要正常跳转至钉钉，请务必保持【钉钉定时打卡助手】始终在前台且电量充足，切勿锁屏。
* 开发者不对使用此应用造成的任何后果负责，也无法保证应用一定不会出现跳转不了的情况，同样也无法保证应用无BUG，因此请您不要依赖此应用，仅可用于测试目的，若有任何意见和反馈可以在issue中反馈，我会尽快为您解决。
* 此应用是免费的，请勿用于任何商业用途，请勿用于马甲包等任何非法用途，请勿上架，转载请注明出处，感谢理解。



## 预览
<img src="http://www.zxlee.cn/OpenDingTalkHelperForiOSDemo1.gif"/>

 