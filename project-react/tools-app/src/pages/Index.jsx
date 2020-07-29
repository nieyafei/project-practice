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
          <a href="https://tinypng.com" className="item" target="_blank" rel="noopener noreferrer">
            <div className="ims">
              <i className="iconfont icon-tupian" />
            </div>
            <h5>PNG、JPEG图片压缩</h5>
          </a>
        </div>
      </div>
    )
  }
}

export default Main;
