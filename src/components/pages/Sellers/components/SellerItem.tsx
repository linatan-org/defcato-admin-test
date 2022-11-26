import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Checkbox, Typography, Space, Form, FormInstance, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { ISeller } from '../../../../server/models';
import './styles.scss';

const { Text } = Typography;

interface CatalogItemProps {
  form: FormInstance;
  editMode?: boolean;
  onFinish: (v: ISeller) => void;
}

export const SellerItem: React.FC<CatalogItemProps> = ({ form, onFinish, editMode }) => {
  const { t } = useTranslation();

  const onFinishFailed = () => {};
  const codePhoneValidator = (_: any, value: any) => {
    if (/^[0-9]+$/.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('Some message here');
    }
  };
  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space direction="vertical">
        <Space
          direction="horizontal"
          size={20}
        >
          <Space
            align="start"
            direction="horizontal"
            size={20}
          >
            <Text className="title">{t('sellers.SellerCode')}</Text>
            <Form.Item
              className="flex-1"
              name="SellerCode"
              rules={[
                {
                  required: true,
                  message: 'Should contain only number',
                  validator: codePhoneValidator
                }
              ]}
            >
              <Input disabled={editMode} />
            </Form.Item>
            <Form.Item
              name="IsNotActive"
              valuePropName="checked"
            >
              <Checkbox className="checkboxWrapper">
                <Text>{t('sellers.IsNotActive')}</Text>
              </Checkbox>
            </Form.Item>
          </Space>
        </Space>
        <div className="codeContainer">
          <Text className="title">{t('sellers.Name')}</Text>
          <Form.Item
            className="flex-1"
            name="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="codeContainer">
          <Text className="title">{t('sellers.CellPhone')}</Text>
          <Form.Item
            className="flex-1"
            name="CellPhone"
            rules={[
              {
                required: true,
                message: 'Should contain only number',
                validator: codePhoneValidator
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </Space>
    </Form>
  );
};
