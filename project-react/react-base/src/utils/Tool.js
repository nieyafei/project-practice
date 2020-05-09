const Tool = {};
/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @param company string 公司名称
 * @param fieldList string 选择的领域
 * @param user  用户信息
 * @param typeFlag  登录true false
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length === 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}


/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}

/*
 * 获取cookie
 * */
Tool.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return "";
}
/*
 * 存储cookie
 * */
Tool.setCookie = function (name,value) {
    var Days = 30;
    var d = new Date();
    d.setTime(d.getTime() + (Days*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires+";path=/;";
}
/*
 * 删除cookie xinghan.scientistin.com
 * */
Tool.delCookie = function (name) {
    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString()+";path=/;";
    //Tool.setCookie("tk","");
}
Tool.setSession = function(key,data){
    try {
        sessionStorage.setItem(key,JSON.stringify(data))
    }catch(err){
        sessionStorage.setItem(key,data)
    }
}

Tool.getSession = function(key){
    let value=null;
    try {
        value=JSON.parse(sessionStorage.getItem(key))
    }catch(err){
        value=sessionStorage.getItem(key)
    }
    return value;
}

Tool.delSession = function(key){
    if (Array.isArray(key)){
        for (var i=0,l=key.length;i<l;i++){
            sessionStorage.removeItem(key[i]);
        }
    }else {
        sessionStorage.removeItem(key);
    }
}

Tool.handlerPath=(props, query)=>{
  console.log(props, query)
  return {
    ...props.location,
    query
  }
}

export default Tool;