import React from 'react';
import { EditOutlined, SettingOutlined } from '@ant-design/icons/lib';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IKeyBoard } from '../../../../../server/models';

const { Text } = Typography;

interface IKeyboardItemProps {
  keyboard: IKeyBoard;
  onSettings: (k: IKeyBoard) => void;
  onEdit: (k: IKeyBoard) => void;
}
export const KeyboardItem: React.FC<IKeyboardItemProps> = ({ keyboard, onEdit, onSettings }) => {
  const { t } = useTranslation();
  return (
    <Card
      title={keyboard.title}
      bordered
      actions={[
        <Button
          key={t('keyboardList.dataEditor')}
          onClick={() => onEdit(keyboard)}
        >
          {t('keyboardList.dataEditor')}
        </Button>,
        <Button
          key={t('keyboardList.itemsEditor')}
          onClick={() => onSettings(keyboard)}
        >
          {t('keyboardList.itemsEditor')}
        </Button>
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
