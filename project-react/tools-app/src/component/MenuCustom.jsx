import React, {Component} from "react";
import { Link } from "react-router-dom";
import { SysMenuContext } from "../global/context/BaseContext";
import {Layout, Menu} from 'antd';
import { HomeOutlined, FilePdfOutlined, FileWordOutlined, CodeOutlined } from '@ant-design/icons';
const {Sider} = Layout;
// 菜单
export default class Main extends Component {
  
  state = { 
    hasError: false,
    error: ""
  }
  static contextType = SysMenuContext;
  render() {
    let {selectedKey} = this.context;
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed
        collapsedWidth={100}
        className="sider-reset"
      >
        <Menu
          mode={'vertical'}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="/app/index">
            <Link to={ '/app/index' }><HomeOutlined /><span className="name">首页</span></Link>
          </Menu.Item>
          <Menu.Item key="/app/pdf">
            <Link to={ '/app/pdf' }><FilePdfOutlined /><span className="name">PDF</span></Link>
          </Menu.Item>
          <Menu.Item key="/app/index2">
            <Link to={ '/app/index' }><FileWordOutlined /><span className="name">首页</span></Link>
          </Menu.Item>
          <Menu.Item key="/app/index3">
            <Link to={ '/app/index' }><CodeOutlined /><span className="name">首页</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}