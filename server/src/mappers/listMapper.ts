import {INormalizedPaginationParams, IPaginationParams} from '../types/params';
import {IList} from '../types/lists';

class ListMapper {
  static normalizeList<T>(
    oldData: IList<T>,
    pagParams: IPaginationParams,
    normalizedPagParams: INormalizedPaginationParams
  ): IList<T> {
    const mappedData: IList<T> = {
      limit: pagParams.limit,
      page: pagParams.page,
      total: oldData.total,
      data: oldData.data.slice(),
    };
    if (normalizedPagParams.dataSlice) {
      mappedData.data =
        mappedData.data.length < pagParams.limit
          ? mappedData.data.slice()
          : mappedData.data.slice(normalizedPagParams.dataSlice.left, normalizedPagParams.dataSlice.right);
    }
    return mappedData;
  }
}

export default ListMapper;
