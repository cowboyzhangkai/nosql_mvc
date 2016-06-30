/*------------------------------|
 | Syslog Module | 			  	|
 |------------------------------|
 | @author xia.xie	        |
 |------------------------------*/
function SysLogModel() {
    this.getSort = function () {
        var s = '';
        s += "&sort=" + this.fieldMap.createDate + ":DESC";
        s += "&sort=" + this.fieldMap.id;
        return s;
    };
}

SysLogModel.prototype = new EasyuiDatagrip();

SysLogModel.prototype.constructor = "SysLogModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
SysLogModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[{
        field: this.fieldMap.id,
        title: '日志id',
        width: 15,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.operationTable,
        title: '修改的表名',
        width: 15,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.operationTablePk,
        title: '修改的表名主键',
        width: 15,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.operationContent,
        title: '被修改前的数据',
        width: 15,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.operationPeople,
        title: '操作人',
        width: 15,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.createDate,
        title: '操作时间',
        width: 30,
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
SysLogModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
};
SysLogModel.prototype.launch = function() {
	if (Easyui.getSelectedTab().find('.edit_dlg').size() == 0) {
		// 默认情况下如果没有edit_dlg的样式的就根据save操作的dlg进行拷贝。
		//Easyui.addEditDialogFromSaveDialogCopy();
	}
	Easyui.setTabFieldMap(this.fieldMap);// 把fieldMap传入tab，便于任意实体调用
	Easyui.setTabUrls(this.urls);// 把urls传入tab，便于任意实体调用
//	this.setToolbar();
	if (this.datagrip_opts.onDblClickRow == undefined) {
		this.addDblClickRowEvent();// 添加默认的双击事件到每行上
	}
	this.initDatagrip();
	this.addSearchBox();// 添加查询框
};
