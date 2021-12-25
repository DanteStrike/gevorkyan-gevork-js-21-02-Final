import {RuleObject} from 'antd/es/form';
import moment from 'moment';
import {message, Upload} from 'antd';
import i18next from '../locale/i18next';
import DataUtils from './data';

const requireValidator = (text: string) => () => ({
  validator(_: RuleObject, value: any) {
    if (!value) {
      return Promise.reject(new Error(i18next.t(text)));
    }
    return Promise.resolve();
  },
});
const requireValidatorID = requireValidator(`error.validate.id.required`);
const requireValidatorName = requireValidator(`error.validate.name.required`);
const requireValidatorGender = requireValidator(`error.validate.gender.required`);
const requireValidatorBirth = requireValidator(`error.validate.age.required`);
const requireValidatorEmail = requireValidator(`error.validate.email.required`);
const requireValidatorPhone = requireValidator(`error.validate.phone.required`);

const yearOldValidator = (age: number) => () => ({
  validator(_: RuleObject, value: any) {
    if (value > moment().subtract(age, `years`)) {
      return Promise.reject(new Error(i18next.t(`error.validate.age.border`, {age})));
    }
    return Promise.resolve();
  },
});
const sevenYearsOldValidator = yearOldValidator(7);

const userNameValidator = () => ({
  validator(_: RuleObject, value: any) {
    const {firstName, lastName} = DataUtils.normalizeName(value);

    if (firstName.length < 2 || lastName.length < 2) {
      return Promise.reject(new Error(i18next.t(`error.validate.name.min`)));
    }

    if (firstName.length > 50 || lastName.length > 50) {
      return Promise.reject(new Error(i18next.t(`error.validate.name.max`)));
    }

    return Promise.resolve();
  },
});

const imageValidator = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error(i18next.t(`error.validate.avatar.imgFormat`));
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(i18next.t(`error.validate.avatar.length`));
  }
  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
};

const phoneFormatValidator = () => ({
  pattern: new RegExp(`^\\+?7(\\d{10})$`),
  message: i18next.t(`error.validate.phone.format`),
});
const emailFormatValidator = () => ({type: 'email' as any, message: i18next.t(`error.validate.email.format`)});
const disableDateOverCurrent = (current: moment.Moment) => current && current > moment();

export default {
  requireValidator,
  userNameValidator,
  imageValidator,
  requireValidatorName,
  requireValidatorGender,
  requireValidatorBirth,
  requireValidatorEmail,
  sevenYearsOldValidator,
  requireValidatorPhone,
  phoneFormatValidator,
  disableDateOverCurrent,
  requireValidatorID,
  emailFormatValidator,
};
