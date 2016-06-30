/*------------------------------|
 | Dictionary Module | 			  	|
 |------------------------------|
 | @author xia.xie	        |
 |------------------------------*/
function DictionaryModel() {
    this.buttonText = {
        save: '添加签注信息',
        edit: '修改签注信息',
        remove: '删除签注信息'
    };
    this.jbxxDlg = {};
}

DictionaryModel.prototype = new EasyuiDatagrip();

DictionaryModel.prototype.constructor = "DictionaryModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
DictionaryModel.prototype._getDatagripColumnsOpts = function () {
    var a = [[{
        field: this.fieldMap.id,
        title: '签注id',
        width: 10
    }, {
        field: this.fieldMap.qwd,
        title: '目的地',
        width: 10,
        formatter: this._getColumnsFormatterHandel()
    }, {
        field: this.fieldMap.qzcs,
        title: '签注次数',
        width: 10,
        align: 'center'
    },{
        field: this.fieldMap.qzyxq,
        title: '签注有效期',
        width: 10,
        align: 'center'
    },{
        field: this.fieldMap.qzyxqdw,
        title: '签注有效期单位',
        width: 20,
        align: 'center'
    },{
        field: this.fieldMap.isshow,
        title: '外网是否显示',
        width: 20,
        align: 'center',
        formatter: this._getColumnsFormatterHandel()
    }]];
    return a;
};

/*
 * 初始化datagrip之前，添加功能按钮。（注：可根据权限判断是否添加。）
 */
DictionaryModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
    this._addQzSaveButton();
//    this._addQzEditButton();
    this._addQzRemoveButton();
};

DictionaryModel.prototype._addQzSaveButton = function () {
    var saveButton = new SaveButton(this.urls.save, this.buttonText.save);
    var saveDialog = new DictionarySaveDialog();
    saveButton.setDialog(saveDialog);
    this.addButton(saveButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(saveButton.getDialog().getFm());
};

DictionaryModel.prototype._addQzEditButton = function () {
    var editButton = new EditButton(this.urls.edit, this.buttonText.edit);
    var editDialog = new DictionaryEditDialog();
    editButton.setDialog(editDialog);
    this.addButton(editButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(editButton.getDialog().getFm());
};

DictionaryModel.prototype._addQzRemoveButton = function () {
    var removeButton = new RemoveButton(this.urls.remove,
        this.buttonText.remove);
    removeButton.setConfirmFieldName(this.fieldMap.name);
    this.addButton(removeButton);
};

function DictionarySaveDialog() {
}

DictionarySaveDialog.prototype = new SaveDialog();

DictionarySaveDialog.prototype.constructor = 'DictionarySaveDialog';

/*
 * 初始化“新增”操作的消息框前的前置操作
 */
DictionarySaveDialog.prototype._beforeDialogShow = function () {
    // 若需要异步加载数据，可在这里实现初始化
//    this.getFm()
//        .find(':input[name="' + Easyui.getTabFieldMap().isActive + '"]')
//        .prop('checked', true);
};

/*
 * “新增”操作信息成功返回后的操作。
 */
DictionarySaveDialog.prototype._afterSubmitSuccessHandler = function () {
    var _this = this;
    var _handler = function (data) {// remote data
        var _json = JSON.parse(data);
        var $dg = Easyui.getDatagrip();
        var $dlg = _this.getDialog();
        if (ResponseHelper.isSuccess(_json)) {
            $dlg.dialog('close'); // close the dialog
            $dg.datagrid('reload'); // reload the user data
        } else if (ResponseHelper.isExisted(_json)) {
            Easyui.info('抱歉，该信息已存在，请重新输入！');
        } else {
            Easyui.error();
        }
    };
    return _handler;
};

DictionarySaveDialog.prototype.validate = function () {
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

function DictionaryEditDialog() {
}

DictionaryEditDialog.prototype = new EditDialog();

DictionaryEditDialog.prototype.constructor = 'DictionaryEditDialog';

/*
 * “修改”操作信息成功返回后的操作。
 */
DictionaryEditDialog.prototype._afterSubmitSuccessHandler = function () {
    return DictionarySaveDialog.prototype._afterSubmitSuccessHandler.apply(this,
        arguments);
};

/*
 * 初始化“新增”操作的消息框前的前置操作
 */
DictionaryEditDialog.prototype._beforeDialogShow = function () {
    // 若需要异步加载数据，可在这里实现初始化
    this.getFm().find(
        ':input[name="' + Easyui.getTabFieldMap().loginName + '"]').prop(
        'disabled', true)
};

DictionaryEditDialog.prototype.validate = function () {
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

//报备指标信息
DictionaryModel.prototype._initBbzbxxDataGrid = function() {
	$("#bbzbxx").datagrid({
		url : Easyui.getTabUrls().bbzbList,
		method : 'get',
		fitColumns : true,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		toolbar: [{
			iconCls: 'icon-add',
			text:'添加指标',
			handler: function(){
//				$("#bbzb_fm input").clear();
				$(':input','#bbzb_fm').val('');  
				Easyui.getSelectedTab().find("#bbzb_div").show();
				$('#bbzb_div').dialog({
			    title: '添加指标',
			    width: 550,
			    height: 300,
			    closed: false,
			    cache: false,
			    modal: true,
			    buttons:[{
					iconCls : ButtonCls.ok,
					text:'保存',
					handler:function(){
						$('#bbzb_fm').attr('method', 'post');
						bbzbFormSubmit(Easyui.getTabUrls().bbzbSave);
					}
				},{
					iconCls : ButtonCls.cancel,
					text:'关闭',
					handler:function(){
						$("#bbzb_div").dialog('close');
					}
				}]
			    });
			}
		},'-',{
			iconCls: 'icon-edit',
			text:'修改指标',
			handler: function(){
				var row = $('#bbzbxx').datagrid('getSelected'); 
			     if (row) {  
				    	 Easyui.getSelectedTab().find("#bbzb_div").show();
				    	$('#bbzb_fm').form('load',row);
				    	var nsedArray=row.payAmount.split("-");
				    	var chedArray=row.payForeign.split("-");
				    	var jmsedArray=row.payLess.split("-");
				    	$("#nsed_begin").val(nsedArray[0]);
				    	$("#nsed_end").val(nsedArray[1]);
				    	$("#ched_begin").val(chedArray[0]);
				    	$("#ched_end").val(chedArray[1]);
				    	$("#jmsed_begin").val(jmsedArray[0]);
				    	$("#jmsed_end").val(jmsedArray[1]);
				    	$("#bazbrs_begin").val(row.zb);
						$('#bbzb_div').dialog({
					    title: '修改指标',
					    width: 550,
					    height: 300,
					    closed: false,
					    cache: false,
					    modal: true,
					    buttons:[{
								iconCls : ButtonCls.ok,
								text:'提交',
								handler:function(){
									$('#bbzb_fm').attr('method', 'get');
									bbzbFormSubmit(Easyui.getTabUrls().bbzbEdit+"?id="+row.id);
//									$('#bbzb_fm').attr('method', 'post');
//									$('#bbzb_fm').form('submit', {
//										url: Easyui.getTabUrls().bbzbEdit,
//										onSubmit: function(){
//											var isValid = true;
//											try {
//												isValid = $(this).form('validate');
//											} catch (e) {
//												Easyui.debug(e);
//											}
//											return isValid;
//										},
//										success : function(data){
////											var _json = JSON.parse(data);
//											var _json = eval('(' + data + ')');
//											alert(_json);
//											if (ResponseHelper.isSuccess(_json)) {
//												$('#bbzb_div').dialog('close'); // close the dialog
//												$('#bbzbxx').datagrid('reload'); // reload the user data
//											} else if (ResponseHelper.isExisted(_json)) {
//												Easyui.info('抱歉，信息已存在，请重新输入！');
//											} else {
//												Easyui.error();
//											}
//										},
//										onLoadError : function() {
//											easyui.error('抱歉，系统出错。提交失败！');
//										}
//									});
								}
							},{
								iconCls : ButtonCls.cancel,
								text:'关闭',
								handler:function(){
									$("#bbzb_div").dialog('close');
								}
							}]
					    });
			    	  
			     }else{
			    	 Easyui.info(Messages.noSelected);  
				     return; 
			     }  
			}
		},'-',{
			iconCls: 'icon-remove',
			text:'删除指标',
			handler: function(){
				var row = $('#bbzbxx').datagrid('getSelected');  
				if (row) {
					var msg = Messages.removeConfirm;
					var _url = Easyui.getTabUrls().bbzbRemove;
					$.messager.confirm('确认提示', msg, function(r) {
						if (r) {
							$.getJSON(_url, {id:row.id}, function(result) {
								if (result.success) {
									$('#bbzbxx').datagrid('reload');
								} else {
									Easyui.error('抱歉，系统出错。删除失败！');
								}
							});
						}
					});
				} else {
					Easyui.info(Messages.noSelected);
				}
			}
		}],
		columns : [ [ {
			field : 'id',
			hidden : true
		 }, {
			field : "payAmount",
			title : '纳税额度（人民币）',
			width : 10,
			align : 'center'
		}, {
			field : "payForeign",
			title : '创汇额度（美元）',
			width : 10,
			align : 'center'
		}, {
			field : "payLess",
			title : '减免税额度（人民币）',
			width : 10,
			align : 'center'
		}, {
			field : "zb",
			title : '备案指标人（人数）',
			width : 10,
			align : 'center'
		}, {
			field : "qzzl",
			title : '可办理签注有效期',
			width : 10,
			align : 'center'
		}] ]
	});
};

//基本信息
DictionaryModel.prototype._initJbxxDataGrid = function() {
	var _this = this;
	$("#jbxx").datagrid({
		url : Easyui.getTabUrls().jbxxList,
		method : 'get',
		fitColumns : true,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		toolbar: [{
			iconCls: 'icon-add',
			text:'添加信息',
			handler: function(){
				Easyui.getSelectedTab().find("#jbxx_div").show();
				$('#jbxx_div').dialog({
				    title: '字典添加',
				    width: 450,
				    height: 200,
				    closed: false,
				    cache: false,
				    modal: true,
				    buttons:[{
						iconCls : ButtonCls.ok,
						text:'保存',
						handler:function(){
							$('#jbxx_fm').attr('method', 'post');
							$('#jbxx_fm').form('submit', {
								url: Easyui.getTabUrls().jbxxSave,
								onSubmit: function(param){
									var isValid = true;
									try {
										isValid = $(this).form('validate');
									} catch (e) {
										Easyui.debug(e);
									}
									return isValid;
								},
								success : function(data){
									var _json = JSON.parse(data);
									if (ResponseHelper.isSuccess(_json)) {
										$('#jbxx_div').dialog('close'); // close the dialog
										$('#jbxx').datagrid('reload'); // reload the user data
									} else if (ResponseHelper.isExisted(_json)) {
										Easyui.info('抱歉，信息已存在，请重新输入！');
									} else {
										Easyui.error();
									}
								},
								onLoadError : function() {
									easyui.error('抱歉，系统出错。提交失败！');
								}
							});
						}
					},{
						iconCls : ButtonCls.cancel,
						text:'关闭',
						handler:function(){
							$("#jbxx_div").dialog('close');
						}
					}]
			    });
			}
		}
//		,'-',{
//			iconCls: 'icon-edit',
//			text:'修改信息',
//			handler: function(){
//				var row = $('#jbxx').datagrid('getSelected');  
//			     if (row) {  
//			    	 Easyui.getSelectedTab().find("#jbxx_div").show();
//			    	 $('#jbxx_fm').form('load',row);
//						$('#jbxx_div').dialog({
//					    title: '字典修改',
//					    width: 450,
//					    height: 200,
//					    closed: false,
//					    cache: false,
//					    modal: true,
//					    buttons:[{
//							iconCls : ButtonCls.ok,
//							text:'提交',
//							handler:function(){
//								$('#jbxx_fm').attr('method', 'post');
//								$('#jbxx_fm').form('submit', {
//									url: Easyui.getTabUrls().jbxxEdit,
//									onSubmit: function(param){
//										var isValid = true;
//										try {
//											isValid = $(this).form('validate');
//										} catch (e) {
//											Easyui.debug(e);
//										}
//										return isValid;
//									},
//									success : function(data){
//										var _json = JSON.parse(data);
//										if (ResponseHelper.isSuccess(_json)) {
//											$('#jbxx_div').dialog('close'); // close the dialog
//											$('#jbxx').datagrid('reload'); // reload the user data
//										} else if (ResponseHelper.isExisted(_json)) {
//											Easyui.info('抱歉，信息已存在，请重新输入！');
//										} else {
//											Easyui.error();
//										}
//									},
//									onLoadError : function() {
//										easyui.error('抱歉，系统出错。提交失败！');
//									}
//								});
//							}
//						},{
//							iconCls : ButtonCls.cancel,
//							text:'关闭',
//							handler:function(){
//								$("#jbxx_div").dialog('close');
//							}
//						}]
//					    });
//			     }else{
//			    	 Easyui.info(Messages.noSelected);  
//				        return;  
//			     } 
//			}
//		}
	,'-',{
			iconCls: 'icon-remove',
			text:'删除信息',
			handler: function(){
				var rows = $("#jbxx").datagrid('getSelected');
				if (null != rows) {
					var msg = Messages.removeConfirm;
					var _url = Easyui.getTabUrls().jbxxRemove;
					$.messager.confirm('确认提示', msg, function(r) {
						if (r) {
							$.getJSON(_url, {id:rows.id}, function(result) {
								if (result.success) {
									$('#jbxx').datagrid('reload'); 
								} else {
									Easyui.error();
								}
							});
						}
					});
				} else {
					Easyui.info(Messages.noSelected);
				}
			}
		}],
		columns : [ [{
			field : 'id',
			hidden : true
		 }, {
			field : "dicCode",
			title : '字典代码',
			width : 10,
			align : 'center',
		}, {
			field : "dicName",
			title : '字典类别',
			width : 10,
			align : 'center'
		}, {
			field : "dicText",
			title : '字典内容',
			width : 10,
			align : 'center'
		}] ]
	});
};

DictionaryModel.prototype.launch = function() {
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
	this._initJbxxDataGrid();//加载基本信息列表
	this._initBbzbxxDataGrid();//加载报备指标信息列表
};

//签注种类点击事件
function qzzlClick(){
	var qzxx=$('input[name="qzxx"]:checked').val();
	var qzxxArray=qzxx.split(',');
	for(var i=0;i<qzxxArray.length;i++){
		var qzyxq=qzxxArray[0];
		var qzyxqdw=qzxxArray[1];
		var qzyxcs=qzxxArray[2];
		$("input[name='qzyxq']").val(qzyxq);
		$("input[name='qzyxqdw']").val(qzyxqdw);
		$("input[name='qzcs']").val(qzyxcs);
	}
	$("input[name='qwd']").val("hkg");
	$("input[name='isshow']").val("1");
}
/**
 * 报备指标数据提交
 */
function bbzbFormSubmit(url){
	//纳税额度
	var nsed_ifbk_begin=$('#nsed_ifbk_begin option:selected').val()==1?'包括':'不包括';
	var nsed_begin=$("#nsed_begin").val();
	var nsed_ifbk_end=$("#nsed_ifbk_end option:selected").val()==1?'包括':'不包括';
	var nsed_end=$("#nsed_end").val();
//	$('#bbzb_fm').find("[name='payAmount']").val(nsed_ifbk_begin+nsed_begin+"-"+nsed_ifbk_end+nsed_end);
	$('#bbzb_fm').find("[name='payAmount']").val(nsed_begin+"-"+nsed_end);
	//创汇额度
	var ched_ifbk_begin=$('#ched_ifbk_begin option:selected').val()==1?'包括':'不包括';
	var ched_begin=$("#ched_begin").val();
	var ched_ifbk_end=$("#ched_ifbk_end option:selected").val()==1?'包括':'不包括';
	var ched_end=$("#ched_end").val();
//	$('#bbzb_fm').find("[name='payForeign']").val(ched_ifbk_begin+ched_begin+"-"+ched_ifbk_end+ched_end);
	$('#bbzb_fm').find("[name='payForeign']").val(ched_begin+"-"+ched_end);
	//减免税额度
	var jmsed_ifbk_begin=$('#jmsed_ifbk_begin option:selected').val()==1?'包括':'不包括';
	var jmsed_begin=$("#jmsed_begin").val();
	var jmsed_ifbk_end=$("#jmsed_ifbk_end option:selected").val()==1?'包括':'不包括';
	var jmsed_end=$("#jmsed_end").val();
//	$('#bbzb_fm').find("[name='payLess']").val(jmsed_ifbk_begin+jmsed_begin+"-"+jmsed_ifbk_end+jmsed_end);
	$('#bbzb_fm').find("[name='payLess']").val(jmsed_begin+"-"+jmsed_end);
	//备案指标人数
	var bazbrs_ifbk_begin=$('#bazbrs_ifbk_begin option:selected').val();
	var bazbrs_begin=$("#bazbrs_begin").val();
//	$('#bbzb_fm').find("[name='zb']").val(bazbrs_ifbk_begin+bazbrs_begin+'人');
	$('#bbzb_fm').find("[name='zb']").val(bazbrs_begin);

	
	$('#bbzb_fm').form('submit', {
		url: url,
		onSubmit: function(){
			var isValid = true;
			try {
				isValid = $(this).form('validate');
			} catch (e) {
				Easyui.debug(e);
			}
			return isValid;
		},
		success : function(data){
			var _json = JSON.parse(data);
			if (ResponseHelper.isSuccess(_json)) {
				$('#bbzb_div').dialog('close'); // close the dialog
				$('#bbzbxx').datagrid('reload'); // reload the user data
			} else if (ResponseHelper.isExisted(_json)) {
				Easyui.info('抱歉，信息已存在，请重新输入！');
			} else {
				Easyui.error();
			}
		},
		onLoadError : function() {
			easyui.error('抱歉，系统出错。提交失败！');
		}
	});
}