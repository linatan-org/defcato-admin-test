import axios from 'axios';
import { setLoading } from '../reudux/globalLoader/action';
import {
  ICreateItemValues,
  IDailyInstruction,
  IDailyStats,
  IDailyUserStats,
  IDailyUserTargets,
  IGeneralResponse,
  IKeyBoard,
  IKeyboardList,
  IPaymentDataItem,
  IPaymentsList,
  ISalesReports,
  ISignInResponse,
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
    getCreateItems: async (InputData: string, CategoryCode: string): Promise<ICreateItemValues> => {
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
