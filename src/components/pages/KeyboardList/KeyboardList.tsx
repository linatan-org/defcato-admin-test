import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useAuth from '../../../contexts/auth/hook';
import { API } from '../../../server';
import { IKeyBoard, RESPONSE_STATUSES } from '../../../server/models';
import { Button, List, Modal, Typography, notification } from 'antd';
import { KeyboardItem } from './components/KeyboardItem/KeyboardItem';
import { saveKeyboardList } from '../../../reudux/keyboard/action';
import { keyboardKeyReplace } from '../../../helpers/helpers';
import './styles.scss';

const { Text } = Typography;

interface IStoreState {
  keyboard: {
    keyboardList: IKeyBoard[];
  };
}

interface IKeyboardList {
  keyboardList: IKeyBoard[];
}

const KeyboardList: React.FC<IKeyboardList> = ({ keyboardList }) => {
  const { t } = useTranslation();
  const authContext = useAuth();
  const navigation = useHistory();
  const dispatch = useDispatch();
  const [isVisibleConfirmDeleteModal, setIsVisibleConfirmDeleteModal] = useState(false);
  const [kbFOrDelete, setKbFOrDelete] = useState<IKeyBoard | null>(null);
  const [updateKeyboradList, setUpdateKeyboradList] = useState(0);
  const [IsAllowDefineItemOnCategoryLevel, setIsAllowDefineItemOnCategoryLevel] = useState(true);

  useEffect(() => {
    API.keyboard.getKeyboardList().then((res) => {
      const keyboardList = res.KeyBoardList;
      setIsAllowDefineItemOnCategoryLevel(!!res.IsAllowDefineItemOnCategoryLevel);
      const replacedData = keyboardList.map((kb: IKeyBoard) => {
        return keyboardKeyReplace(kb, true);
      });
      dispatch(saveKeyboardList(replacedData));
    });
  }, [updateKeyboradList]);

  const editCreateKeyboard = (kb?: IKeyBoard, isDuplicate?: boolean) => {
    // eslint-disable-next-line
    navigation.push(kb && isDuplicate ? `keyboardEditor/${kb.SysId}/duplicate` : kb ? `keyboardEditor/${kb.SysId}/edit` : 'keyboardEditor/new', {IsAllowDefineItemOnCategoryLevel});
  };

  const onAskCancelDelete = (kb?: IKeyBoard) => {
    if (kb) {
      setIsVisibleConfirmDeleteModal(true);
      setKbFOrDelete(kb);
    } else {
      setIsVisibleConfirmDeleteModal(false);
      setKbFOrDelete(null);
    }
  };

  const deleteKeyboard = () => {
    if (kbFOrDelete && kbFOrDelete.SysId) {
      API.keyboard.deleteKeyboard(kbFOrDelete.SysId).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          onAskCancelDelete();
          notification.success({
            message: '',
            description: 'Keyboard was deleted',
            placement: 'bottomRight'
          });
          setUpdateKeyboradList(updateKeyboradList + 1);
        }
      });
    }
  };

  const keyboardSettings = (kb: IKeyBoard) => {};

  return (
    <div className="wrapper-list">
      <Button
        className="w-80 mb-4"
        type="primary"
        key="createNewKeyboard"
        size="large"
        onClick={() => editCreateKeyboard()}
      >
        {t('keyboardList.createNewKeyboard')}
      </Button>
      <div className="tree-wrapper">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={keyboardList}
          renderItem={(item, index) => (
            <List.Item>
              <KeyboardItem
                key={index}
                keyboard={item}
                onEdit={editCreateKeyboard}
                onSettings={keyboardSettings}
                onDuplicate={(kb) => editCreateKeyboard(kb, true)}
                onDelete={onAskCancelDelete}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={''}
        centered
        visible={isVisibleConfirmDeleteModal}
        onOk={() => deleteKeyboard()}
        onCancel={() => onAskCancelDelete()}
        cancelText={t('cancel')}
        okText={t('ok')}
        cancelButtonProps={{
          size: 'large'
        }}
        okButtonProps={{
          size: 'large'
        }}
      >
        <Text>{t('keyboardList.areYouSureYouWantDeleteKeyboard')}</Text>
      </Modal>
    </div>
  );
};

const mapState = (state: IStoreState) => ({
  keyboardList: state.keyboard.keyboardList
});

export default connect(mapState, {})(KeyboardList);
