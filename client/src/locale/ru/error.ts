const ERROR = {
  page: {
    notFound: `Страница не найдена`,
    permission: `Доступ запрещен`,
  },
  network: {
    notFoundID: `Такого ID не существует`,
    emailExist: `Пользователь с такой почтой уже зарегистрирован`,
    notFoundProfile: `Профиль не найден`,
    notFoundPost: `Пост не найден`,
  },
  validate: {
    id: {
      required: `Укажите ID`,
    },
    age: {
      required: `Укажите дату рождения`,
      border: `Доступ только для {{age}}+`,
    },
    name: {
      required: `Укажите ФИО`,
      min: `Имя и фамилия должны содержать больше 2-х символов`,
      max: 'Имя и фамилия не могут быть длинее 50-и символов',
    },
    gender: {
      required: `Укажите ПОЛ`,
    },
    avatar: {
      imgFormat: `Можно использовать только PNG и JPEG`,
      length: `Аватарка должна весить < 2Mb`,
    },
    email: {
      required: `Укажите почту`,
      format: `Введите корректную почту`,
    },
    phone: {
      required: `Укажите телефон`,
      format: `Введите корректный телефон`,
    },
  },
};

export default ERROR;
