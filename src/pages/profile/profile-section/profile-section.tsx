import camera from '../../../assets/img/profile/camera.svg';
import no_avatar from '../../../assets/img/profile/no_avatar.svg';

import { ProfileForm } from './profile-form/profile-form';
import { useProfileData } from './hooks';
import { ProfileBookedBook } from './profile-booked-book';
import { ProfileDeliveryBook } from './profile-delivery-book';
import { ProfileSlider } from './profile-slider';

import classes from './profile-section.module.scss';

export const ProfileSection = () => {
  const { uploadFile, profile } = useProfileData();

  return (
    <section className={classes.profile}>
      <div className={classes['profile-firstBlock']} >
        <div className={classes['profile-firstBlock-avatarBlock']}>
          <img
            src={profile?.avatar || no_avatar}
            alt='avatar'
            className={classes.profile__avatar}
            loading='lazy'
          />
          <label htmlFor='upload'>
            <img src={camera} alt='camera' />
          </label>
          <input
            type='file'
            id='upload'
            onChange={(e) => {
              uploadFile(e);
            }}
          />
        </div>
        <div className={classes['profile-firstBlock-titleBlock']}>
          <h2 className={classes.profile__firstName}>{profile?.firstName}</h2>
          <h2 className={classes.profile__lastName}>{profile?.lastName}</h2>
        </div>
      </div>
      <ProfileForm profile={profile} />
      <ProfileBookedBook profile={profile} bookingBlock={true} />
      <ProfileDeliveryBook profile={profile} bookingBlock={false} />
      <ProfileSlider profile={profile} />
    </section>
  );
};
