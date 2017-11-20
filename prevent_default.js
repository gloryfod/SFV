
/**************阻止浏览器默认alert之类的函数，方便打印调试信息********************/

void function (t) {
	g = t;
	g.alert = function(s){console.log("%c"+s, 'color:green;');}



	//---------------测试js字符串函数-----------------
	var debug = 1;
	if( debug ){
		var str = (''+!0)[3],a;
		str += ((''+a).toString.toString(20))[27];
		str += (!1+'')[1]+'\u006c';
		g['e'] = t[str.charAt()+str.replace(/e|f|g|h|i|j|k/g, '')];
	}
	//-----------------------------------------------
	
}
(this);

/***************公用函数**********************/

function get_full_time_string(t){
	if( !t ){
		t = new Date();
	}
	var str = '';
	str += t.getUTCFullYear();
	str += '-';
	str += (t.getUTCMonth() +1 +100).toString().substr(1,2);
	str += '-';
	str += (t.getUTCDate() +100).toString().substr(1,2);
	str += ' ';
	str += (t.getUTCHours() +100).toString().substr(1,2);
	str += ':';
	str += (t.getUTCMinutes() +100).toString().substr(1,2);
	str += ':';
	str += (t.getUTCSeconds() +100).toString().substr(1,2);
	str += '.';
	str += t.getUTCMilliseconds();
	return str;
}
String.prototype.trim=function() {
    return this.replace(/(^(\s|　)*)|((\s|　)*$)/g,'');
}
var author = '\u868a'+'\u5144';
var author_q = '497'+'893152';