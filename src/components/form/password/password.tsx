import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormValues } from '../../../types/forms-type';
import { validateFunc, validatePassword } from '../../../validation-auth/functions';
import { emptyField, passwordRegExp } from '../../../validation-auth/variables';
import { Input } from '../../input';

import classes from './password.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;

  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
};

export const Password: React.FC<PropsType> = ({ errors, register, setValue, startChangeProfile }) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>();

  useEffect(() => {
    const oldValue = '123';

    if (startChangeProfile) {
      setValue('password', oldValue!);
      setPasswordValue(oldValue!);
    }
  }, [startChangeProfile]);


  return (
    <>
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
        startChangeProfile={startChangeProfile}
        value={passwordValue}
        patternValue={passwordRegExp}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        required={true}
      />
      {passwordValue.length > 0 || passwordFocus ? (
        <span
          className={cx({
            input__passwordManual: true,
            errorText: !validateFunc(passwordFocus, passwordRegExp, passwordValue),
          })}

        >
          Пароль <span className={validatePassword('leng', passwordValue, classes)}>не менее 8 символов</span>,
          <span className={validatePassword('str', passwordValue, classes)}> с заглавной буквой</span>
          <span className={validatePassword('num', passwordValue, classes)}> и цифрой</span>
        </span>
      ) : (
        <span
          className={cx({
            input__passwordManual: true,
            errorText: errors.password,
          })}
       
        >
          {emptyField}
        </span>
      )}
    </>
  );
};
