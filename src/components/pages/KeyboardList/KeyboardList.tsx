import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import '@nosferatu500/react-sortable-tree/style.css';
import { routes } from '../../../constants/routes';
import useAuth from '../../../contexts/auth/hook';
import { API } from '../../../server';
import { IKeyBoard } from '../../../server/models';
import { List } from 'antd';
import { KeyboardItem } from './components/KeyboardItem/KeyboardItem';
import { saveKeyboardList } from '../../../reudux/keyboard/action';
import { keyboardKeyReplace } from '../../../helpers/helpers';

interface IStoreState {
  keyboard: {
    keyboardList: IKeyBoard[];
  };
}

interface IKeyboardList {
  keyboardList: IKeyBoard[];
}

const KeyboardList: React.FC<IKeyboardList> = ({ keyboardList }) => {
  const authContext = useAuth();
  const navigation = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(keyboardList, 'propspropspropsprops');
  }, [keyboardList]);

  useEffect(() => {
    API.keyboard.getKeyboardList().then((res) => {
      const keyboardList = res.KeyBoardList;
      const replacedData = keyboardList.map((kb: IKeyBoard) => {
        return keyboardKeyReplace(kb, true);
      });
      dispatch(saveKeyboardList(replacedData));
      console.log(replacedData, 'replacedData');
    });
  }, []);

  const editKeyboard = (kb: IKeyBoard, index: number) => {
    console.log(kb, authContext, 'authContext');
    navigation.push(routes.keyboardEditor, { kbIndex: index });
  };

  const keyboardSettings = (kb: IKeyBoard) => {};

  return (
    <div className="wrapper">
      <div className="tree-wrapper">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={keyboardList}
          renderItem={(item, index) => (
            <List.Item>
              <KeyboardItem
                key={index}
                keyboard={item}
                onEdit={(kb) => editKeyboard(kb, index)}
                onSettings={keyboardSettings}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const mapState = (state: IStoreState) => ({
  keyboardList: state.keyboard.keyboardList
});

export default connect(mapState, {})(KeyboardList);
