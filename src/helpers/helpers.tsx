/* eslint-disable */
export const keyboardKeyReplace = (data: any, isFromBackendData: boolean) => {
  const jsonData = JSON.stringify(data);
  const replacedData = isFromBackendData
    ? jsonData
      .replace(/Name/g, 'title')
      .replace(/Items/g, 'children')
    : jsonData.replace(/title/g, 'Name').replace(/children/g, 'Items');
  return JSON.parse(replacedData);
};
