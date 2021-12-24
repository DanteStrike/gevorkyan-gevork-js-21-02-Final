import DateUtils from '../../utils/date';
import UserMapper from '../../mappers/userMapper';
import {IUser} from '../../types/user';

describe(`class UserMapper should work correctly`, () => {
  it(`normalizeUserForClient test`, () => {
    DateUtils.normalizeUserDate = jest.fn(() => `normalized`);

    expect(
      UserMapper.normalizeUserForClient(
        {
          dateOfBirth: `dateOfBirth un-normalized`,
          registerDate: `registerDate un-normalized`,
        } as IUser,
        `anyLocale`
      )
    ).toMatchObject({
      dateOfBirth: `normalized`,
      registerDate: `normalized`,
    });
  });
});
