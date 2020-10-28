import React from 'react';
import logo from './logo.svg';
import { Switch, Route, Link } from 'react-router-dom';
import './style/css/index.scss';
import Index from "./pages/Index"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/app/index">点击查看</Link>
      </header>
      <Switch>
        <Route exact path={'/app/index'} component={Index}></Route>
      </Switch>
    </div>
  );
}

export default App;
