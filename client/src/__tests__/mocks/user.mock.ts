import {IUser, IUsers, IUserPreview, IUserRegistration, IUserUpdate} from '../../types';

export const userOne: IUserPreview = {
  id: `userID_1`,
  title: `ms`,
  firstName: `anyFN`,
  lastName: `antLN`,
  picture: `url`,
};

export const userTwo: IUserPreview = {
  id: `userID_2`,
  title: `ms`,
  firstName: `anyFN`,
  lastName: `antLN`,
  picture: `url`,
};

export const usersList: IUsers = {
  data: [userOne, userTwo],
  limit: 5,
  page: 0,
  total: 2,
};

export const fullUser: IUser = {
  id: `userID_full`,
  title: `ms`,
  firstName: `anyFN`,
  lastName: `antLN`,
  picture: `url`,
  gender: `female`,
  email: `email`,
  dateOfBirth: `normalized`,
  registerDate: `normalized`,
  phone: `phone`,
  location: {
    street: `street`,
    city: `city`,
    state: `state`,
    country: `country`,
    timezone: `timezone`,
  },
};

export const regUserData: IUserRegistration = {
  firstName: `anyFN`,
  lastName: `anyLN`,
  gender: `female`,
  dateOfBirth: `dateOfBirth`,
  email: `email`,
  phone: `phone`,
};

export const updUserData: IUserUpdate = {
  id: `userID_upd`,
  picture: `pic`,
  firstName: `anyFN`,
  lastName: `anyLN`,
  gender: `female`,
  dateOfBirth: `dateOfBirth`,
  phone: `phone`,
};
