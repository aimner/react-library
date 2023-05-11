import React, { useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames/bind';

import eye from '../../assets/img/auth/Eye.png';
import eyeClosed from '../../assets/img/auth/EyeClosed.png';
import validTrue from '../../assets/img/auth/validTrue.png';
import { setDataAttr } from '../../functions/functions';
import { FormValues, InputNames } from '../../types/forms-type';
import { emptyField } from '../../validation-auth/variables';

type PropsType = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  value?: string;
  setValue: UseFormSetValue<FormValues>;
  startChangeProfile?: boolean;
  inputType: string;
  inputId: string;
  inputValue: string;
  setInputFocus: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  inputName: InputNames;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  classname: Record<string, string>;
  patternValue: RegExp;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  marginBottom?: 36 | 68;
  inputFocus?: boolean;
  required: boolean
};

export const Input: React.FC<PropsType> = ({
  register,
  errors,
  value,
  setValue,
  startChangeProfile,
  inputType,
  inputId,
  inputValue,
  setInputFocus,
  inputName,
  setInputValue,
  label,
  classname,
  patternValue,
  setShowPassword,
  showPassword,
  marginBottom,
  inputFocus,
  required
}) => {
  const cx = classNames.bind(classname);

  useEffect(() => {
    const oldValue = value;

    if (startChangeProfile && value) {
      setValue(inputName, oldValue!);
      setInputValue(oldValue!);
    }
  }, [value, startChangeProfile]);

  const setMargin = (n: number) => {
    if (inputId === 'email') return inputFocus === undefined;
    if (marginBottom === n) return inputFocus === undefined || inputValue.length;

    return false;
  };


  return (
    <>
      <div
        className={cx({
          input: true,
          errorBorder: errors[inputName],
          input_marginBottom36: setMargin(36),
          input_marginBottom68: setMargin(68),
        })}
      >
        <input
          type={inputType}
          id={inputId}
          data-req={setDataAttr(inputValue)}
          onFocus={() => setInputFocus(true)}
          {...register(inputName, {
            disabled: startChangeProfile,
            required,
            pattern: { value: patternValue, message: 'ошибка' },
            onChange: (e) => setInputValue(e.target.value),
            onBlur: () => setInputFocus(false),
          })}
        />
        {/* IN PASSWORD IN REGISTRATION */}
        {inputId === 'password' && (startChangeProfile === undefined || !startChangeProfile)
          ? patternValue.test(inputValue) && <img src={validTrue} alt='validation true'  />
          : null}

        <label htmlFor={inputId}>{label}</label>

        {/* IN PASSWORD */}
        {(inputId === 'password' || inputId === 'password-auth' || inputId === 'passwordConfirmation') &&
        (startChangeProfile === undefined || !startChangeProfile)
          ? !!inputValue.length && (
              <img
                src={showPassword ? eyeClosed : eye}
                alt='showPassword'
                onClick={() => setShowPassword!((value) => !value)}
            
              />
            )
          : null}
      </div>
    </>
  );
};
