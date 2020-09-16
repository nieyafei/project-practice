import React, {useState} from 'react';
import { api } from '../../global/api';
import { PageCardReset } from "../../component/Common";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Row, Input, Col, Button, Card, Tag, message } from 'antd';
const { Search } = Input;
const dataConfig = [
  {title: '测试服验证码' , url: 'http://dev.jiaxinggufei.com/api/user/code/'},
  {title: '正式服验证码' , url: 'http://jiaxinggufei.com/api/user/code/'},
  {title: '测试服三大十招验证码' , url: 'https://sandashizhao.dev.jiaxinggufei.com/api/skill/wechat/code/'},
  {title: '正式服三大十招验证码' , url: 'https://sandashizhao.dev.jiaxinggufei.com/api/skill/wechat/code/'},
];
export default ({match})=> {
  return (
    <PageCardReset className={"index-section ghost"} parent={this} title="获取验证码" pageconfig={{keystr: "pdf"}}>
      {/* 获取路径的验证码 */}
      <Row gutter={16}>
        {dataConfig.map((d,index)=> <CodeInput {...d} key={index} />)}
      </Row>
    </PageCardReset>
  )
}

const CodeInput=(props)=>{
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('000000');
  const {url, title} = props;
  const onSearch =async (value)=> {
    setLoading(true);
    const {code, data} = await api('/api/global/resp-json', {url: url+value});
    if(code !== -1){
      const result = JSON.parse(data?.result || {});
      setCode(result?.code || result);
    }else{
      message.error(data);
    }
    setLoading(false);
  }
  return (
    <Col span={12} style={{marginBottom: '16px'}}>
      <Card title={title}>
        <br />
        <h3>链接：<Tag>{url}手机号</Tag></h3>
        <Search placeholder="请输入手机号" loading={loading} enterButton onSearch={onSearch} style={{margin: '20px 0'}} />
        验证码：<Tag color="green">{code}</Tag><CopyToClipboard text={code} onCopy={() => message.success('复制成功')}><Button type="primary" size="small">复制</Button></CopyToClipboard>
      </Card>
    </Col>
  )
}