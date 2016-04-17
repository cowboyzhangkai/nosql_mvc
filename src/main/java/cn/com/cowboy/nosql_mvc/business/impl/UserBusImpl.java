package cn.com.cowboy.nosql_mvc.business.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import cn.com.cowboy.nosql_mvc.business.UserBus;
import cn.com.cowboy.nosql_mvc.entity.Users;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:27:21
 * @version 1.0
 */
@Service("userBus")
public class UserBusImpl implements UserBus
{
	private static String USER_COLLECTION = "user";

	@Resource
	private MongoTemplate mongoTemplate;

	public Users save(Users users)
	{
		return null;
	}

	public List<Users> findAll()
	{
		List<Users> results = mongoTemplate.findAll(Users.class, USER_COLLECTION);
		return results;
	}

}
