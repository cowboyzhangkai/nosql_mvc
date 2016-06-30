/*------------------------------|
 | Syslog Module | 			  	|
 |------------------------------|
 | @author xia.xie	        |
 |------------------------------*/
function NoticeModel() {
    this.getSort = function () {
        var s = '';
        s += "&sort=" + this.fieldMap.operatorTime + ":DESC";
        s += "&sort=" + this.fieldMap.userName;
        return s;
    };
}

NoticeModel.prototype = new EasyuiDatagrip();

NoticeModel.prototype.constructor = "NoticeModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
NoticeModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[{
        field: this.fieldMap.noticeUserTime,
        title: '通知用户时间',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.jgdm,
        title: '统一社会信用代码或组织机构代码',
        width: 15,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.dwmc,
        title: '单位名称',
        width: 20,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.dwlxrxm,
        title: '联系人',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.dwlxrdh,
        title: '联系电话',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.sqlx,
        title: '处理类型',
        width: 15,
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
NoticeModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
};
NoticeModel.prototype.launch = function() {
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
