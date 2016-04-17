package cn.com.cowboy.nosql_mvc.business;

import java.util.List;

import cn.com.cowboy.nosql_mvc.entity.Users;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:26:09
 * @version 1.0
 */
public interface UserBus
{
	public Users save(Users users);

	public List<Users> findAll();
}
