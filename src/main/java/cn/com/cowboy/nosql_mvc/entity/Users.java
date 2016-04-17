package cn.com.cowboy.nosql_mvc.entity;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:19:55
 * @version 1.0
 */
@Document(collection = "users")
public class Users implements Serializable
{
	private static final long serialVersionUID = -3737624370081542733L;
	private String id;
	private String name;
	private String password;
	private String cnName;

	public Users(String name, String password)
	{
		this.name = name;
		this.password = password;
	}

	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
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

	public String getCnName()
	{
		return cnName;
	}

	public void setCnName(String cnName)
	{
		this.cnName = cnName;
	}
}
