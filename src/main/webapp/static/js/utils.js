/*------------------------------|
| Utils  |		 			  	|
|-------------------------------|
| @author Kenny Lee	            |
|------------------------------*/
var SysConfig = {
	url : {
		base : '..',
		suffix : '',
		userInfo : '',
		logout : '',
		login : '',
		serviceJs : '/static/js/service.js'
	}
};

$.ajaxSetup({
	contentType : "application/x-www-form-urlencoded;charset=utf-8",
	cache : false,
	complete : function(XMLHttpRequest, textStatus) {
		// SysHelper.debug(XMLHttpRequest.status);
		if (XMLHttpRequest.status === 401) {
			Security.sessionTimeout();
			SysHelper.loading('close');
		}
	},
	error : function(xhr, status, e) {
		SysHelper.loading('close');
	}
});

var isTimeOut = false;
var isPageLoaded = false;

var SysHelper = {
	/*
	 * 设置等待界面 @param op 若为数字，则表示等待的最少时间，若为close，则关闭等待界面，但也必须等待时间过后才触发。
	 */
	loading : function(op) {
		var clx = 'datagrid-mask-msg';
		var loadingId = 'loading-mask';

		if ((op == undefined || isNaN(op) == false)
				&& $('#' + loadingId).size() == 0) {
			var timeout = op ? op : 2;
			timeout *= 1000;
			isTimeOut = false;
			isPageLoaded = false;
			var mark = $('<div>', {
				id : loadingId
			});
			mark.css({
				display : 'block',
				backgroundColor : 'white',
				width : $(document).width(),
				height : $(document).height(),
				visibility : 'visible'
			});
			mark.appendTo('body');
			var msgDialogWidth = 184;
			var l = ($(document).width() - msgDialogWidth) / 2;
			if (SysHelper.browser.msie && SysHelper.browser.version < 8) {
				// 修复在8以下left的居中效果
				l -= (msgDialogWidth);
			}
			var msgDialog = $('<div>');
			msgDialog.addClass(clx);
			msgDialog.css({
				display : 'block',
				left : l
			});
			msgDialog.html('页面努力加载中，请稍候....');
			mark.append(msgDialog);
			setTimeout(function() {
				isTimeOut = true;
				if (isPageLoaded == true) {
					$('#' + loadingId).remove();
				}
			}, timeout);
		} else if (op === 'close') {
			isPageLoaded = true;
			if (isTimeOut == true) {
				$('#' + loadingId).remove();
			}
		}
	},
	gLink : function(u) {
		return SysConfig.url.base + u + SysConfig.url.suffix;
	},
	loadServiceConfig : function(){
		dLoad.js(SysConfig.url.serviceJs);
	},
	debug : function(msg) {
		try {
			console.debug(msg);
		} catch (e) {
		}
	},
	browser : {
		version : (navigator.userAgent.toLowerCase().match(
				/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
		safari : /webkit/.test(navigator.userAgent.toLowerCase()),
		opera : /opera/.test(navigator.userAgent.toLowerCase()),
		msie : /msie/.test(navigator.userAgent.toLowerCase())
				&& !/opera/.test(navigator.userAgent.toLowerCase()),
		mozilla : /mozilla/.test(navigator.userAgent.toLowerCase())
				&& !/(compatible|webkit)/.test(navigator.userAgent
						.toLowerCase()),
		chrome : /chrome/.test(navigator.userAgent.toLowerCase()),
		ltIE9 : function() {
			return SysHelper.browser.msie && SysHelper.browser.version < 9;
		},
		friendly : function() {
			var f = SysHelper.browser.chrome
					|| (SysHelper.browser.msie && SysHelper.browser.version > 9);
			return f;
		}
	},
	strToArray : function(s) {
		var a = new Array();
		if (typeof (s) == 'string' || s instanceof Array) {
			if (s instanceof Array) {
				for ( var x in s) {
					var _s = s[x];
					a.push(_s);
				}
			} else {
				a.push(s);
			}
		}
		return a;
	}
};

var Security = {
	/*
	 * 获取登录用户信息，并且保存起来。@param callback 可选参数，如果有，则加载完信息后执行callback.
	 */
	initUserInfo : function(callback) {
		var url = SysConfig.url.userInfo;
		$.getJSON(url, function(data) {
			$('body').data('user', data.user);
			$('body').data('permission', data.privileges);
			if ($.isFunction(callback)) {
				SysHelper.loadServiceConfig();// 权限设置读取后，再设置service config
				callback();
			}
		});
	},
	logout : function() {
		var url = SysConfig.url.logout;
		var $f = $('<form>', {
			action : url,
			method : 'post'
		});
		$f.appendTo('body').submit();
	},
	sessionTimeout : function() {
		$.messager.alert('提示', '抱歉，登录信息已超时，请重新登录！', 'info', function() {
			Security.logout();
		});
		$(".panel-tool-close").hide();
	},
	hasAnyGranted : function(any) {
		if (any) {
			if (typeof (any) == 'string' || any instanceof Array) {
				var a = SysHelper.strToArray(any);
				var permissions = $('body').data('permission');
				var has = false;
				loop: for ( var i in a) {
					var s = a[i];
					for ( var x in permissions) {
						var p = permissions[x];
						if (p['name'] === s) {
							has = true;
							break loop;
						}
					}
				}
				return has;
			} else {
				alert('the argument instance must be String or Array.');
			}
		} else {
			alert('bad argument, its null!');
		}
	},
	getLoginUser : function() {
		return $('body').data('user');
	},
	getLoginUserName : function() {
		return $('body').data('user').cnName;
	},
	debugLoginUser : function() {
		var user = this.getLoginUser();
		for ( var x in user) {
			SysHelper.debug(x + ' : ' + user[x]);
		}
	}
};

var dLoad = {

	/*
	 * 加载css @param a String或Array，传入相对根目录的路径地址。
	 */
	css : function(a) {
		var aPath = SysHelper.strToArray(a);
		for ( var x in aPath) {
			var path = aPath[x];
			var href = SysConfig.url.base + path;
			if (document.createStyleSheet) {// IE ONLY, for support ie8 and less
				document.createStyleSheet(href);
			} else {
				$("<link>", {
					rel : "stylesheet",
					// type : "text/css",
					href : href
				}).appendTo("head");
			}
		}
	},
	/*
	 * 批量加载js，在IE8及以下版本环境中不完美，需要注意js的加载顺序，不然会产生各种问题。 @param inserts
	 * String或Array，传入相对根目录的路径地址。 @param callback
	 * 导入执行后添加的callbck，主要给IE9版本下的浏览器用。
	 */
	js : function(inserts, callback) {
		if (inserts) {
			inserts = SysHelper.strToArray(inserts);
			var nextInsert = inserts.shift();
			if (nextInsert != undefined) {
				if (SysHelper.browser.ltIE9()) {
					$.getScript(SysConfig.url.base + nextInsert, callback);
				} else {
					$("<script>", {
						// type : "text/javascripts",
						src : SysConfig.url.base + nextInsert
					}).appendTo("head");
					dLoad.js(inserts, callback);
				}
			} else {
				if (callback != undefined) {
					callback();
				}
			}
		}
	}
};