import React from 'react';
import classNames from 'classnames/bind';

import { Email } from '../../../../components/form/email';
import { FirstName } from '../../../../components/form/first-name';
import { LastName } from '../../../../components/form/last-name';
import { Login } from '../../../../components/form/login';
import { Password } from '../../../../components/form/password';
import { Phone } from '../../../../components/form/phone';
import { Profile } from '../../../../types/profile-types';

import { useProfileForm } from './hooks';

import classes from './profile-form.module.scss';

const cx = classNames.bind(classes);

type PropsType = {
  profile: Profile | null;
};

export const ProfileForm: React.FC<PropsType> = ({ profile }) => {
  const { username, firstName, lastName, email, phone } = profile || {};

  const { blockChangeProfile, errors, handleSubmit, isValid, onSubmit, register, setValue, setBlockChangeProfile } =
    useProfileForm(profile);

  return (
    <div className={classes.profileChangeBlock}>
      <h3>Учётные данные</h3>
      <p>Здесь вы можете отредактировать информацию о себе</p>
      <form className={cx({ form: true, form__notActive: blockChangeProfile })} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['form-item']}>
          <Login
            register={register}
            errors={errors}
            value={username}
            setValue={setValue}
            startChangeProfile={blockChangeProfile}
          />
        </div>
        <div className={classes['form-item']}>
          <Password register={register} errors={errors} setValue={setValue} startChangeProfile={blockChangeProfile} />
        </div>
        <div className={classes['form-item']}>
          <FirstName
            register={register}
            errors={errors}
            value={firstName}
            setValue={setValue}
            startChangeProfile={blockChangeProfile}
            required={false}
          />
        </div>
        <div className={classes['form-item']}>
          <LastName
            register={register}
            errors={errors}
            value={lastName}
            setValue={setValue}
            startChangeProfile={blockChangeProfile}
            required={false}
          />
        </div>
        <div className={classes['form-item']}>
          <Phone
            register={register}
            errors={errors}
            value={phone}
            setValue={setValue}
            startChangeProfile={blockChangeProfile}
            required={false}
          />
        </div>
        <div className={classes['form-item']}>
          <Email
            register={register}
            errors={errors}
            value={email}
            setValue={setValue}
            startChangeProfile={blockChangeProfile}
          />
        </div>
        <button
          type='button'
          onClick={() => setBlockChangeProfile((v) => !v)}
          className={classes.buttonChange}
   
        >
          Редактировать
        </button>
        <button
          type='submit'
          disabled={!isValid || blockChangeProfile}
          className={classes.button}
         
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
