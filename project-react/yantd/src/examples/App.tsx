import React from 'react';
import {Icons} from "../index";
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
    </div>
  );
}

export default App;