import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const htmlElements = {
  form: document.querySelector('.form'),
  delayMs: document.querySelector('input'),
};

const createPromise = (delay, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status) {
        console.log('Hello World');
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
};

htmlElements.form.addEventListener('submit', e => {
  e.preventDefault();
  let isOk = true;
  if (htmlElements.form.state.value === 'rejected') isOk = false;
  createPromise(htmlElements.delayMs.value, isOk);
  htmlElements.form.reset();
  isOk = true;
});
