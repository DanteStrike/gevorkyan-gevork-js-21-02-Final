import React from 'react';
import './LoginForm.scss';
import {Form, Input} from 'antd';
import Button from '../submit-button/SubmitButton';
import CustomLink from '../custom-link/CustomLink';
import {RoutePath} from '../../enums';
import {ValidateUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

interface ILoginFormProps {
  loading?: boolean;
  onSubmit?: (id: string) => void;
}

const {Item} = Form;

function LoginForm({onSubmit = () => {}, loading}: ILoginFormProps) {
  const {t} = useAppTranslation(`loginForm`);
  const [form] = Form.useForm();

  const handleFormFinish = (filedValues: {id: string}) => {
    onSubmit(filedValues.id);
  };

  return (
    <Form
      className="login-form"
      form={form}
      name="login"
      size="middle"
      layout="vertical"
      onFinish={handleFormFinish}
      initialValues={{
        id: ``,
      }}
    >
      <Item name="id" label="ID:" rules={[ValidateUtils.requireValidatorID]}>
        <Input placeholder={t(`id.placeholder`)} />
      </Item>

      <Item className="login-form__last">
        <Button loading={loading}>{t(`enter`)}</Button>
        <CustomLink className="login-form__link" to={RoutePath.REGISTRATION}>
          {t(`message`)}
        </CustomLink>
      </Item>
    </Form>
  );
}

LoginForm.defaultProps = {
  loading: false,
  onSubmit: () => {},
};

export default React.memo(LoginForm);
