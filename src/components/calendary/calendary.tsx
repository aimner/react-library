import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import {
  bookingDate,
  bookingDateClass,
  disabledButton,
  generateWeeksOfTheMonth,
  isToday,
  isTomorrow,
  months,
  translateForRussianDays,
  translateForRussianMonth,
  weekendClass,
} from './functions';
import { useCalendary } from './hooks';

import classes from './calendary.module.scss';

const cx = classNames.bind(classes);

export const Calendary = () => {
  const {
    booking,
    bookingData,
    cancelBooking,
    currentDay,
    firstDayOfFirstWeekOfMonth,
    onCnahgeBookingBook,
    onSendBookingBook,
    openSelect,
    selectedDate,
    userId,
    setBookingData,
    setOpenSelect,
    setSelectedDate,
    closeModal,
  } = useCalendary();

  return (
    <div
      className={classes.outer}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className={classes.outer_block}>
        <h2>{booking?.customerId ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}</h2>
        <button className={classes.closeButton} type='button' onClick={() => closeModal()}>
          {null}
        </button>

        <div className={classes.calendary}>
          <div className={classes.calendary_control}>
            <div className={classes.calendary_control_openSelectBlock} onClick={() => setOpenSelect((v) => !v)}>
              <h3 className={classes.calendary__currentMonth}>{translateForRussianMonth(selectedDate)}</h3>
              <div className={classes.calendary_control__openButton} />
            </div>

            {/* MENU FOR CHOOSE MONTH */}
            {openSelect && (
              <div className={classes.calendary_selectList}>
                {months.map((item, index) => (
                  <div
                    key={uuidv4()}
                    onClick={() => {
                      setSelectedDate((date) => date.set('month', index));
                      setOpenSelect(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className={classes.calendary_control_buttons}>
              <div
                className={classes.calendary_control_buttons__1}
                onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
              />
              <div
                className={classes.calendary_control_buttons__2}
                onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
              />
            </div>
          </div>
          <div className={classes.calendary_dates}>
            <div className={classes.calendary_dates_days}>
              {generateWeeksOfTheMonth(firstDayOfFirstWeekOfMonth)[0].map((day) => (
                <div className={classes.calendary_dates_days__day} key={uuidv4()}>
                  {translateForRussianDays(dayjs(day).day())}
                </div>
              ))}
            </div>
            {generateWeeksOfTheMonth(firstDayOfFirstWeekOfMonth).map((week) => (
              <div key={uuidv4()} className={classes.calendary_dates_numbers}>
                {week.map((day) => {
                  return (
                    <button
                 
                      type='button'
                      disabled={disabledButton(day, currentDay, bookingData)}
                      key={uuidv4()}
                      onClick={() => {
                        bookingDate(day, currentDay, bookingData, setBookingData);
                      }}
                      className={cx({
                        calendary_dates_numbers__number: true,
                        calendary_dates_numbers__booking: bookingDateClass(day, bookingData),
                        calendary_dates_numbers__currentNumber: isToday(day, currentDay),
                        calendary_dates_numbers__nextNumber: isTomorrow(day, currentDay),
                        calendary_dates_numbers__weekend: weekendClass(day, currentDay),
                      })}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <button
          type='button'
          className={classes.submit}
   
          disabled={!bookingData || bookingData === booking?.dateOrder}
          onClick={() => {
            userId === booking?.customerId ? onCnahgeBookingBook() : onSendBookingBook();
          }}
        >
          забронировать
        </button>
        {booking?.customerId && (
          <button
  
            type='button'
            className={classes.cancelSubmit}
            onClick={cancelBooking}
          >
            отменить бронь
          </button>
        )}
      </div>
    </div>
  );
};
