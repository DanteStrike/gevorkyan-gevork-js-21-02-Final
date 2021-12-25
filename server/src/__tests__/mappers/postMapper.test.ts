import DateUtils from '../../utils/date';
import PostMapper from '../../mappers/postMapper';

describe(`class PostMapper should work correctly`, () => {
  DateUtils.normalizeCardDate = jest.fn(() => `normalized`);

  it(`normalizeDateForClient test`, () => {
    const mockItem = {
      any: `any`,
      publishDate: `un-normalized`,
    };

    expect(PostMapper.normalizeDateForClient(mockItem)).toStrictEqual({
      any: `any`,
      publishDate: `normalized`,
    });
  });

  it(`normalizeDatesForClient test`, () => {
    const mockItems = [
      {
        any: `any-1`,
        publishDate: `un-normalized`,
      },
      {
        any: `any-2`,
        publishDate: `un-normalized`,
      },
    ];

    expect(PostMapper.normalizeDatesForClient(mockItems)).toStrictEqual([
      {
        any: `any-1`,
        publishDate: `normalized`,
      },
      {
        any: `any-2`,
        publishDate: `normalized`,
      },
    ]);
  });
});
