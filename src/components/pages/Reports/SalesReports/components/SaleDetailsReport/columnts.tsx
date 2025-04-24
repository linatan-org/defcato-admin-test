import { Image } from 'antd';
import React from 'react';

export const getItemsColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReportDetails.Items'),
    children: [
      {
        title: '',
        dataIndex: 'ImageURL',
        key: 'ImageURL',
        render: (v: string) =>
          v && (
            <Image
              preview
              width={100}
              src={v}
            />
          )
      },
      {
        title: t('reports.saleReports.salesReportDetails.itemsColumns.Code'),
        dataIndex: 'ItemCode',
        key: 'ItemCode'
      },
      {
        title: t('reports.saleReports.salesReportDetails.itemsColumns.Description'),
        dataIndex: 'Description',
        key: 'DescriptionItems'
      },
      {
        title: t('reports.saleReports.salesReportDetails.itemsColumns.Quantity'),
        dataIndex: 'Quantity',
        key: 'Quantity'
      },
      {
        title: t('reports.saleReports.salesReportDetails.itemsColumns.PercentDiscount'),
        dataIndex: 'LineTotalDiscountPercent',
        key: 'LineTotalDiscountPercent',
        render: (v: string) => `${v}%`
      },
      {
        title: t('reports.saleReports.salesReportDetails.itemsColumns.Total'),
        dataIndex: 'AmountAfterLineDiscount',
        key: 'AmountAfterLineDiscount'
      }
    ]
  }
];

export const getDiscountsColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReportDetails.Discounts'),
    children: [
      {
        title: t('reports.saleReports.salesReportDetails.discountColumns.PromotionId'),
        dataIndex: 'PromoId',
        key: 'PromoId'
      },
      {
        title: t('reports.saleReports.salesReportDetails.discountColumns.Description'),
        dataIndex: 'Description',
        key: 'DescriptionDiscounts'
      },
      {
        title: t('reports.saleReports.salesReportDetails.discountColumns.Amount'),
        dataIndex: 'Amount',
        key: 'Amount'
      }
    ]
  }
];
