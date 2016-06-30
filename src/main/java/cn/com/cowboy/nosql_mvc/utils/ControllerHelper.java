package cn.com.cowboy.nosql_mvc.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

public class ControllerHelper
{
	public ControllerHelper()
	{

	}

	public static String redirectToUrl(String s)
	{
		return "redirect:".concat(s);
	}

	public static HttpServletRequest getRequest()
	{
		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		return attrs.getRequest();
	}

	public static HttpServletResponse getResponse()
	{
		HttpServletResponse resp = ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
		return resp;
	}

	public static HttpSession getSession()
	{
		HttpSession session = null;
		try
		{
			session = getRequest().getSession();
		} catch (Exception e)
		{
		}
		return session;
	}
}
