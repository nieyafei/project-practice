import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
// other
import Page404 from "../pages/404";

import { parse, stringify } from "query-string"
/* 
history: 
  action: 跳转类型 PUSH, REPLACE, POP
  block
  createHref
  go
  goBack
  goForward
  listen: 会话的记录的长度
  location: {
    hash, 
    pathname, 
    search: query string, 
    state
  }
  push
  replace
*/

function warpHistory(history) {
  // 处理location
  console.log(history)
  const parseSearch =(location)=> {
    console.log('监听location：', location)
    if(location.search){
      location.query = {...parse(location.search)};// 处理search， 转换为query
    }
  }
  parseSearch(history.location);
  history.listen((location, action)=> {
    parseSearch(location); // 监听location变化，处理search条件
  })

  // 处理query到search
  const patch =(fn)=> {
    return (path, ...params)=> {
      // 处理 path 传入的location参数   params: 其他传入参数
      // path情况存在多种。string类型为url形式，object为location对象形式
      console.log(path, params);
      if(path && typeof(path) !== 'string'){
        // 处理path路径
        if(path.query) {
          let query = {...parse(path.search), ...path.query}
          path.search = stringify(query);
        }
      }
      return fn(path, ...params);
    }
  }
  history.push = patch(history.push);
  return history;
}

class RotorHashRouter extends HashRouter{
  history = warpHistory(this.history);
  render(){
    console.log(this.history);
    return super.render(); // 调用父类的render
  }
}

export default class CRouter extends Component {
  requireAuth = (permission, component) => {
      const { store } = this.props;
      const { auth } = store.getState().httpData;
      if (!auth || !auth.data.permissions.includes(permission)) window.location.hash = '/404';
      return component;
  };
  render() {
    return (
      <RotorHashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={App} />
          <Route component={Page404} />
        </Switch>
      </RotorHashRouter>
    )
  }
}
