import { EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons/lib';
import { FormInstance } from 'antd/es/form';
import React, { useEffect, useState } from 'react';
import { Button, Typography, Modal, PageHeader, Space, notification, Input, Form, Tooltip } from 'antd';
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';
import { ICategory, IItem, IKeyBoard, IKeyboardFields, IKeyboardItem, RESPONSE_STATUSES } from '../../../server/models';
import './styles.scss';
import '@nosferatu500/react-sortable-tree/style.css';
import { API } from '../../../server';
import AddNewItemModal from './components/AddNewItemModal/AddNewItemModal';
import { keyboardKeyReplace } from '../../../helpers/helpers';
import { DeleteOutlined } from '@ant-design/icons';
import KeyboardCategoryForm from '../../KeyboardCategoryForm/KeyboardCategoryForm';
import moment from 'moment';

const { Text } = Typography;
const maxDepth = 5;

declare type GenerateNodePropsParams = {
  node: any;
  path: number[];
  treeIndex: number;
  lowerSiblingCounts: number[];
  isSearchMatch: boolean;
  isSearchFocus: boolean;
};

const KeyboardEditor: React.FC = () => {
  const { t } = useTranslation();
  const [keyBoardForm] = Form.useForm();
  const params: { id: string } = useParams();
  const navigation = useHistory();
  const location = useLocation();
  const [IsAllowDefineItemOnCategoryLevel, setIsAllowDefineItemOnCategoryLevel] = useState(true);

  const isDuplicate = navigation.location.pathname.includes('duplicate');
  const isCreateNew = navigation.location.pathname.includes('new');
  const keyboard: IKeyBoard = useSelector((state: any) =>
    state.keyboard.keyboardList.find((kb: IKeyBoard) => {
      const matchedKb = kb?.SysId?.toString() === params.id && kb;
      let copyKb;
      if (matchedKb && isDuplicate) {
        copyKb = { ...matchedKb };
        delete copyKb.SysId;
      }
      return copyKb || matchedKb;
    })
  );

  const [checkedRowInfo, setCheckedRowInfo] = useState<GenerateNodePropsParams | null>(null);
  const [isVisibleAddNewItemModal, setIsVisibleAddNewItemModal] = useState(false);
  const [isVisibleConformModal, setIsVisibleConformModal] = useState(false);
  const [isGoBack, setIsGoBack] = useState(false);
  const [isVisibleModalWithoutSave, setSetIsVisibleModalWithoutSave] = useState(false);
  const [isMultiNewItems, setIsMultiNewItems] = useState(false);
  const [isAddRefItems, setIsAddRefItems] = useState(false);
  const [isTreeWasChanged, setIsTreeWasChanged] = useState(isDuplicate || false);
  const [editableItem, setEditableItem] = useState<GenerateNodePropsParams | null>(null);
  const [newTreeData, setNewStreeData] = useState<IKeyboardItem[]>(keyboard ? keyboard.children : []);

  useEffect(() => {
    const FromDate = keyboard && keyboard.FromDate ? moment(keyboard.FromDate) : moment();
    const ToDate = keyboard && keyboard.FromDate ? moment(keyboard.ToDate) : moment();
    keyBoardForm.setFieldsValue({ DateRange: [FromDate, ToDate], Name: keyboard && keyboard.title });
    if (location.state) {
      setIsAllowDefineItemOnCategoryLevel(!!(location.state as any).IsAllowDefineItemOnCategoryLevel);
    }
  }, []);

  // @ts-ignore
  const getNodeKey: any = ({ treeIndex }) => treeIndex;

  const handleTreeOnChange = (treeData: any) => {
    setNewStreeData(treeData);
  };

  const onBack = (isConfirmed: boolean) => {
    if (isTreeWasChanged && !isConfirmed) {
      setSetIsVisibleModalWithoutSave(true);
      return;
    }
    navigation.goBack();
  };

  const onCancelNewItem = () => {
    setIsAddRefItems(false);
    setIsMultiNewItems(false);
    setIsVisibleAddNewItemModal(false);
    setCheckedRowInfo(null);
  };

  const onAddNewItem = async (item: IItem) => {
    let newTree;
    if (checkedRowInfo && !editableItem) {
      newTree = addNodeUnderParent({
        treeData: newTreeData,
        parentKey: checkedRowInfo.path[checkedRowInfo.path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: item
        // addAsFirstChild: state.addAsFirstChild
      }).treeData;
    } else if (editableItem) {
      newTree = changeNodeAtPath({
        treeData: newTreeData,
        path: editableItem.path,
        // @ts-ignore
        expandParent: true,
        getNodeKey,
        newNode: { ...editableItem.node, ...item }
      });
    } else {
      newTree = addNodeUnderParent({
        treeData: newTreeData,
        expandParent: true,
        getNodeKey,
        newNode: item
        // addAsFirstChild: state.addAsFirstChild
      }).treeData;
    }
    // @ts-ignore
    setNewStreeData(newTree);
    clearData();
  };

  const onSave = async (isGoBack: boolean) => {
    setIsGoBack(isGoBack);
    keyBoardForm.submit();
  };

  const handleOnSave = async (values: IKeyboardFields) => {
    const replacedData = keyboardKeyReplace(newTreeData, false);
    const copyKeyBoard = { ...keyboard };
    copyKeyBoard.Name = values.Name;
    copyKeyBoard.FromDate = values.DateRange[0];
    copyKeyBoard.ToDate = values.DateRange[1];
    copyKeyBoard.Items = replacedData;
    const keyboardAction = isDuplicate || isCreateNew ? 'createKeyboard' : 'updateKeyboard';
    await API.keyboard[keyboardAction](copyKeyBoard).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        notification.success({
          message: '',
          description: t('changesHasBeenSaved'),
          placement: 'bottomRight'
        });
      }
    });
    setIsTreeWasChanged(false);
    if (isGoBack) {
      setIsGoBack(false);
      onBack(true);
    }
  };

  const onAskDelete = (rowInfo: GenerateNodePropsParams) => {
    setCheckedRowInfo(rowInfo);
    setIsVisibleConformModal(true);
  };

  const onConfirmDeleteItem = () => {
    if (checkedRowInfo) {
      const newTree = removeNodeAtPath({
        treeData: newTreeData,
        path: checkedRowInfo.path,
        getNodeKey
      });
      setCheckedRowInfo(null);
      setIsVisibleConformModal(false);
      // @ts-ignore
      setNewStreeData(newTree);
      setIsTreeWasChanged(true);
    }
  };

  const onCancelDeleteItem = () => {
    setCheckedRowInfo(null);
    setIsVisibleConformModal(false);
  };

  const getActionButtons = (rowInfo: GenerateNodePropsParams) => {
    if (rowInfo.node.IsCategory) {
      return [
        <Space key="btns-category">
          {editButton(rowInfo)}
          {addButton(rowInfo)}
          {deleteButton(rowInfo)}
        </Space>
      ];
    } else if (rowInfo.node.IsReferenceItem) {
      return [<Space key="btns-ref">{deleteButton(rowInfo)}</Space>];
    }
    return [
      <Space key="btns-product">
        {addButton(rowInfo, false, true)}
        {deleteButton(rowInfo)}
      </Space>
    ];
  };

  const onEdit = (rowInfo: GenerateNodePropsParams) => {
    setEditableItem(rowInfo);
    setIsVisibleAddNewItemModal(true);
  };

  const isForbiddenCreateCategory = (item: IKeyboardItem | null): boolean => {
    const isAllProducts =
      item && item.IsCategory && item.children && item.children.length && item.children.every((c) => !c.IsCategory);
    const isProduct = item && !item.IsCategory;
    return (!!isAllProducts || !!isProduct) && !IsAllowDefineItemOnCategoryLevel;
  };

  const isForbiddenCreateProduct = (item: IKeyboardItem | null): boolean => {
    const isAllCategories =
      item && item.IsCategory && item.children && item.children.length && item.children.every((c) => c.IsCategory);
    const isCategory = item && item.IsCategory;
    return (!!isAllCategories || !!isCategory) && !IsAllowDefineItemOnCategoryLevel;
  };

  const addButton = (rowInfo: GenerateNodePropsParams, isAddTopCategory?: boolean, isAddRefItems?: boolean) => {
    const tooltipText = rowInfo.node.IsCategory ? t('keyboard.addProductTooltip') : t('keyboard.addSubProductTooltip');
    return (
      <Tooltip
        key={tooltipText}
        color="blue"
        className="cursor-pointer d-inline"
        placement="top"
        title={tooltipText}
      >
        <Button
          icon={<PlusOutlined />}
          shape="circle"
          key="addButton"
          type="primary"
          onClick={() => {
            if (!isAddTopCategory || isAddRefItems) {
              setCheckedRowInfo(rowInfo);
            }
            if (isAddRefItems) {
              setIsAddRefItems(true);
              setIsMultiNewItems(true);
            }
            setIsVisibleAddNewItemModal(true);
          }}
        />
      </Tooltip>
    );
  };

  const deleteButton = (rowInfo: GenerateNodePropsParams) => {
    return (
      <Button
        icon={<DeleteOutlined />}
        danger
        shape="circle"
        key="delete"
        onClick={() => onAskDelete(rowInfo)}
      />
    );
  };

  const editButton = (rowInfo: GenerateNodePropsParams) => {
    return (
      <Tooltip
        key={t('keyboard.editCategoryTooltip')}
        color="blue"
        className="cursor-pointer d-inline"
        placement="top"
        title={t('keyboard.editCategoryTooltip')}
      >
        <Button
          className="editButton"
          icon={<EditOutlined />}
          shape="circle"
          key="edit"
          onClick={() => onEdit(rowInfo)}
        />
      </Tooltip>
    );
  };

  const getExtraHeaderButtons = () => {
    return [
      <Button
        type="primary"
        key="save"
        size="large"
        disabled={!isTreeWasChanged}
        onClick={() => onSave(false)}
      >
        {t('save')}
      </Button>,
      <Button
        type="primary"
        key="saveAndBack"
        size="large"
        disabled={!isTreeWasChanged}
        onClick={() => onSave(true)}
      >
        {t('saveAndBack')}
      </Button>
    ];
  };

  const onAddReffItems = (data: { References: string[]; Items: IItem[] }) => {
    let newTree: any;
    if (isAddRefItems && checkedRowInfo) {
      const copyInfo = { ...checkedRowInfo };
      copyInfo.node.References = [...data.References];
      copyInfo.node.Items = [...data.Items];
      newTree = changeNodeAtPath({
        treeData: newTreeData,
        path: checkedRowInfo.path,
        // @ts-ignore
        expandParent: true,
        getNodeKey,
        newNode: copyInfo.node
      });
      data.Items.forEach((it) => {
        newTree = addNodeUnderParent({
          treeData: newTree,
          parentKey: checkedRowInfo.path[checkedRowInfo.path.length - 1],
          expandParent: true,
          getNodeKey,
          newNode: it
          // addAsFirstChild: state.addAsFirstChild
        }).treeData;
      });
    }
    setNewStreeData(newTree);
    clearData();
  };

  const clearData = () => {
    setIsVisibleAddNewItemModal(false);
    setCheckedRowInfo(null);
    setIsAddRefItems(false);
    setIsMultiNewItems(false);
    setIsTreeWasChanged(true);
  };

  return (
    <div className="wrapper">
      <PageHeader
        className="header"
        title={t('back')}
        onBack={() => onBack(false)}
        extra={getExtraHeaderButtons()}
      />
      <KeyboardCategoryForm
        handleFinish={handleOnSave}
        form={keyBoardForm}
        onValuesChange={(cv, av) => setIsTreeWasChanged(true)}
      />
      <Button
        className="w-80 m-4"
        type="primary"
        size="large"
        onClick={() => setIsVisibleAddNewItemModal(true)}
      >
        {t('keyboard.addNewCategory')}
      </Button>
      <div className="tree-wrapper">
        <SortableTree
          treeData={newTreeData}
          onChange={handleTreeOnChange}
          onMoveNode={({ node, nextTreeIndex, nextPath }) => {
            setIsTreeWasChanged(true);
          }}
          maxDepth={maxDepth}
          onlyExpandSearchedNodes={true}
          canDrag={({ node }) => !node.noDragging}
          canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
          onDragStateChanged={(e) => console.log(e)}
          generateNodeProps={(rowinfo) => ({
            buttons: getActionButtons(rowinfo),
            /* eslint-disable */
            className: `
              ${rowinfo.node.IsCategory && 'categoryItem'}
              ${rowinfo.node.IsReferenceItem && 'referenceItem'}
              ${!rowinfo.node.IsCategory && 'productItem'}
              ${(
                !rowinfo.node.IsCategory && rowinfo.node.Items && rowinfo.node.Items.length
                || !rowinfo.node.IsCategory && rowinfo.node.children && rowinfo.node.children.length
              ) && 'productItemWithRefItems' }
            `
            /* eslint-disable */
          })}
        />
      </div>
      <AddNewItemModal
        forbiddenCreateCategory={isForbiddenCreateCategory(checkedRowInfo?.node)}
        forbiddenCreateProduct={isForbiddenCreateProduct(checkedRowInfo?.node)}
        isAddTopCategory={!checkedRowInfo}
        editableItem={editableItem && editableItem.node}
        onCancel={onCancelNewItem}
        onOk={onAddNewItem}
        onAddReffItems={onAddReffItems}
        isVisible={isVisibleAddNewItemModal}
        isAddRefItems={isAddRefItems}
        isMultiItems={isMultiNewItems}
      />
      <Modal
        title={''}
        centered
        visible={isVisibleConformModal}
        onOk={onConfirmDeleteItem}
        onCancel={onCancelDeleteItem}
        cancelText={t('cancel')}
        okText={t('ok')}
        cancelButtonProps={{
          size: 'large'
        }}
        okButtonProps={{
          size: 'large'
        }}
      >
        <Text>
          {checkedRowInfo?.node?.IsCategory
            ? t('addKeyboardItemModal.areYouSureDeleteCategory')
            : t('addKeyboardItemModal.areYouSureDeleteProduct')}
        </Text>
      </Modal>
      <Modal
        title={''}
        centered
        visible={isVisibleModalWithoutSave}
        onOk={() => onBack(true)}
        onCancel={() => setSetIsVisibleModalWithoutSave(false)}
        cancelText={t('cancel')}
        okText={t('ok')}
        cancelButtonProps={{
          size: 'large'
        }}
        okButtonProps={{
          size: 'large'
        }}
      >
        <Text>{t('addKeyboardItemModal.areYouSureGoBackWithoutSave')}</Text>
      </Modal>
    </div>
  );
};

export default KeyboardEditor;
