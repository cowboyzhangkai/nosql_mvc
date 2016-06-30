package cn.com.cowboy.nosql_mvc.entity;

import java.io.Serializable;

import org.springframework.data.domain.Persistable;

/**
 * @author cowboy
 * @date ：2015年12月7日 下午9:41:00
 * @version 1.0
 */
public abstract class AbstractEntity<ID extends Serializable> implements Persistable<ID>
{
	private static final long serialVersionUID = -2508467482653248070L;

	public abstract ID getId();

	public abstract void setId(ID paramID);

	@Override
	public boolean isNew()
	{
		return (null == getId());
	}
}
