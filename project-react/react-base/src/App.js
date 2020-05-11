import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './style/sass/Index.scss';

import Index from "./pages/Index";
import List from "./pages/List";

function App() {
  return (
    <div className="App">
      <header className="header-section">
        <nav>
          <Link to={"/index"}>首页</Link>
          <Link to={"/list"}>列表页</Link>
          <Link to={"/login"}>登录</Link>
          <Link to={"/register"}>注册</Link>
        </nav>
      </header>
      <Switch>
        <Route path="/index" component={Index}></Route>
        <Route path="/list" component={List}></Route>
      </Switch>
    </div>
  );
}

export default App;
