import { Typography } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons/lib';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ISalesReport } from '../../../../../../server/models';

const { Text } = Typography;

interface Props {
  saleReport: ISalesReport;
}

export const SaleDetailsReport: React.FC<Props> = ({ saleReport }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-column flex-1">
      <div className="flex flex-row items-start flex-1">
        <div className="flex flex-row items-center flex-1">
          <UserOutlined className="ml-2 text-lg" />
          <Text strong>{saleReport.MemberName}</Text>
        </div>
        <div className="flex flex-col items-start flex-1">
          <div className="flex flex-rov items-center">
            <Text
              strong
              className="primary-text-green text-base"
            >
              {t('reports.saleReports.salesReportDetails.TransactionNumber')}: &nbsp;
            </Text>
            <Text strong>{saleReport.TranNumber}</Text>
          </div>
          <div className="flex flex-rov items-center">
            <Text
              strong
              className="primary-text-green text-base"
            >
              {t('reports.saleReports.salesReportDetails.SaleNumber')}: &nbsp;
            </Text>
            <Text strong>{saleReport.SellerNumber}</Text>
          </div>
        </div>
        <div className="flex flex-col items-start flex-1">
          <div className="flex flex-rov items-center">
            <Text
              strong
              className="primary-text-green text-base"
            >
              {t('reports.saleReports.salesReportDetails.Branch')}: &nbsp;
            </Text>
            <Text strong>{saleReport.BranchId}</Text>
          </div>
          <div className="flex flex-rov items-center">
            <Text
              strong
              className="primary-text-green text-base"
            >
              {t('reports.saleReports.salesReportDetails.Branch')}: &nbsp;
            </Text>
            <Text strong>{moment(saleReport.TranDate).format('DD/mm/yyyy')}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
