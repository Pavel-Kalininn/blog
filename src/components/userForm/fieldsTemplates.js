export const usernameField = {
  label: 'Username',
  type: 'text',
  name: 'username',
  placeholder: 'Username',
  validationProps: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username length should be at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Username cannot exceed more than 20 characters',
    },
  },
};

export const passwordField = {
  label: 'Password',
  type: 'password',
  name: 'password',
  placeholder: 'Password',
  validationProps: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password length should be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Password cannot exceed more than 40 characters',
    },
  },
};

export const confirmPasswordField = {
  label: 'Repeat Password',
  type: 'password',
  name: 'confirmPassword',
  placeholder: 'Repeat Password',
  validationProps: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password length should be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Password cannot exceed more than 40 characters',
    },
  },
  matchField: {
    nameField: 'password',
    messageError: 'Password does not match',
  },
};

export const imageField = {
  label: 'Avatar image (url)',
  type: 'url',
  name: 'image',
  placeholder: 'Avatar image (url)',
  validationProps: {
    pattern: {
      value:
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      message: 'Please enter valid url',
    },
  },
};

export const emailField = {
  label: 'Email address',
  type: 'email',
  name: 'email',
  placeholder: 'Email address',
  validationProps: {
    required: 'Email is required',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter valid email!',
    },
  },
};

export const agreeCheckBoxField = {
  label: 'I agree to the processing of my personal information',
  type: 'checkbox',
  name: 'agree',
  validationProps: {
    validate: (val) => val === true || 'You must agree',
  },
};
