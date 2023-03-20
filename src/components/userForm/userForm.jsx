import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './userForm.module.scss';

function UserForm({ template, onSubmit, propsErrors, propsValues }) {
  const { title, fields, labelSubmit, footer } = template;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (propsErrors) {
      const propsErrorsArr = Object.entries(propsErrors);
      propsErrorsArr.forEach(([name, message]) => setError(name, { type: 'manual', message }));
    }
  }, [propsErrors]);

  useEffect(() => {
    if (propsValues) {
      const propsValuesArr = Object.entries(propsValues);
      propsValuesArr.forEach(([name, val]) => setValue(name, val));
    }
  }, []);

  const renderField = (fieldsArr) =>
    fieldsArr.map((field, index) => {
      const { label, name, type, placeholder, validationProps, matchField } = field;
      switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          return (
            <label key={index} className={styles.card__label}>
              {label}
              <input
                type={type}
                placeholder={placeholder}
                className={classNames(styles.card__input, { [styles.error]: errors[name] })}
                {...register(
                  name,
                  matchField
                    ? {
                        ...validationProps,
                        validate: (val) => val === watch(matchField.nameField) || matchField.messageError,
                      }
                    : validationProps
                )}
              />
              <div className={styles.card__error}>{errors?.[name] && <p>{errors?.[name].message}</p>}</div>
            </label>
          );
        case 'checkbox':
          return (
            <React.Fragment key={index}>
              <label key={index} className={styles.card__checkbox}>
                <input
                  type="checkbox"
                  className={classNames(styles.card__input, { [styles.error]: errors[name] })}
                  {...register(name, validationProps)}
                />
                {label}
              </label>
              <div className={styles.card__error}>{errors?.[name] && <p>{errors?.[name].message}</p>}</div>
            </React.Fragment>
          );
        default:
          return (
            <div key={index}>
              <span>Invalid field</span>
            </div>
          );
      }
    });

  return (
    <div className={`${styles.card} wrapper`}>
      <h1>{title}</h1>
      <form className={styles.card__form} onSubmit={handleSubmit(onSubmitForm)}>
        {renderField(fields)}
        <input className={styles.card__submit} value={labelSubmit} type="submit" />
      </form>
      {footer && <p className={styles.card__footer}>{footer}</p>}
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  template: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
