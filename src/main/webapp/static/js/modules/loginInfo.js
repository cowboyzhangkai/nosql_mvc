/*------------------------------|
 | LoginInfo Module | 			  	|
 |-------------------------------|
 | @author Xingzhi Lu	            |
 |------------------------------*/
function LoginInfoModel() {
	this.menuItems = {
			changePwd : {
				id : 'changePwdMItem',
				text : '密码修改'
			},
			update : {
				id : 'updateMItem',
				text : '账号信息'
			},
			logout : {
				id : 'logoutMItem',
				text : '退出',
				iconCls : 'icon-logout',
			}
	};
}

LoginInfoModel.prototype = new EasyuiObject();

LoginInfoModel.prototype.constructor = "LoginInfoModel";

LoginInfoModel.prototype._initMenuBtn = function () {
	Mainui.getMenuBtn().menubutton({
		menu : Mainui.menuSelector,
		iconCls : 'icon-man',
		text : Security.getLoginUserName()
	});
};

LoginInfoModel.prototype.setMenuItems = function () {
	this._addChangePwdMItem();
	this._addUpdateMItem();
	this._addSeperatorMItem();
	this._addLogoutMItem();
};

LoginInfoModel.prototype._addChangePwdMItem = function () {
	var changePwdMItem = new EditMItem(this.urls.changePassword,
			this.menuItems.changePwd.text, this.menuItems.changePwd.id);
	var passwordEditDialog = new PasswordEditDialog();
	changePwdMItem.setDialog(passwordEditDialog);
	this.addMenuItem(changePwdMItem);
    this._resetInputNames(changePwdMItem.getDialog().getFm());
};
LoginInfoModel.prototype._addUpdateMItem = function () {
	var updateMItem = new EditMItem(this.urls.updateUserInfo,
			this.menuItems.update.text, this.menuItems.update.id);
	var loginUserEditDialog = new LoginUserEditDialog();
	updateMItem.setDialog(loginUserEditDialog);
	this.addMenuItem(updateMItem);
    this._resetInputNames(updateMItem.getDialog().getFm());
};
LoginInfoModel.prototype._addSeperatorMItem = function () {
	Mainui.getMenu().menu('appendItem', {
		separator: true
	});
};
LoginInfoModel.prototype._addLogoutMItem = function () {
	var logoutMItem = new LogoutMItem(this.menuItems.logout);
	this.addMenuItem(logoutMItem);
};

LoginInfoModel.prototype.addMenuItem = function (mItem) {
	if (mItem && mItem instanceof MenuItem) {
		var foundItem = mItem.text && 
				Mainui.getMenu().menu('findItem', mItem.text);
		var isExisted = foundItem ? true : false;
		var _url = mItem.getURL();
		if (isExisted == false) {
			if ($.isFunction(mItem._init)) {
				mItem._init();
			}
			Mainui.getMenu().menu('appendItem', mItem.getOpts());
		}
	}
};

LoginInfoModel.prototype.launch = function () {
	this._initMenuBtn();
	this.setMenuItems();
};

function MenuItem() {
	this.constructor = 'MenuItem';
	
	this.opts = {
			id : null,
			text : '菜单按钮',
			iconCls : ButtonCls.edit,
			onclick : function() {// 点击事件
				alert('click');
			}
	};
	this.url = '';

	this.getURL = function() {
		return this.url;
	};

	/*
	 * 完全自定义MenuItem配置参数，会覆盖上面的opts参数进行定义。
	 */
	this.custom = undefined;
	/*
	 * 定义MenuItem默认执行的方法
	 */
	this._init = undefined;
	/*
	 * 修改默认的opts
	 */
	this.setOpts = function(o) {
		$.extend(this.opts, o);
	};
	/*
	 * 获取构造参数，若定义了MenuItem.custom则已custom为准，否则返回opts。
	 */
	this.getOpts = function() {
		if (this.custom) {
			return this.custom;
		} else {
			return this.opts;
		}
	};
}

function LogoutMItem(o) {
	this.setOpts(o);
}

LogoutMItem.prototype = new MenuItem();

LogoutMItem.prototype.constructor = 'LogoutMItem';

/*
 * 初始化按钮和按钮关联dialog
 */
LogoutMItem.prototype._init = function() {
	this.setOpts({
		onclick : function() {
			Security.logout();
		}
	});
};

function EditMItem(l, txt, itemId) {
	this.text = txt ? txt : Messages.edit;
	this.iconCls = ButtonCls.edit;
	this.url = l;
	this.opts.id = itemId ? itemId : 'EditMItem';

	var dlg = undefined;
	this.setDialog = function(d) {
		if (d instanceof DialogInterface) {
			dlg = d;
			dlg.setURL(this.url);
		} else {
			alert('bad param of dialog, must be DialogInterface instance!');
		}
	};
	this.getDialog = function() {
		return dlg;
	};
}

EditMItem.prototype = new MenuItem();

EditMItem.prototype.constructor = 'EditMItem';

/*
 * 初始化按钮和按钮关联dialog
 */
EditMItem.prototype._init = function() {
	var $dlg = this._getDialogBaseObject();
	if ($dlg.size() > 0) {
		var dialog = this.getDialog();
		dialog.initOpts($dlg, this.text);
		this.setOpts({
			onclick : function() {
				dialog.open();
			},
			text : this.text,
			iconCls : this.iconCls
		});
	} else {
		alert('cant find base dialog jQuery object from selector: '
				+ this.getDialog().selector + ' !');
	}
};

/*
 * 获取dialog初始化前的基础jQuery对象。
 */
EditMItem.prototype._getDialogBaseObject = function() {
	return Mainui.getContent().find(this.getDialog().selector);
};

function PasswordEditDialog() {
	this.setTitle(Messages.edit);
	this.selector = '.editPwd_dlg';
	this.method = 'get';
}

PasswordEditDialog.prototype = new SaveDialog();

PasswordEditDialog.prototype.constructor = 'PasswordEditDialog';

PasswordEditDialog.prototype._afterSubmitSuccessHandler = function () {
    var _this = this;
    var _handler = function (data) {// remote data
        var _json = JSON.parse(data);
        var $dlg = _this.getDialog();
        if (ResponseHelper.isSuccess(_json)) {
            $dlg.dialog('close'); // close the dialog
            $.messager.confirm('提示', "密码已修改成功，是否重新登录系统！",
            		function(r) {
            	if (r) {
            		Security.logout();
            	}
			});
        } else if (ResponseHelper.notExisted(_json)) {
            Easyui.info('抱歉，帐号不存在，请重新登陆！');
        } else if (ResponseHelper.pwdNotMatch(_json)) {
        	Easyui.info('抱歉，帐号密码不匹配，请重新输入！');
        } else {
            Easyui.error();
        }
    };
    return _handler;
};

PasswordEditDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="orgPassword"]').validatebox({
    	required: true,
    	validType: 'length[6,32]',
    	invalidMessage: '无效的密码，请输入6-32位的字符！'
    });
    $fm.find(':input[name="password"]').validatebox({
        required: true,
        validType: 'length[6,32]',
        invalidMessage: '无效的密码，请输入6-32位的字符！'
    });
    $fm.find(':input[name="password2"]').validatebox({
        required: true,
        validType: 'equalTo["'+ this.selector +' #password"]'
    });
};

function LoginUserEditDialog() {
	this.setTitle(Messages.edit);
	this.selector = '.editSelf_dlg';
	this.method = 'get';
}

LoginUserEditDialog.prototype = new SaveDialog();

LoginUserEditDialog.prototype.constructor = 'LoginUserEditDialog';

LoginUserEditDialog.prototype._afterSubmitSuccessHandler = function () {
    var _this = this;
    var _handler = function (data) {// remote data
        var _json = JSON.parse(data);
        var $dlg = _this.getDialog();
        if (ResponseHelper.isSuccess(_json)) {
            $dlg.dialog('close'); // close the dialog
            Easyui.info('账户信息修改成功！');
            Security.initUserInfo(function() {
            	Mainui.getMenuBtn().menubutton({
            		text : Security.getLoginUserName()
            	});
            });
        } else if (ResponseHelper.isExisted(_json)) {
            Easyui.info('抱歉，登陆帐号已存在，请重新输入！');
        } else {
            Easyui.error();
        }
    };
    return _handler;
};

LoginUserEditDialog.prototype.open = function() {
	var $dlg = this.getDialog();
	var $fm = this.getFm();
	$dlg.dialog('open');
	$fm.form('clear');
	var userInfo = Security.getLoginUser();
	$fm.form('load', userInfo);
};

LoginUserEditDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="displayName"]').validatebox({
        required: true,
        validType: 'length[2,32]',
        invalidMessage: '无效的显示名称，请输入2-32位的字符！'
    });
    $fm.find(':input[name="phoneNo"]').validatebox({
        validType: 'length[6,32]',
        invalidMessage: '无效的联系电话，请输入6-32位的字符！'
    });
    $fm.find(':input[name="mobileNo"]').validatebox({
    	validType: 'length[11,32]',
    	invalidMessage: '无效的手机号码，请输入11-32位的字符！'
    });
};

var Mainui = {
		contentSelector : '#cc',
		menuBtnSelector : ".loginName",
		menuSelector : ".mm",
		getContent : function () {
			return $(this.contentSelector);
		},
		getHeader :  function () {
			return this.getContent().find('.header');
		},
		getMenuBtn : function () {
			return this.getHeader().find(this.menuBtnSelector);
		},
		getMenu : function () {
			return $(this.menuSelector);
		}
}