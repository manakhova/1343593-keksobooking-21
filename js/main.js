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
const allFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const allPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAP_WIDTH = 1200;
const MAP_HEIGHT_TOP = 130;
const MAP_HEIGHT_BOTTOM = 630;
const someFeachure = getRandomInteger(0, allFeatures.length);
const somePhoto = getRandomInteger(0, allPhotos.length);


// Рандомное число в диапазоне
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Рандомное свойство объекта
function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[getRandomInteger(0, keys.length)]];
}

// Рандомное число удобств
function getRandomFeatures(quantity) {
  const features = [];
  for (let i = 0; i < quantity; i++) {
    features.push(features[getRandomInteger(0, allFeatures.length)]);
  }
  return features;
}

// Рандомные фотографии
function getRandomPhotos(quantity) {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    photos.push(photos[getRandomInteger(0, allPhotos.length)]);
  }
  return photos;
}


function generateOffersArray(quantity) {
  const offers = [];
  for (let i = 0; i < quantity; i++) {
    offers.push({
      author: {
        avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png` // не соображу, как заставить числа не повторяться
      },
      offer: {
        title: 'Предложение',
        address: `${getRandomInteger(0, 1200) - PIN_WIDTH / 2}, ${getRandomInteger(130, 630) - PIN_HEIGHT}`,
        price: getRandomInteger(1, 10000),
        type: getRandomProperty(type),
        rooms: getRandomInteger(1, 100),
        guests: getRandomInteger(1, 100),
        checkin: checkinTime[getRandomInteger(0, checkinTime.length - 1)],
        checkout: checkoutTime[getRandomInteger(0, checkoutTime.length - 1)],
        features: getRandomFeatures(someFeachure),
        description: 'Описание',
        photos: getRandomPhotos(somePhoto)
      },
      location: {
        x: getRandomInteger(0, MAP_WIDTH),
        y: getRandomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM)
      }
    });
  }
  return offers;
}


/* function renderOffers(offer) {
  const offerElement = cardTemplate.cloneNode(true);

  offerElement.querySelector('.popup__avatar').src = ad.author.avatar;
  offerElement.querySelector('.popup__title').textContent = ad.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
  offerElement.querySelector('.popup__text--price').textContent = ad.offer.prise;
  offerElement.querySelector('.popup__type').textContent = ad.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  offerElement.querySelector('.popup__feature').textContent = ad.offer.feachures; // ???
  offerElement.querySelector('.popup__description').textContent = ad.offer.description;
  offerElement.querySelector('.popup__photo').src = ad.author.photos; // ???
  return offerElement; // не поняла, нужно ли выводить на карту объявления
} */

function generatePin(pin) {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style.left = `${getRandomInteger(0, 1200) - PIN_WIDTH / 2}px`; // координаты по Х острого конца метки
  pinElement.style.top = `${getRandomInteger(130, 630) - PIN_HEIGHT}px`; // координаты по Y острого конца метки
  return pinElement;
}


function showPins() {
  map.classList.remove('map--faded');
  const offers = generateOffersArray(8);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(generatePin(offers[i]));
  }
  mapPins.appendChild(fragment);
}

showPins();
