package cn.com.cowboy.nosql_mvc.business.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.cowboy.nosql_mvc.business.PersonBus;
import cn.com.cowboy.nosql_mvc.dao.PersonDao;
import cn.com.cowboy.nosql_mvc.entity.Person;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:27:21
 * @version 1.0
 */
@Service("personBus")
public class PersonBusImpl extends BaseAbstractService<Person, String> implements PersonBus
{
	@Autowired
	protected PersonDao personDao;

	public void setPersonDao(PersonDao personDao)
	{
		this.personDao = personDao;
	}
}
