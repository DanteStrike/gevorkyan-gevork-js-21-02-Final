import React from 'react';
import './RegForm.scss';
import {Moment} from 'moment';
import {Form, Input, DatePicker, Radio} from 'antd';
import Button from '../submit-button/SubmitButton';
import CustomLink from '../custom-link/CustomLink';
import {IUserRegistration} from '../../types';
import {RoutePath} from '../../enums';
import {DataUtils, ValidateUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

interface IRegFormProps {
  loading?: boolean;
  onSubmit?: (data: IUserRegistration) => void;
}
type RegFormValuesType = Omit<IUserRegistration, 'firstName' | 'lastName' | 'dateOfBirth'> & {
  name: string;
  dateOfBirth: Moment;
};

const {Item} = Form;

function RegForm({loading, onSubmit = () => {}}: IRegFormProps) {
  const {t} = useAppTranslation(`regForm`);
  const [form] = Form.useForm();

  const handleFormFinish = (filedValues: RegFormValuesType) => {
    const {name, dateOfBirth, ...values} = filedValues;
    const normName = DataUtils.normalizeName(name);
    const userReg: IUserRegistration = {
      ...normName,
      ...values,
      dateOfBirth: dateOfBirth.toISOString(),
    };
    onSubmit(userReg);
  };

  return (
    <Form
      className="reg-form"
      form={form}
      name="registration"
      size="middle"
      layout="vertical"
      validateTrigger="onSubmit"
      onFinish={handleFormFinish}
      initialValues={{
        name: ``,
        gender: `male`,
        dateOfBirth: ``,
        email: ``,
        phone: ``,
      }}
    >
      <Item
        name="name"
        label={t(`name.title`)}
        rules={[ValidateUtils.requireValidatorName, ValidateUtils.userNameValidator]}
      >
        <Input placeholder={t(`name.placeholder`)} />
      </Item>

      <Item className="reg-form__gender" name="gender" label={t(`gender.title`)}>
        <Radio.Group className="reg-form__gender-container">
          <Radio value="male">{t(`gender.options.male`)}</Radio>
          <Radio value="female">{t(`gender.options.female`)}</Radio>
          <Radio value="other">{t(`gender.options.other`)}</Radio>
        </Radio.Group>
      </Item>

      <Item
        name="dateOfBirth"
        label={t(`dateOfBirth.title`)}
        rules={[ValidateUtils.requireValidatorBirth, ValidateUtils.sevenYearsOldValidator]}
      >
        <DatePicker
          className="reg-form__date-picker"
          placeholder={t(`dateOfBirth.placeholder`)}
          disabledDate={ValidateUtils.disableDateOverCurrent}
        />
      </Item>

      <Item
        name="email"
        label={t(`email.title`)}
        rules={[ValidateUtils.requireValidatorEmail, ValidateUtils.emailFormatValidator()]}
      >
        <Input placeholder={t(`email.placeholder`)} />
      </Item>

      <Item
        name="phone"
        label={t(`phone.title`)}
        rules={[ValidateUtils.requireValidatorPhone, ValidateUtils.phoneFormatValidator()]}
      >
        <Input placeholder={t(`phone.placeholder`)} />
      </Item>

      <Item className="reg-form__last">
        <Button loading={loading}>{t(`register`)}</Button>
        <CustomLink className="reg-form__link" to={RoutePath.LOGIN}>
          {t(`message`)}
        </CustomLink>
      </Item>
    </Form>
  );
}

RegForm.defaultProps = {
  loading: false,
  onSubmit: () => {},
};

export default React.memo(RegForm);
