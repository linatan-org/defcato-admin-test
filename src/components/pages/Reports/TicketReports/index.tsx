import React, { useState } from 'react';
import { DatePicker, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import BranchView from './BranchView';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
import JournalView from './JournalView';

enum TicketReportTabs {
  BRANCH_VIEW,
  JOURNAL_VIEW
}

const TicketReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(TicketReportTabs.JOURNAL_VIEW);

  return (
    <div className="ticketReportsWrapper">
      <Space>
        <Button
          className="w-50 mb-4"
          type={activeTab === TicketReportTabs.JOURNAL_VIEW ? 'primary' : 'default'}
          key="journalView"
          size="large"
          onClick={() => setActiveTab(TicketReportTabs.JOURNAL_VIEW)}
        >
          {t('reports.ticketReports.journalView')}
        </Button>
        <Button
          className="w-50 mb-4"
          type={activeTab === TicketReportTabs.BRANCH_VIEW ? 'primary' : 'default'}
          key="branchView"
          size="large"
          onClick={() => setActiveTab(TicketReportTabs.BRANCH_VIEW)}
        >
          {t('reports.ticketReports.branchView')}
        </Button>
      </Space>
      {activeTab === TicketReportTabs.BRANCH_VIEW ? <BranchView /> : <JournalView />}
    </div>
  );
};

export default TicketReports;
