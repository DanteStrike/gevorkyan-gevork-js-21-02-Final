import {DataUtils} from '../../utils';

describe(`DataUtils should work correctly`, () => {
  it(`createDefaultUsers test`, () => {
    expect(DataUtils.createDefaultUsers(2)).toStrictEqual([
      DataUtils.createDefaultUser(),
      DataUtils.createDefaultUser(),
    ]);
  });

  it(`createDefaultPosts test`, () => {
    expect(DataUtils.createDefaultPosts(2)).toStrictEqual([
      DataUtils.createDefaultPost(),
      DataUtils.createDefaultPost(),
    ]);
  });

  it(`createDefaultComments test`, () => {
    expect(DataUtils.createDefaultComments(2)).toStrictEqual([
      DataUtils.createDefaultComment(),
      DataUtils.createDefaultComment(),
    ]);
  });

  it(`normalizeName test`, () => {
    expect(DataUtils.normalizeName(`full name`)).toStrictEqual({
      firstName: `full`,
      lastName: `name`,
    });
  });

  it(`collectName test`, () => {
    expect(DataUtils.collectName(`full`, `name`)).toBe(`full name`);
  });

  it(`collectFullName test`, () => {
    expect(DataUtils.collectFullName(`full`, `name`, `ms`)).toBe(`Ms. name full`);
    expect(DataUtils.collectFullName(`full`, `name`, undefined)).toBe(`name full`);
  });
});
