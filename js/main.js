'use strict';

const map = document.querySelector('.map');
const mapPins = map.querySelector('.map__pins');
const mapFilter = map.querySelector('.map__filters-container');
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}


function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[getRandomInteger(0, keys.length)]];
}


function getRandomFeatures(quantity) {
  const features = [];
  for (let i = 0; i < quantity; i++) {
    features.push(allFeatures[getRandomInteger(0, allFeatures.length - 1)]);
  }
  return features;
}


function getRandomPhotos(quantity) {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    photos.push(allPhotos[getRandomInteger(0, allPhotos.length - 1)]);
  }
  return photos;
}


function generateOffersArray(quantity) {
  const offers = [];
  for (let i = 0; i < quantity; i++) {
    offers.push({
      author: {
        avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`
      },
      offer: {
        title: 'Предложение',
        address: `${getRandomInteger(0, 1200) - PIN_WIDTH / 2}, ${getRandomInteger(130, 630) - PIN_HEIGHT}`,
        price: `${getRandomInteger(1, 10000)}₽/ночь`,
        type: getRandomProperty(type),
        rooms: getRandomInteger(1, 100),
        guests: getRandomInteger(1, 100),
        checkin: checkinTime[getRandomInteger(0, checkinTime.length - 1)],
        checkout: checkoutTime[getRandomInteger(0, checkoutTime.length - 1)],
        features: getRandomFeatures(getRandomInteger(0, allFeatures.length)),
        description: 'Описание',
        photos: getRandomPhotos(getRandomInteger(0, allPhotos.length))
      },
      location: {
        x: getRandomInteger(0, MAP_WIDTH),
        y: getRandomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM)
      }
    });
  }
  return offers;
}

function generateFeachures(featuresList) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < featuresList.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.classList.add(`popup__feature`, `popup__feature--${featuresList[i]}`);
    fragment.appendChild(featureItem);
  }
  return fragment;
}

function generatePhotos(photosList) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photosList.length; i++) {
    const photoItem = document.createElement('img');
    photoItem.classList.add(`popup__photo`);
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.src = photosList[i];
    fragment.appendChild(photoItem);
  }
  return fragment;
}


function generateOffers(offer) {
  const offerElement = cardTemplate.cloneNode(true);
  // Стирает удобства и фото из шаблона
  offerElement.querySelector('.popup__features').innerHTML = '';
  offerElement.querySelector('.popup__photos').innerHTML = '';

  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.adress;
  offerElement.querySelector('.popup__text--price').textContent = offer.offer.price;
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  offerElement.querySelector('.popup__features').appendChild(generateFeachures(offer.offer.features));
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  offerElement.querySelector('.popup__photos').appendChild(generatePhotos(offer.offer.photos));
  return offerElement;
}

function generatePin(pin) {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style.left = `${getRandomInteger(0, 1200) - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${getRandomInteger(130, 630) - PIN_HEIGHT}px`;
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


function showOffers() {
  map.classList.remove('map--faded');
  const offers = generateOffersArray(8);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(generateOffers(offers[i]));
  }
  map.insertBefore(fragment, mapFilter);
}


showPins();
showOffers();
