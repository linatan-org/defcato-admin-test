import React from 'react';
import { useTranslation } from 'react-i18next';
import { IZReportParams } from '../../../../../../server/models';

interface IZReport {
  reportParams: IZReportParams;
}

export const ZReportDetails: React.FC<IZReport> = ({ reportParams }) => {
  const { t } = useTranslation();
  return (
    <div className="main-content">
      <div className="flex-direction-column">
        <div className="header-content">
          <div className="header-column">
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.AccountName')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.AccountName}</span>
            </div>
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.ID')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.ID}</span>
            </div>
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.Phone')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.Phone}</span>
            </div>
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.Address')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.Address}</span>
            </div>
          </div>
          <div className="header-column">
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.POSName')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.POSName}</span>
            </div>
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.ReportDate')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.ReportDate}</span>
            </div>
            <div className="header-row">
              <span className="header-title">{t('reports.ZReports.ZReportDetails.UserName')} | </span>
              &nbsp;
              <span className="header-value">{reportParams.UserName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="tables-wrapper">
        <div className="tables-content">
          <div className="header-right">
            <span>{t('reports.ZReports.ZReportDetails.Totals')}</span>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line no-left-border">
              <span> &nbsp;</span>
            </div>
            <div className="line-flex-2 line">
              <span> &nbsp;</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.TotalPayments')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalPayments}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.TotalRefunds')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalRefunds}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Balance')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.Balance}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Vat')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.Vat}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-direction-column flex-grow-1 tables-content mr-1">
          <div className="header-left">
            <span>{t('reports.ZReports.ZReportDetails.Details')}</span>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line no-left-border">
              <span> &nbsp;</span>
            </div>
            <div className="line-flex-2 line no-left-border">
              <span>{t('reports.ZReports.ZReportDetails.PaymentsOnly')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{t('reports.ZReports.ZReportDetails.RefundsOnly')}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Cash')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalCashPayments}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalCashRefunds}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Cheques')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalChequePayments}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalChequeRefunds}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Credit')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalCreditPayments}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalCreditRefunds}</span>
            </div>
          </div>
          <div className="line-wrapper">
            <div className="line-flex-1 line">
              <span>{t('reports.ZReports.ZReportDetails.Other')}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalOtherPayments}</span>
            </div>
            <div className="line-flex-2 line">
              <span>{reportParams.TotalOtherRefunds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
