/*------------------------------|
 | Company Module | 			  	|
 |------------------------------|
 | @author xia.xie	        |
 |------------------------------*/
function CompanyModel() {
    this.getSort = function () {
        var s = '';
        s += "&sort=" + this.fieldMap.createTime + ":DESC";
        return s;
    };
}

CompanyModel.prototype = new EasyuiDatagrip();

CompanyModel.prototype.constructor = "CompanyModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
CompanyModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[{
        field: this.fieldMap.currStatus,
        title: '进度状态',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.qwd,
        title: '目的地',
        width: 15,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.jgdm,
        title: '统一社会信用代码或组织机构代码',
        width: 15,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.dwmc,
        title: '单位名称',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    },{
        field: this.fieldMap.sqlx,
        title: '申请类型',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.createTime,
        title: '申请时间',
        width: 15,
        align: 'center',
        formatter: function (val) {
            return $.commons.toDateString(val);
        }
    },{
        field: this.fieldMap.qthczt,
        title: '其他核查状态',
        width: 10,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }]];
    return a;
};
/**
 * 初始化页面
 */
CompanyModel.prototype._initContainer = function() {
	var fm = Easyui.getSelectedTab();
	// 初始化下拉框
	fm.find('[name="sl_startTime"]').datebox({
		width : 140
	});
	fm.find('[name="sl_endTime"]').datebox({
		width : 140
	});
	fm.find('[name="sq_startTime"]').datebox({
		width : 140
	});
	fm.find('[name="sq_endTime"]').datebox({
		width : 140
	});
};




CompanyModel.prototype._search = function() {
	var fm = Easyui.getSelectedTab();
	var _this = this;
	fm.find("#search_div").appendTo(fm.find(".datagrid-toolbar")).show();
	fm.find("#btnSearch").click(function() {
		var params = fm.find("#searchForm").serialize();
		params = params.replace(/\+/g, " ");
		params = decodeURIComponent(params, true);
		var paramsplit = params.split("&");
		var array = {};
		$.each(paramsplit, function(i, obj) {
			array[obj.split("=")[0]] = obj.split("=")[1];
		});
		_this.load(array);
	});
};


CompanyModel.prototype.launch = function() {
	if (Easyui.getSelectedTab().find('.edit_dlg').size() == 0) {
		// 默认情况下如果没有edit_dlg的样式的就根据save操作的dlg进行拷贝。
		Easyui.addEditDialogFromSaveDialogCopy();
	}
	Easyui.setTabFieldMap(this.fieldMap);// 把fieldMap传入tab，便于任意实体调用
	Easyui.setTabUrls(this.urls);// 把urls传入tab，便于任意实体调用
	this.setToolbar();
	if (this.datagrip_opts.onDblClickRow == undefined) {
		this.addDblClickRowEvent();// 添加默认的双击事件到每行上
	}
	this.initDatagrip();
	this.addSearchBox();// 添加查询框
	this._initContainer();
	this._search();
	
};