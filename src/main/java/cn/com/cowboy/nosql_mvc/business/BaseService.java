package cn.com.cowboy.nosql_mvc.business;

import java.io.File;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.mongodb.gridfs.GridFSDBFile;

import cn.com.cowboy.nosql_mvc.entity.AbstractEntity;

/**
 * @author cowboy
 * @date ：2016年6月29日 下午5:35:43
 * @version 1.0
 */
public abstract interface BaseService<M extends AbstractEntity<ID>, ID extends Serializable>
{
	public abstract void createCollection(M object);

	public abstract List<M> findList(int skip, int limit);

	public abstract M findOneByItems(Map<String, Object> params);

	public abstract void insert(M m);

	public abstract void update(String id, Map<String, Object> params, M m);

	public abstract long count(Map<String, Object> params);

	public abstract List<M> findByItems(Map<String, Object> params);

	public abstract List<M> findListByPageAndItems(int skip, int rows, Map<String, Object> params);

	public abstract void deleteById(String id);

	public abstract void saveFile(File file, String fileUrl);

	public abstract GridFSDBFile retrieveFileOne(String filename);
}
