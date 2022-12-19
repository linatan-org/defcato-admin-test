import { Button, List, Space, Typography } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import DraggableList from 'react-draggable-list/dist/src';
import { useTranslation } from 'react-i18next';
import { API } from '../../../server';
import { IPayment, IPaymentDataItem, RESPONSE_STATUSES } from '../../../server/models';
import PaymentItem from './components/PaymentItem/PaymentItem';
import { getPayments } from './paymentsData';
import './styles.scss';

const { Text } = Typography;

const PaymentKeyboardEditor = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState<IPaymentDataItem[]>([]);
  const [favoritePayments, setFavoritePayments] = useState<IPaymentDataItem[]>([]);
  const [checkedPayments, setCheckedPayments] = useState<IPaymentDataItem[]>([]);
  const [paymentsEnabled, setPaymentsEnabled] = useState<number[]>([]);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    API.paymentKeyboard.get().then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        const newPayments = configureExistPayments(res.Presets);
        setPayments(newPayments);
      }
    });
  }, []);

  useEffect(() => {
    if (payments.length) {
      const enabledList = payments.filter((p) => paymentsEnabled.includes(p.Tender) && !p.Favorite);
      const favoriteList = payments.filter((p) => paymentsEnabled.includes(p.Tender) && p.Favorite);
      setCheckedPayments(enabledList);
      setFavoritePayments(favoriteList);
      setIsSaveEnabled(false);
    }
  }, [payments, paymentsEnabled]);

  const configureExistPayments = (newPayments: IPayment[]): IPaymentDataItem[] => {
    const currentFaivoriteTenders: number[] = newPayments.filter((p) => p.Favorite).map((p) => p.Tender);
    const currentEnabledTenders: number[] = newPayments.map((p) => p.Tender);
    setPaymentsEnabled(currentEnabledTenders);
    const paymentsData: IPaymentDataItem[] = getPayments(t).map((p) => {
      p.Favorite = currentFaivoriteTenders.includes(p.Tender);
      return p;
    });
    return paymentsData;
  };

  const changePaymentEnable = (isEnable: boolean, itemTender: number, itemIndex: number) => {
    const copyPaymentsEnabled = [...paymentsEnabled];
    if (isEnable) {
      copyPaymentsEnabled.push(itemTender);
    } else {
      const index = copyPaymentsEnabled.indexOf(itemTender);
      copyPaymentsEnabled.splice(index, 1);
    }
    setPaymentsEnabled(copyPaymentsEnabled);
    changePaymentFavorite(false, itemIndex);
  };

  const changePaymentFavorite = (isFavorite: boolean, index: number) => {
    const copyPayments = [...payments];
    copyPayments[index].Favorite = isFavorite;
    setPayments(copyPayments);
  };

  const onSave = () => {
    const mergedPayments = ([] as IPaymentDataItem[]).concat(checkedPayments, favoritePayments);
    API.paymentKeyboard.save(mergedPayments).then((res) => {
      setIsSaveEnabled(true);
    });
  };

  return (
    <div>
      <Button
        disabled={isSaveEnabled}
        className="w-80 m-4"
        type="primary"
        size="large"
        onClick={onSave}
      >
        {t('save')}
      </Button>
      <div className="grid grid-cols-3 gap-6">
        <div className="columnTitleWrapper">
          <Text strong>{t('paymentKeyboard.paymentMethods')}</Text>
        </div>
        <div className="columnTitleWrapper">
          <Text strong>{t('paymentKeyboard.selectedPaymentMethods')}</Text>
        </div>
        <div className="columnTitleWrapper">
          <Text strong>{t('paymentKeyboard.favoritePaymentMethods')}</Text>
        </div>
      </div>
      <div className="spaceContainer">
        <List
          className="list"
          dataSource={payments}
          renderItem={(item, index) => (
            <List.Item>
              <PaymentItem
                isEditable
                key={index}
                onFavorite={(isEnable) => changePaymentFavorite(isEnable, index)}
                onEnable={(isEnable) => changePaymentEnable(isEnable, item.Tender, index)}
                payment={item}
                isEnabled={paymentsEnabled.includes(item.Tender)}
              />
            </List.Item>
          )}
        />
        <div className="draggableContainer">
          <DraggableList
            padding={25}
            itemKey={'Key'}
            list={checkedPayments}
            // @ts-ignore
            template={(props: any) => (
              <PaymentItem
                {...props}
                payment={props.item}
              />
            )}
            onMoveEnd={(newList: any) => setCheckedPayments(newList)}
          />
        </div>
        <div className="draggableContainer">
          <DraggableList
            itemKey={'Key'}
            padding={25}
            list={favoritePayments}
            // @ts-ignore
            template={(props: any) => (
              <PaymentItem
                {...props}
                payment={props.item}
              />
            )}
            onMoveEnd={(newList: any) => setFavoritePayments(newList)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentKeyboardEditor;
