import React, {useEffect, useMemo, useState} from 'react';
import moment, {Moment} from 'moment';
import {Form, Input, Select, DatePicker, Upload, Avatar} from 'antd';
import Button from '../submit-button/SubmitButton';
import './EditForm.scss';
import {ValidateUtils, DataUtils, FileUtils, ObjectUtils, RequestUtils} from '../../utils';
import {IUser, IUserUpdate, UserGenderType} from '../../types';
import UploadButton from '../upload-button/UploadButton';
import useAppTranslation from '../../hooks/use-app-translation';

interface IEditFormProps {
  user: IUser;
  loading?: boolean;
  onSubmit?: (data: IUserUpdate) => void;
}
interface IEditFormState {
  loading: boolean;
  img: string | null;
}
interface IEditForm {
  name: string;
  gender: UserGenderType;
  dateOfBirth: Moment;
  phone: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const avatarStyle = {width: '100%', height: '100%'};
const {Item} = Form;

function EditForm({user, onSubmit = () => {}, loading}: IEditFormProps) {
  const {t} = useAppTranslation(`editForm`);
  const [avatar, setAvatar] = useState<IEditFormState>({
    loading: false,
    img: user.picture || null,
  });
  const handleAvatarChange = (info: any) => {
    FileUtils.encodeToBase64(info.file.originFileObj, (res) => {
      if (typeof res === 'string' || res instanceof String) {
        setAvatar(
          ObjectUtils.updateObject(avatar, {
            loading: false,
            img: res as string,
          })
        );
      }
    });
  };

  const [form] = Form.useForm();
  const defaultValues = useMemo(
    () => ({
      name: DataUtils.collectName(user.firstName, user.lastName),
      picture: user.picture || ``,
      gender: user.gender,
      dateOfBirth: moment(user.dateOfBirth),
      phone: user.phone,
    }),
    [user]
  );

  useEffect(() => {
    form.setFieldsValue(defaultValues);
    setAvatar((prev) => ObjectUtils.updateObject(prev, {img: defaultValues.picture}));
  }, [form, defaultValues]);

  const handleFormFinish = (filedValues: IEditForm) => {
    const normName = DataUtils.normalizeName(filedValues.name);
    const userUpdate: IUserUpdate = {
      id: user.id,
      firstName: normName.firstName,
      lastName: normName.lastName,
      picture: avatar.img || user.picture || ``,
      gender: filedValues.gender,
      dateOfBirth: filedValues.dateOfBirth.toISOString(),
      phone: filedValues.phone,
    };

    onSubmit(userUpdate);
  };

  return (
    <Form
      className="edit-form"
      form={form}
      name="edit"
      size="middle"
      layout="vertical"
      validateTrigger="onSubmit"
      onFinish={handleFormFinish}
      initialValues={defaultValues}
    >
      <Item name="picture" label={t(`avatar`)} valuePropName="file" getValueFromEvent={normFile} noStyle>
        <Upload
          name="avatar"
          listType="picture-card"
          className="edit-form__avatar"
          showUploadList={false}
          accept="image/*"
          beforeUpload={ValidateUtils.imageValidator}
          onChange={handleAvatarChange}
          customRequest={RequestUtils.dummyRequest}
        >
          {avatar.img ? <Avatar src={avatar.img} style={avatarStyle} /> : <UploadButton loading={avatar.loading} />}
        </Upload>
      </Item>

      <Item
        name="name"
        label={t(`name.title`)}
        rules={[ValidateUtils.requireValidatorName, ValidateUtils.userNameValidator]}
      >
        <Input placeholder={t(`name.placeholder`)} />
      </Item>

      <Item name="gender" label={t(`gender.title`)} rules={[ValidateUtils.requireValidatorGender]}>
        <Select>
          <Select.Option value="male">{t(`gender.options.male`)}</Select.Option>
          <Select.Option value="female">{t(`gender.options.female`)}</Select.Option>
          <Select.Option value="other">{t(`gender.options.other`)}</Select.Option>
        </Select>
      </Item>

      <Item
        name="dateOfBirth"
        label={t(`dateOfBirth.title`)}
        rules={[ValidateUtils.requireValidatorBirth, ValidateUtils.sevenYearsOldValidator]}
      >
        <DatePicker
          className="edit-form__date-picker"
          placeholder={t(`dateOfBirth.placeholder`)}
          disabledDate={ValidateUtils.disableDateOverCurrent}
        />
      </Item>

      <Item
        name="phone"
        label={t(`phone.title`)}
        rules={[ValidateUtils.requireValidatorPhone, ValidateUtils.phoneFormatValidator()]}
      >
        <Input />
      </Item>

      <Item className="edit-form__last">
        <Button loading={loading}>{t(`save`)}</Button>
      </Item>
    </Form>
  );
}

EditForm.defaultProps = {
  loading: false,
  onSubmit: () => {},
};

export default React.memo(EditForm);
