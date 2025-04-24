import axios from 'axios';
import {
  IActivityReportFiltersResponse,
  IActivityReportsResponse,
  ICatalagCategories,
  ICatalog,
  ICatalogItem,
  ICouponReports,
  ICreateItemValues,
  IDailyInstruction,
  IDailyStats,
  IDailyUserStats,
  IDailyUserTargets,
  IEfficiencyData,
  IEfficiencyDetailsCancelsByReason,
  IEfficiencyDetailsCancelsByUser,
  IExportExcelTicketReport,
  IGeneralResponse,
  IItemsTotalReportsList,
  IKeyBoard,
  IKeyboardList,
  IOrderFilterValues,
  IOrdersReportsList,
  IPaymentDataItem,
  IPaymentsList,
  IRevenueReportList,
  ISalesReport,
  ISalesReports,
  ISalesReportsDetailsResponse,
  ISeller,
  ISellersList,
  ISignInResponse,
  ITargetReportDetailsList,
  ITargetReportsList,
  ITicketFilters,
  ITicketReportJournalList,
  ITicketReportsBranchView,
  ITicketReportsBranchViewDetails,
  ITimeReportsResponse,
  ITotalOrderReportList,
  IZReports,
  OrdersReportsEnum
} from './models';

let dispatch: any;

export const injectDispatch = (_dispatch: any) => {
  dispatch = _dispatch;
};

export const apiConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getSession = () => {
  const SessionKey = localStorage.getItem('token');
  return { SessionKey };
};

export const API = {
  auth: {
    signIn: async (User: string, Password: string | number): Promise<ISignInResponse> => {
      const res = await apiConfig.post('/SystemLogIn.aspx', { User, Password });
      return res.data;
    }
  },
  dashboard: {
    getDailyStat: async (SelectedDate: string): Promise<IDailyStats> => {
      const res = await apiConfig.post('/FetchDailyStat.aspx', {
        ...getSession(),
        SelectedDate
      });
      return res.data;
    },
    getDailyUserStat: async (SelectedDate: string): Promise<IDailyUserStats> => {
      const res = await apiConfig.post('/FetchDailyUsersStats.aspx', {
        ...getSession(),
        SelectedDate
      });
      return res.data;
    },
    getDailyUserTargets: async (SellerCode: string, SelectedDate?: string): Promise<IDailyUserTargets> => {
      const res = await apiConfig.post('/FetchDailyUsersTargets.aspx', {
        ...getSession(),
        ...{ SellerCode, SelectedDate }
      });
      return res.data;
    }
  },
  reports: {
    orderReports: {
      getOrderFilters: async (): Promise<IOrderFilterValues> => {
        const res = await apiConfig.post('/AdminCRMFetchOrderFilters.aspx', {
          ...getSession()
        });
        return res.data;
      },
      getOrdersReport: async (filters: any): Promise<IOrdersReportsList> => {
        const res = await apiConfig.post('/AdminCRMOrdersReport.aspx', {
          ...getSession(),
          ...filters
        });
        return res.data;
      },
      getTotalOrdersReport: async (filters: any): Promise<ITotalOrderReportList> => {
        const res = await apiConfig.post('/AdminCRMOrdersTotalReport.aspx', {
          ...getSession(),
          ...filters
        });
        return res.data;
      },
      getItemsTotalReport: async (filters: any): Promise<IItemsTotalReportsList> => {
        const res = await apiConfig.post('/AdminCRMItemsTotalReport.aspx', {
          ...getSession(),
          ...filters
        });
        return res.data;
      },
      getItemsRevenueReport: async (filters: any): Promise<IRevenueReportList> => {
        const res = await apiConfig.post('/AdminCRMItemsRevenueReport.aspx', {
          ...getSession(),
          ...filters
        });
        return res.data;
      },
      exportOrdersToExcel: async (data: any, type: OrdersReportsEnum): Promise<IExportExcelTicketReport> => {
        const urls = {
          [OrdersReportsEnum.ITEMS_REVENUE_REPORTS]: 'AdminExportCRMItemsRevenueReport2Excel.aspx',
          [OrdersReportsEnum.ITEMS_REPORTS]: 'AdminExportCRMItemsTotalReport2Excel.aspx',
          [OrdersReportsEnum.ORDERS_BY_PROPERTIES]: 'AdminExportCRMOrdersTotalReport2Excel.aspx',
          [OrdersReportsEnum.ORDERS_JOURNAL]: 'AdminExportCRMOrdersReport2Excel.aspx',
          [OrdersReportsEnum.EFFICIENCY_REPORT]: 'ExportEfficiencyReport2Excel.aspx',
          [OrdersReportsEnum.TIME_REPORTS]: 'AdminTimeClockReport2Excel.aspx'
        };
        const res = await apiConfig.post(urls[type], {
          ...getSession(),
          ...data
        });
        return res.data;
      }
    },
    efficiencyReports: {
      getDailyEfficiency: async (SelectedDate: string): Promise<IEfficiencyData> => {
        const res = await apiConfig.post('/FetchDailyEfficiency.aspx', {
          ...getSession(),
          SelectedDate
        });
        return res.data;
      },
      getDailyCancelsByUser: async (DeviceSysId: string, SelectedDate: string): Promise<IEfficiencyDetailsCancelsByUser> => {
        const res = await apiConfig.post('/FetchDailyCancelsByUser.aspx', {
          ...getSession(),
          SelectedDate,
          DeviceSysId
        });
        return res.data;
      },
      getDailyCancelsByReason: async (
        DeviceSysId: string,
        SelectedDate: string,
        key: string
      ): Promise<IEfficiencyDetailsCancelsByReason> => {
        const res = await apiConfig.post('/FetchDailyCancelsByReason.aspx', {
          ...getSession(),
          SelectedDate,
          [key]: DeviceSysId
        });
        return res.data;
      }
    },
    ticketReports: {
      getBranchTickets: async (data: any): Promise<ITicketReportsBranchView> => {
        const res = await apiConfig.post('/FetchBranchTickets.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      getTargetReports: async (data: any): Promise<ITargetReportsList> => {
        const res = await apiConfig.post('/AdminCRMTargetsReport.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      exportTargetReportsToExcel: async (data: any): Promise<IExportExcelTicketReport> => {
        const res = await apiConfig.post('/AdminExportCRMSellersTargetsReport2Excel.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      getBranchTicketsDetails: async (data: any): Promise<ITicketReportsBranchViewDetails> => {
        const res = await apiConfig.post('/FetchBranchTicketsDetails.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      getSellerTargetReportDetails: async (data: any): Promise<ITargetReportDetailsList> => {
        const res = await apiConfig.post('/AdminCRMSellerTargetsReport.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      getJournals: async (data: any): Promise<ITicketReportJournalList> => {
        const res = await apiConfig.post('/AdminCRMFetchTickets.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      exportTicketsToExcel: async (data: any): Promise<IExportExcelTicketReport> => {
        const res = await apiConfig.post('/AdminExportCRMCouponReport2Excel.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      exportCouponsToExcel: async (data: any): Promise<IExportExcelTicketReport> => {
        const res = await apiConfig.post('/AdminExportTickets2Excel.aspx', {
          ...getSession(),
          ...data
        });
        return res.data;
      },
      getTicketsFilters: async (filters: any): Promise<ITicketFilters> => {
        const res = await apiConfig.post('/AdminCRMFetchTicketFilters.aspx', {
          ...getSession(),
          ...filters
        });
        return res.data;
      }
    },
    getSalesReports: async (data: any): Promise<ISalesReports> => {
      const res = await apiConfig.post('/FetchTranJournalList.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    getSalesReportDetails: async (report: ISalesReport): Promise<ISalesReportsDetailsResponse> => {
      const res = await apiConfig.post('/AdminCRMFetchTransaction.aspx', {
        ...getSession(),
        ...{ TranNumber: report.TranNumber }
      });
      return res.data;
    },
    getZReports: async (data: any): Promise<IZReports> => {
      const res = await apiConfig.post('/FetchZReportList.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    getTimeReport: async (data: any): Promise<ITimeReportsResponse> => {
      const res = await apiConfig.post('/AdminTimeClockReport.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    getActivityReportFilters: async (): Promise<IActivityReportFiltersResponse> => {
      const res = await apiConfig.post('/ActivityReportFilters.aspx', {
        ...getSession()
      });
      return res.data;
    },
    getActivityReport: async (data: any): Promise<IActivityReportsResponse> => {
      const res = await apiConfig.post('/ActivityReport.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    changeActivityReportStatus: async (data: any): Promise<IActivityReportsResponse> => {
      const res = await apiConfig.post('/ActivityReportUpdateStatus.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    getCouponReports: async (data: any): Promise<ICouponReports> => {
      const res = await apiConfig.post('/AdminCRMCouponReport.aspx', {
        ...getSession(),
        ...data
      });
      return res.data;
    },
    printZReport: async (DeclareStationSysId: number | string, ZCounter: number | string): Promise<IGeneralResponse> => {
      const res = await apiConfig.post('/AdminPrintZReport.aspx', {
        ...getSession(),
        ...{ DeclareStationSysId, ZCounter }
      });
      return res.data;
    },
    catalog: {
      getCatalog: async (InputData: string): Promise<ICatalog> => {
        const res = await apiConfig.post('/AdminFetchCatalogItems.aspx', {
          ...getSession(),
          InputData
        });
        return res.data;
      },
      getCatalogCategories: async (): Promise<ICatalagCategories> => {
        const res = await apiConfig.post('/AdminFetchCatalogCategories.aspx', {
          ...getSession()
        });
        return res.data;
      },
      createCatalogItem: async (item: ICatalogItem): Promise<IGeneralResponse> => {
        const res = await apiConfig.post('/AdminAddCatalogItem.aspx', {
          ...getSession(),
          ...{ Item: item }
        });
        return res.data;
      },
      editCatalogItem: async (item: ICatalogItem): Promise<IGeneralResponse> => {
        const res = await apiConfig.post('/AdminUpdateCatalogItem.aspx', {
          ...getSession(),
          ...{ Item: item }
        });
        return res.data;
      },
      addNewCatalogCategory: async (Description: string): Promise<ICatalagCategories> => {
        const res = await apiConfig.post('/AdminAddCatalogCategory.aspx', {
          ...getSession(),
          Description
        });
        return res.data;
      }
    }
  },
  dailyInstruction: {
    getDailyInstruction: async (): Promise<IDailyInstruction> => {
      const res = await apiConfig.post('/GetDailyInstructionDefinition.aspx', {
        ...getSession()
      });
      return res.data;
    },
    saveDailyInstruction: async (Defenition: string, HTML: string): Promise<IKeyboardList> => {
      const res = await apiConfig.post('/UpdateDailyInstructionDefinition.aspx', {
        ...getSession(),
        ...{ Defenition, HTML }
      });
      return res.data;
    }
  },
  keyboard: {
    getKeyboardList: async (): Promise<IKeyboardList> => {
      const res = await apiConfig.post('/ItemsKeyBoardGetList.aspx', {
        ...getSession()
      });
      return res.data;
    },
    getCreateItems: async (
      InputData: string,
      fieldName: string | undefined,
      CategoryCode?: string
    ): Promise<ICreateItemValues> => {
      const res = await apiConfig.post('/FetchItemsForKeyboard.aspx', {
        ...getSession(),
        ...{ InputData, CategoryCode, fieldName }
      });
      return res.data;
    },
    updateKeyboard: async (KeyBoard: IKeyBoard): Promise<IKeyboardList> => {
      const res = await apiConfig.post('/ItemsKeyBoardUpdate.aspx', {
        ...getSession(),
        ...{ KeyBoard }
      });
      return res.data;
    },
    createKeyboard: async (KeyBoard: IKeyBoard): Promise<IKeyboardList> => {
      const res = await apiConfig.post('/ItemsKeyBoardAdd.aspx', {
        ...getSession(),
        ...{ KeyBoard }
      });
      return res.data;
    },
    deleteKeyboard: async (KeyboardId: number): Promise<IKeyboardList> => {
      const res = await apiConfig.post('/ItemsKeyBoardDelete.aspx', {
        ...getSession(),
        KeyboardId
      });
      return res.data;
    }
  },
  sellers: {
    get: async (InputData: string): Promise<ISellersList> => {
      const res = await apiConfig.post('/AdminFetchSellers.aspx', {
        ...getSession(),
        InputData
      });
      return res.data;
    },
    createSeller: async (item: ISeller): Promise<IGeneralResponse> => {
      const res = await apiConfig.post('/AdminAddSeller.aspx', {
        ...getSession(),
        ...{ Seller: item }
      });
      return res.data;
    },
    editSeller: async (item: ISeller): Promise<IGeneralResponse> => {
      const res = await apiConfig.post('/AdminUpdateSeller.aspx', {
        ...getSession(),
        ...{ Seller: item }
      });
      return res.data;
    }
  },
  paymentKeyboard: {
    get: async (): Promise<IPaymentsList> => {
      const res = await apiConfig.post('/PaymentKeyBoardGet.aspx', {
        ...getSession()
      });
      return res.data;
    },
    save: async (Presets: IPaymentDataItem[]): Promise<IPaymentsList> => {
      const res = await apiConfig.post('/PaymentKeyBoardUpdate.aspx', {
        ...getSession(),
        ...{ Presets }
      });
      return res.data;
    }
  }
};
