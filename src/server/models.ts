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

export enum RESPONSE_STATUSES {
  OK = 0
}
