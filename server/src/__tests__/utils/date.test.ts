import DateUtils from '../../utils/date';

const mockDate = `1996-04-30T19:26:49.610Z`;

describe(`DateUtils should work correctly`, () => {
  it(`normalizeUserDate test`, () => {
    expect(DateUtils.normalizeUserDate(mockDate)).toBe(`30 Апреля 1996`);
    expect(DateUtils.normalizeUserDate(mockDate, `ru`)).toBe(`30 Апреля 1996`);
    expect(DateUtils.normalizeUserDate(mockDate, `xx`)).toBe(`30 Апреля 1996`);
    expect(DateUtils.normalizeUserDate(mockDate, `en`)).toBe(`30 April 1996`);
  });

  it(`normalizeCardDate test`, () => {
    expect(DateUtils.normalizeCardDate(mockDate)).toBe(`30 Апреля 23:26`);
    expect(DateUtils.normalizeCardDate(mockDate, `ru`)).toBe(`30 Апреля 23:26`);
    expect(DateUtils.normalizeCardDate(mockDate, `xx`)).toBe(`30 Апреля 23:26`);
    expect(DateUtils.normalizeCardDate(mockDate, `en`)).toBe(`30 April 23:26`);
  });
});
