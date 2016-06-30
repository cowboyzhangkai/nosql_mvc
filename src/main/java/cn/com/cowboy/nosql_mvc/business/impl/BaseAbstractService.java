package cn.com.cowboy.nosql_mvc.business.impl;

import java.io.File;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.mongodb.gridfs.GridFSDBFile;

import cn.com.cowboy.nosql_mvc.business.BaseService;
import cn.com.cowboy.nosql_mvc.dao.BaseDao;
import cn.com.cowboy.nosql_mvc.entity.AbstractEntity;

/**
 * @author cowboy
 * @date ：2016年6月29日 下午5:36:07
 * @version 1.0
 */
public abstract class BaseAbstractService<M extends AbstractEntity<ID>, ID extends Serializable>
		implements BaseService<M, ID>
{
	protected BaseDao<M, ID> baseDao;
	
	public void setBaseDao(BaseDao<M, ID> baseDao)
	{
		this.baseDao = baseDao;
	}

	@Override
	public void createCollection(M object)
	{
		baseDao.createCollection(object);
	}

	@Override
	public List<M> findList(int skip, int limit)
	{
		return baseDao.findList(skip, limit);
	}

	@Override
	public M findOneByItems(Map<String, Object> params)
	{
		return baseDao.findOneByItems(params);
	}

	@Override
	public void insert(M m)
	{
		baseDao.insert(m);
	}

	@Override
	public void update(String id, Map<String, Object> params, M m)
	{
		baseDao.update(id, params, m);
	}

	@Override
	public long count(Map<String, Object> params)
	{
		return baseDao.count(params);
	}

	@Override
	public List<M> findByItems(Map<String, Object> params)
	{
		return baseDao.findByItems(params);
	}

	@Override
	public List<M> findListByPageAndItems(int skip, int rows, Map<String, Object> params)
	{
		return baseDao.findListByPageAndItems(skip, rows, params);
	}

	@Override
	public void deleteById(String id)
	{
		baseDao.deleteById(id);
	}

	@Override
	public void saveFile(File file, String fileUrl)
	{
		baseDao.saveFile(file, fileUrl);
	}

	@Override
	public GridFSDBFile retrieveFileOne(String filename)
	{
		return baseDao.retrieveFileOne(filename);
	}

}
