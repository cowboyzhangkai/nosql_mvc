package cn.com.cowboy.nosql_mvc.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.com.cowboy.nosql_mvc.business.PersonBus;
import cn.com.cowboy.nosql_mvc.entity.Person;

/**
 * @author cowboy
 * @date ：2016年6月29日 下午8:42:08
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations =
{ "classpath:applicationContext.xml" })
public class PersonDaoTest
{
	@Autowired
	public PersonDao personDao;

	@Autowired
	public PersonBus personBus;

	/**
	 * 在数据库test_mongodb中创建一个collection集合staff
	 */
	@Test
	public void test1()
	{
		personDao._test();

		List<Person> items = personDao.findList(0, 3);
		for (Person person : items)
		{
			System.out.println(person.getName());
		}
	}
	@Test
	public void test2()
	{

		List<Person> items = personBus.findList(0, 3);
		for (Person person : items)
		{
			System.out.println(person.getName());
		}
	}
}
