import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ---------------------------------------
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // days
  const days = Math.floor(ms / day);
  // hours
  const hours = Math.floor((ms % day) / hour);
  // minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const inputTimeEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0])
  },
};
