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
import set = Reflect.set;

interface IGlobalModalWrapperProps {
  isVisible: boolean;
  isAddRefItems: boolean;
  isMultiItems: boolean;
  editableItem: IItem | ICategory | null;
  forbiddenCreateCategory?: boolean;
  forbiddenCreateProduct?: boolean;
  isAddTopCategory: boolean;
  title?: string;
  onOk: (item: IItem) => void;
  onAddReffItems: (data: { References: string[]; Items: IItem[] }) => void;
  onCancel: () => void;
}

const SELECT_FIELD_NAMES = {
  label: 'Value',
  value: 'Key'
};

const AddNewItemModal: React.FC<IGlobalModalWrapperProps> = ({
  isVisible,
  editableItem,
  isAddTopCategory,
  isAddRefItems,
  isMultiItems,
  onOk,
  onCancel,
  forbiddenCreateProduct,
  forbiddenCreateCategory,
  onAddReffItems
}) => {
  const { t } = useTranslation();
  const [isProductFocused, setIsProductFocused] = useState(false);
  const [isCategory, setIsCategory] = useState(isAddRefItems ? false : !!editableItem?.IsCategory);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [productSearchValue, setProductSearchValue] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>(editableItem?.title || '');
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
    if (isAddRefItems) {
      setIsCategory(false);
    }
    if (forbiddenCreateProduct) {
      setIsCategory(true);
    }

    if (forbiddenCreateCategory) {
      setIsCategory(false);
    }
  }, [isAddRefItems, forbiddenCreateProduct, forbiddenCreateCategory]);

  useEffect(() => {
    if (editableItem) {
      // @ts-ignore
      setCategoryName(editableItem?.title);
    }
  }, [editableItem]);

  useEffect(() => {
    if (isProductFocused) {
      setProductSearchValueCOPY(productSearchValue);
    }
  }, [isProductFocused, productSearchValue]);

  useEffect(() => {
    if (isVisible) {
      getFilterData('', '');
    } else {
      clearData();
    }
  }, [isVisible]);

  useEffect(() => {
    getFilterData(productSearchValueCOPY, checkedCategoryKey);
  }, [checkedCategoryKey]);

  useEffect(() => {
    if (isProductFocused && debouncedProductSearch) {
      getFilterData(debouncedProductSearch, checkedCategoryKey);
    }
  }, [debouncedProductSearch, isProductFocused]);

  const onOkHandler = () => {
    if (isAddRefItems) {
      // @ts-ignore
      const References: string[] = checkedItem.map((ci) => ci.Key);
      const Items = checkedItem.map((ci) => ({
        ItemCode: ci.Key,
        Name: ci.Value,
        title: ci.Value,
        IsReferenceItem: true
      }));
      onAddReffItems({ References, Items });
    } else if (checkedItem.length) {
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
    setCategoryName('');
    setProductSearchValue('');
    setProductSearchValueCOPY('');
    setCheckedCategoryKey('');
    setCheckedItem([]);
  };

  const onRemoveItemFromAdded = (item: IItem) => {
    const copyChecked = [...checkedItem];
    const itemIndex = copyChecked.map((it) => it.Key).indexOf(item.Key);
    copyChecked.splice(itemIndex, 1);
    setCheckedItem(copyChecked);
  };

  const onAddProducts = (newProduct: IItem) => {
    const copyItems = [...checkedItem];
    if (isAddRefItems && isMultiItems) {
      copyItems.push(newProduct);
    } else {
      copyItems[0] = newProduct;
    }
    setCheckedItem(copyItems);
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
        size: 'large',
        disabled: !categoryName && checkedItem.length === 0
      }}
    >
      <div className="flex flex-1 items-center">
        <Checkbox
          disabled={isAddTopCategory || isAddRefItems || !!editableItem || forbiddenCreateCategory || forbiddenCreateProduct}
          // eslint-disable-next-line
          checked={forbiddenCreateCategory ? !forbiddenCreateCategory : forbiddenCreateProduct ? forbiddenCreateProduct : isCategory}
          onChange={(e) => {
            setCategoryName('');
            setCheckedItem([]);
            setIsCategory(e.target.checked);
          }}
        >
          {t('addKeyboardItemModal.isCategory')}
        </Checkbox>
        {isCategory ? (
          <Input
            value={categoryName}
            placeholder={t('addKeyboardItemModal.category')}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        ) : (
          <div className="flex flex-1">
            <Select
              className="flex-1 flex ml-5"
              placeholder={t('addKeyboardItemModal.product')}
              options={items}
              fieldNames={SELECT_FIELD_NAMES}
              showSearch
              allowClear
              // @ts-ignore
              onChange={(v, op) => onAddProducts(op)}
              onSearch={setProductSearchValue}
              onBlur={() => setIsProductFocused(false)}
              onFocus={() => setIsProductFocused(true)}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
            />
            <Select
              className="flex-1 mr-5"
              fieldNames={SELECT_FIELD_NAMES}
              options={categories}
              placeholder={t('addKeyboardItemModal.category')}
              onChange={setCheckedCategoryKey}
              allowClear
            />
          </div>
        )}
      </div>
      {checkedItem.length ? (
        <div className="mt-4">
          <CustomTable
            scrollSize={200}
            data={checkedItem}
            columns={getItemsColumns(t, onRemoveItemFromAdded)}
          />
        </div>
      ) : null}
    </Modal>
  );
};

export default AddNewItemModal;
