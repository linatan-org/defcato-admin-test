import React, { useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
import { API } from '../../../../server';
import ItemsRevenueReport from './ItemsRevenueReport';
import JournalOrders from './JournalOrders';
import OrdersTotalReport from './OrdersTotalReport';
import ItemsTotalReport from './ItemsTotalReport';
import { IOrderFilterValues, RESPONSE_STATUSES } from '../../../../server/models';

enum OrdersReportsEnum {
  ORDERS_JOURNAL,
  ORDERS_BY_PROPERTIES,
  ITEMS_REPORTS,
  ITEMS_REVENUE_REPORTS
}

const OrdersReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const orderReportTabs = [
    {
      id: OrdersReportsEnum.ORDERS_JOURNAL,
      title: t('reports.ordersReports.OrdersJournal')
    },
    {
      id: OrdersReportsEnum.ORDERS_BY_PROPERTIES,
      title: t('reports.ordersReports.OrdersByProperties')
    },
    {
      id: OrdersReportsEnum.ITEMS_REPORTS,
      title: t('reports.ordersReports.ItemsReport')
    },
    {
      id: OrdersReportsEnum.ITEMS_REVENUE_REPORTS,
      title: t('reports.ordersReports.ItemsRevenueReportTitle')
    }
  ];
  const [activeTab, setActiveTab] = useState(orderReportTabs[0].id);
  const [ordersFiltersOptions, setOrdersFiltersOptions] = useState<IOrderFilterValues | null>(null);

  const renderScene = (active: OrdersReportsEnum, ordersFiltersOptions: IOrderFilterValues | null) => {
    switch (active) {
      case OrdersReportsEnum.ORDERS_JOURNAL:
        return <JournalOrders ordersFiltersOptions={ordersFiltersOptions} />;
      case OrdersReportsEnum.ORDERS_BY_PROPERTIES:
        return <OrdersTotalReport ordersFiltersOptions={ordersFiltersOptions} />;
      case OrdersReportsEnum.ITEMS_REPORTS:
        return <ItemsTotalReport ordersFiltersOptions={ordersFiltersOptions} />;
      case OrdersReportsEnum.ITEMS_REVENUE_REPORTS:
        return <ItemsRevenueReport ordersFiltersOptions={ordersFiltersOptions} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    API.reports.orderReports.getOrderFilters().then((filters) => {
      if (filters.ErrorCode === RESPONSE_STATUSES.OK) {
        setOrdersFiltersOptions(filters);
      }
    });
  }, []);

  return (
    <div className="ticketReportsWrapper">
      <Space>
        {orderReportTabs.map((tab) => (
          <Button
            className="w-50 mb-4"
            type={activeTab === tab.id ? 'primary' : 'default'}
            key={tab.id}
            size="large"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </Button>
        ))}
      </Space>
      {renderScene(activeTab, ordersFiltersOptions)}
    </div>
  );
};

export default OrdersReports;
