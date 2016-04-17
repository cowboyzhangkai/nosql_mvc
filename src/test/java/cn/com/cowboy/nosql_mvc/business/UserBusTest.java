package cn.com.cowboy.nosql_mvc.business;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import cn.com.cowboy.nosql_mvc.entity.Users;

/**
 * @author cowboy
 * @date ：2016年4月17日 下午4:59:40
 * @version 1.0
 */
public class UserBusTest extends BaseJUnit
{
	@Autowired
	private UserBus userBus;

	@Test
	public void testFindAll()
	{
		List<Users> result = userBus.findAll();
		for (Users users : result)
		{
			System.out.println(users.getCnName());
		}
	}

}
