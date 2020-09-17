import React, {useState, forwardRef, useImperativeHandle} from "react";
import { api } from '../global/api';
import Tool from "../utils/Tool";
import {Modal, Form, Input, Button, message, Spin} from "antd";

export default forwardRef((props, ref)=> {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit=async (values)=> {
    // e.preventDefault();
    setLoading(true);
    const {data, code, message: msg} = await api('/api/gufei/user/login', values);
    if(code === 0){
      message.success('登录成功');
      await Tool.localItem(props?.useKey, JSON.stringify(data));
      props.refreshData && props.refreshData();
      onCancel(false);
    }else{
      message.error(msg);
    }
    setLoading(false);
    /* form.validateFields()
    .then(values => {
      console.log(values);
    }).catch(info => {
      console.log('Validate Failed:', info);
    }); */
  }
  const onCancel=(flag)=>{
    console.log(flag);
    setVisible(flag);
    form.resetFields();
  }
  // console.log(ref)
  useImperativeHandle(ref, () => ({
    formFields: form.getFieldsValue(), // 暴露表单数据
    onCancel
  }))
  return (
    <Modal
      visible={visible}
      getContainer={false}
      title="登录"
      okText="登录"
      closable={false}
      maskClosable={false}
      centered
      width={400}
      footer={null}
      confirmLoading={loading}
      onOk={(e)=> handleSubmit(e)}
      className={""}
    >
      <Spin spinning={loading}>
        <Form layout="vertical" form={form} name="form_in_modal" onFinish={(e)=> handleSubmit(e)}>
          <Form.Item
            label="用户名"
            name="accountName"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
        </Form>
      </Spin>
    </Modal>
  )
})
