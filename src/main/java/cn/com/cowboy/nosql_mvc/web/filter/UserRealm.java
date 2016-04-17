package cn.com.cowboy.nosql_mvc.web.filter;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class UserRealm extends AuthorizingRealm
{

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection)
	{
		return super.getAuthorizationInfo(principalCollection);
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException
	{
		return super.getAuthenticationInfo(token);
	}
}
