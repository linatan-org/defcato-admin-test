import { EditOutlined, PlusOutlined } from '@ant-design/icons/lib';
import React, { useState } from 'react';
import { Button, Typography, Modal, PageHeader, Space, notification, Input } from 'antd';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ICategory, IItem, IKeyBoard, IKeyboardItem, RESPONSE_STATUSES } from '../../../server/models';
import './styles.scss';
import '@nosferatu500/react-sortable-tree/style.css';
import { API } from '../../../server';
import AddNewItemModal from './components/AddNewItemModal/AddNewItemModal';
import { keyboardKeyReplace } from '../../../helpers/helpers';
import { DeleteOutlined } from '@ant-design/icons';

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
  const params: { id: string } = useParams();
  const navigation = useHistory();
  const isDuplicate = navigation.location.pathname.includes('duplicate');
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
  const [isVisibleModalWithoutSave, setSetIsVisibleModalWithoutSave] = useState(false);
  const [isTreeWasChanged, setIsTreeWasChanged] = useState(isDuplicate || false);
  const [editableItem, setEditableItem] = useState<IItem | ICategory | null>(null);
  const [keyboardName, setKeyboardName] = useState(keyboard && (keyboard.Name || keyboard.title));
  const [newTreeData, setNewStreeData] = useState<IKeyboardItem[]>(keyboard ? keyboard.children : []);
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
    setIsVisibleAddNewItemModal(false);
    setCheckedRowInfo(null);
  };

  const onAddNewItem = async (item: IItem) => {
    let newTree;
    if (checkedRowInfo) {
      newTree = addNodeUnderParent({
        treeData: newTreeData,
        parentKey: checkedRowInfo.path[checkedRowInfo.path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: item
        // addAsFirstChild: state.addAsFirstChild
      }).treeData;
    } else {
      newTree = addNodeUnderParent({
        treeData: newTreeData,
        expandParent: true,
        getNodeKey,
        newNode: item
      }).treeData;
    }
    // @ts-ignore
    setNewStreeData(newTree);
    setIsVisibleAddNewItemModal(false);
    setCheckedRowInfo(null);
    setIsTreeWasChanged(true);
  };

  const onSave = async (isGoBack: boolean) => {
    const replacedData = keyboardKeyReplace(newTreeData, false);
    const copyKeyBoard = { ...keyboard };
    copyKeyBoard.Name = isDuplicate ? keyboardName : copyKeyBoard.title;
    copyKeyBoard.Items = replacedData;
    const keyboardAction = isDuplicate ? 'createKeyboard' : 'updateKeyboard';
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
    }
    return [deleteButton(rowInfo)];
  };

  const onEdit = (rowInfo: GenerateNodePropsParams) => {
    setEditableItem(rowInfo.node);
    setIsVisibleAddNewItemModal(true);
  };

  const addButton = (rowInfo: GenerateNodePropsParams, isAddTopCategory?: boolean) => {
    return (
      <Button
        icon={<PlusOutlined />}
        shape="circle"
        key="addButton"
        type="primary"
        onClick={() => {
          if (!isAddTopCategory) {
            setCheckedRowInfo(rowInfo);
          }
          setIsVisibleAddNewItemModal(true);
        }}
      />
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
      <Button
        className="editButton"
        icon={<EditOutlined />}
        shape="circle"
        key="edit"
        onClick={() => onEdit(rowInfo)}
      />
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

  return (
    <div className="wrapper">
      <PageHeader
        className="header"
        title={t('back')}
        onBack={() => onBack(false)}
        extra={getExtraHeaderButtons()}
      />
      <Button
        className="w-80 m-4"
        type="primary"
        size="large"
        onClick={() => setIsVisibleAddNewItemModal(true)}
      >
        {t('keyboard.addNewCategory')}
      </Button>
      {isDuplicate ? (
        <div className="w-80 m-4">
          <Input
            value={keyboardName}
            placeholder={t('addKeyboardItemModal.category')}
            onChange={(e) => setKeyboardName(e.target.value)}
          />
        </div>
      ) : null}
      <div className="tree-wrapper">
        <SortableTree
          treeData={newTreeData}
          onChange={handleTreeOnChange}
          onMoveNode={({ node, nextTreeIndex, nextPath }) => {
            setIsTreeWasChanged(true);
            console.log('node:', node, 'treeIndex:', nextTreeIndex, 'path:', nextPath);
          }}
          maxDepth={maxDepth}
          onlyExpandSearchedNodes={true}
          // searchQuery={searchString}
          // searchFocusOffset={searchFocusIndex}
          canDrag={({ node }) => !node.noDragging}
          canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
          // searchFinishCallback={(matches) =>
          //     this.setState({
          //       searchFoundCount: matches.length,
          //       searchFocusIndex:
          //           matches.length > 0 ? searchFocusIndex % matches.length : 0
          //     })
          // }
          onDragStateChanged={(e) => console.log(e)}
          generateNodeProps={(rowinfo) => ({
            buttons: getActionButtons(rowinfo)
          })}
        />
      </div>
      <AddNewItemModal
        isAddTopCategory={!checkedRowInfo}
        editableItem={editableItem}
        onCancel={onCancelNewItem}
        onOk={onAddNewItem}
        isVisible={isVisibleAddNewItemModal}
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
