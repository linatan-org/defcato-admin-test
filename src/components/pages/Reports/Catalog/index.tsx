import React, { useEffect, useState } from 'react';
import { Layout, Button, Modal, Form, Tooltip, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ICatalogCategory, ICatalogItem, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getCatalogTableColumns } from './columns';
import { getCatalogFilters } from './filters';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
import { CatalogItem } from './components/CatalogItem';

const emptyCatalogItem = {
  BarCode: '',
  Base64Picture: '',
  CategoryCode: '',
  Code: null,
  Description: '',
  IsNotActive: false,
  Price: null
};

const Catalog: React.FC<any> = () => {
  const { t } = useTranslation();
  const [catalog, setCatalog] = useState<ICatalogItem[]>([]);
  const [reloadTable, setRealoadTable] = useState(0);
  const [catalogEditItem, setCatalogEditItem] = useState<ICatalogItem | null>();
  const [isCreateCatalogItem, setIsCreateCatalogItem] = useState(false);
  const [catalogCategories, setCatalogCategories] = useState<ICatalogCategory[]>([]);
  const [filtersValues, setFiltersValues] = useState({});
  const [form] = Form.useForm();

  const getSaleReports = (filters: any) => {
    if (filters.InputData) {
      API.reports.catalog.getCatalog(filters.InputData).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          setCatalog(res.List);
        }
      });
    }
  };

  useEffect(() => {
    if (catalogEditItem) {
      form.setFieldsValue({ ...catalogEditItem });
    }
  }, [catalogEditItem]);

  useEffect(() => {
    API.reports.catalog.getCatalogCategories().then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setCatalogCategories(res.List);
      }
    });
  }, []);

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
    }
  }, [filtersValues, reloadTable]);

  const onFinish = (values: ICatalogItem) => {
    if (catalogEditItem) {
      API.reports.catalog.editCatalogItem(values).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: 'Catalog item has been added',
            placement: 'bottomRight'
          });
          form.resetFields();
          setCatalogEditItem(null);
          setRealoadTable(reloadTable + 1);
        }
      });
    } else {
      API.reports.catalog.createCatalogItem(values).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: 'Catalog item has been edited',
            placement: 'bottomRight'
          });
          form.resetFields();
          setIsCreateCatalogItem(false);
        }
      });
    }
  };

  const onAddNewCategory = (descr: string) => {
    API.reports.catalog
      .addNewCatalogCategory(descr)
      .then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          notification.success({
            message: '',
            description: 'Category has been added',
            placement: 'bottomRight'
          });
          const newCAtCode = res.List.find((nc) => nc.Description === descr);
          if (newCAtCode) {
            form.setFieldValue('CategoryCode', newCAtCode.Code);
          }
          setCatalogCategories(res.List);
        }
      })
      .catch((e) => console.log(e, 'ERROR'));
  };

  const clearCreateEditCatalogItemMode = () => {
    setIsCreateCatalogItem(false);
    setCatalogEditItem(null);
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
            {catalogEditItem ? t('reports.catalog.catalogItemDetails.Update') : t('reports.catalog.catalogItemDetails.Add')}
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
            onClick={() => setIsCreateCatalogItem(true)}
            type="primary"
            className="userDailyStatsBtn"
          />
        </Tooltip>
        <CustomTable
          data={catalog}
          columns={getCatalogTableColumns(t)}
          onDoubleClick={setCatalogEditItem}
        />
      </div>
      <Modal
        className="modalStyle"
        title={t('reports.catalog.catalogItemDetails.title')}
        centered
        visible={!!catalogEditItem || isCreateCatalogItem}
        onCancel={clearCreateEditCatalogItemMode}
        footer={modalActionButtons()}
      >
        <CatalogItem
          onAddNewCategory={onAddNewCategory}
          onFinish={onFinish}
          editMode={!!catalogEditItem}
          form={form}
          catalogCategories={catalogCategories}
        />
      </Modal>
    </Layout>
  );
};

export default Catalog;
