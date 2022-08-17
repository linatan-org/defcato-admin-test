import { useTranslation } from 'react-i18next';

export const useTranslations = (page: any) => {
  const { t } = useTranslation();

  const translationHelper = (page: any) => (tr: any, opts: any) =>
    t(`${page}.${tr}`, opts);

  return {
    translationHelper
  };
};
