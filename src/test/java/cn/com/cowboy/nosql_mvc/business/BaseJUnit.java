package cn.com.cowboy.nosql_mvc.business;
import javax.sql.DataSource;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author cowboy
 * @date ：2016年4月17日 下午5:34:23
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations =
{ "classpath:/applicationContext.xml" })
public class BaseJUnit extends AbstractTransactionalJUnit4SpringContextTests
{

	@Autowired
	@Override
	public void setDataSource(DataSource dataSource)
	{
		super.setDataSource(dataSource);
	}

}
