import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons/lib';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import connect from 'react-redux/es/components/connect';
import { ISalesReport, ISalesReportsDetails } from '../../../../../../server/models';
import CustomTable from '../../../../Dashboard/CustomTable';
import { getDiscountsColumns, getItemsColumns } from './columnts';
import { SaleDetailsReportHeader } from './SaleDetailsReportHeader';

const { Text } = Typography;

interface Props {
  saleReport: ISalesReportsDetails;
  lang: string;
}

enum SALES_REPORT_TAB {
  ITEMS,
  DISCOUNTS
}

const SaleDetailsReport: React.FC<Props> = ({ saleReport, lang }) => {
  const { t } = useTranslation();
  const [checkedTab, setCheckedTab] = useState(SALES_REPORT_TAB.ITEMS);
  const colorMap: Record<string, string> = {
    true: 'IsManualDiscountItem'
  };
  return (
    <div
      className="flex flex-col flex-1"
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      <SaleDetailsReportHeader saleReport={saleReport} />
      <div className="flex flex-row mt-3">
        <div className="flex flex-col rtl:ml-4 ltr:mr-4">
          <Button
            onClick={() => setCheckedTab(SALES_REPORT_TAB.ITEMS)}
            type={checkedTab === SALES_REPORT_TAB.ITEMS ? 'primary' : 'default'}
            className="w-36 h-12"
          >
            {t('reports.saleReports.salesReportDetails.Items')}
          </Button>
          <Button
            onClick={() => setCheckedTab(SALES_REPORT_TAB.DISCOUNTS)}
            type={checkedTab === SALES_REPORT_TAB.DISCOUNTS ? 'primary' : 'default'}
            className="w-36 mt-4 h-12"
          >
            {t('reports.saleReports.salesReportDetails.Discounts')}
          </Button>
        </div>
        <div className="flex-1">
          <CustomTable
            colorMap={checkedTab === SALES_REPORT_TAB.ITEMS ? colorMap : undefined}
            colorMapKey={'IsManualDiscountItem'}
            data={checkedTab === SALES_REPORT_TAB.ITEMS ? saleReport.Items : saleReport.Discounts}
            columns={checkedTab === SALES_REPORT_TAB.ITEMS ? getItemsColumns(t) : getDiscountsColumns(t)}
          />
          {checkedTab === SALES_REPORT_TAB.ITEMS ? (
            <div className="flex justify-end w-full">
              <div className="w-60 primary-green-bg p-2 px-6 flex items-center justify-between mt-4">
                <Text
                  strong
                  style={{ color: 'white' }}
                >
                  {t('reports.saleReports.salesReportDetails.Paid')}
                </Text>
                <Text
                  strong
                  style={{ color: 'white' }}
                >
                  {saleReport.PaidTotal}
                </Text>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapState = (state: any) => ({
  lang: state.configs.lang
});

export default connect(mapState, {})(SaleDetailsReport);
