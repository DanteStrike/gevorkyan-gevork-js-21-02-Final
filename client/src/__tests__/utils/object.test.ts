import {ObjectUtils} from '../../utils';

describe(`ObjectUtils should work correctly`, () => {
  it(`updateObject test`, () => {
    expect(ObjectUtils.updateObject({a: 1, b: `b`}, {a: 2}, {a: 3, b: `a`}, {b: `c`})).toStrictEqual({
      a: 3,
      b: `c`,
    });
  });
});
