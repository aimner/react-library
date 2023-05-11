import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';

import arrow from '../../../assets/img/auth/arrow.svg';
import greyArrow from '../../../assets/img/auth/grey_arrow.png';
import { Input } from '../../../components/input';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchForgotPassword } from '../../../store/features/auth/thunks';
import { Registration } from '../../../types/auth-types';
import { FormValues } from '../../../types/forms-type';
import { validateFunc } from '../../../validation-auth/functions';
import { emailRegExp, emptyField } from '../../../validation-auth/variables';
import { RecoverPasswordForm } from '../recover-password-form';

import classes from './forgot-password-form.module.scss';

const cx = classNames.bind(classes);

export const ForgotPasswordForm = () => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successfulResponse, setSuccessfulResponse] = useState(false);

  const [emailFocus, setEmailFocus] = useState<boolean>();

  const onSubmit = (data: Pick<Registration, 'email'>): void => {
    dispatch(fetchForgotPassword(data))
      .unwrap()
      .then(() => setSuccessfulResponse(true))
      .catch((value: AxiosError) => setErrorMessage(value.message));
  };

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  // RECOVER PASSWORD FORM
  if (code) {
    return <RecoverPasswordForm code={code} />;
  }

  // SUCCESSFUL RESPONSE
  if (successfulResponse) {
    return (
      <div className={classes.auth___successfulResponse}>
        <div className={classes.auth_block}>
          <h3 className={classes.auth__title}>Письмо выслано</h3>
          <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
        </div>
      </div>
    );
  }

  // FORGOT FORM
  return (
    <div className={classes.auth}>
      <NavLink className={classes.auth__backToAuthForm} to='/auth'>
        <img src={greyArrow} alt='back to auth' /> вход в личный кабинет
      </NavLink>
      <div className={classes.auth_block}>
        <h3 className={classes.auth__title}>Восстановление пароля</h3>
        <form className={classes.auth_form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            classname={classes}
            errors={errors}
            inputId='email'
            inputName='email'
            inputType='text'
            inputValue={emailValue}
            label='Email'
            register={register}
            setInputFocus={setEmailFocus}
            setInputValue={setEmailValue}
            setValue={setValue}
            patternValue={emailRegExp}
            inputFocus={emailFocus}
            required={true}
          />

          {errorMessage && <span className={classes.auth_form__emailManual___errorFetch}>error</span>}

          {emailFocus === undefined || (
            <span className={classes.auth_form__emailManual___error}>
              {emailValue.length > 0 ? (
                <span
                  className={cx({
                    errorText: !validateFunc(emailFocus, emailRegExp, emailValue),
                  })}
                >
                  Введите корректный e-mail
                </span>
              ) : (
                <span className={emailFocus === false && emailValue.length === 0 ? classes.errorText : ''}>
                  {emptyField}
                </span>
              )}
            </span>
          )}

          <span className={classes.auth_form__emailManual}>
            На это email будет отправлено письмо с инструкциями по восстановлению пароля
          </span>

          <button className={classes.auth_form__submit} type='submit' disabled={!isValid}>
            восстановить
          </button>
          <div className={classes.auth_form_registrationBlock}>
            <span>Нет учётной записи?</span>
            <NavLink className={classes.auth_form__registration} to='/registration'>
              Регистрация <img src={arrow} alt='arrow' />
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
