import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormValues } from '../../../types/forms-type';
import { emptyField, nameRegExp } from '../../../validation-auth/variables';
import { Input } from '../../input';

import classes from './last-name.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
  required: boolean
};

export const LastName: React.FC<PropsType> = ({ register, setValue, value, startChangeProfile, errors, required }) => {
  const [lastNameValue, setLastNameValue] = useState('');
  const [lastNameFocus, setLastNameFocus] = useState<boolean>();

  useEffect(() => {
    const oldValue = value;

    if (startChangeProfile && value) {
      setValue('lastName', oldValue!);
      setLastNameValue(oldValue!);
    }
  }, [startChangeProfile, value]);

  return (
    <>
      <Input
        classname={classes}
        errors={errors}
        inputId='lastName'
        inputName='lastName'
        inputType='text'
        inputValue={lastNameValue}
        label='Фамилия'
        register={register}
        setInputFocus={setLastNameFocus}
        setInputValue={setLastNameValue}
        setValue={setValue}
        startChangeProfile={startChangeProfile}
        value={lastNameValue}
        patternValue={nameRegExp}
        marginBottom={68}
        inputFocus={lastNameFocus}
        required={required}
      />

      {lastNameFocus === undefined || lastNameValue.length > 0 || (
        <span
          className={cx({
            input__secondNameManual: true,
            errorText: lastNameFocus === false && lastNameValue.length === 0,
          })}

        >
          {startChangeProfile === undefined && emptyField}
        </span>
      )}
    </>
  );
};
