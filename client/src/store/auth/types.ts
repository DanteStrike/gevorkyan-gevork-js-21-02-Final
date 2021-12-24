import NameSpace from '../name-space';

const LOGOUT = `${[NameSpace.AUTH]}/LOGOUT`;
const LOGIN = `${[NameSpace.AUTH]}/LOGIN`;

export const authStorageKey = `app-auth-id`;

export default {
  LOGOUT,
  LOGIN,
};
