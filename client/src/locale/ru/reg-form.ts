const REG_FORM = {
  title: `Регистрация`,
  name: {
    title: `ФИО:`,
    placeholder: `Введите свое имя`,
  },
  gender: {
    title: `Пол:`,
    options: {
      male: `Мужской`,
      female: `Женский`,
      other: `Другой`,
    },
  },
  dateOfBirth: {
    title: `Дата рождения:`,
    placeholder: `Выберите дату`,
  },
  email: {
    title: `E-mail:`,
    placeholder: `anonim@gmail.com`,
  },
  phone: {
    title: `Телеофон:`,
    placeholder: `+79995553322`,
  },
  register: `Зарегистрироваться`,
  message: `Уже есть аккаунт? Войти`,
};

export default REG_FORM;
