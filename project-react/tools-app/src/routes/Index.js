import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { parse, stringify } from "query-string"
import Page from '../pages/Index';
import Page404 from '../pages/others/404';

/* import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'; */

function warpHistory(history) {
  // 处理location
  // console.log(history)
  const parseSearch =(location)=> {
    // console.log('监听location：', location)
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
      // console.log(path, params);
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

class FrontHashRouter extends HashRouter{
  history = warpHistory(this.history);
  render(){
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
      <FrontHashRouter>
        <Switch>
          <Route path="/index" component={Page} />
          <Route component={Page404} />
        </Switch>
        {/* <ConfigProvider locale={zhCN}>
          <Switch>
            <Route path={'/appdown'} component={AppDown} />
            <Route path={'/register'} component={Register} />
            <Route path={'/sup'} component={Page504} />
            <Route path="/login" exact component={Login} />
            <Route path="/" component={Page} />
            <Route component={Page404} />
          </Switch>
        </ConfigProvider> */}
      </FrontHashRouter>
    )
  }
}
