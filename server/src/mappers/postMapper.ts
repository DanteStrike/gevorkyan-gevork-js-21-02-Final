import {DateUtils} from '../utils';

class PostMapper {
  static normalizeDateForClient<T extends {publishDate: string}>(item: T, locale?: string): T {
    return {...item, publishDate: DateUtils.normalizeCardDate(item.publishDate, locale)};
  }

  static normalizeDatesForClient<T extends {publishDate: string}>(items: T[], locale?: string): T[] {
    return items.map((item) => PostMapper.normalizeDateForClient(item, locale));
  }
}

export default PostMapper;
