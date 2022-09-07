import { UseTranslationResponse } from 'react-i18next';
import { DashboardValues } from '../../../server/models';

export const getDashboardCardsValues = (t: any): DashboardValues[][] => [
  [
    {
      title: t('dashboard.dailyStats.totalRevenue'),
      key: 'TotalRevenue'
    },
    {
      title: t('dashboard.dailyStats.totalOrders'),
      key: 'TotalOrders'
    },
    {
      title: t('dashboard.dailyStats.lastOrderTime'),
      key: 'LastOrderTime'
    }
  ],
  [
    {
      title: t('dashboard.dailyStats.orderAVG'),
      key: 'OrderAVG'
    },
    {
      title: t('dashboard.dailyStats.ordersPerHour'),
      key: 'OrdersPerHour'
    },
    {
      title: t('dashboard.dailyStats.hourRedemption'),
      key: 'HourRedemption'
    }
  ],
  [
    {
      title: t('dashboard.dailyStats.incomingCalls'),
      key: 'IncomingCalls'
    },
    {
      title: t('dashboard.dailyStats.callsPerHours'),
      key: 'CallsPerHour'
    },
    {
      title: t('dashboard.dailyStats.callsOrdersConversion'),
      key: 'CallsOrdersConversion'
    }
  ]
];

export const getDashboardTableValues = (t: any): any => [
  {
    title: t('dashboard.dailyUserStats.seller'),
    children: [
      {
        title: t('dashboard.dailyUserStats.name'),
        dataIndex: 'Name',
        key: 'Name'
      },
      {
        title: t('dashboard.dailyStats.totalOrders'),
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      },
      {
        title: t('dashboard.dailyStats.hourRedemption'),
        dataIndex: 'HourRedemption',
        key: 'HourRedemption'
      },
      {
        title: t('dashboard.dailyStats.callsOrdersConversion'),
        dataIndex: 'CallsOrdersConversion',
        key: 'CallsOrdersConversion'
      }
    ]
  }
];

export const getTargetsValues = (t: any, title: string): DashboardValues[] => [
  {
    title: title || t('dashboard.userTargets.currentPercent'),
    key: 'CurrentPercent'
  }
  // {
  //   title: t('dashboard.userTargets.currentValue'),
  //   key: 'CurrentValue'
  // },
  // {
  //   title: t('dashboard.userTargets.targetValue'),
  //   key: 'TargetValue'
  // },
  // {
  //   title: t('dashboard.userTargets.shiftCurrentValue'),
  //   key: 'ShiftCurrentValue'
  // },
  // {
  //   title: t('dashboard.userTargets.shiftTargetValue'),
  //   key: 'ShiftTargetValue'
  // },
  // {
  //   title: t('dashboard.userTargets.shiftAVGPercent'),
  //   key: 'ShiftAVGPercent'
  // }
];
