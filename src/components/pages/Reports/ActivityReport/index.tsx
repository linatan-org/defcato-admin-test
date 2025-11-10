import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Layout, Modal, Table, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import {
  IActivityReport,
  IActivityReportFiltersResponse,
  IActivityReportsResponse,
  IOrderReport,
  RESPONSE_STATUSES
} from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getColumns } from './columns';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const { Text } = Typography;

const ActivityReport: React.FC<any> = () => {
  const { t } = useTranslation();
  const [acitivityReport, setAcitivityReports] = useState<IActivityReport[]>([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filtersOptions, setFiltersOptions] = useState<IActivityReportFiltersResponse>({} as IActivityReportFiltersResponse);
  const [infoDetails, setInfoDetails] = useState('');
  const [filtersValues, setFiltersValues] = useState<any>({
    FromDate: moment().subtract(20, 'days').format('DD-MM-YYYY'),
    ToDate: moment().format('DD-MM-YYYY')
  });

  console.log(filtersValues, 'filtersValues', filtersOptions);
  const [totalRecords, setTotalRecords] = useState<{ TotalRecords: number }>({
    TotalRecords: 0
  });

  const accountValues = useMemo(() => {
    setFiltersValues((v: any) => {
      delete v.Account;
      return v;
    });
    if (filtersValues.Site >= 0) {
      const matchedSite = filtersOptions.Sites.find((s) => s.SysId === filtersValues.Site);
      return matchedSite?.Accounts ?? [];
    }
    return [];
  }, [filtersValues.Site]);

  useEffect(() => {
    const reportTypeError = filtersOptions.ReportTypes?.find((r) => r.SysId === 3);
    const statusOpen = filtersOptions.StatusList?.find((r) => r.SysId === 0);
    if (reportTypeError) {
      setFiltersValues((v: any) => {
        return {
          ...v,
          ReportType: reportTypeError?.SysId,
          Status: statusOpen?.SysId
        };
      });
    }
  }, [filtersOptions]);

  useEffect(() => {
    getFiltersValues();
  }, []);
  useEffect(() => {
    if (expandedKeys.length) {
      setExpandedKeys([]);
    }
  }, [filtersValues]);

  const getActivityReports = (filters: any) => {
    API.reports.getActivityReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setAcitivityReports(res.Lines ?? []);
        setTotalRecords({ TotalRecords: res.TotalRecords ?? 0 });
      }
    });
  };
  const getFiltersValues = () => {
    API.reports.getActivityReportFilters().then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setFiltersOptions(res);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getActivityReports(filtersValues);
    }
  }, [filtersValues]);

  const onOpenDetails = (info: string) => {
    setInfoDetails(info);
  };

  const onChangeStatus = useCallback(
    (statusId: number, sysId: number) => {
      API.reports.changeActivityReportStatus({ Status: statusId, SysId: sysId }).then((res: IActivityReportsResponse) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          getActivityReports(filtersValues);
        }
      });
    },
    [filtersValues, infoDetails]
  );

  const getTabletSummary = (pageData: IOrderReport[]) => {
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell
            index={0}
            colSpan={3}
          >
            <Text strong>
              {t('TotalRecords')}: {totalRecords.TotalRecords}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <Layout>
      <Filters
        filters={getSalesFilters(filtersOptions, accountValues)}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div className="relative">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getActivityReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          // @ts-ignore
          summary={getTabletSummary}
          // @ts-ignore
          data={acitivityReport}
          columns={getColumns(onOpenDetails, filtersOptions.StatusList, onChangeStatus)}
        />
      </div>
      <Modal
        title={t('navMenu.logOut')}
        centered
        visible={Boolean(infoDetails && infoDetails.length > 0)}
        onOk={() => onOpenDetails('')}
        okText={t('ok')}
        width={'80%'}
        onCancel={() => onOpenDetails('')}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{
          size: 'large'
        }}
      >
        <Text strong>{infoDetails}</Text>
      </Modal>
    </Layout>
  );
};

export default ActivityReport;
