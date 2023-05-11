import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import { Profile } from '../../../../types/profile-types';
import { Book } from '../../../main/main-section/books/book';
import { ProfileEmpty } from '../profile-empty';

import classes from './profile-slider.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';

type PropsType = {
  profile: Profile | null;
};

export const ProfileSlider: React.FC<PropsType> = ({ profile }) => {
  const { history, comments } = profile || {};

  return (
    <div className={classes.swiper}>
      <h3>История</h3>
      <p>Список прочитанных книг</p>
      {history?.books?.length ? (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={23}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={classes.sliderProfile}
          watchSlidesProgress={true}
        >
          {history?.books!.map((item) => (
            <SwiperSlide className={classes.slideProfile} key={uuidv4()}>
              <Book
                active={true}
                authors={item.authors}
                booking={null}
                title={item.title}
                id={item.id}
                delivery={null}
                image={{ url: item.image || '' }}
                rating={item.rating}
                issueYear={item.issueYear || ''}
                comments={comments}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ProfileEmpty
          text='Вы не читали книг 
        из нашей библиотеки '
        />
      )}
    </div>
  );
};
