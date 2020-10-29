import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import App from '../App';

import { parse, stringify } from "query-string";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function warpHistory(parent: any) {
  // 处理location
  // console.log(history)
  let history = parent.history;
  const parseSearch =(location: any)=> {
    // console.log('监听location：', location)
    if(location.search){
      location.query = {...parse(location.search)};// 处理search， 转换为query
    }
  }
  parseSearch(history.location);
  history.listen((location: any, action: any)=> {
    parseSearch(location); // 监听location变化，处理search条件
  })

  // 处理query到search
  const patch =(fn: any)=> {
    return (path: any, ...params: any)=> {
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

class RotorHashRouter extends HashRouter{
  history = warpHistory(this);
  render(){
    return super.render(); // 调用父类的render
  }
}

export default class CRouter extends Component {
  render() {
    return (
      <RotorHashRouter>
        <ConfigProvider locale={zhCN}>
          <Switch>
            {/* <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route> */}
            <Route path="/" component={App} />
          </Switch>
        </ConfigProvider>
      </RotorHashRouter>
    )
  }
}
