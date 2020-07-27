import React, { Component } from 'react';
import {Link} from "react-router-dom";
import HeaderCustom from "../component/HeaderCustom";
// import {FilePdfOutlined, FileWordOutlined} from "@ant-design/icons";

class Main extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div className="index-section">
        <HeaderCustom keystr="index" />
        <div className="nav-list">
          <Link to="/app/pdf/to-png" className="item">
            <div className="ims">
              <i className="iconfont icon-PDF" />
            </div>
            <h5>PDF转PNG</h5>
          </Link>
          <Link to="/app/pdf/png" className="item">
            <div className="ims">
              <i className="iconfont icon-word" />
            </div>
            <h5>WORD转PNG</h5>
          </Link>
        </div>
      </div>
    )
  }
}

export default Main;
