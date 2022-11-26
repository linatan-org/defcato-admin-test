import React, { useEffect, useState } from 'react';
import { Layout, Button, Modal, Form, Tooltip, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../server';
import { ICatalogCategory, ICatalogItem, ISeller, RESPONSE_STATUSES } from '../../../server/models';
import CustomTable from '../Dashboard/CustomTable';
import Filters from '../../filters/FIlters';
import { getCatalogTableColumns } from './columns';
import { getCatalogFilters } from './filters';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
import { SellerItem } from './components/SellerItem';

const Sellers: React.FC<any> = () => {
  const { t } = useTranslation();
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [reloadTable, setRealoadTable] = useState(0);
  const [sellerEditItem, setSellerEditItem] = useState<ISeller | null>();
  const [isCreateSeller, setIsCreateSeller] = useState(false);
  const [filtersValues, setFiltersValues] = useState({});
  const [form] = Form.useForm();

  const getSellers = (filters: any) => {
    if (filters.InputData) {
      API.sellers.get(filters.InputData).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          setSellers(res.List);
        }
      });
    }
  };

  useEffect(() => {
    if (sellerEditItem) {
      form.setFieldsValue({ ...sellerEditItem });
    }
  }, [sellerEditItem]);

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSellers(filtersValues);
    }
  }, [filtersValues, reloadTable]);

  const onFinish = (values: ISeller) => {
    if (sellerEditItem) {
      API.sellers.editSeller(values).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: 'Seller has been added',
            placement: 'bottomRight'
          });
          form.resetFields();
          setSellerEditItem(null);
          setRealoadTable(reloadTable + 1);
        }
      });
    } else {
      API.sellers.createSeller(values).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: 'Seller has been edited',
            placement: 'bottomRight'
          });
          form.resetFields();
          setIsCreateSeller(false);
        }
      });
    }
  };

  const clearCreateEditCatalogItemMode = () => {
    setIsCreateSeller(false);
    setSellerEditItem(null);
    form.resetFields();
  };

  const modalActionButtons = () => {
    return [
      <div
        key="wrapper"
        className="actions-button-wrapper"
      >
        <div key="wrapper">
          <Button
            size="large"
            key={t('reports.catalog.catalogItemDetails.Update')}
            type="primary"
            onClick={() => form.submit()}
          >
            {sellerEditItem ? t('reports.catalog.catalogItemDetails.Update') : t('reports.catalog.catalogItemDetails.Add')}
          </Button>
        </div>
        <Button
          size="large"
          key={t('reports.catalog.catalogItemDetails.Exit')}
          onClick={clearCreateEditCatalogItemMode}
        >
          {t('reports.catalog.catalogItemDetails.Exit')}
        </Button>
      </div>
    ];
  };
  return (
    <Layout>
      <Filters
        filters={getCatalogFilters(t)}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div className="relative">
        <Tooltip
          color="blue"
          className="cursor-pointer d-inline"
          placement="top"
          title="Add new item"
        >
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsCreateSeller(true)}
            type="primary"
            className="userDailyStatsBtn"
          />
        </Tooltip>
        <CustomTable
          data={sellers}
          columns={getCatalogTableColumns(t)}
          onDoubleClick={setSellerEditItem}
        />
      </div>
      <Modal
        className="modalStyle"
        title={t('sellers.title')}
        centered
        width={400}
        visible={!!sellerEditItem || isCreateSeller}
        onCancel={clearCreateEditCatalogItemMode}
        footer={modalActionButtons()}
      >
        <SellerItem
          onFinish={onFinish}
          editMode={!!sellerEditItem}
          form={form}
        />
      </Modal>
    </Layout>
  );
};

export default Sellers;
