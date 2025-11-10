import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
  const { t } = useTranslation();

  const translationHelper = () => (tr: any, opts: any) =>
    t(`${tr}`, opts);

  return {
    translationHelper
  };
};
