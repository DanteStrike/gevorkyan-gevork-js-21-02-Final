export type UserTitleType = 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '';
export type UserGenderType = 'male' | 'female' | 'other' | '';

export interface IUserPreview {
  id: string;
  title?: UserTitleType;
  firstName: string;
  lastName: string;
  picture?: string;
}

export interface ILocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface IUser extends IUserPreview {
  gender: UserGenderType;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  location: ILocation;
}

export interface IUserRegistration {
  firstName: string;
  lastName: string;
  gender: UserGenderType;
  dateOfBirth: string;
  email: string;
  phone: string;
}

export interface IUserUpdate extends Omit<IUserRegistration, 'email'> {
  id: string;
  picture: string;
}
