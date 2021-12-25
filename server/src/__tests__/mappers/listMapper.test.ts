import DateUtils from '../../utils/date';
import ListMapper from '../../mappers/listMapper';
import {IList} from '../../types/lists';

describe(`class UserMapper should work correctly`, () => {
  it(`normalizeUserForClient test`, () => {
    DateUtils.normalizeUserDate = jest.fn(() => `normalized`);

    const mockList: IList<number> = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      page: 0,
      limit: 0,
      total: 10,
    };

    expect(ListMapper.normalizeList(mockList, {page: 1, limit: 10}, {page: 0, limit: 99})).toStrictEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      page: 1,
      limit: 10,
      total: 10,
    });

    expect(
      ListMapper.normalizeList(mockList, {page: 1, limit: 2}, {page: 0, limit: 6, dataSlice: {left: 2, right: 4}})
    ).toStrictEqual({
      data: [3, 4],
      page: 1,
      limit: 2,
      total: 10,
    });

    expect(
      ListMapper.normalizeList(mockList, {page: 0, limit: 11}, {page: 0, limit: 11, dataSlice: {left: 0, right: 10}})
    ).toStrictEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      page: 0,
      limit: 11,
      total: 10,
    });
  });
});
