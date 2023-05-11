import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormValues } from '../../../types/forms-type';
import { emptyField, nameRegExp } from '../../../validation-auth/variables';
import { Input } from '../../input';

import classes from './first-name.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
  required: boolean
};

export const FirstName: React.FC<PropsType> = ({ register, value, setValue, startChangeProfile, errors, required }) => {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [firstNameFocus, setFirstNameFocus] = useState<boolean>();

  useEffect(() => {
    const oldValue = value;

    if (value) {
      setFirstNameValue(oldValue!);
      setValue('firstName', oldValue!);
    }
  }, [value, startChangeProfile]);

  return (
    <>
      <Input
        classname={classes}
        errors={errors}
        inputId='firstName'
        inputName='firstName'
        inputType='text'
        inputValue={firstNameValue}
        label='Имя'
        register={register}
        setInputFocus={setFirstNameFocus}
        setInputValue={setFirstNameValue}
        setValue={setValue}
        startChangeProfile={startChangeProfile}
        value={firstNameValue}
        patternValue={nameRegExp}
        marginBottom={36}
        inputFocus={firstNameFocus}
        required={required}
      />

      {firstNameFocus === undefined || firstNameValue.length > 0 || (
        <span
   
          className={cx({
            input__firstNameManual: true,
            errorText: firstNameFocus === false && firstNameValue.length === 0,
          })}
        >
          {startChangeProfile === undefined && emptyField}
        </span>
      )}
    </>
  );
};
