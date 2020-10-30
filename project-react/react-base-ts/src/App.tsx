import React, {FC, useState} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './style/css/index.scss';
import Logo from "./logo.svg";
import Index from "./pages/Index";
import {Layout, Menu, message} from "antd";
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
const {Header, Footer, Sider, Content} = Layout;
const { SubMenu } = Menu;
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});

const App:FC =(props)=> {
  console.log(props)
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse=()=> {
    setCollapsed(!collapsed);
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className="logo" style={{textAlign: 'center', padding: '30px 0'}}>
          <img src={Logo} alt="" style={{width: '100px'}} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/app/index">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            测试
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="User">
            <Menu.Item key="31">Tom</Menu.Item>
            <Menu.Item key="32">Bill</Menu.Item>
            <Menu.Item key="33">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<UserOutlined />} title="User">
            <Menu.Item key="41">Tom</Menu.Item>
            <Menu.Item key="42">Bill</Menu.Item>
            <Menu.Item key="43">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<UserOutlined />} title="User">
            <Menu.Item key="51">Tom</Menu.Item>
            <Menu.Item key="52">Bill</Menu.Item>
            <Menu.Item key="53">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<UserOutlined />} title="User">
            <Menu.Item key="61">Tom</Menu.Item>
            <Menu.Item key="62">Bill</Menu.Item>
            <Menu.Item key="63">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<UserOutlined />} title="User">
            <Menu.Item key="71">Tom</Menu.Item>
            <Menu.Item key="72">Bill</Menu.Item>
            <Menu.Item key="73">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <Switch>
            <Route exact path={'/app/index'} component={Index} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>我是尾部</Footer>
      </Layout>
    </Layout>
  );
}

export default App;