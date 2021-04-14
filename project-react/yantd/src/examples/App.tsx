import React from 'react';
import {Icons, Spin, Anchor} from "../index";
import logo from '../logo.svg';
import "../styles/index.scss";

const MyIcon = Icons.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2246017_2qb6e2esr4d.js', // 在 iconfont.cn 上生成
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Iconfont
      </header>
      <MyIcon type="iconsearch" />
      <Spin spinning={true} tip="正在加载"><div style={{width: '200px', height: '200px'}}>我是测试</div></Spin>
      <Anchor>
        <Anchor.Link href="#components-anchor-demo-basic" title="Basic demo" />
        <Anchor.Link href="#components-anchor-demo-static" title="Static demo" />
      </Anchor>
    </div>
  );
}

export default App;