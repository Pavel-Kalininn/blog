import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useRegisterUserMutation } from '../redux/blogApi.js';
import {
  usernameField,
  emailField,
  passwordField,
  confirmPasswordField,
  agreeCheckBoxField,
} from '../components/userForm/fieldsTemplates';
import UserForm from '../components/userForm/userForm';

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState();
  const fromPage = location.state?.from?.pathname || '/';

  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data) => {
    try {
      await registerUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }).unwrap();
      navigate(fromPage, { replace: true });
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.data.errors);
      }
    }
  };

  const template = {
    title: 'Create new account',
    fields: [usernameField, emailField, passwordField, confirmPasswordField, agreeCheckBoxField],
    labelSubmit: 'Create',
    footer: (
      <React.Fragment>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </React.Fragment>
    ),
  };

  return <UserForm template={template} onSubmit={(data) => onSubmit(data)} propsErrors={errors} />;
}
