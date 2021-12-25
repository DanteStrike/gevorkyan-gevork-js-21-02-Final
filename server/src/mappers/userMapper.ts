import {IUser} from '../types/user';
import {DateUtils, ObjectUtils} from '../utils';

class UserMapper {
  static normalizeUserForClient(user: IUser, locale?: string): IUser {
    return ObjectUtils.updateObject(user, {
      dateOfBirth: DateUtils.normalizeUserDate(user.dateOfBirth, locale),
      registerDate: DateUtils.normalizeUserDate(user.registerDate, locale),
    });
  }
}

export default UserMapper;
