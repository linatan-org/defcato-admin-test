import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useTranslation } from 'react-i18next';
import { IKeyboardFields } from '../../server/models';

const { RangePicker } = DatePicker;

interface KeyboardCategoryFormProps {
  form: FormInstance<any>;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  handleFinish: (values: any) => void;
  values?: IKeyboardFields;
}

const KeyboardCategoryForm: React.FC<KeyboardCategoryFormProps> = ({ form, handleFinish, values, onValuesChange }) => {
  const { t } = useTranslation();

  const formlocal = form || Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <div>
      <Form
        {...layout}
        form={formlocal}
        className="mt-4"
        name="control-ref"
        onFinish={handleFinish}
        onValuesChange={(cv: any, av: any) => onValuesChange && onValuesChange(cv, av)}
      >
        <Row>
          <Col span={10}>
            <Form.Item
              name="Name"
              label={t('keyboard.keyboardName')}
              rules={[{ required: true }]}
            >
              <Input
                value={''}
                placeholder={t('keyboard.keyboardName')}
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="DateRange"
              label={t('dates')}
              rules={[{ required: true }]}
            >
              <RangePicker
                format={'DD/MM/yyyy'}
                onChange={(v, s) => {
                  const FromDate = s[0];
                  const ToDate = s[1];
                  console.log({ FromDate, ToDate });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default KeyboardCategoryForm;
