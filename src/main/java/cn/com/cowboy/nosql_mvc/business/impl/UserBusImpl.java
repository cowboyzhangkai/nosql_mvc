package cn.com.cowboy.nosql_mvc.business.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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
	private static String USER_COLLECTION = "users";
	private static Log logger = LogFactory.getLog(UserBusImpl.class);

	@Resource
	private MongoTemplate mongoTemplate;

	public Users save(Users users)
	{
		mongoTemplate.save(users);
		return null;
	}

	public List<Users> findAll()
	{
		List<Users> results = mongoTemplate.findAll(Users.class);
		return results;
	}

	@Override
	public void update()
	{
		Criteria c = new Criteria();
		Criteria name = Criteria.where("name").is("李刚");
		Criteria pass = Criteria.where("password").is("222222");
		c.andOperator(name, pass);
		Query query = new Query();
		query.addCriteria(c);
		Update update = new Update();
		update.set("password", "333333");
		mongoTemplate.updateFirst(query, update, Users.class);
	}

}
