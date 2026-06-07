// 基于 @umijs/plugin-locale 的国际化封装
import { getLocale, setLocale as umiSetLocale, useIntl } from 'umi';

// 中文分类 -> locale key 映射
const categoryMap: Record<string, string> = {
  上衣: 'category.tops',
  裤子: 'category.pants',
  鞋子: 'category.shoes',
  配饰: 'category.accessories',
  包包: 'category.bags',
  其他: 'category.other',
};

export function getCategoryName(
  t: (id: string) => string,
  category: string,
): string {
  const key = categoryMap[category];
  return key ? t(key) : category;
}

export function useI18n() {
  const intl = useIntl();
  const locale = getLocale();

  const t = (id: string, values?: Record<string, string | number>) => {
    return intl.formatMessage({ id }, values);
  };

  const setLocale = (lang: string) => {
    umiSetLocale(lang, false);
  };

  return { t, locale, setLocale };
}
