package cn.com.cowboy.nosql_mvc.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @author cowboy
 * @date ：2016年4月7日 下午9:19:55
 * @version 1.0
 */
public class Users implements Serializable
{
	private static final long serialVersionUID = -3737624370081542733L;

	private String name;
	private String password;

	private String cnName;

	private Date createTime;

	private Department dept;

	public Users()
	{

	}

	public Users(String name, String password)
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

	public String getCnName()
	{
		return cnName;
	}

	public void setCnName(String cnName)
	{
		this.cnName = cnName;
	}

	public Department getDept()
	{
		return dept;
	}

	public void setDept(Department dept)
	{
		this.dept = dept;
	}

	public Date getCreateTime()
	{
		return createTime;
	}

	public void setCreateTime(Date createTime)
	{
		this.createTime = createTime;
	}

}
