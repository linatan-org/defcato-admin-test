import axios from 'axios';
import { setLoading } from '../reudux/globalLoader/action';
import {
  ICatalagCategories,
  ICatalog,
  ICatalogItem,
  ICreateItemValues,
  IDailyInstruction,
  IDailyStats,
  IDailyUserStats,
  IDailyUserTargets,
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
  ISalesReports,
  ISeller,
  ISellersList,
  ISignInResponse,
  ITargetReportDetailsList,
  ITargetReportsList,
  ITicketFilters,
  ITicketReportJournalList,
  ITicketReportsBranchView,
  ITicketReportsBranchViewDetails,
  ITotalOrderReportList,
  IZReports
} from './models';

let dispatch: any;

export const injectDispatch = (_dispatch: any) => {
  dispatch = _dispatch;
};

const apiConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

apiConfig.interceptors.request.use(
  (config) => {
    dispatch(setLoading(true));
    return config;
  },
  (error) => Promise.reject(error)
);

apiConfig.interceptors.response.use(
  (response) => {
    dispatch(setLoading(false));
    return Promise.resolve(response);
  },
  (error) => {
    dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

const getSession = () => {
  const SessionKey = sessionStorage.getItem('token');
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
    getZReports: async (data: any): Promise<IZReports> => {
      const res = await apiConfig.post('/FetchZReportList.aspx', {
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
    getCreateItems: async (InputData: string, CategoryCode?: string): Promise<ICreateItemValues> => {
      const res = await apiConfig.post('/FetchItemsForKeyboard.aspx', {
        ...getSession(),
        ...{ InputData, CategoryCode }
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
