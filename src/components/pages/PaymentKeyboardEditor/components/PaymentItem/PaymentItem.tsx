import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Checkbox, Space, Tooltip, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { IPaymentDataItem } from '../../../../../server/models';
import './styles.scss';

const { Text } = Typography;

interface IPaymentProps {
  isEnabled?: boolean;
  isEditable?: boolean;
  payment?: IPaymentDataItem;
  onEnable?: (isEnable: boolean) => void;
  onFavorite?: (isFavorite: boolean) => void;
  dragHandleProps?: any;
}

const PaymentItem: React.FC<IPaymentProps> = (props) => {
  const { t } = useTranslation();
  const { payment, onEnable, onFavorite, dragHandleProps, isEnabled, isEditable } = props;
  const { onMouseDown, onTouchStart } = dragHandleProps || {};
  return (
    <div
      className="item"
      onTouchStart={(e) => {
        e.preventDefault();
        onTouchStart && onTouchStart(e);
      }}
      onMouseDown={(e) => {
        onMouseDown && onMouseDown(e);
      }}
    >
      <Space align="center">
        {isEditable ? (
          <>
            {payment?.Favorite ? (
              <Tooltip
                key={t('paymentKeyboard.item.favoritePaymentTooltip')}
                color="blue"
                className="cursor-pointer d-inline"
                placement="top"
                title={t('paymentKeyboard.item.favoritePaymentTooltip')}
              >
                <StarFilled
                  className={`favoriteIcon ${!isEnabled && 'invisibleStar'}`}
                  onClick={() => isEnabled && onFavorite && onFavorite(false)}
                />
              </Tooltip>
            ) : (
              <Tooltip
                key={t('paymentKeyboard.item.favoritePaymentTooltip')}
                color="blue"
                className="cursor-pointer d-inline"
                placement="top"
                title={t('paymentKeyboard.item.favoritePaymentTooltip')}
              >
                <StarOutlined
                  className={`favoriteIcon ${!isEnabled && 'invisibleStar'}`}
                  onClick={() => isEnabled && onFavorite && onFavorite(true)}
                />
              </Tooltip>
            )}
            <Tooltip
              key={t('paymentKeyboard.item.selectPaymentTooltip')}
              color="blue"
              className="cursor-pointer d-inline"
              placement="top"
              title={t('paymentKeyboard.item.selectPaymentTooltip')}
            >
              <Checkbox
                checked={isEnabled}
                onChange={(e) => onEnable && onEnable(e.target.checked)}
              />
            </Tooltip>
          </>
        ) : null}
        <Text strong>{payment?.Title}</Text>
      </Space>
    </div>
  );
};

export default PaymentItem;
