import RequestUtils from '../../utils/request';

describe(`RequestUtils should work correctly`, () => {
  it(`getPaginationParams test`, () => {
    expect(RequestUtils.getPaginationParams({})).toStrictEqual({limit: 0, page: 0});
    expect(RequestUtils.getPaginationParams({limit: ``, page: ``})).toStrictEqual({limit: 0, page: 0});
    expect(RequestUtils.getPaginationParams({limit: `4`, page: `5`})).toStrictEqual({limit: 4, page: 5});
    expect(RequestUtils.getPaginationParams({limit: `nan`, page: `nan`})).toStrictEqual({limit: 0, page: 0});
  });

  it(`normalizePaginationQuery test`, () => {
    expect(RequestUtils.normalizePaginationQuery(5, 10, 5)).toStrictEqual({limit: 5, page: 10});
    expect(RequestUtils.normalizePaginationQuery(1, 0, 5)).toStrictEqual({
      limit: 5,
      page: 0,
      dataSlice: {left: 0, right: 1},
    });
    expect(RequestUtils.normalizePaginationQuery(2, 1, 5)).toStrictEqual({
      limit: 6,
      page: 0,
      dataSlice: {left: 2, right: 4},
    });
  });
});
