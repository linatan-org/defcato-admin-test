import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITicketReportBranchViewDetails } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import { getColumns } from './columns';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

interface PropsInterface {
  data: ITicketReportBranchViewDetails[];
}

const BranchViewDetails: React.FC<PropsInterface> = ({ data }) => {
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

export default BranchViewDetails;
