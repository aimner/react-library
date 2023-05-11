import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormValues } from '../../../types/forms-type';
import { validateFunc } from '../../../validation-auth/functions';
import { emailRegExp, emptyField } from '../../../validation-auth/variables';
import { Input } from '../../input';

import classes from './email.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
};

export const Email: React.FC<PropsType> = ({ register, value, setValue, startChangeProfile, errors }) => {
  const [emailValue, setEmailValue] = useState('');
  const [emailFocus, setEmailFocus] = useState<boolean>();

  useEffect(() => {
    const oldValue = value;

    if (startChangeProfile && value) {
      setValue('email', oldValue!);
      setEmailValue(oldValue!);
    }
  }, [startChangeProfile, value]);

  return (
    <>
      <Input
        classname={classes}
        errors={errors}
        inputId='email'
        inputName='email'
        inputType='text'
        inputValue={emailValue}
        label='E-mail'
        register={register}
        setInputFocus={setEmailFocus}
        setInputValue={setEmailValue}
        setValue={setValue}
        startChangeProfile={startChangeProfile}
        value={emailValue}
        patternValue={emailRegExp}
        marginBottom={68}
        inputFocus={emailFocus}
        required={true}
      />
      {emailFocus === undefined || (
        <span className={classes.input__emailManual}>
          {emailValue.length > 0 ? (
            <span

              className={cx({
                errorText: !validateFunc(emailFocus, emailRegExp, emailValue),
              })}
            >
              Введите корректный e-mail
            </span>
          ) : (
            <span
   
              className={cx({
                errorText: emailFocus === false && emailValue.length === 0,
              })}
            >
              {emptyField}
            </span>
          )}
        </span>
      )}
    </>
  );
};
