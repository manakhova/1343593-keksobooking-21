'use strict';

const map = document.querySelector('.map');
const mapPins = map.querySelector('.map__pins');
// const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const type = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
const checkinTime = ['10:00', '13:00', '14:00'];
const checkoutTime = ['10:00', '13:00', '14:00'];
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAP_WIDTH = 1200;
const MAP_HEIGHT_TOP = 130;
const MAP_HEIGHT_BOTTOM = 630;

// Рандомное число в диапазоне
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Рандомное свойство объекта
function randomProperty(obj) {
  let keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}


function makeAdsArray(number) {
  let ads = [];
  for (let i = 0; i < number; i++) {
    ads.push({
      author: {
        avatar: `img/avatars/user0${randomInteger(1, 8)}.png` // не соображу, как заставить числа не повторяться
      },
      offer: {
        title: 'Предложение',
        address: `${randomInteger(0, 1200) - PIN_WIDTH / 2}, ${randomInteger(130, 630) - PIN_HEIGHT}`,
        price: randomInteger(1, 10000),
        type: randomProperty(type),
        rooms: randomInteger(1, 100),
        guests: randomInteger(1, 100),
        checkin: checkinTime[randomInteger(0, checkinTime.length - 1)],
        checkout: checkoutTime[randomInteger(0, checkoutTime.length - 1)],
        features: 'wifi', // ??? массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: 'Описание',
        photos: `http://o0.github.io/assets/images/tokyo/hotel1.jpg` // ??? массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      },
      location: {
        x: randomInteger(0, MAP_WIDTH),
        y: randomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM)
      }
    });
  }
  return ads;
}


/* function renderAd(ad) {
  let adElement = cardTemplate.cloneNode(true);

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.prise;
  adElement.querySelector('.popup__type').textContent = ad.offer.type;
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests}гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  adElement.querySelector('.popup__feature').textContent = ad.offer.feachures; // ???
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__photo').src = ad.author.photos; // ???
  return adElement; // не поняла, нужно ли выводить на карту объявления
} */

function renderPin(pin) {
  let pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style.left = `${randomInteger(0, 1200) - PIN_WIDTH / 2}px`; // координаты по Х острого конца метки
  pinElement.style.top = `${randomInteger(130, 630) - PIN_HEIGHT}px`; // координаты по Y острого конца метки
  return pinElement;
}


function showPins() {
  map.classList.remove('map--faded');
  const ads = makeAdsArray(8);
  const fragmentPin = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    fragmentPin.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragmentPin);
}

showPins();
