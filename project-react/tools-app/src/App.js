import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { UserContext, SysMenuContext } from "./global/context/BaseContext";
import { MENUS_PATH_KEYS } from "./utils/MenuConfig"
import { PageBgComp } from "./component/Common";
import ErrorBoundary from "./component/ErrorBoundary";
import MenuCustom from "./component/MenuCustom";
import Page404 from './pages/others/404';
import Index from "./pages/Index";
import PdfIndex from "./pages/pdf/Index";
import GuFeiIndex from "./pages/gufei/Index";
import WeatherIndex from "./pages/weather/Index"
import {Layout} from "antd";
var Content = Layout.Content;

class Main extends Component {
  state = {
    selectedKey: ""
  }
  componentDidMount(){}
  toggleKey=(key)=> {
    console.log('更新key', key);
    this.setState({selectedKey: MENUS_PATH_KEYS[key]})
  }
  render() {
    return (
      <ErrorBoundary>
        <SysMenuContext.Provider 
          value={{
            ...this.state,
            toggleCollapsed: this.toggle,
            toggleKey: this.toggleKey
          }}
        >
          <Layout className="page-body">
            {/* 菜单部分 */}
            <MenuCustom selectedKey={this.state.selectedKey} />
            <Layout className="layout-content">
              <Content>
                {/* 内容 */}
                <Switch>
                  <Route path="/app/index" component={Index} exact />
                  <Route path="/app/pdf" component={PdfIndex} />
                  <Route path="/app/gufei" component={GuFeiIndex} />
                  <Redirect to="/app/index" from="/" exact />
                  <Redirect to="/app/index" from="/app" exact />
                  <Route component={Page404} />
                </Switch>
              </Content>
              {/* <Footer></Footer> */}
            </Layout>
            {/* 工具类 */}
            <div className="tool-section">
              <WeatherIndex />
            </div>
          </Layout>
          {/* 公共部分 */}
          <PageBgComp />
        </SysMenuContext.Provider>
      </ErrorBoundary>
    )
  }
}

export default Main;