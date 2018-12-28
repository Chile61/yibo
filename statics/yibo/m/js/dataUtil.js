if (typeof dataUtil == "undefined") {
	dataUtil = {};
}
(function(FUNC, undefined) {
	FUNC.fkEval = function(data) {
		return eval(data);
	}
})(dataUtil);
window.iyongwebsite={};
require(["kenfor/kenforJsUtil"]);//优先加载较验js
if (window["context"] == undefined) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	window["context"] = location.origin+"/V6.0";
}
var domain = location.origin.replace(/(http||https):\/\//,"").replace("m.","");
var domain_1 = domain.split(".")[0];
var domain_2=domain.split(".")[1];
if(domain_1=="iyongwebsite-cs" || domain_2=="iyongweb-cs"){
	window.imgPath="//image.iyong-cs.kenfor.com/";
	window.cssPath="//css.iyong-cs.kenfor.com/";
	window.jsPath="//js.iyong-cs.kenfor.com/";
	window.platform="iyongcs";
	window.resourcesUrl="//iyongresources-cs.kenfor.com/";
	//window.viewPath="//iyongwebsite-cs.kenfor.com/"
}else if(domain_1=="iyongwebsite" || domain_2=="iyongweb"){
	window.imgPath="//image.iyong.kenfor.com/";
	window.cssPath="//css.iyong.kenfor.com/";
	window.jsPath="//js.iyong.kenfor.com/";
	window.platform="iyongfb";
	window.platformUrl="//iyongplatform.kenfor.com/";
	window.resourcesUrl="//iyongresources.kenfor.com/";
	//window.viewPath="//iyongwebsite.kenfor.com/";
}else{
	window.imgPath="//image.j-cc.cn/";
	window.cssPath="//css.j-cc.cn/";
	window.jsPath="//js.j-cc.cn/";
	window.platform="iyong";
	window.platformUrl="//pingtai.iyong.com/";
	window.resourcesUrl="//resources.iyong.com/";
	//window.viewPath="//website.iyong.com/";
}

window.viewPath="//"+domain+"/";
window.desDomain=domain;
if($("body").hasClass('edit')){
	window.WebModel="edit";
}else{
	window.WebModel="view";
}
if($("body").hasClass('edit')){
	window.WebModel="edit";
}else{
	window.WebModel="view";
}
$(document).ready(function(){
	if(WebModel=="view"){
		$("#web_design_main").css("min-height",$(window).height());
	}
})
dataUtil.BackToTop = function(){
	var $BackTop = $("#Web_back_top");
	var ScrollTop;
	if($("body").hasClass('edit')){
		var $thiz=$("#design");
		var $box=$("#design");
	}else{
		var $thiz=$("body,html");
		var $box=$(window);
	}
	$box.scroll(function() {
		ScrollTop = $box.scrollTop();
		if (ScrollTop > 0){
			$BackTop.show();
		}else{
			$BackTop.hide();
		}
	});
	//回到顶部
	$("#BackToTop_box").click(function(){
		$thiz.animate({scrollTop: 0},400);
	});
};
//返回上一页
dataUtil.backHistory = function(){
	var path=document.referrer;
	if(path){
		window.history.go(-1);
	}else{
		window.location="index.html";
	}
};
dataUtil.GetQueryString = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
dataUtil.currentLangId = function(){
	if(window.webLangId){
		rdata=window.webLangId;
	}else{
		if(WebModel=="edit"){
			$.ajax({
				type: "GET",
				url: "/w/lang/getCurrentLangId.do",
				data: "data",
				async: false,
				success: function (response) {
					window.langId=response;
					rdata=response;
				}
			});
		}else{
			var $dom=$("#web_langId");
			var rdata=$dom.data("langid");
		}
	}
	return rdata;
};
dataUtil.menuSwiper = function(sortNum){
	require(["weui/js/swiper.min","css!csspath/css/swiper.min.css"], function() {
		var swiper = new Swiper('#navbarList', {
			slidesPerView: 4,
			initialSlide:sortNum,
			//slidesPerView: 'auto',
			paginationClickable: true,
			spaceBetween: 5
		})
	});
};
dataUtil.setIEbrowser=function(){
	//IE低版本提示
	var IEhtml='<div id="browser_ie">';
	IEhtml+='<div class="brower_info">';
	IEhtml+='<div class="notice_info">';
	IEhtml+='<p>'+langUtil.setIEbrowser_Info+'<br>'+langUtil.setIEbrowser_InfoTwo+'</p>';
	IEhtml+='</div>';
	IEhtml+='<div class="browser_list">';
	IEhtml+='<span><a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html" target=_blank><img src="'+imgPath+'images/browser/chrome.png"><br>chrome</a></span>';
	IEhtml+='<span><a href="http://www.firefox.com.cn/" target=_blank><img src="'+imgPath+'images/browser/firefox.png"><br>firefox</a></span>';
	IEhtml+='<span><a href="https://www.apple.com/cn/safari/" target=_blank><img src="'+imgPath+'images/browser/safari.png"><br>safari</a></span>';
	IEhtml+='<span><a href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx" target=_blank><img src="'+imgPath+'images/browser/ie.png"><br>IE9及以上</a></span>';
	IEhtml+='</div></div></div>';
	$("body").prepend(IEhtml);
}
/**
 * 发送短信
 * @returns {Boolean}
 */
dataUtil.sendSmsCode=function(phone,bouttun,type,setRegcol){
	if(WebModel=="edit"){
		webUtil.showTip("当前为编辑状态，提交无效",2);
	}else{
		var $getValidateCode = $(bouttun);
		var $phone = $(phone);
		var sendsms=$getValidateCode.data("sendsms");
		if(!sendsms || sendsms==0){
			if(!dataUtil.getNum(phone)){return false};//判断短信发送次数次数
			var phoneNum = $phone.val().trim();
			var phoneCheckResult =  dataUtil.checkAccount(phone);
			if(phoneCheckResult){
				var smsResule=true;
				var urlType = '';
				type ? urlType = "/sendSms/bindPhone.do" : urlType = "/sendSms/register.do";
				$.ajax({
					url:urlType,
					type:"POST",
					dataType:"json",
					async:false,
					cache:false,
					data:{"phone":phoneNum},
					success:function(data){
						if(data.result=="SUCCESS"){
							webUtil.showTip(langUtil.MemberReg_SendIphoneInfo,1.5);
							dataUtil.recordNum(phone);//记录短信发送次数
							$phone.attr("readonly","readonly");//设置手机输入框不可用
							$getValidateCode.addClass('sendsms');
							var smsCodeTip=langUtil.MemberReg_SendIphoneInfoupdt;
							if(setRegcol == "setRegCol"){
								smsCodeTip = '秒后重新获取';
								$(bouttun).css({"color":"#d9d9d9"});
							}
							$getValidateCode.html('90'+smsCodeTip);
							$getValidateCode.data('sendsms',1);
							var i = 89;
							var intervalId = setInterval(function(){
								i>=10? $getValidateCode.html(i+smsCodeTip) : $getValidateCode.html("0"+i+smsCodeTip);
								i--;
								if(i < 0 ){
									$phone.removeAttr("readonly");//设置手机输入框可用
									if(setRegcol == "setRegCol"){
										$(bouttun).css({"color":"#000"});
										$getValidateCode.html("重新获取");
									}else{
										$getValidateCode.html(langUtil.getFreeCode);
									}
									$getValidateCode.removeClass('sendsms');
									$getValidateCode.data('sendsms',0);
									clearInterval(intervalId);
								}
							},1000);
						}else{
							if(data.errorMsg && data.errorMsg.tips=="2001"){
								webUtil.showTip("您的手机号已超过当天最大短信数量",1.5);
							}else{
								webUtil.showTip("短信发送失败,请联系管理员",1.5);
							}

							smsResule=false;
						}
					}
				});
				return smsResule
			}
		}
	}
}
/**
 * 此方法用于加测cookie是否禁止，若cookie被用户禁止，则提醒
 * @returns {Boolean}
 */
dataUtil.cookieEnabledCheck=function(){
	if(!dataUtil.checkCookieEnabled()){
		alert(langUtil.MemberReg_CookCheck);
		return false;
	}
	return true;
};
/**
 * 记录短信记录次数
 * @param obj 手机号输入框jQuery对象
 */
dataUtil.recordNum=function(phone,type){
	if(!type){
		type=""
	}
	var $obj=$(phone);
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var day = now.getDate()+1;
	var phoneNum=$obj.val().trim();
	var ContiningTime = new Date(year+"-"+month+"-"+day+" 00:00:00").getTime() - now.getTime();
	var  everyDayNum = dataUtil.getCookie(type+"everyDay");
	var everyPhoneNum = dataUtil.getCookie(type+"sms"+phoneNum);
	everyDayNum == null ? dataUtil.addCookie(type+"everyDay",1,(ContiningTime)/(3600*1000)):dataUtil.addCookie(type+"everyDay",parseInt(everyDayNum)+1,(ContiningTime)/(3600*1000));
	everyPhoneNum == null?dataUtil.addCookie(type+"sms"+phoneNum,1,(ContiningTime)/(3600*1000)):dataUtil.addCookie(type+"sms"+phoneNum,parseInt(everyPhoneNum)+1,(ContiningTime)/(3600*1000));
}
/**
 * 获取单个手机号的发送短信的次数和今天所发送的总次数
 * @param obj  手机验证码输入框的jQuery对象
 * @param num 手机号输入框i的jQuery对象
 */
dataUtil.getNum=function(phone,type){
	if(!type){
		type="";
	}
	var setNum=99;//当天短信最大次数
	var phoneNum=$(phone).val().trim();
	var result = true;
	var everyPhoneNum = dataUtil.getCookie(type+"sms"+phoneNum);
	var everyDayNum = dataUtil.getCookie(type+"everyDay");
	if(everyPhoneNum != null  && parseInt(everyPhoneNum) > setNum){
		webUtil.showTip(langUtil.MemberReg_getNum,1.5);
		result = false;
	}
	if(everyDayNum != null && parseInt(dataUtil.getCookie(type+"everyDay")) > setNum){
		webUtil.showTip(langUtil.MemberReg_getNum,1.5);
		result = false;
	}
	return result;
}
dataUtil.checkAccount=function(phone,type){//type类型1为手机(默认),2为普通帐号，3为邮箱
	var phoneNum=$(phone).val().trim();
	var flag=true;
	var checkUtil=require("kenfor/kenforJsUtil");
	var keyName=langUtil.Global_username;
	if(!type){
		var type=1;
	}
	if(type==1){
		keyName=langUtil.phoneNum;
	}
	if(!checkUtil.isEmpty(phoneNum)){
		webUtil.showTip(keyName+langUtil.noEmpty,1.5);
		return false;
	}
	if(type==1){
		if(!checkUtil.isPhone(phoneNum)){
			webUtil.showTip(keyName+ langUtil.MemberReg_keyNameInfo,1.5);
			return false;
		}
	}
	$.ajax({
		url:"/w/cst/checkCst.do",
		type:"POST",
		dataType:"json",
		cache:false,
		async:false,
		data:{"cstacc":phoneNum},
		success:function(data){
			if(data.result=="SUCCESS"){
				if(data.data){
					webUtil.showTip(langUtil.MemberReg_IphoneInfo+keyName+ langUtil.MemberReg_IphoneInfoAdd,2);
					flag=false;
				}

			}
		}
	});
	return flag;
}
//将用户名添加到Cookie
dataUtil.addCookie=function(name,value,expireTime){//expireTime的单位为分钟
	var cookieString = name+"="+escape(value);
	if(expireTime>0){ //判断是否设置过期时间
		var date=new Date();
		date.setTime(date.getTime()+expireTime*3600*1000); //设置Cookie有效时间
		cookieString=cookieString+"; expires="+date.toGMTString();
	}
	document.cookie=cookieString;
}
//获取Cookie
dataUtil.getCookie=function(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); //通过正则表达式获取cookie为name的字符组
	if(arr!=null){
		return unescape(arr[2]); //输入返回
	}
	return null;
}
//删除Cookie
dataUtil.deleteCookie=function(name){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	var value = dataUtil.getCookie(name);
	if(value != null){//判断值是否存在
		document.cookie = name+"=; expires="+date.toGMTString(); //Cookie值为空
	}
}

//检测Cookie是否被禁用
dataUtil.checkCookieEnabled=function(){
	var result = false;
	if(navigator.cookieEnabled){return true;}
	document.cookie = "testcookie=yes";
	var cookieSet = document.cookie;
	if(cookieSet.indexOf("testcookie=yes")>-1){
		result =  true;
		document.cookie="";
		return result;
	}
}
//设置Cookie
dataUtil.setCookie=function(name,value){
	var time = 30;//保存cookie30天
	var expire = new Date();
	expire.setTime(expire.getTime()+time*3600*24*1000);
	document.cookie = name+"="+escape(value)+"; expires="+expire.toUTCString();
}
//设置验证码
dataUtil.setImgCode=function(dom){
	$(dom).attr("src",'/img/genImgCode.do?&x=' + Date.now());
}
//校验验证码
dataUtil.checkCode=function(dom){
	var checkUtil=require("kenfor/kenforJsUtil");
	var result = false;
	var $dom=$(dom);
	var codeNum = $dom.val();
	if(!checkUtil.isEmpty(codeNum)){
		webUtil.showTip(langUtil.wMsg_Code,1.5);
	}else{
		$.ajax({
			url:"/img/checkImgCode.do",
			type:"GET",
			data:{"imgCode":codeNum},
			async:false,
			dataType:"json",
			cache:false,
			success:function(dataReturn){
				if(dataReturn.data.msgcode=="1"){
					result = true;
				}else if(dataReturn.data.msgcode=="0"){
					webUtil.showTip(langUtil.MemberReg_CheckCodeErorr,1.5);
				}
			}
		});
	}
	return result;
}
//手机找回密码
dataUtil.forgetByPhone=function(phone,code){
	var checkUtil=require("kenfor/kenforJsUtil");
	var $phone=$(phone);
	var phoneNum=$phone.val();
	var result=true;
	var jsonStr={};
	jsonStr["cstacc"]= phoneNum;
	if(code){
		var $code=$(code);
		var codeNum=$code.val();
		if(!checkUtil.isEmpty(codeNum)){
			webUtil.showTip(langUtil.MemberReg_CheckCodeInfo,1.5);
			result=false;
		}else{
			jsonStr["type"]= 2;
			jsonStr["code"]= codeNum;
		}
	}else{
		if(dataUtil.getNum(phone,"newPaw")){//判断短信发送次数次数
			jsonStr["type"]= 1;
			sendSms=true;
		}else{
			result=false;
		}
	}
	if(result){
		$.ajax({
			url:"/w/cst/forgetByPhone.do",
			type:"POST",
			data:jsonStr,
			async:false,
			dataType:"json",
			cache:false,
			success:function(dataReturn){
				if(dataReturn.result=="SUCCESS"){

				}else{
					if(code){
						webUtil.showTip(langUtil.MemberReg_CheckCodeInfoError,1.5);
					}else{
						webUtil.showTip(langUtil.MemberReg_CheckCodeInfoErrorAdd,1.5);
					}
					result=false;
				}
			}
		});
	}
	return result;
}
dataUtil.lookforPassword=function(phone,button,setRegCol){
	var phoneNum=$(phone).val();
	var result=true;
	var $btn = $(button),
		$phone = $(phone);
	var sendSms=$btn.data('sendsms');
	if(sendSms!==1){
		$.ajax({
			url:"/sendSms/lookforPassword.do",
			type:"POST",
			data:{"phone":phoneNum},
			async:false,
			dataType:"json",
			cache:false,
			success:function(dataReturn){
				if(dataReturn.result=="SUCCESS"){
					if($btn){
						var smsCodeTip = "";
						if(setRegCol == "setRegCol"){
							smsCodeTip = '秒后重新获取';
						}else{
							smsCodeTip = langUtil.MemberReg_SendIphoneInfoupdt;
						}
						$btn.text('89'+smsCodeTip);
						$btn.data('sendsms',1);
						$btn.addClass('lg_countNumOn');
						var i = 88;
						var intervalId = setInterval(function(){
							i>=10? $btn.html(i+smsCodeTip) : $btn.html("0"+i+smsCodeTip);
							i--;
							if(i < 0 ){
								if(setRegCol == "setRegCol"){
									smsCodeTip = '免费获取验证码';
								}else{
									smsCodeTip = langUtil.getFreeCode;
								}
								$btn.html(smsCodeTip);
								$btn.removeClass('lg_countNumOn');
								$btn.data('sendsms',0);
								clearInterval(intervalId);
							}
						},1000);
					}
				}else{
					webUtil.showTip(langUtil.MemberReg_FindIphoneError,1.5);
					result=false;
				}
			}
		});
		dataUtil.recordNum(phone,"newPaw");//记录短信发送次数
		return result;
	}
}
dataUtil.resetPSW=function(newPaw){
	var result = false;
	var getResult=dataUtil.getResult();
	if(getResult){
		var newPawNum=$(newPaw).val();
		$.ajax({
			url:"/w/cst/resetPSW.do",
			type:"POST",
			data:{"cstpsw":newPawNum},
			async:false,
			dataType:"json",
			cache:false,
			success:function(dataReturn){
				if(dataReturn.result=="SUCCESS"){
//					webUtil.showTip("密码设置成功",1.5);
					result=true;
				}else{
					webUtil.showTip(langUtil.MemberReg_resetPSW,1.5);
				}
				console.log(dataReturn);
			}
		});
	}
	return result;
}
dataUtil.getResult=function(type){
	var result=false;
	$.ajax({
		url:"/w/cst/getResult.do",
		type:"GET",
		async:false,
		dataType:"json",
		cache:false,
		success:function(josndata){
			if(josndata.data){
				result=true;
			}else{
				webUtil.showTip(langUtil.MemberReg_getResult,1.5);
			}
		}
	});
	return result;
}

//百度编辑器分页代码
window.pageCount={};
window.saveContent={};
dataUtil.UeInitialize=function(id,page,mdId) {
	pageCount[mdId] = 1;//总页数  
	saveContent[mdId]="";//用于保存分页数据  
	var regExp = /_ueditor_page_break_tag_/;//根据某处字符来分页  
	var content, pageList;//保存全局ID   
	var cTxt = $(id).html();
	content = $(id);
	pageList = $(page);
	if (cTxt != null && regExp.test(cTxt)) {
		saveContent[mdId] = cTxt.split(regExp);
		pageCount[mdId] = saveContent[mdId].length;
	}
	dataUtil.UePageContent(1,mdId);
}
dataUtil.UePageContent = function (pageIndex,mdId) {
	if (pageIndex >= 1 && pageIndex <= pageCount[mdId] && saveContent[mdId] != null && saveContent[mdId].length >= 0) {
		var pageHtml = $("#page_"+mdId);
		var content=$("#conText_"+mdId);
		if ((parseInt(pageIndex) - 1) <= saveContent[mdId].length) {
			content.html(saveContent[mdId][parseInt(pageIndex) - 1]);
		}

		pageHtml.html("");
		var innHtml = "页数：" + pageIndex + "/" + pageCount[mdId];
		var jumpId='"'+mdId+'"';
		innHtml += "<a target='_self' href='javascript:dataUtil.UePageContent(1,"+jumpId+")'>首页</a>";
		if (pageIndex > 1) {
			innHtml += "<a target='_self' href='javascript:dataUtil.UePageContent(" + (parseInt(pageIndex) - 1) +","+jumpId+")'>上一页</a>";
		}
		if (pageIndex < pageCount[mdId]) {
			innHtml += "<a target='_self' href='javascript:dataUtil.UePageContent(" + (parseInt(pageIndex) + 1) +","+jumpId+")'>下一页</a>";
		}
		innHtml += "<a target='_self' href='javascript:dataUtil.UePageContent(" + pageCount[mdId] +","+jumpId+")'>末页</a>";
		pageHtml.html(innHtml);
	}
}
/*rgb颜色转换为hex*/
dataUtil.RGBToHex = function(rgb){
	var regexp = /[0-9]{0,3}/g;
	var re = rgb.match(regexp);
	var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	for (var i = 0; i < re.length; i++) {
		var r = null, c = re[i], l = c;
		var hexAr = [];
		while (c > 16){
			r = c % 16;
			c = (c / 16) >> 0;
			hexAr.push(hex[r]);
		} hexAr.push(hex[c]);
		if(l < 16&&l != ""){
			hexAr.push(0)
		}
		hexColor += hexAr.reverse().join('');
	}
	return hexColor;
}
dataUtil.HexToRGB = function(sColor){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
		}
		return sColorChange.join(",");
	}else{
		return sColor;
	}
};
dataUtil.wxScanQRCode=function(elId){
	var elId=elId||'scanQRCode';
	if($("body").hasClass("edit")){
		//wapUtil.showTip("当前为编辑状态，不可操作");
		return false;
	}else{
		var ua = window.navigator.userAgent.toLowerCase();
		var wxFlag=true;
		//dataUtil.getWxJsApiConfig(elId);
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
 			dataUtil.getWxJsApiConfig(elId);
		}else{
			wxFlag=false;
			dataUtil.wapScanQRCode(elId);
			//alert("调用失败，请用微信扫一扫，扫描下面二维码打开网页！");
			//wapUtil.showTip("请用微信打开此页面");
		}
	}
	//return wxFlag;

	//dataUtil.getWxJsApiConfig()
};
dataUtil.getWxJsApiConfig=function(elId){
	var hostName=window.location.hostname;
	var ispg= 0;//默认公众号
	if(hostName=="xcx.iyong.com" || hostName=="xcx.kenfor.com" || hostName=="xcx-cs.iyong.com" || hostName=="xcx-fb.iyong.com"){//区分是否小程序
		ispg=1;
	}
	$.ajax({
		url: "/w/wx/getWxJsApiConfig.do",
		type : "GET",
		data:{
			ispg:0,
			path:encodeURIComponent(window.location.href)
		},
		success: function (data) {
			if (data.result == "SUCCESS") {
				//alert("获取签名成功");
				//dataUtil.addCookie('wxJsApiConfig',JSON.stringify(data.data));
				dataUtil.getJweixin(elId,data);
			} else {
				//alert("获取签名失败");
				wapUtil.showTip(data.errorMsg.errorMsg, 1.5);
				dataUtil.wapScanQRCode(elId);
			}
		}
	});
};
dataUtil.getJweixin=function(elId,jsApiData){
	//alert(666);
	var tempData=jsApiData.data;
	require(["//res.wx.qq.com/open/js/jweixin-1.3.2.js"],function(wx){
		wx.config({
			//deta:true,
			debug: false,
			appId: tempData.appId,
			timestamp: tempData.timestamp,
			nonceStr: tempData.nonce_str,
			signature: tempData.signature,
			//jsTicket:data.data.jsTicket,
			jsApiList: ['checkJsApi','scanQRCode','getLocation','openLocation']
		});
		wx.ready(function(){
/*			wx.getLocation({
				type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success : function(res) {
					//使用微信内置地图查看位置接口
					wx.openLocation({
					 latitude : res.latitude, // 纬度，浮点数，范围为90 ~ -90
					 longitude : res.longitude, // 经度，浮点数，范围为180 ~ -180。
					 name : '我的位置', // 位置名
					 address : '爱用', // 地址详情说明
					 scale : 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
					 infoUrl : 'http://www.iyong.com' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
					 });
				},
				cancel : function(res) {

				}
			});*/
			document.querySelector('#'+elId).onclick = function () {
				wx.scanQRCode({
					needResult: 1,
					desc: 'scanQRCode desc',
					success: function (res) {
						//alert("scanQRCode**");
						var errMsg_OK = 'scanQRCode:ok';
						var resIsOK = res.errMsg == errMsg_OK
							&& res.resultStr != undefined
							&& res.resultStr != null
							&& res.resultStr.length > 0;
						if (!resIsOK){
							alert('网络错误');
							return false;
						}
						//var data=res.resultStr;
						//   alert(res.resultStr);
						//   console.log(res);
						var data=res.resultStr;
						//alert(data);
						if(res.resultStr.indexOf("http") > -1){
							//判断门店1，产品0状态，默认为产品
							var fwType,pageFwType,codeNum,isScan=1;
							if(data.indexOf("c=") > -1){
								codeNum=data.substring(data.indexOf("c=")+2,data.indexOf("c=")+10);
							}
							if(data.indexOf("f=") > -1){
								fwType=data.substring(data.indexOf("f=")+2,data.indexOf("f=")+3);
							}
							//获取当前页面查询类型
							var fatherEl=$('#'+elId).parents(".modulebox"),mdId=fatherEl.attr("id")||'';
							if(fatherEl.hasClass("box_securityCode")){
								pageFwType=0;
							}else if(fatherEl.hasClass("box_storeOrigin")){
								pageFwType=1;
							}else if(fatherEl.hasClass("box_origin_v1")){
								pageFwType=fatherEl.find(".origin_tab span.on").attr("data-tab")||'0';
							}
							if(fwType==pageFwType){
								//window.location.href=data;
								//匹配正确，执行查询
								$(".codeInput").val(codeNum);
								$("#querySearch_"+mdId).addClass("yy-disable");
								wapUtil.queryCode("querySearch_", mdId, '', fwType,isScan)
							}else{
								wapUtil.showTip("请上传正确的二维码图片");
							}
							//window.location=res.resultStr;
						}else{
							$(".codeInput").val(res.resultStr)
						}
					}
				});
			};
		});
		wx.error(function (res) {
			//alert(res.errMsg);
			wapUtil.showTip(res.errMsg,"forbidden",3);
		});
	});
};
dataUtil.wapScanQRCode=function(elId) {
	require(["qrcode/qrcode.lib.min","qrcode/qrcode"],function(){
		Qrcode.init($('#'+elId));
	})
};
dataUtil.renderBMap = function(el,lng,lat){
	require(["async!BMap"],function() {
		var map = new BMap.Map(el);    // 创建地图实例
		var point = new BMap.Point(lng,lat);  // 创建点坐标
		var marker = new BMap.Marker(point);        // 创建标注
		map.addOverlay(marker);   // 将标注添加到地图中
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrl_sca);
		map.centerAndZoom(point,15);   // 初始化地图，设置中心点坐标和地图级别
		map.enableScrollWheelZoom();
	})
};
dataUtil.renderBMapNew = function(el,array){
	require(["async!BMap"],function() {
		var map = new BMap.Map(el);    // 创建地图实例
		var pointArray=[]; // 创建点坐标
		var len=array.length,distance,unit;
		$.each(array,function(i,item){
			var lng=item.lng,
				lat=item.lat,
				labelTxt=item.labelTxt;
			var point = new BMap.Point(lng,lat);  // 创建点坐标
			if(i==1){ //0门店位置，1我的位置
				var marker = new BMap.Marker(point,{
					icon:new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
						scale: 1,//图标缩放大小
						fillColor: "blue",//填充颜色
						fillOpacity: 15//填充透明度
					})});        // 创建标注
			}else{
				var marker = new BMap.Marker(point);        // 创建标注
			}
			if(labelTxt){ // 创建备注
				var label = new BMap.Label(labelTxt, {
					offset: new BMap.Size(15, -25)
				});
				label.setStyle({
					width: "auto",
					background: '#fff',
					border: '1px solid #ddd',
					borderRadius: "5px",
					textAlign: "center",
					height: "26px",
					lineHeight: "26px",
					padding:"0 8px",
				});
				marker.setLabel(label);
			}
			map.addOverlay(marker);   // 将标注添加到地图中
			pointArray.push(point);
		});
		if(len>1){
			//$("#storeDistance span").html('您与门店实际距离相隔为'+(map.getDistance(pointArray[0],pointArray[1])).toFixed(2)/1000+'公里');
			if((map.getDistance(pointArray[0],pointArray[1])/1000)<1){
				distance=map.getDistance(pointArray[0],pointArray[1]).toFixed(0);
				unit='米';

			}else{
				distance=(map.getDistance(pointArray[0],pointArray[1])/1000).toFixed(2);
				unit='公里';
			}
			$("#storeDistance span").html('您与门店实际距离相隔为'+distance+unit);
		};
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrl_sca);
		//显示两点中间为中心点
		if(len>1){
			var v=map.getViewport(pointArray);//此类代表视野，不可实例化，通过对象字面量形式表示
			map.centerAndZoom(v.center, v.zoom-1);//设置地图中心点和视野级别  -1是为了视野级别更缩小些，让两点在视觉中心
		}else{
			map.centerAndZoom(pointArray[0],15);   // 初始化地图，设置中心点坐标和地图级别
		}
		map.enableScrollWheelZoom();
	})
};

/*新版文本提示*/
dataUtil.iyongShowTips=function(text,time,title,callback) {//text:提示内容，必填;time：显示时长,默认3秒;title:提示标题，默认显示操作提示,callback：自定义回调函数
	if(text){
		$("#iyong-show-tips,.iyong-show-mask").remove();
		if(!time){
			time=3;
		}
		time=time*1000;
		if(!title){
			title="操作提示"
		}
		var htmlTpl='<div id="iyong-show-tips" class="pub_shadow"><div class="iyong-tips_top"><p>'+title+'</p><span class="ist_close"></span></div><div class="iyong-tips_con">'+text+'</div></div><div class="iyong-show-mask"></div>';
		$("body").append(htmlTpl);
		$("#iyong-show-tips,.iyong-show-mask").fadeIn(100);
		$("#iyong-show-tips").css("margin-left","-"+$("#iyong-show-tips").width()/2+"px");
		//$('#iyong-show-tips').addClass('bounceInDown');
		// setTimeout(function(){
		// 	$('#iyong-show-tips').removeClass('bounceInDown');
		// }, 500);
		var setTimeClose=setTimeout(function(){
			$("#iyong-show-tips,.iyong-show-mask").fadeOut(100);
			if(callback){
				callback();
			}	
		}, time);
		$("#iyong-show-tips .ist_close,.iyong-show-mask").click(function(){
			$("#iyong-show-tips,.iyong-show-mask").fadeOut(100);
			clearTimeout(setTimeClose);
			if(callback){
				callback();
			}
		});
	}
}
//PC分页方法
dataUtil.page = function($dom,pageIndex,pageTotal,pageMax,pageNum){
	$($dom).html("");
	var leftPageIndexNum = 3;
	var rightPageIndexNum = 3;
	var preIndex =	'<li><a href="javascript:" data-page="1" >'+langUtil.Global_first+'</a></li>';
	$($dom).append(preIndex);

	if(pageIndex > pageNum) {
		pageIndex = pageNum;
	}
	beginIndex = 1;
	endIndex = pageNum;
	if (pageIndex > leftPageIndexNum){
		if (pageNum - pageIndex >= rightPageIndexNum){
			beginIndex = pageIndex - leftPageIndexNum;
			endIndex = pageIndex + rightPageIndexNum;
		}else{
			if(pageNum - leftPageIndexNum - rightPageIndexNum > 0){
				beginIndex = pageNum - leftPageIndexNum - rightPageIndexNum;
			}
		}
	}else{
		if(pageNum - leftPageIndexNum - rightPageIndexNum > 0){
			endIndex = beginIndex + leftPageIndexNum + rightPageIndexNum;
		}
	}
	if(pageIndex>1 && pageIndex <= pageNum){
		$($dom).append('<li><a href="javascript:" data-type="0" >'+langUtil.Global_prePage+'</a></li>');
	}
	for (i = beginIndex; i <= endIndex; i++){
		//生成页码
		var Act="";
		if(i==pageIndex){
			Act="Act";
		}
		$($dom).append('<li><a href="javascript:" class="'+Act+'" data-page="'+i+'">' + i + '</a></li>');
	}
	if(pageIndex<pageNum){
		$($dom).append('<li><a href="javascript:" data-type="1" >'+langUtil.Global_nextPage+'</a></li>');
	}
	$($dom).append('<li><a href="javascript:" data-page="'+pageNum+'">'+langUtil.Global_endPage+'</a></li>');
};

//手机分页
dataUtil.mobPage = function($dom,pageIndex,pageTotal,pageMax,pageNum){//手机分页功能
	$($dom).html("");
	beginIndex = 1;
	if(pageIndex>1){
		$($dom).append('<a href="javascript:" data-type="0" class=" page_but prev_pic pub_border pub_color" >'+langUtil.Global_prePage+'</a>');
	}else{
		$($dom).append('<span class=" page_but prev_pic pub_border pub_color" >'+langUtil.Global_prePage+'</span>');
	}
	var html="";
	html='<span class="current mob_paginationSelect page_text"><select name="page_select">';
	for (i = beginIndex; i <= pageNum; i++){
		//生成页码
		var select="";
		if(pageIndex==i){
			select='selected';
		}
		html+='<option value="'+i+'" '+select+' data-page="'+i+'"> '+i+' / '+pageNum+' </option>'

	}
	html+='</select></span>';
	$($dom).append(html);
	if(pageIndex<pageNum){
		$($dom).append('<a href="javascript:" data-type="1" class=" page_but next_pic pub_border pub_color" >'+langUtil.Global_nextPage+'</a>');
	}else{
		$($dom).append('<span class=" page_but next_pic pub_border pub_color" >'+langUtil.Global_nextPage+'</span>');
	}

};
dataUtil.RGBToHex=function(color){
	// var regexp = /[0-9]{0,3}/g;
	// var re = rgb.match(regexp);
	// var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	// for (var i = 0; i < re.length; i++) {
	// 	var r = null, c = re[i], l = c;
	// 	var hexAr = [];
	// 	while (c > 16){
	// 		r = c % 16;
	// 		c = (c / 16) >> 0;
	// 		hexAr.push(hex[r]);
	// 	} hexAr.push(hex[c]);
	// 	if(l < 16&&l != ""){
	// 		hexAr.push(0)
	// 	}
	// 	hexColor += hexAr.reverse().join('');
    // }
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
 
    var hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	return hexColor;
}
dataUtil.ChangeRgb=function(sColor){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
		}
		return sColorChange.join(",");
	}else{
		return sColor;
	}
}

$(document).ready(function () {//初始化页面需要绑定的方法
	$(".scroll_link").unbind('click').bind("click",function (e) {
		e.stopPropagation();
		e.preventDefault();
		dataUtil.scrollToPage($(this));
	});
	if(window.location.hash && window.location.hash.indexOf("jump_") > -1){
		var hash=window.location.hash.replace("jump_","");
		if($(hash).length > 0){
			dataUtil.scrollToDom($(hash));
		}
    }
});
dataUtil.linkOpen=function(url,target){
	var id="linkOpen";
	if(target=="_blank"){
		var a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('target', '_blank');
		a.setAttribute('id', id);
		// 防止反复添加
		if(!document.getElementById(id)) {
			document.body.appendChild(a);
		}
		a.click();
	}else{
		window.location.href = url;
	}
}
dataUtil.getPageUrl = function() {
    if(!window.contextPath){
        var path;
        if(location.pathname.indexOf("/")==0){
            path=location.pathname.substring(1);
        }else{
            path=location.pathname;
        }
        var index=path.lastIndexOf("/");//获以最后一个斜杠为目标
        if(index > 0){
            var index=index+1;
        }
        window.contextPath=path.substring(index);
    }
	//console.log(contextPath);
	return window.contextPath;
}
dataUtil.scrollToDom=function(scrollDom){//滑动到组件位置
	var $dom=$("body,html");
	var scrollTop_h=scrollDom.offset().top;
	if(WebModel=="edit"){
		$dom=$("#design");
		scrollTop_h=scrollTop_h-$("#head").height()+$dom.scrollTop();
	}
	$dom.animate({scrollTop : scrollTop_h},400);
	//window.location.hash="";
	history.pushState({},"",dataUtil.getPageUrl()+window.location.search);
},
dataUtil.scrollToPage=function ($dom){//点击滑动链接，跳转到对应组件
	var scrollDom=$dom.attr("data-scorll");
	var scrollLink=$dom.attr("data-jump");
	var curPageUrl=dataUtil.getPageUrl()+window.location.search;
	var scrollBox=$("body");
	if($("#"+scrollDom).length > 0){//如果当页面位存在此组件
		dataUtil.scrollToDom($("#"+scrollDom));
	}else if(scrollLink && scrollLink!=curPageUrl){//页面不存在此组件，进行跳转
		var websiteUrl=scrollLink+"#jump_"+scrollDom+"";
		var $target=$dom.attr("target");
		if ($("body").hasClass('operating')){//在设计后台有进行过编辑，但没有保存
			dataUtil.checkChange("",websiteUrl,$target);
		}else{
			dataUtil.linkOpen(websiteUrl,$target);
		}
	}
},
dataUtil.checkChange=function(e,websiteUrl,$target){
	if ($("body").hasClass('operating')){
		require(["underscore"],function(_) {
			$.ajax({
				url: "/design/public/hintWindow.html",
				type : "GET",
				success : function (data) {
					var dialog = art.dialog({
						id : new Date().getTime(),
						title : "操作提示",
						lock : true,
						width : 450,
						height : 'auto',
						padding : '0',
						content : _.template(data)({field:"jump_save"}),
						init : function () {
							$("#noSave").click(function (e) {
								dialog.close();
								$("body").removeClass('operating');
								dataUtil.linkOpen(websiteUrl,$target);
							});
							$("#pageSave").click(function (e) {
								dialog.close();
								var moduleTool = require("kenfor/moduleUtil");
								moduleTool.saveData("#box_web_top",function(){
									setTimeout(function(){
										dataUtil.linkOpen(websiteUrl,$target);
									},300);
								});
							});
						}
					})
				},
				error : function (e) {
					console.log(e);
				}
			});
		})
	}else{
		dataUtil.linkOpen(websiteUrl,$target);
	}
}
dataUtil.setMenuFiexd=function(mdId){
	var $dom=$("#"+mdId);
	var scorll_t=Number($dom.css("top").replace("px",""));
	var $scorll=$(window);
	var nTop=0;
	var $webMenu=$("#Web_show_menu");
	$dom.data("data-scorll",scorll_t);
	if(WebModel=="edit"){
		$scorll=$("#design");
		nTop=50;
		$dom.on("dragstop", function(event, ui){
			scorll_t=ui.position.top;
			$dom.data("data-scorll",scorll_t);
		});
	}
	$scorll.scroll(function(){
		if($(this).scrollTop() >= scorll_t){
			if($dom.css("position")!="fixed"){
				$dom.css({top:nTop,position:"fixed"});
				$webMenu.css("z-index",99);
			}
		}else{
			if($dom.css("position")=="fixed"){
				$dom.css({"position":"absolute",top:scorll_t});
				$webMenu.css("z-index",11);
			}
		}
	});
}