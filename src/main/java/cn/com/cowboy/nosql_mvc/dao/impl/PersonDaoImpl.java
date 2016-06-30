package cn.com.cowboy.nosql_mvc.dao.impl;

import org.springframework.stereotype.Repository;

import cn.com.cowboy.nosql_mvc.dao.PersonDao;
import cn.com.cowboy.nosql_mvc.entity.Person;

/**
 * @author cowboy
 * @date ：2016年6月29日 下午8:30:02
 * @version 1.0
 */
@Repository
public class PersonDaoImpl extends BaseDaoImpl<Person, String> implements PersonDao
{
}
