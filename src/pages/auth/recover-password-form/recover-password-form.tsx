import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { Input } from '../../../components/input';

import { useAppDispatch } from '../../../hooks/hooks';
import { fetchRecoveryPassword } from '../../../store/features/auth/thunks';
import { RecoveryPassword } from '../../../types/auth-types';
import { FormValues } from '../../../types/forms-type';
import { validateFunc, validatePassword } from '../../../validation-auth/functions';
import { emptyField, passwordRegExp } from '../../../validation-auth/variables';

import classes from './recover-password-form.module.scss';

type PropsType = {
  code: string;
};

const cx = classNames.bind(classes);

export const RecoverPasswordForm: React.FC<PropsType> = ({ code }) => {
  const dispatch = useAppDispatch();

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordValueRepeat, setPasswordValueRepeat] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const [passwordFocus, setPasswordFocus] = useState<boolean>();
  const [passwordFocusRepeat, setPasswordFocusRepeat] = useState<boolean>();

  const [errorStatus, setErrorStatus] = useState<number>();

  const [validForm, setValidForm] = useState(true);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const sendRequest = (data: Omit<RecoveryPassword, 'code'>) => {
    dispatch(fetchRecoveryPassword({ ...data, code }))
      .unwrap()
      .then(() => setErrorStatus(200))
      .catch((value) => setErrorStatus(value));
  };

  const onSubmit = (data: Omit<RecoveryPassword, 'code'>) => {
    sendRequest(data);
  };

  const validateRepeatPassword = () => {
    if (!passwordFocusRepeat) return passwordValue === passwordValueRepeat;

    return true;
  };

  // SUCCESSFULLY OR WITH AN ERROR
  if (errorStatus) {
    return (
      <div className={classes.authError}>
        <h3 className={classes.auth__title}>
          {errorStatus === 200 ? 'Новые данные сохранены' : 'Данные не сохранились'}
        </h3>
        <p>
          {errorStatus === 200
            ? 'Зайдите в личный кабинет, используя свои логин и новый пароль'
            : 'Что-то пошло не так. Попробуйте ещё раз'}
        </p>
        {errorStatus === 200 ? (
          <button type='button' className={classes.auth_form__submit}>
            <NavLink to='/auth'>вход</NavLink>
          </button>
        ) : (
          <button
            className={classes.auth_form__submit}
            type='button'
            onClick={() => sendRequest({ password: passwordValue, passwordConfirmation: passwordValueRepeat })}
          >
            повторить
          </button>
        )}
      </div>
    );
  }

  // RECOVER FORM
  return (
    <div className={classes.auth}>
      <h3 className={classes.auth__title}>Восстановление пароля</h3>
      <form className={classes.auth_form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          classname={classes}
          errors={errors}
          inputId='password'
          inputName='password'
          inputType={showPassword ? 'text' : 'password'}
          inputValue={passwordValue}
          label='Пароль'
          register={register}
          setInputFocus={setPasswordFocus}
          setInputValue={setPasswordValue}
          setValue={setValue}
          value={passwordValue}
          patternValue={passwordRegExp}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          required={true}
        />

        {passwordValue.length > 0 || passwordFocus ? (
          <span
            className={cx({
              auth_form__passwordManual: true,
              errorText: !validateFunc(passwordFocus, passwordRegExp, passwordValue),
            })}
         
          >
            Пароль <span className={validatePassword('leng', passwordValue, classes)}>не менее 8 символов</span>,{' '}
            <span className={validatePassword('str', passwordValue, classes)}>с заглавной буквой</span>{' '}
            <span className={validatePassword('num', passwordValue, classes)}>и цифрой</span>
          </span>
        ) : (
          <span
            className={cx({
              auth_form__passwordManual: true,
              errorText: errors.password,
            })}
      
          >
            {emptyField}
          </span>
        )}

        <Input
          classname={classes}
          errors={errors}
          inputId='passwordConfirmation'
          inputName='passwordConfirmation'
          inputType={showPasswordRepeat ? 'text' : 'password'}
          inputValue={passwordValueRepeat}
          label='Пароль'
          register={register}
          setInputFocus={setPasswordFocusRepeat}
          setInputValue={setPasswordValueRepeat}
          setValue={setValue}
          value={passwordValueRepeat}
          patternValue={passwordRegExp}
          setShowPassword={setShowPasswordRepeat}
          showPassword={showPasswordRepeat}
          required={true}
        />
        {passwordValueRepeat.length ? (
          <span
            className={cx({
              auth_form__passwordManual: true,
              errorText: !validateRepeatPassword(),
            })}
     
          >
            {validateRepeatPassword() || 'Пароли не совпадают'}
          </span>
        ) : (
          <span
            className={cx({
              auth_form__passwordManual: true,
              errorText: errors.passwordConfirmation,
            })}
  
          >
            {emptyField}
          </span>
        )}

        <button className={classes.auth_form__submit} type='submit' disabled={validForm && !isValid}>
          сохранить изменения
        </button>
        <p>После сохранения войдите в библиотеку, используя новый пароль</p>
      </form>
    </div>
  );
};
