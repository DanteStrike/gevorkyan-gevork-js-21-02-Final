import {IPostPreview, IUser, IUserPreview} from '../types';
import i18next from '../locale/i18next';

const createDefaultUser = (): IUserPreview => ({
  id: ``,
  title: ``,
  firstName: ``,
  lastName: ``,
  picture: ``,
});

const createDefaultPost = (): IPostPreview => ({
  id: ``,
  text: ``,
  image: ``,
  publishDate: ``,
  owner: createDefaultUser(),
});

const createDefaultComment = () => ({
  id: ``,
  message: ``,
  owner: createDefaultUser(),
  post: ``,
  publishDate: ``,
});

const createDefaultFullUser = (): IUser => ({
  id: ``,
  title: ``,
  firstName: ``,
  lastName: ``,
  gender: ``,
  email: ``,
  dateOfBirth: ``,
  registerDate: ``,
  phone: ``,
  picture: ``,
  location: {
    street: ``,
    city: ``,
    state: ``,
    country: ``,
    timezone: ``,
  },
});

const createDefaultUsers = (amount: number) => new Array(amount).fill(``).map(createDefaultUser);
const createDefaultPosts = (amount: number) => new Array(amount).fill(``).map(createDefaultPost);
const createDefaultComments = (amount: number) => new Array(amount).fill(``).map(createDefaultComment);

const normalizeName = (name: string) => {
  const [firstName, ...other] = name.trim().split(` `);
  const lastName = other.join(``);

  return {
    firstName,
    lastName,
  };
};

const collectName = (firstName: string, lastName: string): string => `${firstName} ${lastName}`.trim();
const collectFullName = (firstName: string, lastName: string, title: string | undefined): string =>
  `${title ? `${i18next.t(`profile.userName.title.${title}`)}. ` : ``}${lastName} ${firstName}`;

export default {
  createDefaultUser,
  createDefaultPost,
  createDefaultUsers,
  createDefaultPosts,
  createDefaultFullUser,
  createDefaultComment,
  createDefaultComments,
  normalizeName,
  collectName,
  collectFullName,
};
