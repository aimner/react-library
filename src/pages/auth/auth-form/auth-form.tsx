import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';

import arrow from '../../../assets/img/auth/arrow.svg';
import { Input } from '../../../components/input';

import { useAppDispatch } from '../../../hooks/hooks';
import { fetchAuth } from '../../../store/features/auth/thunks';
import { Authorization } from '../../../types/auth-types';
import { FormValues } from '../../../types/forms-type';
import { emptyField, nameRegExp } from '../../../validation-auth/variables';

import classes from './auth-form.module.scss';

export const AuthForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({ mode: 'all' });

  const dispatch = useAppDispatch();

  const [errorStatus, setErrorStatus] = useState<number>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [loginFocus, setLoginFocus] = useState<boolean>();
  const [passwordFocus, setPasswordFocus] = useState<boolean>();

  const onSubmit = (data: Authorization): void => {
    dispatch(fetchAuth(data))
      .unwrap()
      .catch((value: AxiosError) => {
        setErrorStatus(value.response?.status);
      });
  };

  // ERROR BLOCK
  if (errorStatus && errorStatus !== 400) {
    return (
      <div className={classes.authError} >
        <h3 className={classes.auth__title}>Вход не выполнен</h3>
        <p>Что-то пошло не так. Попробуйте ещё раз</p>
        <button
          className={classes.auth_form__submit}
          type='button'
          onClick={() => onSubmit({ identifier: loginValue, password: passwordValue })}
        >
          повторить
        </button>
      </div>
    );
  }

  // AUTH FORM
  return (
    <div className={classes.auth}>
      <h3 className={classes.auth__title}>Вход в личный кабинет</h3>
      <form className={classes.auth_form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          classname={classes}
          errors={errors}
          inputId='login'
          inputName='identifier'
          inputType='text'
          inputValue={loginValue}
          label='Логин'
          register={register}
          setInputFocus={setLoginFocus}
          setInputValue={setLoginValue}
          setValue={setValue}
          patternValue={nameRegExp}
          inputFocus={loginFocus}
          required={true}
        />

        <span className={classes.auth_form__loginManual___error}>
          {loginFocus === false && loginValue.length === 0 ? emptyField : ''}
        </span>

        <Input
          classname={classes}
          errors={errors}
          inputId='password-auth'
          inputName='password'
          inputType={showPassword ? 'text' : 'password'}
          inputValue={passwordValue}
          label='Пароль'
          register={register}
          setInputFocus={setPasswordFocus}
          setInputValue={setPasswordValue}
          setValue={setValue}
          patternValue={nameRegExp}
          inputFocus={passwordFocus}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          required={true}
        />

        <span className={classes.auth_form__passwordManual___error} >
          {errors.password ? emptyField : null}
        </span>

        {errorStatus === 400 && (
          <span className={classes.auth_form__error} >
            Неверный логин или пароль!
          </span>
        )}
        <NavLink to='/forgot-pass' className={classes.auth_form__forgotPassword}>
          {errorStatus === 400 ? 'Восстановить?' : 'Забыли логин или пароль?'}
        </NavLink>
        <button className={classes.auth_form__submit} type='submit' disabled={!isValid}>
          вход
        </button>
        <div className={classes.auth_form_registrationBlock}>
          <span>Нет учётной записи?</span>
          <NavLink className={classes.auth_form__registration} to='/registration'>
            Регистрация <img src={arrow} alt='arrow' />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
