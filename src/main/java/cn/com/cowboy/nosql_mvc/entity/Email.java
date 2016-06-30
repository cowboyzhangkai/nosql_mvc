package cn.com.cowboy.nosql_mvc.entity;

/**
 * @author cowboy
 * @description:邮箱
 * @date ：2016年6月29日 下午5:09:52
 * @version 1.0
 */
public class Email extends BaseEntity<String>
{

	private static final long serialVersionUID = 4076329429105022975L;

	/**
	 * 邮箱地址
	 */
	private String name;
	/**
	 * 邮箱验证是否通过
	 */
	private Boolean isActive;

	public Email(String name, Boolean isActive)
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
