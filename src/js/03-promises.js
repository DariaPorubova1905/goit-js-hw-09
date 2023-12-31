import { Notify } from 'notiflix/build/notiflix-notify-aio';

const optNotiflx = {
  timeout: 3000,
  useIcon: false,
};

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(ev){
  ev.preventDefault();

  let timeout = Number(form.delay.value);
  for (let i = 1; i <= Number(form.amount.value); i++) {
    createPromise(i, timeout)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, optNotiflx);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, optNotiflx);
    });
    timeout+=Number(form.step.value);
  }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({position, delay});
        }, delay);
      })
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject({position, delay});
        }, delay);
      })
  }
}
