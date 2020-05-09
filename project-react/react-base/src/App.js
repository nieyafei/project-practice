import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './style/sass/Index.scss';

import Index from "./pages/Index"

function App() {
  return (
    <div className="App">
      <header className="header-section">
        <nav>
          <Link to={"/index"}>去首页</Link>
          <Link to={"/login"}>去登录</Link>
        </nav>
      </header>
      <Switch>
        <Route path="/index" component={Index}></Route>
      </Switch>
    </div>
  );
}

export default App;
