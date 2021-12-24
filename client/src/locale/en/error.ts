const ERROR = {
  page: {
    notFound: `Page not found`,
    permission: `Permission denied`,
  },
  network: {
    notFoundID: `ID not found`,
    emailExist: `Email exist`,
    notFoundProfile: `Profile not found`,
    notFoundPost: `Post not found`,
  },
  validate: {
    id: {
      required: `Input ID`,
    },
    age: {
      required: `Input date of birth`,
      border: `Only for {{age}}+`,
    },
    name: {
      required: `Input name`,
      min: `First name and last name must have over 2 characters`,
      max: `First name and last name cant have over 50 characters`,
    },
    gender: {
      required: `Input Gender`,
    },
    avatar: {
      imgFormat: `Only PNG and JPEG`,
      length: `Avatar img size < 2Mb`,
    },
    email: {
      required: `Input email`,
      format: `Input correct email`,
    },
    phone: {
      required: `Input phone`,
      format: `Input correct phone`,
    },
  },
};

export default ERROR;
