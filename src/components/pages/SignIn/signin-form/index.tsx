import { Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, EnterOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import useAuth from '../../../../contexts/auth/hook';
import { toast } from 'react-toastify';
import { API } from '../../../../server';
import axios from 'axios';
import { AUTH_URL } from '../../../../constants/data';
import { RESPONSE_STATUSES } from '../../../../server/models';
import { setAuth } from '../../../../reudux/auth/action';

type EnterForm = {
  username?: string;
  password?: string;
};

export default function SigninForm() {
  const dispatch = useDispatch();
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
    if (username && password) {
      API.auth
        .signIn(username, password)
        .then((res) => {
          if (res.ErrorCode === RESPONSE_STATUSES.OK) {
            console.log(res, 'RESPONSE');
            localStorage.setItem('token', res.SessionKey);
            dispatch(setAuth(true));
          } else {
            setLoadingButton(false);
            toast(res.ErrorMessage);
            form.resetFields();
          }
        })
        .catch((err) => {
          setLoadingButton(false);
          console.log(err);
        });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        onFinish={onFinish}
        form={form}
        className="w-96"
      >
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
