/**
 * Copyright (c) 2005-2012 https://github.com/zhangkaitao
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package cn.com.cowboy.nosql_mvc.web.filter;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;

import cn.com.cowboy.nosql_mvc.utils.SecurityHelper;


/**
 * <b>类名称：</b>CustomFormAuthenticationFilter<br/>
 * <b>类描述：</b>重写登录的过滤器，可添加自定义跳转功能<br/>
 * <b>创建时间：</b>17 Dec, 2015 4:25:30 pm<br/>
 * <b>备注：</b><br/>
 * 
 * @author cowboy <br />
 * @version 1.0.0 <br/>
 */
public class CustomFormAuthenticationFilter extends FormAuthenticationFilter
{

	private final Log logger = LogFactory.getLog(getClass());
	/**
	 * 默认的成功地址
	 */
	private String defaultSuccessUrl;

	@Override
	protected void setFailureAttribute(ServletRequest request, AuthenticationException ae)
	{
		logger.debug(ae.getMessage());
		// 存放到session便于获取
		((HttpServletRequest) request).getSession().setAttribute(getFailureKeyAttribute(), ae);
		request.setAttribute(getFailureKeyAttribute(), ae);
	}

	public void setDefaultSuccessUrl(String defaultSuccessUrl)
	{
		this.defaultSuccessUrl = defaultSuccessUrl;
	}

	@Override
	protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request,
			ServletResponse response)
	{
		super.onLoginFailure(token, e, request, response);
		try
		{
			boolean contextRelative = true;
			// 继续返回true，不继续返回false。继续的时候会调用post方法返回login页面，但mvc:resource资源不支持。
			// 重写此方法，返回false，自己跳转。但不能用WebUtils.redirectToSavedRequest会丢失request保存信息。
			WebUtils.issueRedirect(request, response, getLoginUrl(), null, contextRelative);
			return false;
		} catch (IOException e1)
		{
			e1.printStackTrace();
			return true;
		}
	}

	/**
	 * 根据用户选择成功地址
	 * 
	 * @return String
	 */
	@Override
	public String getSuccessUrl()
	{
		// String username = (String) SecurityUtils.getSubject().getPrincipal();
		// Users user = userBus.findByName(username);
		// if (user != null && Boolean.TRUE.equals(user.getAdmin())) {
		// return getAdminDefaultSuccessUrl();
		// }
		return this.defaultSuccessUrl;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.shiro.web.filter.AccessControlFilter#onPreHandle(javax.servlet
	 * .ServletRequest, javax.servlet.ServletResponse, java.lang.Object)
	 */
	@Override
	public boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception
	{
		boolean isAccessAllowed = super.onPreHandle(request, response, mappedValue);
		if (isAccessAllowed && isLoginRequest(request, response) && SecurityHelper.isAuthed())
		{
			// 已登录成功的用户访问登录页面就让他重新跳到登录成功页面。
			issueSuccessRedirect(request, response);
			return false;
		}
		return isAccessAllowed;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.shiro.web.filter.authc.FormAuthenticationFilter#onLoginSuccess
	 * (org.apache.shiro.authc.AuthenticationToken,
	 * org.apache.shiro.subject.Subject, javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse)
	 */
	@Override
	protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
			ServletResponse response) throws Exception
	{
		this.setUserInstanceToSession(subject.getPrincipal().toString());
		return super.onLoginSuccess(token, subject, request, response);
	}

	/**
	 * <p>
	 * 把用户对象放到session中。
	 * </p>
	 * 
	 * @param username
	 */
	private void setUserInstanceToSession(String username)
	{
		// SecurityUtils.getSubject().getSession().setAttribute("cuser",
		// userBus.findByName(username));
	}

}
