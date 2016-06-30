package cn.com.cowboy.nosql_mvc.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:19:55
 * @version 1.0
 */
@Document(collection = "person")
public class Person extends BaseEntity<String>
{
	private static final long serialVersionUID = -4307023852212876826L;
	private String name;
	private String password;
	private String salt;
	private Date createTime;

	private Mobile mobile;
	private Email email;

	public Person()
	{
	}

	public Person(String name, String password)
	{
		this.name = name;
		this.password = password;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public Date getCreateTime()
	{
		return createTime;
	}

	public void setCreateTime(Date createTime)
	{
		this.createTime = createTime;
	}

	public String getSalt()
	{
		return salt;
	}

	public void setSalt(String salt)
	{
		this.salt = salt;
	}

	public Mobile getMobile()
	{
		return mobile;
	}

	public void setMobile(Mobile mobile)
	{
		this.mobile = mobile;
	}

	public Email getEmail()
	{
		return email;
	}

	public void setEmail(Email email)
	{
		this.email = email;
	}

}
