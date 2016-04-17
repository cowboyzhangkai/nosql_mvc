package cn.com.cowboy.nosql_mvc.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

public class SecurityHelper {

	public SecurityHelper() {

	}

	public static String getLoginUsername() {
		Subject subject;
		if ((subject = SecurityUtils.getSubject()) == null
				|| subject.getPrincipal() == null)
			return null;
		else
			return subject.getPrincipal().toString();
	}

	public static boolean isAuthed() {
		return SecurityUtils.getSubject().getPrincipal() != null;
	}
}
