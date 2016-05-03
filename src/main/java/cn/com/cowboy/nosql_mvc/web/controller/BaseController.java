package cn.com.cowboy.nosql_mvc.web.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.cowboy.nosql_mvc.utils.ControllerHelper;

/**
 * @author cowboy
 * @date ：2016年4月20日 下午12:53:54
 * @version 1.0
 */
public class BaseController
{
	protected final Log logger = LogFactory.getLog(super.getClass());

	protected String getParam(String paramString)
	{
		return ControllerHelper.getRequest().getParameter(paramString);
	}

	protected String[] getParams(String paramString)
	{
		return ControllerHelper.getRequest().getParameterValues(paramString);
	}
}
