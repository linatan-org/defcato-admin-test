import React from 'react';
import { CopyOutlined, DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons/lib';
import { Button, Card, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IKeyBoard } from '../../../../../server/models';
import './styles.scss';

const { Text } = Typography;

interface IKeyboardItemProps {
  keyboard: IKeyBoard;
  onSettings: (k: IKeyBoard) => void;
  onEdit: (k: IKeyBoard) => void;
  onDuplicate: (k: IKeyBoard) => void;
  onDelete: (k: IKeyBoard) => void;
}
export const KeyboardItem: React.FC<IKeyboardItemProps> = ({ keyboard, onEdit, onSettings, onDuplicate, onDelete }) => {
  const { t } = useTranslation();
  return (
    <Card
      title={keyboard.title || '-'}
      bordered
      actions={[
        <Tooltip
          key={t('keyboardList.dataEditor')}
          color="blue"
          className="cursor-pointer d-inline"
          placement="top"
          title={t('keyboardList.dataEditor')}
        >
          <EditOutlined onClick={() => onEdit(keyboard)} />
        </Tooltip>,
        <Tooltip
          key={t('keyboardList.duplicateKeyboard')}
          color="blue"
          className="cursor-pointer d-inline"
          placement="top"
          title={t('keyboardList.duplicateKeyboard')}
        >
          <CopyOutlined onClick={() => onDuplicate(keyboard)} />
        </Tooltip>,
        <Tooltip
          key={t('keyboardList.deleteKeyboard')}
          color="blue"
          className="cursor-pointer d-inline"
          placement="top"
          title={t('keyboardList.deleteKeyboard')}
        >
          <DeleteOutlined
            className="deleteIcon"
            onClick={() => onDelete(keyboard)}
          />
        </Tooltip>
      ]}
    >
      <div className="d-flex flex-col">
        <div>
          <Text strong>{t('keyboardList.fromDate')}:</Text>
          &nbsp;
          <Text>{moment(keyboard.FromDate).format('DD/MM/yyyy')}</Text>
        </div>
        <div>
          <Text strong>{t('keyboardList.toDate')}:</Text>
          &nbsp;
          <Text>{moment(keyboard.ToDate).format('DD/MM/yyyy')}</Text>
        </div>
        <div>
          <Text strong>{t('keyboardList.activeHours')}:</Text>
          &nbsp;
          <Text>{keyboard.FromTime}</Text>
          &nbsp;
          <Text>-</Text>
          &nbsp;
          <Text>{keyboard.ToTime}</Text>
        </div>
      </div>
    </Card>
  );
};
