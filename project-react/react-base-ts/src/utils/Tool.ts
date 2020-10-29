// 获取cookie
const getCookie =(cname: string)=> {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return "";
}

// 存储cookie
const setCookie = (name: string,value?:any)=> {
  var Days = 30;
  var d = new Date();
  d.setTime(d.getTime() + (Days*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires+";path=/;";
}

// 删除cookie
const delCookie =(name:string)=> {
  document.cookie = name + "=;expires=" + (new Date(0)).toUTCString()+";path=/;";
}

// 设置session
const setSession =(key:string,data: any)=> {
  try {
      sessionStorage.setItem(key,JSON.stringify(data))
  }catch(err){
      sessionStorage.setItem(key,data)
  }
}

// 获取session
const getSession =(key: string)=> {
  let value=null;
  try {
    value = JSON.parse(sessionStorage.getItem(key) || "")
  }catch(err){
    value = sessionStorage.getItem(key)
  }
  return value;
}

// 删除session
const delSession =(key:string)=> {
  if (Array.isArray(key)){
    for (var i=0,l=key.length;i<l;i++){
      sessionStorage.removeItem(key[i]);
    }
  }else {
    sessionStorage.removeItem(key);
  }
}

const Tool = {
  getCookie, setCookie, delCookie, 
  setSession, getSession, delSession
};
export default Tool;