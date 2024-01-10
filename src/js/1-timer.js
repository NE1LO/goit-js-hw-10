import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ---------------------------------------
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

const convertMs = ms => {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const formatWithLeadingZero = value => `${value}`.padStart(2, '0');

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose: selectedDates => {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        backgroundColor: 'red',
        messageColor: '#fff',
      });
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', () => {
        const interval = setInterval(() => {
          const time = convertMs(selectedDates[0].getTime() - Date.now());
          daysElement.textContent = formatWithLeadingZero(time.days);
          hoursElement.textContent = formatWithLeadingZero(time.hours);
          minutesElement.textContent = formatWithLeadingZero(time.minutes);
          secondsElement.textContent = formatWithLeadingZero(time.seconds);
          if (
            daysElement.textContent === '00' &&
            hoursElement.textContent === '00' &&
            minutesElement.textContent === '00' &&
            secondsElement.textContent === '00'
          ) {
            clearInterval(interval);
          }
        }, 1000);
        startButton.disabled = true;
        dateTimePicker.disabled = true;
      });
    }
  },
};

const timer = flatpickr('#datetime-picker', options);
