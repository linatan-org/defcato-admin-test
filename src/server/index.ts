import axios from 'axios';
import {
  ICreateItemValues,
  IDailyInstruction,
  IDailyStats,
  IDailyUserStats,
  IDailyUserTargets,
  IKeyBoard,
  IKeyboardList,
  ISalesReports,
  ISignInResponse
} from './models';

const apiConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getSession = () => {
  const SessionKey = sessionStorage.getItem('token');
  return { SessionKey };
};
console.log(apiConfig, 'apiConfig', process.env.BASE_URL);

export const API = {
  auth: {
    signIn: async (User: string, Password: string | number): Promise<ISignInResponse> => {
      const res = await apiConfig.post('/SystemLogIn.aspx', { User, Password });
      return res.data;
    }
  },
  dashboard: {
    getDailyStat: async (): Promise<IDailyStats> => {
      const res = await apiConfig.post('/FetchDailyStat.aspx', {
        ...getSession()
      });
      return res.data;
    },
    getDailyUserStat: async (): Promise<IDailyUserStats> => {
      const res = await apiConfig.post('/FetchDailyUsersStats.aspx', {
        ...getSession()
      });
      return res.data;
    },
    getDailyUserTargets: async (DeviceSysId: number): Promise<IDailyUserTargets> => {
      const res = await apiConfig.post('/FetchDailyUsersTargets.aspx', {
        ...getSession(),
        DeviceSysId
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
  }
};
