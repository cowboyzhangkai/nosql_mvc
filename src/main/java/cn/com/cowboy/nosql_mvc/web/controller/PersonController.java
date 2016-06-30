package cn.com.cowboy.nosql_mvc.web.controller;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.cowboy.nosql_mvc.business.PersonBus;
import cn.com.cowboy.nosql_mvc.entity.Person;

/**
 * @author cowboy
 * @date ：2016年4月17日 下午8:26:42
 * @version 1.0
 */
@Controller
@Scope("prototype")
@RequestMapping(value = "/user")
public class PersonController extends BaseController
{
	@Resource
	private PersonBus personBus;

	@RequestMapping(value = "/create", method = RequestMethod.GET)
	@ResponseBody
	public String create(Person person)
	{
		personBus.insert(person);
		return "sucess";
	}
}
