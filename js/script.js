
let service = "http://127.0.0.1:8087/";




function servicePath (){
	return service;
}




// 获取url路径参数的方法
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


/****************************************** 封装 ajax 请求************************************************************/

/**
 * @param {Object} path 路径
 * @param {Object} params 参数
 */
function sendPost(path, params) {
	
	$.ajax( {
		url : service + path,
		// async : async,
		data : params,
		type : 'POST',
		dataType:'json',
		cache : false,
		timeout:70000,
		success : function(data, textStatus) {
			if (data.result.status === 0) {
				return data;
			} 
 
		},
		error:function(data){
			 return data;
		}
	});
}


