import { ColumnsType } from 'antd/es/table';
import { EfficiencyReport } from '../components/pages/Reports/EfficiencyReport/EfficiencyReport';

export enum OrdersReportsEnum {
  ORDERS_JOURNAL,
  ORDERS_BY_PROPERTIES,
  ITEMS_REPORTS,
  ITEMS_REVENUE_REPORTS,
  EFFICIENCY_REPORT
}

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
  SelleCode: string;
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
  DescriptionBranchName: string;
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

export interface ISalesReportDetailsItem {
  Amount: number;
  AmountAfterLineDiscount: number;
  BruttoAmount: number;
  Comments: string;
  Description: string;
  Discount: number;
  GrossPrice: number;
  InputFlags: number;
  ItemBarCode: string;
  ItemCode: string;
  LineNumber: string;
  LineTotalDiscountPercent: number;
  Price: number;
  PromoCode: string;
  PromoPercent: number;
  Quantity: number;
  StockOrder: number;
  SysDiscount: number;
  WarehouseCode: string;
}

export interface ISalesDetailsMemberContactData {
  Apartment: string;
  AreaCode: string;
  CellPhone: string;
  City: string;
  Comments: string;
  ContactPersonName: string;
  CountryPhoneCode: string;
  CountrySysId: number;
  CreatedDate: string;
  Description: string;
  EMail: string;
  Fax: string;
  House: string;
  IsAllowChangeOwnerSysId: boolean;
  IsDataChangeDisable: boolean;
  IsManualSysID: boolean;
  ObjectType: number;
  OwnerSysId: number;
  Phone1: string;
  Phone2: string;
  PostCell: string;
  RegionSysId: number;
  Street: string;
  SysId: number;
  UpdateDate: string;
  UpdatedPhone: string;
  ZipCode: string;
}

export interface ISalesReportDetailsMember {
  Actions: any[];
  ActiveProperties: any[];
  AdditionalContactPersons: any[];
  AdditionalFields: any[];
  AgentCode: string;
  AgentName: string;
  Benefits: any[];
  BirthDayDate: string;
  BlankId: string;
  BranchFormatId: number;
  BranchId: number;
  BranchName: string;
  BranchNetCode: string;
  CardNumber: string;
  CardStatus: number;
  Classification1: string;
  Classification2: string;
  Comments: string;
  ConnPersonCell: string;
  ConnPersonComments: string;
  ConnPersonEmail: string;
  ConnPersonName: string;
  ConnPersonPhone: string;
  ContactData: ISalesDetailsMemberContactData;
  CreatedDate: string;
  CurrentExternalCoupon: any;
  DefaultBenefitAmount: number;
  DelegateInfoSign: number;
  Description: string;
  EmailDeliveryStatus: number;
  ExpDate: string;
  ExternalCashBack: number;
  FamilyStatus: number;
  FirstName: string;
  Gender: number;
  GroupCode: string;
  GroupId: number;
  GroupName: string;
  GroupPercentDiscount: number;
  GroupPoolId: number;
  Id: string;
  IfDigitalSigned: boolean;
  IfSendEmail: boolean;
  IfSendPost: boolean;
  IfSendSms: boolean;
  IfSigned: boolean;
  IsAllowChangeOwnerSysId: boolean;
  IsDataChangeDisable: boolean;
  IsERPSyncWaiting: boolean;
  IsFullPostData: boolean;
  IsHaveNoNotifyContactDetails: boolean;
  IsManualSysID: boolean;
  IsNoExpDate: boolean;
  IsNotRecommender: boolean;
  IsPurchaseOrderNumberRequired: boolean;
  IsWasUpdate: boolean;
  ItemsAvg: number;
  JoinedBranchId: number;
  LastLeadDate: string;
  LastLeadOperation: number;
  LastLeadUpdateDate: string;
  LastName: string;
  LastSaleAmount: number;
  LastSaleDate: string;
  LastSaleQuantity: number;
  LevelId: number;
  MemberOwnerSysId: number;
  MemberState: number;
  MemberType: number;
  Name: string;
  ObjectType: number;
  OrganizationCode: string;
  OwnerSysId: number;
  PoolId: number;
  PromoAccums: any[];
  QuantityTotal: number;
  RecommenderSysId: number;
  ReferenceAccountSysId: number;
  SMSDeliveryStatus: number;
  SaleTotal: number;
  SalesAvg: number;
  Segments: any[];
  Seniority: number;
  Status: number;
  StatusDesc: string;
  SysId: number;
  TotalCashBack: number;
  TotalVisits: number;
  TranMemberType: number;
  UpdateDate: string;
  UpdateExpDayDate: string;
  UpdateUserDate: string;
  UpdateUserName: string;
  WeddingDayDate: string;
}

export interface ISalesReportDetailsDeliverySaleData {
  AboardAddress: string;
  AbsentComments: string;
  AbsentConnectionType: number;
  AbsentConnectionTypeDesc: string;
  Apartment: string;
  Blessing1: string;
  Blessing2: string;
  BranchComments: string;
  BranchExternalCode: string;
  BranchName: string;
  BranchNetCode: string;
  BranchWarehouse: string;
  CellPhone: string;
  City: string;
  CollectionBranchSysId: number;
  CollectionMethod: number;
  ComapnyName: string;
  Country: string;
  DeliveryBranchName: string;
  DeliveryComments: string;
  DeliveryDate: string;
  DeliveryFromHour: number;
  DeliveryFromMinute: number;
  DeliveryPrice: number;
  DeliveryPriority: number;
  DeliveryTimeFrame: number;
  DeliveryToHour: number;
  DeliveryToMinute: number;
  Entrance: string;
  EventType: number;
  EventTypeDesc: string;
  Floor: string;
  Hospital: string;
  HospitalDepartment: string;
  House: string;
  IsAnonymous: boolean;
  IsBlockCoordination: boolean;
  IsPrivateHouse: boolean;
  OwnerCollectionBranchSysId: number;
  OwnerDeliveryPrice: number;
  Phone1: string;
  Phone2: string;
  ReceptionConnectionType: number;
  ReceptionConnectionTypeDesc: string;
  RecipientName: string;
  ShippingAddressType: number;
  Street: string;
  ZipCode: string;
}

export interface ISalesReportDetailsDelivery {
  AttentionStatus: number;
  CreatedDate: string;
  DeliverySaleData: ISalesReportDetailsDeliverySaleData;
  DeliveryServiceId: string;
  DeliveryStatus: number;
  DeliveryStickerFileName: string;
  Description: string;
  IsAllowChangeOwnerSysId: boolean;
  IsDataChangeDisable: boolean;
  IsManualSysID: boolean;
  ObjectType: number;
  OwnerSysId: number;
  OwnerTrxNumber: number;
  SysId: number;
  SysTrxNumber: number;
  UpdateDate: string;
}

export interface ISalesReportsDetails {
  AdditionalInfo: string;
  BillingContactInfo: string;
  BranchNetCode: string;
  BranchSysId: number;
  Comments: string;
  CreatedDate: string;
  Description: string;
  DeviceSysId: number;
  DeviceTranRference: string;
  DeviceType: number;
  Discounts: any[];
  ExternalDiscounts: any[];
  ExternalViewDiscounts: any[];
  IsAllowChangeOwnerSysId: boolean;
  IsAuthorized: boolean;
  IsDataChangeDisable: boolean;
  IsManualSysID: boolean;
  IsRequireBuyerConfirmation: boolean;
  Items: ISalesReportDetailsItem[];
  ItemsAmountBeforDiscount: number;
  LastTrxNumber: number;
  MemberInfo: string;
  NegativeCashBack: number;
  ObjectType: number;
  OperatorNumber: string;
  OwnerSysId: number;
  OwnerTranNumber: number;
  PaidTotal: number;
  PaymentReference: string;
  PositiveCashBack: number;
  PreliminarySaleInfo: string;
  Rounding: number;
  SellerNumber: string;
  Services: any[];
  ShippingContactInfo: string;
  SysId: number;
  TicketSysId: number;
  TotalAmount: number;
  TranDate: string;
  TranDelivery: ISalesReportDetailsDelivery;
  TranMember: ISalesReportDetailsMember;
  TranNumber: number;
  TranStatus: number;
  TranType: number;
  UpdateDate: string;
  VatDiscount: number;
  WarehouseCode: string;
}

export interface ISalesReportsDetailsResponse extends IGeneralResponse {
  Transaction: ISalesReportsDetails;
}

export interface ISalesReports extends IGeneralResponse {
  List: ISalesReport[];
}

export interface ITicketReportBranchView {
  BranchName: string;
  BranchSysId: number;
  TicketsPerOrder: number;
  TotalOrders: number;
  TotalTickets: number;
}

export interface ITicketReportsBranchView extends IGeneralResponse {
  List: ITicketReportBranchView[];
}

export interface ITicketReportBranchViewDetails {
  CategoryName: string;
  BranchName: number;
}

export interface ITicketReportsBranchViewDetails extends IGeneralResponse {
  List: ITicketReportBranchViewDetails[];
}

export interface ITargetReport {
  Bonuses: number;
  CallsOrdersConversion: number;
  CallsPerHour: number;
  CompletedCalls: number;
  DeviceSysId: number;
  HourRedemption: number;
  IncomingCalls: number;
  LastOrderTime: string;
  LastTranDate: string;
  Name: string;
  OrderAVG: number;
  OrdersPerHour: number;
  SellerCode: string | number;
  TotalOrders: number;
  TotalRevenue: number;
}

export interface ITargetReportDetails {
  Bonus: number;
  CurrentPercent: number;
  CurrentValue: number;
  Description: string;
  ShiftAVGPercent: number;
  ShiftCurrentValue: number;
  ShiftTargetValue: number;
  Status: number;
  TargetType: number;
  TargetValue: number;
}

export interface ITargetReportDetailsList extends IGeneralResponse {
  List: ITargetReportDetails[];
}

export interface ITargetReportsList extends IGeneralResponse {
  List: ITargetReport[];
}

export interface ITicketReportJournal {
  BranchName: string;
  BranchNetCode: string;
  CardNumber: string;
  CreatedDate: string;
  DeliveryDate: string;
  DeliveryFromHour: number;
  DeliveryFromMinute: number;
  DeliveryPriority: number;
  DeliveryRecipientName: string;
  DeliveryStatus: number;
  DeliveryToHour: number;
  DeliveryToMinute: number;
  IsCoordinationRequired: boolean;
  IsForSpecialsItems: boolean;
  ItemDescription: string;
  MemberBlankId: string;
  MemberName: string;
  MemberPhone: string;
  MemberSysId: string;
  OrderAddress: string;
  OrderNumber: string;
  OwnerName: string;
  StatusDescription: string;
  Street: string;
  TicketRequestTypeSysId: number;
  TicketStatus: number;
  TicketSysId: number;
  TicketTypeDescription: string;
  TicketTypeSysId: number;
  TranNumber: number;
  City: string;
}

export interface ITicketReportJournalList extends IGeneralResponse {
  Tickets: ITicketReportJournal[];
}

export interface IExportExcelTicketReport extends IGeneralResponse {
  ReportURL: string;
}
export interface IGeneralFilterValue {
  Key: string;
  Value: string;
}

export interface IOrderFilterValues extends IGeneralResponse {
  BranchList: IGeneralFilterValue[];
  CancelReasons: IGeneralFilterValue[];
  Cities: IGeneralFilterValue[];
  DeliveryBranchList: IGeneralFilterValue[];
  DeliveryTypes: IGeneralFilterValue[];
  MemberTypes: IGeneralFilterValue[];
  PaymentMethods: IGeneralFilterValue[];
  Sellers: IGeneralFilterValue[];
  StatusList: IGeneralFilterValue[];
  TranTypes: IGeneralFilterValue[];
  Promotions: IGeneralFilterValue[];
  SellerDepartments: IGeneralFilterValue[];
  OrdersSortTypes: IGeneralFilterValue[];
  OrdersSummaryTypes: IGeneralFilterValue[];
  ItemsSummaryTypes: IGeneralFilterValue[];
}

export interface IOrderReport {
  BranchName: string;
  BranchNetCode: string;
  CancelReason: string;
  CardNumber: string;
  CreatedDate: string;
  DeliveryDate: string;
  DeliveryFromHour: number;
  DeliveryFromMinute: number;
  DeliveryRecipientName: string;
  DeliveryToHour: number;
  DeliveryToMinute: number;
  DiscountPercent: number;
  DiscountTotal: number;
  ItemsTotal: number;
  MemberBlankId: string | number;
  MemberName: string;
  MemberSysId: string | number;
  OrderAddress: string;
  OrderNumber: string;
  PrintedDate: string;
  SellerName: string;
  StatusDescription: string;
  SuppliedDate: string;
  SuppliedHour: string;
  TotalAfterVat: number;
  TotalBeforeVat: number;
}
export interface FieldsViewMap {
  Key: string;
  Value: number;
}

export interface IOrdersReportsList extends IGeneralResponse {
  Orders: IOrderReport[];
  FieldsViewMap: FieldsViewMap[];
  TotalRecords: number;
  TotalAfterVat: number;
  TotalBeforeVat: number;
}

export interface ITotalOrderReport {
  BranchName: string;
  BranchNetCode: string;
  OrderAVG: number;
  TotalAmountAfterVat: number;
  TotalAmountBeforeVat: number;
  TotalItems: number;
  TotalOrders: number;
}

export interface ITotalOrderReportList extends IGeneralResponse {
  FieldsViewMap: FieldsViewMap[];
  List: ITotalOrderReport[];
  TotalRecords: number;
  TotalItems: number;
  TotalAfterVat: number;
  TotalBeforeVat: number;
  OrderAVG: number;
}

export interface IItemsTotalReports {
  ItemCode: string;
  ItemDescription: string;
  TotalAmount: number;
  TotalQuantity: number;
}

export interface IItemsTotalReportsList extends IGeneralResponse {
  FieldsViewMap: FieldsViewMap[];
  List: IItemsTotalReports[];
  TotalRecords: number;
  TotalAfterVat: number;
}

export interface IRevenueReport {
  Cost: number;
  ItemCode: string;
  ItemDescription: string;
  Revenue: number;
  RevenuePercent: number;
  TotalAmount: number;
  TotalAmountBeforeVat: number;
  TotalQuantity: number;
}

export interface IRevenueReportList extends IGeneralResponse {
  FieldsViewMap: FieldsViewMap[];
  List: IRevenueReport[];
  TotalRecords: number;
  TotalRevenuePercent: number;
  TotalCost: number;
  TotalAfterVat: number;
  TotalBeforeVat: number;
  TotalRevenue: number;
}

export interface ITicketFilter {
  Key: string;
  Value: string;
}

export interface ITicketFilters extends IGeneralResponse {
  BranchList: ITicketFilter[];
  InformationTypes: ITicketFilter[];
  OpenDateRanges: ITicketFilter[];
  StatusList: ITicketFilter[];
  TicketRequestTypes: ITicketFilter[];
}

export interface IZReportParams {
  AccountName: string;
  Address: string;
  Balance: number;
  BrnachExternalReference: string;
  BrnachName: string;
  BrnachNetCode: string;
  DepositAmount: number;
  DeviceExternalReference: string;
  DeviceNetCode: string;
  ID: string;
  POSName: string;
  Phone: string;
  ReportDate: string;
  TotalCash: number;
  TotalCashDrawerEntries: number;
  TotalCashPayments: number;
  TotalCashRefunds: number;
  TotalCheque: number;
  TotalChequePayments: number;
  TotalChequeRefunds: number;
  TotalCredit: number;
  TotalCreditPayments: number;
  TotalCreditRefunds: number;
  TotalOther: number;
  TotalOtherPayments: number;
  TotalOtherRefunds: number;
  TotalPayments: number;
  TotalRefunds: number;
  UserName: string;
  Vat: number;
}

export interface IZReport {
  AuthorizedBy: string;
  AuthorizedDate: string;
  BranchName: string;
  BranchSysId: number;
  CashAccount: string;
  CashDeclared: number;
  CreatedDate: string;
  DeclareStationSysId: number;
  DeclaredBy: string;
  DeclaredDate: string;
  Description: string;
  ExtrenalReference: string;
  FirstTranDate: string;
  GrnadTotal: number;
  IntegrationStatus: number;
  IsAllowChangeOwnerSysId: boolean;
  IsBalanced: boolean;
  IsDataChangeDisable: boolean;
  IsManualSysID: boolean;
  LastTranDate: string;
  LastTrxNumber: number;
  ObjectType: number;
  OwnerSysId: number;
  PreviosZDate: string;
  SysId: number;
  TotalItems: number;
  UpdateDate: string;
  ZCounter: number;
  ZStatus: number;
  ReportParams: IZReportParams;
}

export interface IZReports extends IGeneralResponse {
  ReportList: IZReport[];
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
  References: string[];
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
  IsAllowDefineItemOnCategoryLevel?: boolean;
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

export interface ICatalogItem {
  BarCode: string;
  Base64Picture: null;
  CategoryCode: string;
  Code: string | number;
  Description: string;
  IsNotActive: boolean;
  Price: number;
}

export interface ICatalog extends IGeneralResponse {
  List: ICatalogItem[];
}

export interface ICatalogCategory {
  Code: string;
  Description: string;
  IsNotActive: boolean;
}

export interface ICatalagCategories extends IGeneralResponse {
  List: ICatalogCategory[];
}

export interface ISeller {
  CellPhone: string;
  IsNotActive: boolean;
  Name: string;
  SellerCode: string | number;
}

export interface ISellersList extends IGeneralResponse {
  List: ISeller[];
}

export interface IDailyInstruction extends IGeneralResponse {
  Data: string;
}

// ===========

export interface IKeyboardFields {
  // DateRange: { FromDate: string; ToDate: string };
  DateRange: string[];
  Name: string;
}

export interface IPayment {
  Favorite: boolean;
  Tender: number;
  IsEnabled?: boolean;
  Col?: number;
  Row?: number;
}

export interface IPaymentDataItem extends Partial<IPayment> {
  Tender: number;
  Key: string;
  Title: string;
}

export interface IPaymentsList extends IGeneralResponse {
  Presets: IPayment[];
}

export interface IEfficiencyData extends IGeneralResponse {
  Data: IEfficiencyTotalData;
  CancelsByReason: IEfficiencyCancelsByReason[];
  CancelsByUser: IEfficiencyCancelsByUser[];
}

export interface IEfficiencyDetailsCancelsByUser extends IGeneralResponse {
  CancelsByReason: IEfficiencyCancelsByReason[];
}

export interface IEfficiencyDetailsCancelsByReason extends IGeneralResponse {
  CancelsByUser: IEfficiencyCancelsByUser[];
}

export interface IEfficiencyTotal {
  IncomingCalls: number;
  TotalOrders: number;
  NotCompletedOrders: number;
  CallsOrdersConversion: number;
}

export interface IEfficiencyCancelsByReason {
  Description: string;
  ReasonSysId: number;
  Total: number;
}

export interface IEfficiencyCancelsByUser extends IEfficiencyCancelsByReason {}

export interface IEfficiencyTotalData {
  CallsOrdersConversion: number;
  CallsPerHour: number;
  CompletedCalls: number;
  HourRedemption: number;
  IncomingCalls: number;
  LastOrderTime: string;
  LastTranDate: string;
  NotCompletedOrders: number;
  OrderAVG: number;
  OrdersPerHour: number;
  TotalOrders: number;
  TotalRevenue: number;
  TotalTickets: number;
}

export enum RESPONSE_STATUSES {
  OK = 0
}
