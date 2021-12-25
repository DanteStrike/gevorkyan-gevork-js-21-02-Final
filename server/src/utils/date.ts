import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
  months: {
    format: 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
    standalone: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
  },
});

const setupLocal = (date: string, locale?: string): moment.Moment => moment(date).locale(locale || ``);

const normalizeCardDate = (date: string, locale?: string): string =>
  `${setupLocal(date, locale).format('DD MMMM HH:mm')}`;

const normalizeUserDate = (date: string, locale?: string): string =>
  `${setupLocal(date, locale).format('DD MMMM YYYY')}`;

export default {
  normalizeCardDate,
  normalizeUserDate,
};
