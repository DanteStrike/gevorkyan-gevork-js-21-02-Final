import {INormalizedPaginationParams, IPaginationParams, IPaginationQuery} from '../types/params';
import {DummyAPIConstants} from '../constants/dummyAPI';

const getPaginationParams = (query: IPaginationQuery): IPaginationParams => ({
  limit: Number(query.limit) || DummyAPIConstants.DEFAULT_LIMIT,
  page: Number(query.page) || DummyAPIConstants.DEFAULT_PAGE,
});

const normalizePaginationQuery = (limit: number, page: number, minLimit: number): INormalizedPaginationParams => {
  if (limit >= minLimit) {
    return {
      limit,
      page,
    };
  }

  let normalizedLimit = limit;
  let normalizedPage = page;
  const pageLimit = Math.ceil(minLimit / limit);
  if (limit < minLimit) {
    normalizedLimit = pageLimit * limit;
    normalizedPage = Math.floor(page / pageLimit);
  }

  return {
    limit: normalizedLimit,
    page: normalizedPage,
    dataSlice: {
      left: (page % pageLimit) * limit,
      right: ((page % pageLimit) + 1) * limit,
    },
  };
};

export default {
  normalizePaginationQuery,
  getPaginationParams,
};
