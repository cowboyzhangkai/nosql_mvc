/**
 * @author kennylee
 */
var MessageHelper = {
	'user.password.not.match' : '抱歉，用户名或密码错误，请重新输入。',
	'user.blocked' : '抱歉，当前用户被禁用。'
};

MessageHelper.get = function(k) {
	return this[k] ? this[k] : k;
};