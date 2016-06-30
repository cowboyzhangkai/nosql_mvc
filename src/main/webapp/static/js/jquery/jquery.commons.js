/*------------------------------|
 | Timekey jQuery plugins | 	|
 |------------------------------|
 | @author KennyLee	            |
 |------------------------------*/
(function ($) {
    $.extend({
        "commons": {
            /**
             * 截断容器的内容
             * @param $els 需要截断的元素
             * @param length 内容长度
             * @param suffix 超出长度后的后缀
             */
            truncate: function ($els, length, suffix) {
                var $self = $els;
                $self.each(function () {
                    var objString = $(this).text();
                    var objLength = $(this).text().length;
                    var num = length ? length : 10;
                    var _suffix = suffix ? suffix : '...';
                    if (objLength > num) {
                        $(this).attr("title", objString);
                        objString = $(this).text(objString.substring(0, num) + _suffix);
                    }
                });
            },
            /***
             * 判断目标元素是否有纵向滚动条。
             * @param el
             * @returns {boolean}
             */
            hasHeightScroll: function (el) {
                var flag = false;
                if (el) {
                    var _el = el;
                    if (el instanceof jQuery && el.size() > 0) {
                        _el = el[0];
                        flag = _el.scrollHeight - _el.clientHeight > 0;
                    }
                }
                return flag;
            },
            /**
             * 转换布尔类型为显示的字符串。
             * @param val
             * @returns {*}
             */
            toBooleanString: function (val) {
                if (val == true) {
                    return '是';
                } else if (val == false) {
                    return '否';
                } else if (val == null || val == 'null') {
                    return '';
                } else {
                    return val;
                }
            },
            /**
             * 转换UTCString为Date
             * @param val UTC
             * @returns {Date}
             */
            toDate: function (val) {
                var d = new Date()
                d.setTime(val);
                return d;
            },
            /**
             * 格式化日期类型数据
             * @param date 日期Date
             * @param fmt 格式
             * @returns {*}
             */
            dateFormat: function (date, fmt) {
                if (!date || !(date instanceof Date)) {
                    alert('date cant be null');
                    return;
                }
                var o = {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(), //day
                    "H+": date.getHours(), //24hour
                    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //12hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                    "S": date.getMilliseconds() //millisecond
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1,
                        (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o)if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
                return fmt;
            },
            /**
             * UTC格式的日期数据转成页面显示用的字符串。
             * @param val UTC格式的日期表单数据。
             * @param fmt 格式化。可为空，空的话则按照默认格式进行格式化。
             * @returns {*}
             */
            toDateString: function (val, fmt) {
                var s = '';
                if (val && val != 'null') {
                    var d = this.toDate(val);
                    var format = fmt;
                    if (!fmt) {
                        format = 'yyyy年MM月dd日';
                        if (d.getMinutes() > 0 || d.getHours() > 0 || d.getSeconds() > 0) {
                            format += ' HH时mm分ss秒';
                        }
                    }
                    s = this.dateFormat(d, format);
                }
                return s;
            }
        }
    });
})(jQuery);