import { PlusOutlined } from '@ant-design/icons/lib';
import React, { useState } from 'react';
import { Button, Typography, Modal, PageHeader, Space, notification } from 'antd';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import { useTranslation } from 'react-i18next';
import connect from 'react-redux/es/components/connect';
import { useHistory, useLocation } from 'react-router';
import { IItem, IKeyBoard, IKeyboardItem, RESPONSE_STATUSES } from '../../../server/models';
import './styles.scss';
import '@nosferatu500/react-sortable-tree/style.css';
import { API } from '../../../server';
import AddNewItemModal from './components/AddNewItemModal/AddNewItemModal';
import { keyboardKeyReplace } from '../../../helpers/helpers';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;
const maxDepth = 5;

interface IStoreState {
  keyboard: {
    keyboardList: IKeyBoard[];
  };
}

interface IKeyboardEditorProps {
  keyboardList: IKeyBoard[];
}

interface LocationState {
  kbIndex: number;
}

declare type GenerateNodePropsParams = {
  node: any;
  path: number[];
  treeIndex: number;
  lowerSiblingCounts: number[];
  isSearchMatch: boolean;
  isSearchFocus: boolean;
};

const KeyboardEditor: React.FC<IKeyboardEditorProps> = ({ keyboardList }) => {
  const { t } = useTranslation();
  const navigation = useHistory();
  const params = useLocation<LocationState>();
  const [checkedRowInfo, setCheckedRowInfo] = useState<GenerateNodePropsParams | null>(null);
  const [isVisibleAddNewItemModal, setIsVisibleAddNewItemModal] = useState(false);
  const [isVisibleConformModal, setIsVisibleConformModal] = useState(false);
  const [isVisibleModalWithoutSave, setSetIsVisibleModalWithoutSave] = useState(false);
  const [isTreeWasChanged, setIsTreeWasChanged] = useState(false);
  const { kbIndex } = params.state;
  const [newTreeData, setNewStreeData] = useState<IKeyboardItem[]>(keyboardList[kbIndex].children);

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
    if (checkedRowInfo) {
      let newTree = addNodeUnderParent({
        treeData: newTreeData,
        parentKey: checkedRowInfo.path[checkedRowInfo.path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: item
        // addAsFirstChild: state.addAsFirstChild
      }).treeData;
      // @ts-ignore
      setNewStreeData(newTree);
      setIsVisibleAddNewItemModal(false);
      setCheckedRowInfo(null);
      setIsTreeWasChanged(true);
    }
  };

  const onSave = async (isGoBack: boolean) => {
    const replacedData = keyboardKeyReplace(newTreeData, false);
    const copyKeyBoard = { ...keyboardList[kbIndex] };
    copyKeyBoard.Items = replacedData;
    await API.keyboard.updateKeyboard(copyKeyBoard).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        notification.success({
          message: 'Notification Title',
          description: 'Changes has been saved',
          placement: 'bottomRight'
        });
      }
      console.log(res, 'RESPONSE');
    });
    if (isGoBack) {
      onBack(true);
    }
  };

  const onAskDelete = (rowInfo: GenerateNodePropsParams) => {
    console.log(rowInfo, 'rowInfo');
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
        <Space key="btns">
          {addButton(rowInfo)}
          {deleteButton(rowInfo)}
        </Space>
      ];
    }
    return [deleteButton(rowInfo)];
  };

  const addButton = (rowInfo: GenerateNodePropsParams) => {
    return (
      <Button
        icon={<PlusOutlined />}
        shape="circle"
        key="addButton"
        type="primary"
        onClick={() => {
          setCheckedRowInfo(rowInfo);
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
      <div className="tree-wrapper">
        <SortableTree
          treeData={newTreeData}
          onChange={handleTreeOnChange}
          onMoveNode={({ node, nextTreeIndex, nextPath }) =>
            console.log('node:', node, 'treeIndex:', nextTreeIndex, 'path:', nextPath)
          }
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
          generateNodeProps={(rowinfo) => ({
            buttons: getActionButtons(rowinfo)
          })}
        />
      </div>
      <AddNewItemModal
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

const mapState = (state: IStoreState) => ({
  keyboardList: state.keyboard.keyboardList
});

export default connect(mapState, {})(KeyboardEditor);
