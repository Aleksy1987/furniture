/*Карта*/

initMap();

async function initMap() {
  await ymaps3.ready;
  const {YMap, YMapDefaultSchemeLayer, YMapControls} = ymaps3;
  const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
  const coordinates = [37.638979, 55.759101];

  const content = document.createElement('section');
  const marker = new ymaps3.YMapMarker({
      coordinates: coordinates,
      draggable: true
  }, content);
  content.innerHTML = '<img src="../img/mark.svg" alt="Метка">';
  
  const map = new YMap(
    document.getElementById('map'),
    {
      location: {
        center: [37.628015, 55.75659],
        zoom: 15
      }
    }
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(
    new YMapControls({position: 'right'})
      .addChild(new YMapZoomControl({}))
  );
  map.addChild(new ymaps3.YMapDefaultFeaturesLayer());
  map.addChild(marker);
}


/*слайдер*/
//коллекции слайдов, радио, боковых кнопок перключения слайдов
const slider = document.querySelector('.hero__slider-wrapper');
const slides = document.querySelectorAll('.slide');
const modalBtns = document.querySelectorAll('.btn');
const radios = document.querySelectorAll('.radio');
const swiches = document.querySelectorAll('.swich');


/*изменение класса у слайдов, и кнопок*/
function changeClass() {
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].classList.toggle('active');
    radios[i].classList.toggle('active');
  };
} 

/*запуск смены кадров*/
var intervalId = setInterval(changeClass, 5500);

for (let i = 0; i < swiches.length; i += 1) {
  swiches[i].addEventListener("click", () => {
    changeClass();
  });
};

slider.addEventListener("mouseenter", () => {
  clearInterval(intervalId);
});

slider.addEventListener("mouseleave", () => {
  intervalId = setInterval(changeClass, 5500);
});

/*Модальное окно */
//отключение скрола
const disabledScroll = () => {
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    wight: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
};

//активация скрола
const abledScroll = () => {
  document.body.style.cssText = ``
  window.scroll({top: document.body.scrollPosition});
};

//создание элемента (аргументами идут тег и массив с параметрами)
const createElem = (tag, attr) => {
  const elem = document.createElement(tag);
  return Object.assign(elem, {...attr});
};

//создание модального окна с формой
const createModal = () => {
  const overlayElem = createElem('div', {className: 'modal'});
  const modalElem = createElem('div', {className: 'modal__block'});
    
  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Закажите звонок` 
  });

  const messageElem = createElem('p', {
    className: 'modal__message',
    textContent: 'Мы свяжемся с вами в ближайшее время и ответим на все вопросы'
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'post',
    action: '',
    id: 'callback'
  });

  const nameLabelElem = createElem('label', {
    className: 'model__lable'
  });

  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Имя',
    name: 'name',
    required: true
  });

  const phoneLabelElem = createElem('label', {
    className: 'model__lable'
  });

  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    id: 'phone__input',
    placeholder: 'Телефон*',
    name: 'phone',
    type: 'tel',
    required: true
  });

  const hideInput = createElem('input', {
    type: 'hidden',
    name: 'recall',
    value: 'recall'
  });

  const btn = createElem('button', {
    className: 'modal__btn',
    textContent: 'Отправить заявку',
    type: 'submit'
  });

  const personals = createElem ('p', {
    className: 'personal',
    textContent: 'Отправляя заявку, вы даёте согласие на '
  });

  const personalsLink = createElem ('a', {
    className: 'personalLink',
    textContent: 'обработку персональных данных'
  });

  btn.classList.add('btn');
  btn.setAttribute('form', 'callback');

  const closeModal = createElem('buttom', {
    className: 'modal__close',
    innerHTML: `
    <svg width="44.000000" height="44.000000" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path id="Vector 158" d="M31 13L13 31" stroke="#BDBDBD" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linecap="round"/>
      <path id="Vector 159" d="M13 13L31 31" stroke="#BDBDBD" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linecap="round"/>
    </svg>` 
  });

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();
      abledScroll();
    }
  });

  nameLabelElem.append(nameInputElem);
  phoneLabelElem.append(phoneInputElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);
  personals.append(personalsLink);

  modalElem.append(titleElem, messageElem, formElem, btn, personals, closeModal);
  overlayElem.append(modalElem);
  disabledScroll();
  document.body.append(overlayElem);
};

//ввод номера телефона
document.body.addEventListener('keydown', phoneNumber);

function phoneNumber(event) {  
  if(event.target.id == 'phone__input' && (!Number(event.key) &&
  event.key != '-' &&
  event.key != '(' &&
  event.key != ')' &&
  event.key != '+' &&
  event.key != ' ' &&
  event.key != 'Shift' &&
  event.key != 'Backspace' &&
  event.key != 'Delete' &&
  event.key != 'ArrowLeft'&&
  event.key != 'ArrowRight')) {
    event.preventDefault();
    console.log(event.key);
  }
};

//создание модального окна с результатом обработки формы
const createAnswer = (answer) => {
  const modal = document.querySelector('.modal');
  const modalBlock = document.querySelector('.modal__block');

//словарь с img и текстом для модального окна с результатом обработки формы  
  const answerContent = new Map ([
    [200, new Map ([
      ['img', `
      <svg width="40.000000" height="40.000000" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path id="Vector" d="M36.66 21.66L36.66 10C36.66 9.11 36.31 8.26 35.69 7.64C35.06 7.01 34.21 6.66 33.33 6.66L6.66 6.66C5.78 6.66 4.93 7.01 4.3 7.64C3.68 8.26 3.33 9.11 3.33 10L3.33 30C3.33 31.83 4.83 33.33 6.66 33.33L19.99 33.33" stroke="#9D7E6C" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
        <path id="Vector" d="M36.66 11.66L21.71 21.16C21.2 21.48 20.6 21.66 19.99 21.66C19.39 21.66 18.79 21.48 18.28 21.16L3.33 11.66" stroke="#9D7E6C" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
        <path id="Vector" d="M26.66 31.66L30 34.99L36.66 28.33" stroke="#78B873" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>`
      ],
      ['text', 'Заявка успешно отправлена']
    ])],
    [404, new Map ([
      ['img', `
      <svg width="40.000000" height="40.000000" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path id="Vector" d="M36.66 21.66L36.66 10C36.66 9.11 36.31 8.26 35.69 7.64C35.06 7.01 34.21 6.66 33.33 6.66L6.66 6.66C5.78 6.66 4.93 7.01 4.3 7.64C3.68 8.26 3.33 9.11 3.33 10L3.33 30C3.33 31.83 4.83 33.33 6.66 33.33L21.66 33.33" stroke="#9D7E6C" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
        <path id="Vector" d="M36.66 11.66L21.71 21.16C21.2 21.48 20.6 21.66 20 21.66C19.39 21.66 18.79 21.48 18.28 21.16L3.33 11.66" stroke="#9D7E6C" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
        <path id="Vector" d="M28.33 28.33L35 35" stroke="#E46060" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
        <path id="Vector" d="M35 28.33L28.33 35" stroke="#E46060" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>`
      ],
      ['text', 'Завка не отправлена, попробуйте снова']
    ])]
  ]);

  const answerElem = createElem('div', {
  className: 'answer__window'
  });

  const imgElem = createElem('svg', {
    className: 'answer__window_img',
    innerHTML: answerContent.get(answer.status).get('img')
  });
  
  const textElem = createElem('p', {
    className: 'answer__window_p',
    textContent: answerContent.get(answer.status).get('text')
  });
  
  answerElem.append(imgElem, textElem);
  modalBlock.remove();
  modal.append(answerElem);
};

//закрепление вызова модального окна формы на кнопки
for (let i = 0; i < modalBtns.length; i += 1 ) {
  modalBtns[i].addEventListener('click', () => {
    createModal();
  });
};

//отправка форм
async function sendForm(event) {
  const formNode = document.getElementById(event.target.getAttribute('id'));
  event.preventDefault();
//преобразование из HTML коллекции (формы) в FormData
  const data = new FormData(formNode);
//отправка данных
  const answer = await fetch('/handler.js', {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: data,
  });
//обработка ответа
  createAnswer(answer);
};

//отслеживание события отправки формы
document.body.addEventListener('submit', sendForm);
