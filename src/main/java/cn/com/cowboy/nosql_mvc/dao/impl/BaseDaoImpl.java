package cn.com.cowboy.nosql_mvc.dao.impl;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.DB;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;

import cn.com.cowboy.nosql_mvc.dao.BaseDao;
import cn.com.cowboy.nosql_mvc.entity.AbstractEntity;

/**
 * @author cowboy
 * @date ：2016年6月29日 下午7:03:08
 * @version 1.0
 */
@Repository
public class BaseDaoImpl<M extends AbstractEntity<ID>, ID extends Serializable> implements BaseDao<M, ID>
{
	public static final Logger logger = LoggerFactory.getLogger(BaseDaoImpl.class);

	public static final String FILEURL = "imgRespository";

	@Autowired
	private MongoTemplate mongoTemplate;

	private Class<?> clz;

	public Class<?> getClz()
	{
		if (clz == null)
		{
			// 获取泛型的Class对象
			clz = ((Class<?>) (((ParameterizedType) (this.getClass().getGenericSuperclass()))
					.getActualTypeArguments()[0]));
		}
		return clz;
	}

	public BaseDaoImpl()
	{

	}

	@Override
	public void _test()
	{
		Set<String> colls = this.mongoTemplate.getCollectionNames();
		for (String coll : colls)
		{
			logger.info("CollectionName=" + coll);
		}
		DB db = this.mongoTemplate.getDb();
		logger.info("db=" + db.toString());
	}

	@Override
	public void createCollection(M object)
	{
		if (!this.mongoTemplate.collectionExists(getClz()))
		{
			this.mongoTemplate.createCollection(getClz());
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<M> findList(int skip, int limit)
	{
		Query query = new Query();
		query.with(new Sort(new Order(Direction.ASC, "_id")));
		query.skip(skip).limit(limit);
		return (List<M>) this.mongoTemplate.find(query, getClz());
	}

	@SuppressWarnings("unchecked")
	@Override
	public M findOneByItems(Map<String, Object> params)
	{
		Query query = new Query();
		if ((params != null) && (!(params.isEmpty())))
		{
			for (String key : params.keySet())
			{
				query.addCriteria(new Criteria(key).is(params.get(key)));
			}
		}
		return (M) mongoTemplate.findOne(query, getClz());
	}

	@Override
	public void insert(M m)
	{
		this.mongoTemplate.insert(m);
	}

	@Override
	public long count(Map<String, Object> params)
	{
		Query query = new Query();
		if ((params != null) && (!(params.isEmpty())))
		{
			for (String key : params.keySet())
			{
				query.addCriteria(new Criteria(key).is(params.get(key)));
			}
		}
		return (long) mongoTemplate.find(query, getClz()).size();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<M> findByItems(Map<String, Object> params)
	{
		Query query = new Query();
		if ((params != null) && (!(params.isEmpty())))
		{
			for (String key : params.keySet())
			{
				query.addCriteria(new Criteria(key).is(params.get(key)));
			}
		}
		return (List<M>) this.mongoTemplate.find(query, getClz());
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<M> findListByPageAndItems(int skip, int rows, Map<String, Object> params)
	{
		Query query = new Query();
		if ((params != null) && (!(params.isEmpty())))
		{
			for (String key : params.keySet())
			{
				query.addCriteria(new Criteria(key).is(params.get(key)));
			}
		}
		query.skip(skip).limit(rows);
		return (List<M>) this.mongoTemplate.find(query, getClz());
	}

	@Override
	public void update(String id, Map<String, Object> params, M m)
	{
		Query query = new Query();
		query.addCriteria(new Criteria("_id").is(id));
		Update update = new Update();
		if ((params != null) && (!(params.isEmpty())))
		{
			for (String key : params.keySet())
			{
				update.set(key, params.get(key));
			}
		}
		this.mongoTemplate.updateFirst(query, update, getClz());
	}

	@Override
	public void deleteById(String id)
	{
		mongoTemplate.remove(new Query(Criteria.where("_id").is(id)), getClz());
	}

	@Override
	public void saveFile(File file, String fileUrl)
	{
		try
		{
			DB db = mongoTemplate.getDb();
			GridFS fs = new GridFS(db, FILEURL);
			GridFSInputFile inputFile = fs.createFile(file);
			inputFile.setFilename(fileUrl);
			inputFile.setContentType(fileUrl.substring(fileUrl.lastIndexOf(".")));
			inputFile.save();
		} catch (IOException e)
		{
			e.printStackTrace();
		}
	}

	@Override
	public GridFSDBFile retrieveFileOne(String filename)
	{
		try
		{
			DB db = mongoTemplate.getDb();
			// 获取fs的根节点
			GridFS gridFS = new GridFS(db, FILEURL);
			GridFSDBFile dbfile = gridFS.findOne(filename);
			if (dbfile != null)
			{
				return dbfile;
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

}
