import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Space, Checkbox, Input, Layout, Select } from 'antd';
import './styles.scss';
import { API } from '../../../../../server';
import { ICategory, IItem, RESPONSE_STATUSES } from '../../../../../server/models';
import useDebounceValue from '../../../../hooks/useDebounce';
import CustomTable from '../../../Dashboard/CustomTable';
import { getSaleReportsTableColumns } from '../../../Reports/SalesReports/columns';
import { getItemsColumns } from './columns';

interface IGlobalModalWrapperProps {
  isVisible: boolean;
  title?: string;
  onOk: (item: IItem) => void;
  onCancel: () => void;
}

const SELECT_FIELD_NAMES = {
  label: 'Value',
  value: 'Key'
};

const AddNewItemModal: React.FC<IGlobalModalWrapperProps> = ({ isVisible, onOk, onCancel }) => {
  const { t } = useTranslation();
  const [isProductFocused, setIsProductFocused] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [productSearchValue, setProductSearchValue] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [productSearchValueCOPY, setProductSearchValueCOPY] = useState<string>('');
  const [checkedCategoryKey, setCheckedCategoryKey] = useState<string>('');
  const [checkedItem, setCheckedItem] = useState<IItem[]>([]);
  const debouncedProductSearch = useDebounceValue<string>(productSearchValue, 700);

  const getFilterData = (debouncedProductSearch: string, categoryCode: string) => {
    API.keyboard.getCreateItems(debouncedProductSearch, categoryCode).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setCategories(res.Categories);
        setItems(res.Items);
      }
    });
  };

  useEffect(() => {
    if (isProductFocused) {
      setProductSearchValueCOPY(productSearchValue);
    }
  }, [isProductFocused, productSearchValue]);

  useEffect(() => {
    getFilterData('', '');
  }, []);

  useEffect(() => {
    console.log(checkedCategoryKey, 'checkedCategoryKey');
    getFilterData(productSearchValueCOPY, checkedCategoryKey);
  }, [checkedCategoryKey]);

  useEffect(() => {
    if (isProductFocused && debouncedProductSearch) {
      getFilterData(debouncedProductSearch, checkedCategoryKey);
    }
  }, [debouncedProductSearch, isProductFocused]);

  useEffect(() => {
    console.log(debouncedProductSearch, 'DEB', items);
  }, [debouncedProductSearch, items]);

  const onOkHandler = () => {
    console.log(checkedItem, 'CHECK');
    if (checkedItem.length) {
      onOk({
        ItemCode: checkedItem[0].Key,
        Name: checkedItem[0].Value,
        title: checkedItem[0].Value,
        IsCategory: isCategory
      });
    } else {
      onOk({
        Name: categoryName,
        title: categoryName,
        IsCategory: isCategory
      });
    }
    clearData();
  };

  const clearData = () => {
    setIsCategory(true);
    setCategories([]);
    setItems([]);
    setProductSearchValue('');
    setProductSearchValueCOPY('');
    setCheckedCategoryKey('');
    setCheckedItem([]);
  };

  return (
    <Modal
      title={t('addKeyboardItemModal.addItemCategory')}
      centered
      visible={isVisible}
      onOk={onOkHandler}
      onCancel={onCancel}
      cancelText={t('cancel')}
      okText={t('ok')}
      width={'80%'}
      cancelButtonProps={{
        size: 'large'
      }}
      okButtonProps={{
        size: 'large'
      }}
    >
      <div className="flex flex-1 items-center">
        <Checkbox
          checked={isCategory}
          onChange={(e) => {
            console.log(e, 'e.target.checked');
            setIsCategory(e.target.checked);
          }}
        >
          {t('addKeyboardItemModal.isCategory')}
        </Checkbox>
        {isCategory ? (
          <Input
            placeholder={t('addKeyboardItemModal.category')}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        ) : (
          <div className="flex flex-1">
            <Select
              className="flex-1 ml-5"
              fieldNames={SELECT_FIELD_NAMES}
              options={categories}
              placeholder={t('addKeyboardItemModal.category')}
              onChange={setCheckedCategoryKey}
            />
            <Select
              className="flex-1 flex mr-5"
              placeholder={t('addKeyboardItemModal.product')}
              options={items}
              fieldNames={SELECT_FIELD_NAMES}
              showSearch
              // @ts-ignore
              onChange={(v, op) => setCheckedItem([op])}
              onSearch={setProductSearchValue}
              onBlur={() => setIsProductFocused(false)}
              onFocus={() => setIsProductFocused(true)}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
            />
          </div>
        )}
      </div>
      {checkedItem.length ? (
        <div className="mt-4">
          <CustomTable
            scrollSize={200}
            data={checkedItem}
            columns={getItemsColumns(t)}
          />
        </div>
      ) : null}
    </Modal>
  );
};

export default AddNewItemModal;
