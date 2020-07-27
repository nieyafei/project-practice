import React, {Component} from "react";
import ReactDom from "react-dom";
import HeaderCustom from "./HeaderCustom";
import { Card, Spin } from "antd";
import BgSVG1 from '../style/imgs/svg/bg-1.svg';
const commonRoot = document.getElementById('common-root');

class CommonRoot extends Component{
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    commonRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    commonRoot.removeChild(this.el);
  }
  render(){
    return ReactDom.createPortal(
      this.props.children,
      this.el
    )
  }
}
const PageBgComp =(props)=> {
  return (
    <CommonRoot>
      <div className="page-bg">
        <div className="bg-cons">
          <QpSvgCom cName="qp-svg s-p1" path={{fill: '#0076ff'}} />
          <QpSvgCom cName="qp-svg s-p2" path={{fill: '#3190FF'}} />
          <img src={BgSVG1} alt="" className="bot-pa" />
        </div>
      </div>
    </CommonRoot>
  )
}

const QpSvgCom =(props)=> {
  const {path, cName} = props;
  return(
    <svg width="600" height="600" viewBox="0 0 600 600" className={cName}>
      <path {...path}>
        <animate attributeName="d" dur="2000s" repeatCount="indefinite" values="M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;
        M404.4 176.7c20.9 16.4 20.8 58.8 38.8 106.2 18.1 47.4 54.4 99.7 40.9 123.6-13.5 23.9-76.7 19.3-131.6 40.4-54.8 21-101.2 67.7-150.5 71.7-49.4 4.1-101.7-34.5-107.8-81.9C88 389.2 128 333 144.2 278c16.2-55.1 8.5-108.8 30.5-125 22-16.1 73.7 5.5 120.4 11.3 46.7 5.9 88.5-3.9 109.3 12.4z;
        M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;" 
        />
      </path>
    </svg>
  )
}

class PageCardReset extends Component{
  render(){
    let {pageconfig, parent = {}, tip = '正在加载'} = this.props;
    let {ploading = false} = parent.state || {};
    return <Card {...this.props} className={"card-reset " + this.props.className}><Spin spinning={ploading} tip={tip}><HeaderCustom {...pageconfig} />{this.props.children}</Spin></Card>
  }
}

export {
  CommonRoot, PageBgComp, PageCardReset
}