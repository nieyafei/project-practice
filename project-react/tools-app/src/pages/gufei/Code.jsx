import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { PageCardReset } from "../../component/Common";
import { Row, Input, Col, Button, Card, Tag } from 'antd';
const { Search } = Input;

export default ({match})=> {
  return (
    <PageCardReset className={"index-section ghost"} parent={this} title="获取验证码" pageconfig={{keystr: "pdf"}}>
      {/* 获取路径的验证码 */}
      <Row gutter={16}>
        <CodeInput title={'测试服验证码'} url="http://dev.jiaxinggufei.com/api/user/code/" />
      </Row>
    </PageCardReset>
  )
}

const CodeInput=(props)=>{
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('000000');
  const {url, title} = props;
  const onSearch =(value)=> {
    /* fetch(url+value, {method:'GET', mode: "cors", headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json;charset=utf-8'
    }}).then(res=> {
      console.log(res)
      return res.json();
    }).then(json=> {
      console.log(json);
    }).catch(err=> {
      console.log(err);
    }) */
  }
  return (
    <Col span={12}>
      <Card title={title}>
        <br />
        <h3>链接：<Tag>{url}手机号</Tag></h3>
        <Search placeholder="请输入手机号" loading={loading} enterButton onSearch={onSearch} style={{margin: '20px 0'}} />
        验证码：<Tag color="green">{code}</Tag><Button type="primary" size="small">复制</Button>
      </Card>
    </Col>
  )
}