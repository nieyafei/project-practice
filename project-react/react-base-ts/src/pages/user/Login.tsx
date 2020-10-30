import React, {useState} from "react";
import { api } from "../../global/api";
import { FormBase } from "../../components/formComp";
import { PhoneRules } from "../../utils/Rules"
import { Form, Button, Spin, message } from "antd";

async function loginApi(values: object, setLoading: Function){
  message.success("kaishi")
  setLoading(true);
  const {data} = await api('/api/auth/login_by_password', values, '');
  if(data){

  }
  setLoading(false);
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Index: React.FC =(props)=> {
  const [loading, setLoading] = useState<boolean>(false);
  console.log('打印数据', props)
  const onFinish=(values: Object)=> {
    loginApi(values, setLoading);
  }
  const onFinishFailed=(errorInfo: Object)=> {
    console.log('失败：', errorInfo)
  }
  return (
    <div className="login-section">
      <Spin spinning={loading}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h2>科学家在线</h2>
          <FormBase.Input label="手机号" name="phone" rules={PhoneRules} required />
          <FormBase.InputPassword label="密码" name="password" required />
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}
export default Index;