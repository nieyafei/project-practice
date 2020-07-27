import React, { Component } from 'react';
import { PageCardReset } from "../../component/Common";
import Tool from "../../utils/Tool"
import { Upload, Button, PageHeader } from "antd";
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

class Main extends Component {
  state = {
    fileList: [],ploading: false
  }
  componentDidMount(){}
  render() {
    const props = {
      onPreview: (file)=> {
        // 开始解析pdf
        Tool.readPdf(file, this)
      },
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
      showUploadList: {
        showPreviewIcon: true,
        showRemoveIcon: true
      }
    }
    let {fileBase = {}} = this.state;
    return (
      <PageCardReset className={"index-section"} parent={this} title="PDF转换图片" pageconfig={{keystr: "pdf"}}>
        <div className="pdf-cons-section">
          <div className="c-menu">
            <Upload accept=".pdf" multiple {...props}>
              <Button type="primary" icon={<PlusOutlined />} style={{width: '180px'}} shape="round">选择PDF文件</Button>
            </Upload>
          </div>
          <div className="c-preview">
            {/* 预览 */}
            <PageHeader 
              title={<span>预览</span>}
              subTitle={'(点击左侧文件即可预览)'}
              className="no-padding" 
              extra={
              <div className="t-right">
                <span>总共：<strong>{fileBase.pageNum || 0}</strong>页</span>&nbsp;&nbsp;
                <Button type="primary" icon={<DownloadOutlined />} onClick={()=> Tool.exportImage(this)} shape="round">导出为图片</Button>
              </div>
              }
            >
              <div className="pre-section">
                <div id="pdf-container" />
              </div>
            </PageHeader>
          </div>
        </div>
      </PageCardReset>
    )
  }
}

export default Main;
