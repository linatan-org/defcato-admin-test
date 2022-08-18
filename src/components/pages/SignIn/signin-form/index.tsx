import { Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, EnterOutlined } from '@ant-design/icons';
import useAuth from '../../../../contexts/auth/hook';
import { AUTH_URL } from '../../../../constants/data';
import axios from 'axios';
import { toast } from 'react-toastify';

type EnterForm = {
  username?: string;
  password?: string;
};

export default function SigninForm() {
  const authContext = useAuth();
  console.log(sessionStorage.key !== null);
  const [loadingButton, setLoadingButton] = useState<boolean>();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: 'test',
      password: '1234'
    });
  }, [form]);

  const onFinish = (values: EnterForm) => {
    const { username, password } = values;
    setLoadingButton(true);
    axios
      .post(AUTH_URL, {
        User: username,
        Password: password
      })
      .then(function (res) {
        if (
          res.status === 200 &&
          res.data.ErrorCode === 0 &&
          res.data.ErrorMessage === ''
        ) {
          sessionStorage.setItem('token', res.data.SessionKey);
          authContext.setIsSignedIn(true);
        } else {
          setLoadingButton(false);
          toast(res.data.ErrorMessage);
          form.resetFields();
        }
      })
      .catch(function (error) {
        setLoadingButton(false);
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Form onFinish={onFinish} form={form} className="w-96">
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="h-12"
            prefix={<UserOutlined />}
            placeholder="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 3,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input
            className="h-12"
            prefix={<LockOutlined />}
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            icon={<EnterOutlined />}
            loading={loadingButton}
            className="w-full h-12"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
