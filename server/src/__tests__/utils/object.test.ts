import ObjectUtils from '../../utils/object';

describe(`ObjectUtils should work correctly`, () => {
  it(`updateObject test`, () => {
    expect(ObjectUtils.updateObject({test: `t`}, {test: `a`})).toStrictEqual({test: `a`});
  });
});
