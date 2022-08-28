import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SortableTree, { toggleExpandedForAll, addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
// import './styles.scss';
import '@nosferatu500/react-sortable-tree/style.css';
import { routes } from '../../../constants/routes';
import useAuth from '../../../contexts/auth/hook';
import { API } from '../../../server';
import { IKeyBoard } from '../../../server/models';
import { List } from 'antd';
import { KeyboardItem } from './components/KeyboardItem/KeyboardItem';

const KeyboardList = () => {
  const authContext = useAuth();
  const navigation = useHistory();
  const [newTreeData, setNewStreeData] = useState<any>([]);
  const [keyboards, setKeyboards] = useState<IKeyBoard[]>([]);
  // @ts-ignore
  const getNodeKey: any = ({ treeIndex }) => treeIndex;

  const handleTreeOnChange = (treeData: any) => {
    setNewStreeData(treeData);
  };

  // useEffect(() => {
  //   // console.log(newTreeData, 'newTreeData');
  //   const copyData = [...newTreeData];
  //   const jsonData = JSON.stringify(copyData);
  //   const replacedData = jsonData.toString().replace('children', 'Items');
  //   // console.log(JSON.parse(replacedData), 'replacedData');
  // }, [newTreeData]);

  useEffect(() => {
    API.keyboard.getKeyboardList().then((res) => {
      const keyboardList = res.KeyBoardList;
      const replacedData = keyboardList.map((kb: IKeyBoard) => {
        return keyReplace(kb, true);
      });
      setKeyboards(replacedData);
      console.log(replacedData, 'replacedData');
    });
  }, []);

  const keyReplace = (data: any, isFromBackendData: boolean) => {
    const jsonData = JSON.stringify(data);
    const replacedData = isFromBackendData
      ? jsonData.replace(/Name/g, 'title').replace(/Items/g, 'children')
      : jsonData.replace(/title/g, 'Name').replace(/children/g, 'Items');
    return JSON.parse(replacedData);
  };

  const editKeyboard = (kb: IKeyBoard) => {
    console.log(kb, authContext, 'authContext');
    authContext.setEditedKeyboardData(kb.children);
    navigation.push(routes.keyboardEditor);
  };

  const keyboardSettings = (kb: IKeyBoard) => {};

  return (
    <div className="wrapper">
      <div className="tree-wrapper">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={keyboards}
          renderItem={(item, index) => (
            <List.Item>
              <KeyboardItem
                key={index}
                keyboard={item}
                onEdit={editKeyboard}
                onSettings={keyboardSettings}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default KeyboardList;
