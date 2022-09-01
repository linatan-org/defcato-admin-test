import { ColumnsType } from 'antd/es/table';

export interface IGeneralResponse {
  ErrorCode: number;
  ErrorMessage: string;
}

export interface ISignInResponse extends IGeneralResponse {
  SessionKey: string;
  UserProfile: any;
}

export interface IDailyStatsData {
  TotalRevenue: number;
  TotalOrders: number;
  LastOrderTime: string;
  OrderAVG: number;
  OrdersPerHour: number;
  HourRedemption: number;
  IncomingCalls: number;
  CallsPerHour: number;
  CallsOrdersConversion: number;
}

export interface IDailyStats extends IGeneralResponse {
  Data: IDailyStatsData;
}

export interface IDailyUserStatsData {
  TotalRevenue: number;
  TotalOrders: number;
  LastOrderTime: string;
  OrderAVG: number;
  OrdersPerHour: number;
  HourRedemption: number;
  IncomingCalls: number;
  CallsPerHour: number;
  CallsOrdersConversion: number;
  Name: string;
  DeviceSysId: number;
}

export interface IDailyUserStats extends IGeneralResponse {
  List: IDailyUserStatsData[];
}

export interface IDailyUserTargetsData {
  Description: string;
  CurrentValue: number;
  TargetValue: number;
  CurrentPercent: number;
  ShiftCurrentValue: number;
  ShiftTargetValue: number;
  ShiftAVGPercent: number;
  TargetType: number;
  Status: number;
}

export interface IDailyUserTargets extends IGeneralResponse {
  List: IDailyUserTargetsData[];
}

export interface ISalesReport {
  AdditionalInfo: string;
  BranchFormatId: number;
  BranchFormatName: string;
  BranchId: number;
  BranchName: string;
  BranchNetCode: string;
  CollectionBranchSysId: number;
  CreatedDate: string;
  Description: string;
  DeviceId: number;
  DeviceNetCode: string;
  DeviceTranRference: string;
  DeviceType: number;
  IsActiveMember: boolean;
  IsAllowChangeOwnerSysId: boolean;
  IsAuthorized: boolean;
  IsConcessionaireBranch: boolean;
  IsDataChangeDisable: boolean;
  IsForNewMember: boolean;
  IsManualSysID: boolean;
  IsVoidNewMember: boolean;
  MemberCard: string;
  MemberName: string;
  MemberSysId: number;
  MemberType: number;
  ObjectType: number;
  OperatorNumber: string;
  OwnerAccountSysId: number;
  OwnerSysId: number;
  OwnerTranNumber: number;
  PromoAmount: number;
  SellerNumber: string;
  SysId: number;
  TotalAmount: number;
  TotalQuantity: number;
  TranDate: string;
  TranNumber: number;
  TranStatus: number;
  TranType: number;
  UpdateDate: string;
}

export interface ISalesReports extends IGeneralResponse {
  List: ISalesReport[];
}

export interface DashboardValues {
  key: string;
  title: string;
}

export interface IDataTableChildren {
  title: string;
  dataIndex: string | number;
  key: string;
}

export interface IDataTable extends ColumnsType {
  title?: string;
  children: IDataTableChildren[];
}

export interface IKeyboardItem {
  Col: number;
  CurrentValue: number;
  IsCategory: boolean;
  IsPromoted: boolean;
  ItemCode: string;
  ItemImageBase64: string;
  ItemImageUri: string;
  ItemPrice: string;
  Items: IKeyboardItem[];
  children: IKeyboardItem[];
  Name: string;
  title: string;
  References: number[];
  Row: number;
  StockOnHand: number;
  TargetType: number;
  TargetValue: number;
}

export interface IKeyBoard {
  Branch: string;
  CreatedDate: string;
  CustomerId: string;
  Description: string;
  FromDate: string;
  FromTime: string;
  IsAllowChangeOwnerSysId: boolean;
  IsDataChangeDisable: boolean;
  IsManualSysID: boolean;
  Items: IKeyboardItem[];
  children: IKeyboardItem[];
  Name: string;
  title: string;
  ObjectType: number;
  OwnerSysId: number;
  Status: number;
  StatusDesc: string;
  SysId?: number;
  ToDate: string;
  ToTime: string;
}

export interface IKeyboardList extends IGeneralResponse {
  KeyBoardList: IKeyBoard[];
}

export interface ICategory {
  Key: string;
  Value: string;
  title?: string;
  Name?: string;
  IsCategory?: boolean;
}

export interface IItem {
  Key?: string;
  Value?: string;
  title?: string;
  ItemCode?: string;
  Name?: string;
  IsCategory?: boolean;
}

export interface ICreateItemValues extends IGeneralResponse {
  Categories: ICategory[];
  Items: IItem[];
}

export enum RESPONSE_STATUSES {
  OK = 0
}
