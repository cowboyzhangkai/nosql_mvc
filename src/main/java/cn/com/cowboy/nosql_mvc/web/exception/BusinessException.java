/*** Eclipse Class Decompiler plugin, copyright (c) 2012 Chao Chen (cnfree2000@hotmail.com) ***/
package cn.com.cowboy.nosql_mvc.web.exception;

import java.util.Arrays;

public class BusinessException extends Exception
{
	private static final long serialVersionUID = 6162911202738984047L;
	public static final String EXISTED = "EXISTED";
	public static final String NO_SUCH_ID = "NO_SUCH_BY_ID";
	private String jdField_a_of_type_JavaLangString;
	protected String code;
	private Object[] jdField_a_of_type_ArrayOfJavaLangObject;
	private String b;

	public BusinessException(String paramString, Object[] paramArrayOfObject)
	{
		super(paramString);
		this.code = paramString;
		this.jdField_a_of_type_ArrayOfJavaLangObject = paramArrayOfObject;
	}

	public BusinessException(String paramString1, String paramString2, Object[] paramArrayOfObject, String paramString3)
	{
		super(paramString2);
		this.jdField_a_of_type_JavaLangString = paramString1;
		this.code = paramString2;
		this.jdField_a_of_type_ArrayOfJavaLangObject = paramArrayOfObject;
		this.b = paramString3;
	}

	public BusinessException(String paramString1, String paramString2, Object[] paramArrayOfObject)
	{
		this(paramString1, paramString2, paramArrayOfObject, null);
	}

	public BusinessException(String paramString1, String paramString2)
	{
		this(paramString1, null, null, paramString2);
	}

	public BusinessException(Object[] paramArrayOfObject, String paramString)
	{
		this(null, paramString, paramArrayOfObject, null);
	}

	public BusinessException(String paramString)
	{
		this(null, null, null, paramString);
	}

	public String getModule()
	{
		return this.jdField_a_of_type_JavaLangString;
	}

	public String getCode()
	{
		return this.code;
	}

	public Object[] getArgs()
	{
		return this.jdField_a_of_type_ArrayOfJavaLangObject;
	}

	public String getDefaultMessage()
	{
		return this.b;
	}

	public String toString()
	{
		return "BusinessException [module=" + this.jdField_a_of_type_JavaLangString + ", code=" + this.code + ", args="
				+ Arrays.toString(this.jdField_a_of_type_ArrayOfJavaLangObject) + ", defaultMessage=" + this.b + "]";
	}
}