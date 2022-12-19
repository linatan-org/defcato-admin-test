import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Layout,
  Image,
  Input,
  Checkbox,
  Typography,
  Space,
  Select,
  Form,
  FormInstance,
  Button,
  Tooltip,
  Modal,
  Upload,
  InputNumber
} from 'antd';
import type { UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ICatalogCategory, ICatalogItem } from '../../../../../server/models';
import './styles.scss';

const { Content } = Layout;
const { Text } = Typography;

interface CatalogItemProps {
  catalogCategories: ICatalogCategory[];
  form: FormInstance;
  editMode?: boolean;
  onFinish: (v: ICatalogItem) => void;
  onAddNewCategory: (descr: string) => void;
}
// Base64Picture
const SELECT_FIELD_NAMES = {
  label: 'Description',
  value: 'Code'
};

export const CatalogItem: React.FC<CatalogItemProps> = ({
  catalogCategories,
  form,
  onFinish,
  editMode,
  onAddNewCategory
}) => {
  const { t } = useTranslation();
  const uploadProps: UploadProps = {
    // beforeUpload: (file) => {
    //   const isPNG = file.type === 'image/png';
    //   if (!isPNG) {
    //     // message.error(`${file.name} is not a png file`);
    //   }
    //   return isPNG || Upload.LIST_IGNORE;
    // },
    onChange: (info) => {
      // form.setFieldValue('Base64Picture', info.fileList[0].thumbUrl);
      console.log(info.fileList[0]);
    }
  };

  const [filteredCategories, setFilteredCategories] = useState<ICatalogCategory[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    setFilteredCategories(catalogCategories);
  }, [catalogCategories]);

  const filterCategories = (searchText: string) => {
    let filtered = catalogCategories;
    if (searchText) {
      filtered = catalogCategories.filter((c) => c.Code.includes(searchText) || c.Description.includes(searchText));
    }
    setFilteredCategories(filtered);
  };

  const addNewCategory = (search: string) => {
    const modal = Modal.confirm({
      title: 'Add new category?',
      content: <Text strong>{search}</Text>,
      onOk: () => {
        onAddNewCategory(searchPhrase);
        setSearchPhrase('');
      }
    });
  };

  const onCategoryChange = (code: string) => {
    form.setFieldValue('CategoryCode', code);
  };

  const onFinishFailed = () => {};

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
          <Space direction="vertical">
            <Space
              align="start"
              direction="horizontal"
              size={20}
            >
              <Text className="title">{t('reports.catalog.catalogItemDetails.Code')}</Text>
              <Form.Item
                name="Code"
                rules={[{ required: true }]}
              >
                <Input disabled={editMode} />
              </Form.Item>
              <Form.Item
                name="IsNotActive"
                valuePropName="checked"
              >
                <Checkbox className="checkboxWrapper">
                  <Text>{t('reports.catalog.catalogItemDetails.IsNotActive')}</Text>
                </Checkbox>
              </Form.Item>
            </Space>
            <div className="codeContainer">
              <Text className="title">{t('reports.catalog.catalogItemDetails.BarCode')}</Text>
              <Form.Item name="BarCode">
                <Input />
              </Form.Item>
            </div>
          </Space>
          <div className="imageWrapper">
            <div className="imageMaskHover">
              <Upload
                {...uploadProps}
                className="uploadContainer"
                accept=".png,.jpg,.jpeg"
                showUploadList={false}
              >
                <Button
                  className="editImgBtn"
                  icon={<EditOutlined />}
                />
              </Upload>
            </div>
            {form.getFieldValue('Base64Picture') ? (
              <Image
                preview={false}
                width={100}
                src={`data:image/jpeg;base64,${form.getFieldValue('Base64Picture')}`}
              />
            ) : null}
          </div>
        </Space>
        <div className="codeContainer">
          <Text className="title">{t('reports.catalog.catalogItemDetails.Description')}</Text>
          <Form.Item
            className="flex-1"
            name="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="codeContainer">
          <Text className="title">{t('reports.catalog.catalogItemDetails.Price')}</Text>
          <Form.Item
            className="flex-1"
            name="Price"
            rules={[{ required: true, type: 'number' }]}
          >
            <InputNumber
              className="inputNumber"
              controls={false}
            />
          </Form.Item>
        </div>
        <div className="codeContainer">
          <Text className="title">{t('reports.catalog.catalogItemDetails.CategoryCode')}</Text>
          <Form.Item
            name="CategoryCode"
            className="flex-1"
          >
            <Select
              className="flex-1"
              placeholder={t('reports.catalog.catalogItemDetails.CategoryCode')}
              options={filteredCategories}
              fieldNames={SELECT_FIELD_NAMES}
              showSearch
              allowClear
              value={form.getFieldValue('CategoryCode')}
              onChange={(v, op) => onCategoryChange(v)}
              onSearch={setSearchPhrase}
              filterOption={(inputValue, option) =>
                !!option?.Code?.includes(inputValue) || !!option?.Description?.includes(inputValue)
              }
              defaultActiveFirstOption={false}
              showArrow={true}
              notFoundContent={
                <Tooltip
                  color="blue"
                  className="cursor-pointer d-inline"
                  placement="top"
                  title="Add new category"
                >
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => addNewCategory(searchPhrase)}
                    type="primary"
                  />
                </Tooltip>
              }
            />
          </Form.Item>
        </div>
      </Space>
    </Form>
  );
};
