import React, { Component } from 'react';
import { CardReset } from "../component/Common";
import HeaderCustom from "../component/HeaderCustom";

class Main extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <CardReset className={"index-section"} title="首页">
        <HeaderCustom keyName="index" />
        测试数据
      </CardReset>
    )
  }
}

export default Main;
