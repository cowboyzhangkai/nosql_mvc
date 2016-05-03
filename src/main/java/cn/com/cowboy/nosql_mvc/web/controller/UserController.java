package cn.com.cowboy.nosql_mvc.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.cowboy.nosql_mvc.business.UserBus;
import cn.com.cowboy.nosql_mvc.entity.Department;
import cn.com.cowboy.nosql_mvc.entity.Users;

/**
 * @author cowboy
 * @date ：2016年4月17日 下午8:26:42
 * @version 1.0
 */
@Controller
@Scope("prototype")
@RequestMapping(value = "/user")
public class UserController extends BaseController
{
	@Resource
	private UserBus userBus;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
	public String create(Users users)
	{
		Department dept = new Department();
		dept.setCreateTime(new Date());
		dept.setName("测试部门");
		users.setDept(dept);
		// users.setCreateTime(new Date());
		userBus.save(users);

		return "sucess";
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public List<Users> list()
	{
		return userBus.findAll();
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET)
	@ResponseBody
	public String update()
	{
		userBus.update();
		return "sucess";
	}

}
