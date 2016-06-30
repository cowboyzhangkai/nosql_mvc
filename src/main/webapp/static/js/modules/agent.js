/*------------------------------|
 | User Module | 			  	|
 |------------------------------|
 | @author Kenny Lee	        |
 |------------------------------*/
function AgentModel() {
    this.buttonText = {
        save: '创建用户',
        edit: '修改用户',
        remove: '删除用户'
    };
    this.getSort = function () {
        var s = '';
        s += '&sort=' + this.fieldMap.position;
        s += "&sort=" + this.fieldMap.createTime + ":DESC";
        s += "&sort=" + this.fieldMap.loginName;
        return s;
    };
}

AgentModel.prototype = new EasyuiDatagrip();

AgentModel.prototype.constructor = "AgentModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
AgentModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[
              {
    	checkbox:true,
        field: "souli",
        title: '受理状态',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.loginName,
        title: '受理状态',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.displayName,
        title: '目的地',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.displayName,
        title: '组织机构代码',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.displayName,
        title: '单位名称',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '申请类型',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '申请时间',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '去年纳岁额（万元）',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '核查去年纳岁额（万元）',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '核查状态',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '受理类别',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.isActive,
        title: '受理时间',
        width: 10,
        formatter: function (val) {
            return $.commons.toDateString(val);
        }
    }, {
        field: this.fieldMap.isActive,
        title: '受理人',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }]];
    return a;
};

/*
 * 初始化datagrip之前，添加功能按钮。（注：可根据权限判断是否添加。）
 */
AgentModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
    this._addSaveButton();
    this._addEditButton();
    this._addRemoveButton();
};

AgentModel.prototype._addSaveButton = function () {
    var saveButton = new SaveButton(this.urls.save, this.buttonText.save);
    var saveDialog = new UserSaveDialog();
    saveButton.setDialog(saveDialog);
    this.addButton(saveButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(saveButton.getDialog().getFm());
};

AgentModel.prototype._addEditButton = function () {
    var editButton = new EditButton(this.urls.edit, this.buttonText.edit);
    var editDialog = new UserEditDialog();
    editButton.setDialog(editDialog);
    this.addButton(editButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(editButton.getDialog().getFm());
};

AgentModel.prototype._addRemoveButton = function () {
    var removeButton = new RemoveButton(this.urls.remove,
        this.buttonText.remove);
    removeButton.setConfirmFieldName(this.fieldMap.loginName);
    this.addButton(removeButton);
};

function UserSaveDialog() {
}

UserSaveDialog.prototype = new SaveDialog();

UserSaveDialog.prototype.constructor = 'UserSaveDialog';

/*
 * 初始化“新增”操作的消息框前的前置操作
 */
UserSaveDialog.prototype._beforeDialogShow = function () {
    // 若需要异步加载数据，可在这里实现初始化
    this.getFm()
        .find(':input[name="' + Easyui.getTabFieldMap().isActive + '"]')
        .prop('checked', true);
};

/*
 * “新增”操作信息成功返回后的操作。
 */
UserSaveDialog.prototype._afterSubmitSuccessHandler = function () {
    var _this = this;
    var _handler = function (data) {// remote data
        var _json = JSON.parse(data);
        var $dg = Easyui.getDatagrip();
        var $dlg = _this.getDialog();
        if (ResponseHelper.isSuccess(_json)) {
            $dlg.dialog('close'); // close the dialog
            $dg.datagrid('reload'); // reload the user data
        } else if (ResponseHelper.isExisted(_json)) {
            Easyui.info('抱歉，登录帐号已存在，请重新输入！');
        } else {
            Easyui.error();
        }
    };
    return _handler;
};

UserSaveDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="loginName"]').validatebox({
        required: true,
        validType: ['loginName', 'length[4,32]'],
        invalidMessage: '无效的登录名，请输入4-32位的英文、数字或下划线！'

    });
    $fm.find(':input[name="loginName"]').validatebox({
        required: true,
        validType: ['loginName', 'length[4,32]'],
        invalidMessage: '无效的登录名，请输入4-32位的英文、数字或下划线！'
    });
    $fm.find(':input[name="password"]').validatebox({
        required: true,
        validType: 'length[6,32]',
        invalidMessage: '无效的密码，请输入6-32位的字符！'
    });
    $fm.find(':input[name="displayName"]').validatebox({
        required: true,
        validType: 'length[2,32]',
        invalidMessage: '无效的显示名称，请输入2-32位的字符！'
    });
    $fm.find(':input[name="phoneNo"]').validatebox({
        validType: 'length[6,32]',
        invalidMessage: '无效的联系电话，请输入6-32位的字符！'
    })
    $fm.find(':input[name="password2"]').validatebox({
        required: true,
        validType: 'equalTo[".dlg #password"]'
    });
};

function UserEditDialog() {
}

UserEditDialog.prototype = new EditDialog();

UserEditDialog.prototype.constructor = 'UserEditDialog';

/*
 * “修改”操作信息成功返回后的操作。
 */
UserEditDialog.prototype._afterSubmitSuccessHandler = function () {
    return UserSaveDialog.prototype._afterSubmitSuccessHandler.apply(this,
        arguments);
};

/*
 * 初始化“新增”操作的消息框前的前置操作
 */
UserEditDialog.prototype._beforeDialogShow = function () {
    // 若需要异步加载数据，可在这里实现初始化
    this.getFm().find(
        ':input[name="' + Easyui.getTabFieldMap().loginName + '"]').prop(
        'disabled', true)
};

UserEditDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="loginName"]').validatebox({
        required: true,
        validType: ['loginName', 'length[4,32]'],
        invalidMessage: '无效的登录名，请输入4-32位的英文、数字或下划线！'
    });
    $fm.find(':input[name="password"]').validatebox({
        required: false,
        validType: 'length[6,32]',
        invalidMessage: '无效的密码，请输入6-32位的字符！'
    });
    $fm.find(':input[name="displayName"]').validatebox({
        required: true,
        validType: 'length[2,32]',
        invalidMessage: '无效的显示名称，请输入2-32位的字符！'
    });
    $fm.find(':input[name="phoneNo"]').validatebox({
        validType: 'length[6,32]',
        invalidMessage: '无效的联系电话，请输入6-32位的字符！'
    })
    $fm.find(':input[name="password2"]').validatebox({
        required: false,
        validType: 'equalTo[".edit_dlg #password"]'
    });
};