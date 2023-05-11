import dayjs, { Dayjs } from 'dayjs';

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const generateFirstDayOfEachWeek = (day: Dayjs): Dayjs[] => {
  const dates: Dayjs[] = [day];

  for (let i = 1; i < 5; i++) {
    const date = day.clone().add(i, 'week');

    dates.push(date);
  }

  return dates;
};

export const generateWeek = (day: Dayjs): Date[] => {
  const dates: Date[] = [];

  for (let i = 1; i < 8; i++) {
    const date = day.clone().add(i, 'day').toDate();

    dates.push(date);
  }

  return dates;
};

export const isToday = (day: Date, currentDay: Date) => {
  return dayjs(currentDay).isSame(day, 'date');
};

export const tomorrowDate = (currentDay: Date) => {
  const date = new Date();

  if (currentDay.getDay() === 5) {
    date.setDate(currentDay.getDate() + 3);

    return date;
  }
  if (currentDay.getDay() === 6) {
    date.setDate(currentDay.getDate() + 2);

    return date;
  }
  date.setDate(currentDay.getDate() + 1);

  return date;
};

export const generateWeeksOfTheMonth = (firstDayOfFirstWeekOfMonth: dayjs.Dayjs): Date[][] => {
  const firstDayOfEachWeek = generateFirstDayOfEachWeek(firstDayOfFirstWeekOfMonth);

  return firstDayOfEachWeek.map((date) => generateWeek(date));
};

export const translateForRussianMonth = (selectedDate: dayjs.Dayjs) => {
  const month = selectedDate.month();
  const year = selectedDate.year();

  return `${months[month]} ${year}`;
};

export const translateForRussianDays = (dayNumber: number) => {
  return days[dayNumber];
};

export const isTomorrow = (day: Date, currentDay: Date) => {
  return (
    day.getDate() === tomorrowDate(currentDay).getDate() &&
    day.getMonth() === tomorrowDate(currentDay).getMonth() &&
    day.getFullYear() === tomorrowDate(currentDay).getFullYear()
  );
};

export const toISOStringWithTimezone = (date: Date) => {
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())

  );
};

export const bookingDate = (
  day: Date,
  currentDay: Date,
  bookingData: string | undefined,
  setBookingData: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (isToday(day, currentDay) || isTomorrow(day, currentDay)) {
    if (!(toISOStringWithTimezone(day) === toISOStringWithTimezone(new Date(bookingData!)))) {

      setBookingData(toISOStringWithTimezone(day));
    }
  }
};

export const bookingDateClass = (
  day: Date,

  bookingData: string | undefined
) => {
  return (
    day.getDate() === new Date(bookingData!).getDate() &&
    day.getMonth() === new Date(bookingData!).getMonth() &&
    day.getFullYear() === new Date(bookingData!).getFullYear()
  );
};

export const weekendClass = (
  day: Date,

  currentDay: Date
) => {
  return (day.getDay() === 6 || day.getDay() === 0) && day.getMonth() === currentDay.getMonth();
};

export const disabledButton = (day: Date, currentDay: Date, bookingData: string | undefined) => {
  if (
    (isToday(day, currentDay) || isTomorrow(day, currentDay)) &&
    !(day.getDay() === 6 || day.getDay() === 0) &&
    !(new Date(bookingData!).getDate() === new Date(day).getDate())
  ) {
    return false;
  }

  return true;
};
