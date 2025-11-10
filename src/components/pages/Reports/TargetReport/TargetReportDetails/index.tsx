import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITargetReportDetails } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import { getColumns } from './columns';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

interface PropsInterface {
  data: ITargetReportDetails[];
}

const TargetReportDetails: React.FC<PropsInterface> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      <CustomTable
        data={data}
        columns={getColumns(t)}
      />
    </>
  );
};

export default TargetReportDetails;
