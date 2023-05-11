import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames/bind';

import { setDataAttr } from '../../../functions/functions';
import { FormValues } from '../../../types/forms-type';
import { changeBorderColor, validateFunc } from '../../../validation-auth/functions';
import { emptyField, phoneRegExp } from '../../../validation-auth/variables';

import classes from './phone.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
  required: boolean;
};

export const Phone: React.FC<PropsType> = ({ register, setValue, value, startChangeProfile, required }) => {
  const [phoneFocus, setPhoneFocus] = useState<boolean>();
  const [phoneValue, setPhoneValue] = useState('');

  useEffect(() => {
    const oldValue = value;

    if (startChangeProfile && value) {
      setValue('phone', oldValue!);
      setPhoneValue(oldValue!);
    }
  }, [startChangeProfile, value]);

  return (
    <>
      <div
        className={cx({
          telephone: true,
          input_marginBottom36: phoneFocus === undefined,
        })}
      >
        <MaskedInput
          data-req={setDataAttr(phoneValue)}
          mask={[
            '+',
            '3',
            '7',
            '5',
            ' ',
            '(',
            /2|4|3/,
            /9|5|4|3/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
          ]}
          value={phoneValue}
          className={changeBorderColor(phoneFocus, phoneRegExp, phoneValue, classes, startChangeProfile)}
          guide={true}
          id='phone'
          onFocus={() => setPhoneFocus(true)}
          keepCharPositions={true}
          placeholderChar='x'
          {...register('phone', {
            disabled: startChangeProfile,
            required,
            pattern: { value: phoneRegExp, message: 'ошибка' },
            onChange: (e) => setPhoneValue(e.target.value),
            onBlur: (e) => {
              setPhoneFocus(false);
              setValue('phone', e.target.value);
            },
          })}
        />
        <label htmlFor='phone'>Номер телефона</label>
      </div>

      {phoneFocus === undefined || (
        <span className={classes.telephone__telephoneManual}>
          {phoneValue.length > 0 ? (
            <span
      
              className={cx({
                errorText: !validateFunc(phoneFocus, phoneRegExp, phoneValue),
              })}
            >
              В формате +375 (xx) xxx-xx-xx
            </span>
          ) : (
            <span
      
              className={cx({
                errorText: phoneFocus === false && phoneValue.length === 0,
              })}
            >
              {startChangeProfile === undefined && emptyField}
            </span>
          )}
        </span>
      )}
    </>
  );
};
