import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Layout, Button, Modal, notification } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ISalesReport, IZReport, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { KeyboardItem } from '../../KeyboardList/components/KeyboardItem/KeyboardItem';
import { getZReportsTableColumns } from './columns';
import { ZReportDetails } from './components/ZReportDetails/ZReportDetails';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const ZReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<IZReport[]>([]);
  const [checkedZReport, setCheckedZReport] = useState<IZReport | null>(null);
  const [filtersValues, setFiltersValues] = useState({
    FromDate: moment().format('DD/MM/yyyy'),
    ToDate: moment().format('DD/MM/yyyy')
  });

  const getSaleReports = (filters: any) => {
    API.reports.getZReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setSalesReport(res.ReportList);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
    }
  }, [filtersValues]);

  const printReport = () => {
    if (checkedZReport) {
      API.reports
        .printZReport(checkedZReport.DeclareStationSysId, checkedZReport.ZCounter)
        .then((res) => {
          if (res.ErrorCode == RESPONSE_STATUSES.OK) {
            setCheckedZReport(null);
            notification.success({
              message: '',
              description: 'Success',
              placement: 'bottomRight'
            });
          } else {
            notification.error({
              message: '',
              description: res.ErrorMessage,
              placement: 'bottomRight'
            });
          }
        })
        .catch((e) => {
          notification.error({
            message: '',
            description: e.ErrorMessage || 'Something went wrong',
            placement: 'bottomRight'
          });
          console.log(e);
        });
    }
  };

  const modalActionButtons = () => {
    return [
      <div
        key="wrapper"
        className="actions-button-wrapper"
      >
        <div key="wrapper">
          <Button
            size="large"
            key={t('reports.ZReports.ZReportDetails.PrintAndExist')}
            type="primary"
            onClick={printReport}
          >
            {t('reports.ZReports.ZReportDetails.PrintAndExist')}
          </Button>
        </div>
        <Button
          size="large"
          key={t('reports.ZReports.ZReportDetails.Exit')}
          onClick={() => setCheckedZReport(null)}
        >
          {t('reports.ZReports.ZReportDetails.Exit')}
        </Button>
      </div>
    ];
  };

  return (
    <Layout>
      <Filters
        filters={getSalesFilters()}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div className="relative">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getSaleReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={salesReports}
          columns={getZReportsTableColumns(t)}
          onDoubleClick={setCheckedZReport}
        />
      </div>
      <Modal
        className="modalStyle"
        width={900}
        title={t('reports.ZReports.ZReport')}
        centered
        visible={!!checkedZReport}
        onOk={() => {}}
        onCancel={() => setCheckedZReport(null)}
        footer={modalActionButtons()}
      >
        {checkedZReport ? <ZReportDetails reportParams={checkedZReport?.ReportParams} /> : null}
      </Modal>
    </Layout>
  );
};

export default ZReports;
