/*------------------------------|
 | Purview Module | 			  	|
 |------------------------------|
 | @author xia.xie	        |
 |------------------------------*/
function PurviewModel() {
    this.buttonText = {
        save: '添加角色',
    };
    this.UserInfoDlg = {};
}

PurviewModel.prototype = new EasyuiDatagrip();

PurviewModel.prototype.constructor = "PurviewModel";

/*
 * 配置datagrip的JSON对象表头和字段显示
 */
PurviewModel.prototype._getDatagripColumnsOpts = function () {
	 var a = [[{
	        field: this.fieldMap.id,
	        title: '角色id',
	        width: 5,
	        hidden: true
	        //formatter: this._getColumnsFormatterHandel()
	    }, {
	        field: this.fieldMap.name,
	        title: '角色名称',
	        width: 10,
	        formatter: this._getColumnsFormatterHandel()
	    },{
			field : this.fieldMap.position,
			title : '操作',
			width : 10,
			align : 'center',
			formatter : function(val, row, i) {
				return '<input type="button" value="角色用户" roleId="'
						+ row.id + '" roleName="'+row.name+'">&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="角色权限" roleId="'
						+ row.id + '" roleName="'+row.name+'">';
			}
		}]];
	    return a;
};

/*
 * 初始化datagrip之前，添加功能按钮。（注：可根据权限判断是否添加。）
 */
PurviewModel.prototype.setToolbar = function () {
    this.toolbar = new Array();
//    this._addSaveButton();
//    this._addEditButton();
};

PurviewModel.prototype._addSaveButton = function () {
    var saveButton = new SaveButton(this.urls.save, this.buttonText.save);
    var saveDialog = new PurviewSaveDialog();
    saveButton.setDialog(saveDialog);
    this.addButton(saveButton);
    // 初始化完成后才重置form的input name，确保跟接口的一致
    this._resetInputNames(saveButton.getDialog().getFm());
};

//PurviewModel.prototype._addEditButton = function () {
//    var editButton = new EditButton(this.urls.edit, this.buttonText.edit);
//    var editDialog = new PurviewEditDialog();
//    editButton.setDialog(editDialog);
//    this.addButton(editButton);
//    // 初始化完成后才重置form的input name，确保跟接口的一致
//    this._resetInputNames(editButton.getDialog().getFm());
//};


function PurviewSaveDialog() {
	
}

PurviewSaveDialog.prototype = new SaveDialog();

PurviewSaveDialog.prototype.constructor = 'PurviewSaveDialog';

/*
 * “新增”操作信息成功返回后的操作。
 */
PurviewSaveDialog.prototype._afterSubmitSuccessHandler = function () {
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

PurviewModel.prototype._search = function() {
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

PurviewModel.prototype.launch = function() {
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
	this._search();
	if (this.UserInfoDlg && this.UserInfoDlg.length > 0) {
		// 如果存在就不用初始化
		// do nothing
	} else {
		this._initUserInfoDlg();
	}
	this._initUserInfoDataGrid();
	PurviewDialog();
	PurviewDialog.prototype._initMyDialog();
	PurviewDialog.prototype._initDataGrid();
	$("#addUserInfo").click(function(){
		PurviewDialog.prototype.open();
	});
};

PurviewModel.prototype.initDatagrip = function() {
	var _this = this;
	this.setOpts({
				columns : this._getDatagripColumnsOpts(),
				url : this.getURL(),
				checkOnSelect : false,
				onLoadSuccess : function(data) {
					Easyui.emptyDataHandle(data);
					var panel = Easyui.getDatagrip().datagrid('getPanel');
					var inp1 = panel.find('input[type="button"][value="角色用户"]');
					inp1.each(function() {
								$(this).unbind('click');
								$(this).click(function() {
													var roleId = $(this).attr('roleId');
													_this.UserInfoDlg.find("#user_role").html($(this).attr('roleName'));
													_this.UserInfoDlg.find("#searchName").val('');
													$("#user_roleId").val(roleId);//用户传人到选择用户页面
													_this.UserInfoDlg.find('.btn_Search').unbind('click');
													_this.UserInfoDlg.find('.btn_Search').click(
																	function() {
																		var queryParams = new Object();
																		queryParams["roleId"] = roleId;
																		queryParams["detailDescription"] = _this.UserInfoDlg.find("#searchName").val();
																		_this.userInfoDataGrid.datagrid('load',queryParams);
																	});
													_this.userInfoDataGrid.datagrid('load',{roleId : roleId});
													_this.UserInfoDlg.dialog('open');
												});
							});
				}
			});
	Easyui.getDatagrip().datagrid(this.datagrip_opts);
};
PurviewModel.prototype._initUserInfoDlg = function() {
	Easyui.getSelectedTab().find('.showUserInfo_div').show();
	this.UserInfoDlg = Easyui.getSelectedTab().find(".showUserInfo_div").dialog({
				title : '角色所属用户信息',
				resizable : true,
				width : 850,
				height : 350,
				closed : true,
				cache : false,
				modal : true
			});
};

PurviewModel.prototype._initUserInfoDataGrid = function() {
	this.userInfoDataGrid = this.UserInfoDlg.find(".showUserInfo_tb").datagrid({
		url : Easyui.getTabUrls().rolePurviewUser,
		method : 'get',
		fitColumns : true,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		columns : [ [ {
			field : "user.name",
			title : '用户账号',
			width : 10,
			align : 'center',
			formatter: this._getColumnsFormatterHandel(),
			styler : function(value, row, index) {
				if (row.shareStatus != 1) {
					return "color: #0000ff;";
				}
			}
		}, {
			field : "user.cnName",
			title : '用户姓名',
			width : 10,
			align : 'center',
			formatter: this._getColumnsFormatterHandel(),
			styler : function(value, row, index) {
				if (row.shareStatus != 1) {
					return "color: #0000ff;";
				}
			}
		}, {
			field : "user.isActive",
			title : '是否激活',
			width : 10,
			formatter: this._getColumnsFormatterHandel(),
			styler : function(value, row, index) {
				if (row.shareStatus != 1) {
					return "color: #0000ff;";
				}
			}
		}, {
			field : "createTime",
			title : '创建时间',
			width : 10,
			align : 'center',
			formatter:function(val, row, i) {
				return $.commons.toBooleanString(val);
			}
		}, {
			field : "user.id",
			title : '操作',
			width : 10,
			formatter : function(val, row, i) {
				return '<input type="button" color="red" value="移除" roleId="'
						+ val + '"  onclick="deleteRoleUser("'+val+'")">';
			}
		} ] ]
	});
};

function PurviewDialog() {
	this.Purview = Easyui.getSelectedTab().find(".showUserlist_div");
}
PurviewDialog.prototype = new SaveDialog();

PurviewDialog.prototype.constructor = 'PurviewDialog';

PurviewDialog.prototype._initMyDialog = function() {
	var dialog = this.Purview;
	Easyui.getSelectedTab().find(".showUserlist_div").show();
	this.myDialog = $(".showUserlist_div").dialog({
		title : '用户信息',
		resizable : true,
		width : 600,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		buttons:[{
			iconCls : ButtonCls.ok,
			text:'保存',
			handler:function(){
				var rows =$(".showUserlistInfo_tb").datagrid('getSelections');
//				var ids=[];  
				var ids="";
			    for(var i=0;i<rows.length;i++){  
//			        ids.push(rows[i].id); 
			    	ids+=rows[i].id+",";
			    }  
			    ids=ids.substring(0,ids.length-1);
			    alert(ids);
			    var roleId=$("#user_roleId").val();
				$.ajax({
			        url: Easyui.getTabUrls().createByParam,
			        type: "post",
			        data: {roleId:roleId,userIds:ids},
			        cache : false,
			        async : false,
			        dataType: "json",
			        success: function (date, status, ajaxObj) {
			            if(date.success){
			            	$(".showUserlist_div").dialog('close');
							$('.showUserInfo_tb').datagrid('reload');
			            }else{
			            	Easyui.error();
			            }
			        },
			        error: function (e, t, w) {
			        	Easyui.error('抱歉，系统出错。提交失败！');
			        },
			        beforeSend: function () {
			        },
			        complete: function () {
			        }
			    });
			}
		},{
			iconCls : ButtonCls.cancel,
			text:'关闭',
			handler:function(){
				$(".showUserlist_div").dialog('close');
			}
		}]
	});
};
PurviewDialog.prototype._initDataGrid = function() {
	var dialog = this.Purview;
	var _this = this;
//	Easyui.getSelectedTab().find("#showUserlistInfo_tb").datagrid({
	$("#showUserlistInfo_tb").datagrid({
		url : Easyui.getTabUrls().getUserList,
		method : 'get',
		fitColumns : true,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		singleSelect: false,
		selectOnCheck: true,
		checkOnSelect: true,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		} , {
			field : "name",
			title : '用户账号',
			width : 25
		},{
			field : "cnName",
			title : '用户姓名',
			width : 25
		}, {
			field : "phone",
			title : '联系电话',
			width : 40,
			align : 'center'
		}, {
			field : "isActive",
			title : '是否激活',
			width : 20,
			align : 'center',
			formatter:function(val, row, i) {
					return $.commons.toBooleanString(val);
			}
				
		}, {
			field : "createTime",
			title : '创建时间',
			width : 60,
			align : 'center',
			formatter: function (val) {
	            return $.commons.toDateString(val);
	        }
		}, {
			field : 'id',
			hidden : true
		} ] ],
		onDblClickRow : function(rowIndex, rowData) {
//			var tab = _this.myDialog;
//			alert(rowData.id);
//			fm.find(".contactinfoName").val(rowData.name);
//			fm.find("[name='contactinfoId']").val(rowData.id);
//			tab.dialog('close');
		}
	});
};

function deleteRoleUser(userId) {
				$.ajax({
			        url: Easyui.getTabUrls().userRemove,
			        type: "post",
			        data: {userId:userId},
			        cache : false,
			        async : false,
			        dataType: "json",
			        success: function (date, status, ajaxObj) {
			            if(date.success){
							$('.showUserInfo_tb').datagrid('reload');
			            }else{
			            	Easyui.error();
			            }
			        },
			        error: function (e, t, w) {
			        	Easyui.error('抱歉，系统出错。提交失败！');
			        },
			        beforeSend: function () {
			        },
			        complete: function () {
			        }
			    });
};

PurviewDialog.prototype.open = function() {
	if (this.getDialog() == false) {
		alert('Do init method before, please!');
	} else {
//		this.getFm().form('clear');
		this._beforeDialogShow();

		console.log(Purview);
		Purview.dialog("open");
	}
};
