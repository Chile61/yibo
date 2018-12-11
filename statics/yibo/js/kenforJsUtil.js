define(function(require) {
	return {
		startdrag : 0,
		stopsave : 0,
		currentDragNode : null,
		isNull : function(a){
			return (typeof a === "undefined") || (a == null);
		},
		isEmpty : function(a){//是否为空
			if(a.length==0){
				return false;
			}else{
				return true;
			}
		},
		isDate : function (a) {//是否日期格式
			return a.constructor === Date ? true : false;
		},
		isSpace : function(a) {//检测空格
			return a.indexOf(" ") > -1 ? true : false;
		},
		isNumber : function (a) {//是否数字格式
			return /[^\d]/.test(a);
		},
		isCardNo : function (a) {//是否身否证
		    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(a);
		},
		isPhone : function (a) {//是否手机格式
		    var reg = /^((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[89]|166)[0-9]{8})$/;
		    return reg.test(a);
		},
		isTelNum:function(num){//是否电话格式
			var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/;
            return reg.test(num);
		},
		isLength:function(num,min,max){
			var length=num.length;
			if(length >= min && length <= max){
				return true;
			}else{
				return false;
			}
		},
		isFloat : function (a) {//是否带小数点
		    return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)
		},
		isInteger : function (a) {
		    return /^-?\d+$/.test(a);
		},
		isLowerCase : function (a) {
		    return /^[a-z]+$/.test(a);
		},
		isUpperCase : function (a) {
		    return /^[A-Z]+$/.test(a);
		},
		toLowerCaseFirstOne : function (a) {
		    if (typeof a === "undefined" || Fai.isLowerCase(a.charAt(0))) {
		        return a;
		    } else {
		        var c = a.substring(0, 1).toLowerCase();
		        var b = a.substring(1, a.length);
		        return c + b;
		    }
		},
		toUpperCaseFirstOne : function (a) {
		    if (typeof a === "undefined" || Fai.isUpperCase(a.charAt(0))) {
		        return a;
		    } else {
		        var c = a.substring(0, 1).toUpperCase();
		        var b = a.substring(1, a.length);
		        return c + b;
		    }
		},
		isDigit : function (a) {
			return a < "0" || a > "9";
		},
		isLetter : function (a) {
		    return (a < "a" || a > "z") && (a < "A" || a > "Z");
		},
		isChinese : function (a) {
		    return a < "一" || a > "龥";
		},
		isIp : function (c) {
		    if (typeof c != "string" || $.trim(c) == "") {
		        return false;
		    }
		    var b = c.split(".");
		    if (b.length != 4) {
		        return false;
		    }
		    var a = true;
		    $.each(b, function (d, f) {
		        if (!isNumber(f) || parseInt(f) < 0 || parseInt(f) > 255) {
		            return false;
		        }
		    });
		    return a;
		},
		isDomain : function (a) {
		    if (/^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/.test(a)) {
		        if (a.indexOf("--") >= 0) {
		            return false;
		        }else{
		        	return true;
		        }
		    } else {
		        return false;
		    }
		},
		isWord : function (a) {
		    return /^[a-zA-Z0-9_]+$/.test(a);
		},
		isEmail : function (a) {
		    return /^[a-zA-Z0-9][a-zA-Z0-9_=\&\-\.\+]*[a-zA-Z0-9]*@[a-zA-Z0-9][a-zA-Z0-9_\-\.]+[a-zA-Z0-9]$/.test(a);
		},
		isEmailDomain : function (a) {
		    return /^[a-zA-Z0-9][a-zA-Z0-9_\-]*\.[a-zA-Z0-9\-][a-zA-Z0-9_\-\.]*[a-zA-Z0-9]$/.test(a);
		},
		isMobile : function (a) {
		    return /^1\d{10}$/.test(a);
		},
		isNationMobile : function (a) {
		    return /^\d{8,14}$/.test(a);
		},
		isEnterKey : function (a) {
		    if ($.browser.msie) {
		        if (event.keyCode == 13) {
		            return true;
		        } else {
		            return false;
		        }
		    } else {
		        if (a.which == 13) {
		            return true;
		        } else {
		            return false;
		        }
		    }
		},
		isIE : function () {
		    return $.browser.msie;
		},
		isIE6 : function () {
		    if (isIE()) {
		    	return $.browser.version == "6.0";
		    }
		    return false;
		},
		isIE7 : function () {
		    if (isIE()) {
		    	return $.browser.version == "7.0";
		    }
		    return false;
		},
		isIE8 : function () {
		    if (isIE()) {
		    	return $.browser.version == "8.0";
		    }
		    return false;
		},
		isIE9 : function () {
		    if (isIE()) {
		    	return $.browser.version == "9.0";
		    }
		    return false;
		},
		isIE10 : function () {
		    if (isIE()) {
		    	return $.browser.version == "10.0";
		    }
		    return false;
		},
		isIE11 : function () {
		    if (isIE()) {
		    	return $.browser.version == "11.0" || $.browser.rv;
		    }
		    return false;
		},
		isSafari : function () {
		    return $.browser.safari;
		},
		isWebkit : function () {
		    return $.browser.webkit;
		},
		isChrome : function () {
		    return $.browser.chrome;
		},
		isMozilla : function () {
		    return $.browser.mozilla;
		},
		isAppleWebKit : function () {
		    var a = window.navigator.userAgent;
		    return a.indexOf("AppleWebKit") >= 0;
		},
		isOpera : function () {
		    return $.browser.opera || $.browser.opr;
		},
		isAndroid : function () {
		    return $.browser.android;
		},
		isIpad : function () {
		    return $.browser.ipad;
		},
		isIphone : function () {
		    return $.browser.iphone;
		},
		encodeHtml : function (a) {
		    return a && a.replace ? (a.replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/\b&nbsp;+/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "&#92;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\r/g, "")) : a;
		},
		decodeHtml : function (a) {
		    return a && a.replace ? (a.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/g, ">").replace(/&#92;/gi, "\\").replace(/&#39;/gi, "'").replace(/&quot;/gi, '"').replace(/\<br\/\>/gi, "\n").replace(/&amp;/gi, "&")) : a;
		},
		format : function () {
		    var c = arguments[0];
		    for (var a = 0; a < arguments.length - 1; a++) {
		        var b = new RegExp("\\{" + a + "\\}", "gm");
		        c = c.replace(b, arguments[a + 1]);
		    }
		    return c;
		},
		checkValid : function (f, b, a, d, c) {
		    var g;
		    if (!f && d > 0) {
		        g = format("您还未输入{0}", b);
		    } else {
		        if (f.length < d) {
		            g = format("{0}不能少于{1}个字", b, d);
		        } else {
		            if (f.length > c) {
		                g = format("{0}不能多于{1}个字，请裁减后重试。", b, c);
		            }
		        }
		    }
		    showErr(a, g);
		    return !g;
		},
		showErr : function (a, c) {
		    var b = $("#" + a);
		    if (c) {
		        b.show();
		        b.text(c);
		    } else {
		        b.hide();
		    }
		},
		checkVal : function (c, d, b, a) {
		    var f;
		    if (d.length < b) {
		        alert(format("{0}不能少于{1}个字符", c, b));
		        f = false;
		    } else {
		        if (d.length > a) {
		            alert(format("{0}不能多于{1}个字符", c, a));
		            f = false;
		        } else {
		            f = true;
		        }
		    }
		    return f;
		},
		getUrlParam : function (b, a) {
		    var d = b.substring(b.indexOf("?") + 1, b.length).split("&");
		    var c;
		    $.each(d, function (f, h) {
		        var g = decodeURIComponent(h.substring(0, h.indexOf("=")));
		        if (g === a) {
		            c = decodeURIComponent(h.substring(h.indexOf("=") + 1, h.length));
		        }
		    });
		    return c;
		}
	};
});
