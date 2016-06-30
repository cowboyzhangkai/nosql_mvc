/*------------------------------|
 | User Module | 			  	|
 |------------------------------|
 | @author Kenny Lee	        |
 |------------------------------*/
function RoleModel() {
    this.buttonText = {
        save: '添加角色',
        edit: '修改角色',
        remove: '删除角色'
    };
    this.getSort = function () {
        var s = '';
        s += "&sort=" + this.fieldMap.createTime + ":DESC";
        s += "&sort=" + this.fieldMap.name;
        return s;
    };
}

RoleModel.prototype = new EasyuiDatagrip();

RoleModel.prototype.constructor = "RoleModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
RoleModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[{
        field: this.fieldMap.id,
        title: '角色id',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.name,
        title: '角色名称',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.cnName,
        title: '角色显示名称',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.position,
        title: '排序号',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.createTime,
        title: '创建时间',
        width: 20,
        align: 'center',
        formatter: function (val) {
            return $.commons.toDateString(val);
        }
    }]];
    return a;
};

/*
 * 初始化datagrip之前，添加功能按钮。（注：可根据权限判断是否添加。）
 */
RoleModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
    this._addSaveButton();
    this._addEditButton();
    this._addRemoveButton();
};

RoleModel.prototype._addSaveButton = function () {
    var saveButton = new SaveButton(this.urls.save, this.buttonText.save);
    var saveDialog = new RoleSaveDialog();
    saveButton.setDialog(saveDialog);
    this.addButton(saveButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(saveButton.getDialog().getFm());
};

RoleModel.prototype._addEditButton = function () {
    var editButton = new EditButton(this.urls.edit, this.buttonText.edit);
    var editDialog = new RoleEditDialog();
    editButton.setDialog(editDialog);
    this.addButton(editButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(editButton.getDialog().getFm());
};

RoleModel.prototype._addRemoveButton = function () {
    var removeButton = new RemoveButton(this.urls.remove,
        this.buttonText.remove);
    removeButton.setConfirmFieldName(this.fieldMap.name);
    this.addButton(removeButton);
};

function RoleSaveDialog() {
}

RoleSaveDialog.prototype = new SaveDialog();

RoleSaveDialog.prototype.constructor = 'RoleSaveDialog';

///*
// * 初始化“新增”操作的消息框前的前置操作
// */
//RoleSaveDialog.prototype._beforeDialogShow = function () {
//    // 若需要异步加载数据，可在这里实现初始化
//    this.getFm()
//        .find(':input[name="' + Easyui.getTabFieldMap().isActive + '"]')
//        .prop('checked', true);
//};

/*
 * “新增”操作信息成功返回后的操作。
 */
RoleSaveDialog.prototype._afterSubmitSuccessHandler = function () {
    var _this = this;
    var _handler = function (data) {// remote data
        var _json = JSON.parse(data);
        var $dg = Easyui.getDatagrip();
        var $dlg = _this.getDialog();
        if (ResponseHelper.isSuccess(_json)) {
            $dlg.dialog('close'); // close the dialog
            $dg.datagrid('reload'); // reload the user data
        } else if (ResponseHelper.isExisted(_json)) {
            Easyui.info('抱歉，该角色已存在，请重新输入！');
        } else {
            Easyui.error();
        }
    };
    return _handler;
};

RoleSaveDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="name"]').validatebox({
        required: true,
        validType: ['name', 'length[1,32]'],
        invalidMessage: '无效的角色名，请输入1-32位的英文、数字或下划线！'

    });
    $fm.find(':input[name="cnName"]').validatebox({
        required: true,
        validType: ['cnName', 'length[1,128]'],
        invalidMessage: '无效的角色显示名称，请输入1-128位的英文、数字或下划线！'
    });
    $fm.find(':input[name="position"]').validatebox({
        required: true,
        validType: ['cnName', 'length[1,3]'],
        invalidMessage: '无效的排序号，请输入1-3位的字符！'
    });
};

function RoleEditDialog() {
}

RoleEditDialog.prototype = new EditDialog();

RoleEditDialog.prototype.constructor = 'RoleEditDialog';

/*
 * “修改”操作信息成功返回后的操作。
 */
RoleEditDialog.prototype._afterSubmitSuccessHandler = function () {
    return RoleSaveDialog.prototype._afterSubmitSuccessHandler.apply(this,
        arguments);
};

/*
 * 初始化“新增”操作的消息框前的前置操作
 */
RoleEditDialog.prototype._beforeDialogShow = function () {
    // 若需要异步加载数据，可在这里实现初始化
    this.getFm().find(
        ':input[name="' + Easyui.getTabFieldMap().loginName + '"]').prop(
        'disabled', true)
};

RoleEditDialog.prototype.validate = function () {
    var $fm = this.getFm();
    $fm.find(':input[name="name"]').validatebox({
        required: true,
        validType: ['name', 'length[1,32]'],
        invalidMessage: '无效的角色名，请输入1-32位的英文、数字或下划线！'

    });
    $fm.find(':input[name="cnName"]').validatebox({
        required: true,
        validType: ['cnName', 'length[1,128]'],
        invalidMessage: '无效的角色显示名称，请输入1-128位的英文、数字或下划线！'
    });
    $fm.find(':input[name="position"]').validatebox({
        required: true,
        validType: ['cnName', 'length[1,3]'],
        invalidMessage: '无效的排序号，请输入1-3位的字符！'
    });
};