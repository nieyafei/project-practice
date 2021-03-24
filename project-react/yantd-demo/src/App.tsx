import React, {useState, FC} from 'react';
import { Button, Icons } from "yantd";
import logo from './logo.svg';
import './App.css';

/* import { createFromIconfontCN } from '@ant-design/icons'; */

/* const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
}); */

const MyIcon = Icons.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});

const App: FC<any> = (props) => {
  const {id = '1'}  = props;
  const [loading, setLoading] = useState('false');
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
        {loading}{id}
        <Button type="link">我是按钮</Button>
        <MyIcon type="icon-example" />
      </header>
    </div>
  );
}

App.defaultProps = {
  id: '233'
}

export default App;
