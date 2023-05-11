import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import { Authors } from '../../components/authors';
import { Nav } from '../../components/nav';
import { Arrow } from '../../components/nav/arrow';
import { RateBook } from '../../components/rate-book';
import { StarsList } from '../../components/stars-list';
import { buttonClass, buttonText, fullUrl } from '../../functions/functions';
import { ShowSideBarType } from '../app';

import { Сommentary } from './comment';
import { useBookPage } from './hooks';

import classes from './book-page.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';

type PropsType = {
  showSideBar: ShowSideBarType;
  setShowSideBar: React.Dispatch<React.SetStateAction<ShowSideBarType>>;
};

const cx = classNames.bind(classes);

export const BookPage: React.FC<PropsType> = ({ showSideBar, setShowSideBar }) => {
  const {
    activeCategory,
    activeImg,
    book,
    detailInformationArr,

    openComments,
    openCommentsBlock,
    setActiveImg,
    setOpenComments,
    splitLocation,

    userId,
    wasComment,
    openBookingMenu,
    rateTheBook,
  } = useBookPage();

  return (
    <>
      <main className={classes.main}>
        <div className={classes.way_block}>
          <div className={classes.container}>
            <span>
              <Link to={`/books/${splitLocation.at(-2)}`}>{activeCategory || 'Все книги'}</Link>
              <span className={classes.vector} /> <span>{book?.title}</span>
            </span>
          </div>
        </div>

        <div className={classes.container}>
          <Nav showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

          {book && (
            <div className={classes.book}>
              <div className={classes.book_description}>
                <div className={classes.book_description__img}>
                  <img
                    src={activeImg}
                    loading='lazy'
                    alt='book'
                    className={cx({
                      book_description__img___hide: book.images && book.images.length > 1,
                    })}
                  />

                  {/* MOBILE SWIPER */}
                  {book.images && book.images.length > 1 && (
                    <div className={classes.swiperMobile}>
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        centeredSlides={false}
                        pagination={true}
                        modules={[Pagination]}
                        className={classes.swiperMobile_block}
                      >
                        {book.images.map(({ url }) => (
                          <SwiperSlide style={{ width: '65px', height: '150px' }} key={uuidv4()}>
                            <img
                              onClick={() => setActiveImg(fullUrl(url))}
                              src={fullUrl(url)}
                              alt='book'
                              className={classes.swiperMobile_block__img}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}

                  {/* DESKTOP SWIPER */}
                  {book.images && book.images.length > 1 && (
                    <div className={classes.swiper}>
                      <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        centeredSlides={false}
                        modules={[Pagination]}
                        className={classes.swiper_block}
                        watchSlidesProgress={true}
                      >
                        {book.images?.map(({ url }) => (
                          <SwiperSlide style={{ width: '65px' }} key={uuidv4()}>
                            <img
                              onClick={() => setActiveImg(fullUrl(url))}
                              className={cx({
                                swiper_block__img___active: fullUrl(url) === activeImg,
                                swiper_block__img: fullUrl(url) !== activeImg,
                              })}
                              src={fullUrl(url)}
                              alt='book'
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>

                <div className={classes.book_description_first}>
                  <h2>{book?.title}</h2>
                  {book.authors && (
                    <Authors
                      authors={book.authors}
                      issueYear={book.issueYear}
                      classname={classes.book_description_first__author}
                    />
                  )}
                  <button
                    type='button'
                    className={buttonClass(book.booking?.order, classes, book.delivery?.dateHandedTo)}
                    disabled={(!!book.booking && book.booking?.customerId !== userId) || !!book.delivery}
                    onClick={openBookingMenu}
                  >
                    {buttonText(book.booking?.order, book.delivery?.dateHandedTo)}
                  </button>
                </div>

                <div className={classes.book_description_second}>
                  <h3 className={classes.book__sectionTitle}>О книге</h3>
                  <p>{book.description}</p>
                </div>
              </div>
              <div className={classes.book_raiting}>
                <h3 className={classes.book__sectionTitle}>Рейтинг</h3>
                <div className={classes.book_raiting_block}>
                  {book.rating && book.rating >= 0 ? (
                    <StarsList rating={book?.rating} classname={classes.book_raiting_block__list} />
                  ) : (
                    ''
                  )}
                  {book.rating ? <span>{book.rating}</span> : <span>ещё нет оценок</span>}
                </div>
              </div>
              <div className={classes.book_detailInformation}>
                <h3 className={classes.book__sectionTitle}>Подробная информация</h3>
                <ul>
                  {detailInformationArr.map((item) => (
                    <li key={uuidv4()}>
                      {item.value && (
                        <>
                          <span>{item.property}</span>
                          <span>{item.value}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={classes.book_comments}>
                <h3 className={classes.book__sectionTitle}>
                  Отзывы
                  <span className={classes.book_comments__quantity}>{book.comments && book.comments.length}</span>
                  <span onClick={() => setOpenComments((value) => !value)}>
                    <Arrow open={openComments} />
                  </span>
                </h3>
                {book.comments && (
                  <ul className={classes.book_comments_list} style={openComments ? {} : { display: 'none' }}>
                    {book.comments.map((item) => (
                      <Сommentary key={uuidv4()} {...item} />
                    ))}
                  </ul>
                )}

                <button
                  type='button'
                  className={cx({
                    book_comments__button: true,
                    buttonChange: wasComment(),
                  })}
                  onClick={rateTheBook}
                >
                  {wasComment() ? 'изменить оценку' : 'оценить книгу'}
                </button>
              </div>
            </div>
          )}
        </div>

        {openCommentsBlock && <RateBook />}
      </main>
    </>
  );
};
