/* eslint-disable */
import { FieldsViewMap } from '../server/models';

export const keyboardKeyReplace = (data: any, isFromBackendData: boolean) => {
  const jsonData = JSON.stringify(data);
  const replacedData = isFromBackendData
    ? jsonData
      .replace(/Name/g, 'title')
      .replace(/Items/g, 'children')
    : jsonData.replace(/title/g, 'Name').replace(/children/g, 'Items');
  return JSON.parse(replacedData);
};

export const getOrderedTableColumns = (title: string, fieldsViewMap: FieldsViewMap[], t: any) => {
  const orderedColumns = fieldsViewMap.sort((a, b) => a.Value - b.Value)?.map(v=> v.Key);
  return [
    {
      title: t(title),
      children: orderedColumns.map((key: string) => ({
          title: t(`sharedColumns.${key}`),
          dataIndex: key,
          key: key,
          width: 100,
      }))
    }
  ];
}
