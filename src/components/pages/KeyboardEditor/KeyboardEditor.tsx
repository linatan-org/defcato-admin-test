import React, { useEffect, useState } from 'react';
import { Layout, PageHeader } from 'antd';
import SortableTree, { toggleExpandedForAll, addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import { useHistory } from 'react-router';
import useAuth from '../../../contexts/auth/hook';
import { IKeyBoard, IKeyboardItem } from '../../../server/models';
import treeData from './treeData';
import './styles.scss';
import '@nosferatu500/react-sortable-tree/style.css';
import { API } from '../../../server';

const maxDepth = 5;
const { Header, Footer, Sider, Content } = Layout;

interface IKeyboardEditorProps {
  keyboard: IKeyBoard;
}

const KeyboardEditor: React.FC<IKeyboardEditorProps> = ({ keyboard }) => {
  const authContext = useAuth();
  const navigation = useHistory();
  const [newTreeData, setNewStreeData] = useState<IKeyboardItem[]>([]);
  // @ts-ignore
  const getNodeKey: any = ({ treeIndex }) => treeIndex;

  const handleTreeOnChange = (treeData: any) => {
    setNewStreeData(treeData);
  };

  useEffect(() => {
    const treeData = authContext.getEditedKeyboardData();
    setNewStreeData(treeData);
  }, []);

  useEffect(() => {
    // console.log(newTreeData, 'newTreeData');
    // const copyData = [...newTreeData];
    // const jsonData = JSON.stringify(copyData);
    // const replacedData = jsonData.toString().replace('children', 'Items');
    // console.log(JSON.parse(replacedData), 'replacedData');
  }, [newTreeData]);

  const onBack = () => {
    authContext.setEditedKeyboardData(null);
    navigation.goBack();
  };

  return (
    <div className="wrapper">
      <PageHeader
        className="header"
        title="Back"
        onBack={onBack}
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
            buttons: [
              <button
                className="p-1 rounded-md border-2 mr-1"
                key={1}
                onClick={() => {
                  const newTree = addNodeUnderParent({
                    treeData: newTreeData,
                    parentKey: rowinfo.path[rowinfo.path.length - 1],
                    expandParent: true,
                    getNodeKey,
                    newNode: {
                      title: 'new title',
                      subtitle: 'new subtitle'
                    }
                    // addAsFirstChild: state.addAsFirstChild
                  }).treeData;
                  // @ts-ignore
                  setNewStreeData(newTree);
                }}
              >
                +
              </button>,
              <button
                className="p-1 rounded-md border-2"
                key={2}
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete this node?`)) {
                    const newTree = removeNodeAtPath({
                      treeData: newTreeData,
                      path: rowinfo.path,
                      getNodeKey
                    });
                    // @ts-ignore
                    setNewStreeData(newTree);
                  }
                }}
              >
                -
              </button>
            ]
          })}
        />
      </div>
    </div>
  );
};

export default KeyboardEditor;
