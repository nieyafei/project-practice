import React from 'react';
import { Button, ConfigProvider, Icons } from "yantd";
import logo from './logo.svg';
import './App.css';


const MyIcon = Icons.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="link">我是按钮</Button>
        <MyIcon type="icon-example" />
      </header>
    </div>
  );
}

export default App;
