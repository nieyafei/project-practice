import React from 'react';
import logo from './logo.svg';
import { Switch, Route, Link } from 'react-router-dom';
import './style/css/index.scss';
import Index from "./pages/Index";
import {Button} from "antd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/app/index"><Button type="primary">点击查看</Button></Link>
      </header>
      <Switch>
        <Route exact path={'/app/index'} component={Index} />
      </Switch>
    </div>
  );
}

export default App;

/* const App: React.FC<Prop> = (prop) => {
  return ()
} */