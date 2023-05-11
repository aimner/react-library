import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FormValues } from '../../../types/forms-type';
import { validateFunc, validateLogin } from '../../../validation-auth/functions';
import { emptyField, loginRegExp } from '../../../validation-auth/variables';
import { Input } from '../../input';

import classes from './login.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
};

export const Login: React.FC<PropsType> = ({ register, errors, value, setValue, startChangeProfile }) => {
  const [loginFocus, setLoginFocus] = useState<boolean>();

  const [loginValue, setLoginValue] = useState('');

  const location = useLocation();

  const splitLocation = location.pathname.split('/');

  const inputName = () => {
    if (splitLocation.at(-1) === 'profile') return 'login';

    return 'username';
  };

  useEffect(() => {
    const oldValue = value;

    if (startChangeProfile && value) {
      setValue('login', oldValue!);
      setLoginValue(oldValue!);
    }
  }, [value, startChangeProfile]);


  return (
    <>
      <Input
        classname={classes}
        errors={errors}
        inputId='login'
        inputName={inputName()}
        inputType='text'
        inputValue={loginValue}
        label='Придумайте логин для входа'
        register={register}
        setInputFocus={setLoginFocus}
        setInputValue={setLoginValue}
        setValue={setValue}
        startChangeProfile={startChangeProfile}
        value={loginValue}
        patternValue={loginRegExp}
        required={true}
      />
      {loginValue.length > 0 || loginFocus === true ? (
        <span
          className={cx({
            login__loginManual: true,
            errorText: !validateFunc(loginFocus, loginRegExp, loginValue),
          })}

        >
          <span> Используйте для логина</span>
          <span className={validateLogin('str', loginValue, classes)}> латинский алфавит</span>
          <span> и</span>
          <span className={validateLogin('num', loginValue, classes)}> цифры</span>
        </span>
      ) : (
        <span
          className={cx({
            login__loginManual: true,
            errorText: errors[inputName()],
          })}
      
        >
          {emptyField}
        </span>
      )}
    </>
  );
};
