import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { AxiosError } from 'axios';

import arrow from '../../../assets/img/auth/arrow.svg';
import { Email } from '../../../components/form/email';
import { FirstName } from '../../../components/form/first-name';
import { LastName } from '../../../components/form/last-name';
import { Login } from '../../../components/form/login';
import { Password } from '../../../components/form/password';
import { Phone } from '../../../components/form/phone';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchRegistration } from '../../../store/features/auth/thunks';
import { Registration, RegistrationRequest } from '../../../types/auth-types';
import { FormValues } from '../../../types/forms-type';

import classes from './registration-form.module.scss';

export function RegistrationForm() {
  const [formStep, setFormStep] = useState(1);

  const [errorStatus, setErrorStatus] = useState<number | null>();

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const changeButtonText = () => {
    switch (formStep) {
      case 1:
        return 'следующий шаг';
      case 2:
        return 'последний шаг';
      case 3:
        return 'зарегистрироваться';
      default:
        return 'следующий шаг';
    }
  };

  const onSubmit = (data: Registration): void => {
    if (formStep < 3) setFormStep((step) => step + 1);

    if (formStep === 3) {
      const values: RegistrationRequest = {
        ...data,
      };

      dispatch(fetchRegistration(values))
        .unwrap()
        .then(() => {
          setErrorStatus(200);
        })
        .catch((value: AxiosError) => {
          if (value.response) setErrorStatus(value.response.status);
        });
    }
  };

  const backToRegistr = () => {
    setErrorStatus(null);
    setFormStep(1);
    reset();
  };

  // ERROR
  if (errorStatus) {
    return (
      <>
        {errorStatus !== 200 ? (
          <div className={classes.authError}>
            <h3 className={classes.auth__title}>Данные не сохранились</h3>
            <p>
              {errorStatus === 400
                ? 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
                : 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'}
            </p>
            <button className={classes.auth_form__submit} onClick={() => backToRegistr()} type='button'>
              {errorStatus === 400 ? 'назад к регистрации' : 'повторить'}
            </button>
          </div>
        ) : (
          <div className={classes.authError}>
            <h3 className={classes.auth__title}>Регистрация успешна</h3>
            <p>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
            <button type='button' className={classes.auth_form__submit}>
              <NavLink to='/auth'>вход</NavLink>
            </button>
          </div>
        )}
      </>
    );
  }

  // REGISTRATION BLOCK
  return (
    <div className={classes.auth}>
      <h3 className={classes.auth__title}>Регистрация</h3>
      <span className={classes.auth__step}>{formStep} шаг из 3</span>
      <form className={classes.auth_form} onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1 */}
        {formStep === 1 && (
          <>
            <Login register={register} errors={errors} setValue={setValue} />
            <Password register={register} errors={errors} setValue={setValue} />
          </>
        )}

        {/* STEP 2 */}
        {formStep === 2 && (
          <>
            <FirstName register={register} errors={errors} setValue={setValue} required={true}/>
            <LastName register={register} errors={errors} setValue={setValue} required={true}/>
          </>
        )}

        {/* STEP 3 */}
        {formStep === 3 && (
          <>
            <Phone register={register} errors={errors} setValue={setValue} required={true}/>
            <Email register={register} errors={errors} setValue={setValue} />
          </>
        )}

        <button className={classes.auth_form__submit} type='submit' disabled={!isValid}>
          {changeButtonText()}
        </button>
        <div className={classes.auth_form_registrationBlock}>
          <span>Есть учётная запись?</span>
          <NavLink className={classes.auth_form__registration} to='/auth'>
            войти <img src={arrow} alt='arrow' />
          </NavLink>
        </div>
      </form>
    </div>
  );
}
