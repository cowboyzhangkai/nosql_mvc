package cn.com.cowboy.nosql_mvc.entity;

/**
 * @author cowboy
 * @description 用户的手机号码
 * @date ：2016年6月29日 下午5:06:27
 * @version 1.0
 */
public class Mobile extends BaseEntity<String>
{

	private static final long serialVersionUID = -316353100005015666L;

	/**
	 * 手机号码
	 */
	private String name;
	/**
	 * 是否通过手机验证
	 */
	private Boolean isActive;

	public Mobile()
	{
		super();
	}

	public Mobile(String name, Boolean isActive)
	{
		this.name = name;
		this.isActive = isActive;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public Boolean getIsActive()
	{
		return isActive;
	}

	public void setIsActive(Boolean isActive)
	{
		this.isActive = isActive;
	}

}
