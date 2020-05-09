/**
 * 封装axios接口
 */
import { createHashHistory } from 'history';
import axios from 'axios';
import { AxiosStore } from '../utils/Config';
import Util from '../utils/Util';
const baseURL = "";
const method = ["post", "put", "delete"];
const hashHistory = createHashHistory();
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
      // 发送请求需要做的things
      config.cancelToken = AxiosStore.source.token;
      if (method.includes(config.method)) {
        //config.data = qs.stringify(config.data);
      }
      // token参数
      let User = JSON.parse(localStorage.getItem("User")) || {};
      if (User.token) {
        config.headers["X-Authorization"] = "Bearer " + User.token;
      }
      return config;
    }, function (error) {
      // 发送请求error
      return Promise.reject(error);
    });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
      // 请求返回数据
      if (response.data && (response.data.serror || response.data.error)) {
        // 错误
        response.data.serror && message.error(response.data.serror.title);
        response.data.error && message.error(response.data.error.message);
        return Promise.reject(response.data);
      }
      if(response.headers['content-disposition']){
        return response;
      }
      return response.data;
    },
    function (error) {
      // console.log('error-----------------start')
      // 请求error
      //  1.判断请求超时
      if(error.message.indexOf('timeout') !== -1 || error.message.indexOf('Network Error') !== -1) {
        console.log('请求现在超时了,请检查网络环境，稍后再试');
      }
      // console.log(error.code, error.message);
      if(error.response.status === 403){
          Util.AxiosStore();
          //message.warning("登录过期，请重新登录");
          hashHistory.push("/login");
      }else if(error.response.status === 504 || error.response.status === 502 || error.response.status === 503 || error.response.status === 501){
          // 暂停其他api访问
          Util.AxiosStore();
          hashHistory.push("/sup");
      }else{
          //message.error(`数据异常，异常码${error.response.status}`)
      }
      return Promise.reject(error.response);
    });

const HttpServer = (opts, data) => {

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  let Public = { };//公共参数
  let httpDefaultOpts = { //http默认配置
    method: opts.method,
    baseURL,
    url: opts.url,
    timeout: opts.upload?0:40000,
    params: Object.assign(Public, data),
    data: JSON.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    cancelToken: source.token
  }
  if(opts.upload){
      httpDefaultOpts.headers['Content-Type'] = 'multipart/form-data';
      httpDefaultOpts.data = data;
  }
  if(opts.download){
    /* httpDefaultOpts.headers['Content-Type'] = 'application/octet-stream;charset=utf-8'; */
    httpDefaultOpts.responseType = 'blob';
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        resolve(res);
      }
    ).catch(
      (response) => {
        reject(response);
      }
    )

  })
  return promise;
}
export default HttpServer;