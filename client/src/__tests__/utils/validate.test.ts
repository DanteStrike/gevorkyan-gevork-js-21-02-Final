import {RuleObject} from 'antd/es/form';
import moment from 'moment';
import {Upload} from 'antd';
import {ValidateUtils} from '../../utils';
import i18next from '../../locale/i18next';

describe(`ValidateUtils should work correctly`, () => {
  it(`requireValidator test`, async () => {
    jest.spyOn(i18next, 't').mockReturnValue(`errorMSG`);
    const validate = ValidateUtils.requireValidator(`errorMSG`)() as {
      validator: (_: RuleObject, value: any) => Promise<any>;
    };
    await expect(validate.validator([] as RuleObject, null)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `non-empty`)).resolves.toBe(undefined);
  });

  it(`sevenYearsOldValidator test`, async () => {
    jest.spyOn(i18next, 't').mockReturnValue(`errorMSG`);
    const validate = ValidateUtils.sevenYearsOldValidator() as {validator: (_: RuleObject, value: any) => Promise<any>};
    await expect(validate.validator([] as RuleObject, moment().subtract(7, `years`).add(1, `days`))).rejects.toThrow(
      new Error(`errorMSG`)
    );
    await expect(validate.validator([] as RuleObject, moment().subtract(7, `years`))).resolves.toBe(undefined);
  });

  it(`disableDateOverCurrent test`, () => {
    expect(ValidateUtils.disableDateOverCurrent(moment().add(1, `minute`))).toBe(true);
    expect(ValidateUtils.disableDateOverCurrent(moment().add(1, `days`))).toBe(true);
    expect(ValidateUtils.disableDateOverCurrent(moment().subtract(1, `days`))).toBe(false);
  });

  it(`userNameValidator test`, async () => {
    jest.spyOn(i18next, 't').mockReturnValue(`errorMSG`);
    const validate = ValidateUtils.userNameValidator() as {validator: (_: RuleObject, value: any) => Promise<any>};
    await expect(validate.validator([] as RuleObject, ``)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `w`)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `ww`)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `ww w`)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `${'w'.repeat(51)} w`)).rejects.toThrow(new Error(`errorMSG`));
    await expect(validate.validator([] as RuleObject, `${'w'.repeat(51)} ${'w'.repeat(51)}`)).rejects.toThrow(
      new Error(`errorMSG`)
    );
    await expect(validate.validator([] as RuleObject, `ww ww`)).resolves.toBe(undefined);
    await expect(validate.validator([] as RuleObject, `${'w'.repeat(50)} ${'w'.repeat(50)}`)).resolves.toBe(undefined);
  });

  it(`imageValidator test`, () => {
    let file = new File(['a'.repeat(1)], `t`, {type: 'any'});
    Object.defineProperty(file, 'size', {value: 1});
    expect(ValidateUtils.imageValidator(file)).toBe(Upload.LIST_IGNORE);

    file = new File(['a'.repeat(1)], `t`, {type: 'image/jpeg'});
    Object.defineProperty(file, 'size', {value: 1});
    expect(ValidateUtils.imageValidator(file)).toBe(true);

    file = new File(['a'.repeat(1)], `t`, {type: 'image/png'});
    Object.defineProperty(file, 'size', {value: 1});
    expect(ValidateUtils.imageValidator(file)).toBe(true);

    file = new File(['a'.repeat(1)], `t`, {type: 'image/png'});
    Object.defineProperty(file, 'size', {value: 1024 * 1024 * 2 + 1});
    expect(ValidateUtils.imageValidator(file)).toBe(Upload.LIST_IGNORE);

    file = new File(['a'.repeat(1)], `t`, {type: 'image/png'});
    Object.defineProperty(file, 'size', {value: 1024 * 1024 * 2 - 1});
    expect(ValidateUtils.imageValidator(file)).toBe(true);
  });
});
