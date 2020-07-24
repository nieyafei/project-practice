import React, {Component} from "react";

export default class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }
  state = { 
    hasError: false,
    error: ""
  }

  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务器
    
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>有错误异常数据</h1>;
    }
    return this.props.children; 
  }
}