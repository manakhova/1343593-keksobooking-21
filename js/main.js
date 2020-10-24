'use strict';

const map = document.querySelector('.map');
const form = document.querySelector('.ad-form');
const fieldsetHeader = document.querySelector('.ad-form-header');
const fieldsetsMain = document.querySelectorAll('.ad-form__element');
const mapPinMain = document.querySelector('.map__pin--main');
const mapPins = map.querySelector('.map__pins');
const mapFilter = map.querySelector('.map__filters-container');
const addressInput = document.querySelector('#address');
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
cardTemplate.querySelector('.popup__features').innerHTML = '';
cardTemplate.querySelector('.popup__photos').innerHTML = '';
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
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_TAIL_HEIGHT = 22;
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


// Перемешивание массива по методу Фишера-Йейтса
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function generateOffersArray(quantity) {
  const offers = [];
  for (let i = 0; i < quantity; i++) {
    const shuffledFeatures = shuffleArray(allFeatures);
    const shuffledPhotos = shuffleArray(allPhotos);

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
        features: shuffledFeatures.slice(getRandomInteger(0, shuffledFeatures.length - 1)),
        description: 'Описание',
        photos: shuffledPhotos.slice(getRandomInteger(0, shuffledPhotos.length - 1))
      },
      location: {
        x: getRandomInteger(0, MAP_WIDTH),
        y: getRandomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM)
      }
    });
  }
  return offers;
}

function generateFeatures(featuresList) {
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

  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.adress;
  offerElement.querySelector('.popup__text--price').textContent = offer.offer.price;
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  offerElement.querySelector('.popup__features').appendChild(generateFeatures(offer.offer.features));
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


function showPins(offers) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(generatePin(offers[i]));
  }
  mapPins.appendChild(fragment);
}


function addOffers(offers) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(generateOffers(offers[i])).classList.add('hidden');
  }
  map.insertBefore(fragment, mapFilter);
}


// Адрес главного пина
function getMainPinAddress() {
  const mainPinAddress = {
    x: Math.floor(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2),
    y: Math.floor(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2)
  };
  return mainPinAddress;
}

// валидация селекта
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const capacityOptions = capacity.children;
// const roomNumberOptions = roomNumber.children;


function disableСapacityOptions() {
  if (roomNumber.value === 1) {
    Array.from(capacityOptions).forEach((capacityOption) => {
      capacityOption.setAttribute('disabled', 'disabled');
    });
  } else if (roomNumber.value === 2) {
    Array.from(capacityOptions).forEach((capacityOption) => {
      capacityOption.setAttribute('disabled', 'disabled');
    });
  } else if (roomNumber.value === 3) {
    Array.from(capacityOptions).forEach((capacityOption) => {
      capacityOption.setAttribute('disabled', 'disabled');
    });
  } else {
    Array.from(capacityOptions).forEach((capacityOption) => {
      capacityOption.setAttribute('disabled', 'disabled');
    });
  }
}


function mainPinMouseDown() {
  activatePage();
} // это нормальное название для функции?

function mainPinKeyDown(evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
}

function showPopup() {
  const popupItems = document.querySelectorAll('.popup');

  Array.from(popupItems).forEach((popupItem) => {
    popupItem.classList.remove('hidden');
  });
}


function activatePage() {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  fieldsetHeader.removeAttribute('disabled');
  fieldsetsMain.forEach((fieldsetMain) => {
    fieldsetMain.removeAttribute('disabled');
  });

  const mainPinAddress = getMainPinAddress();
  addressInput.value = `${mainPinAddress.x}, ${Math.floor(mainPinAddress.y + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL_HEIGHT)}`;

  const offers = generateOffersArray(8);
  showPins(offers);
  addOffers(offers);

  mapPinMain.removeEventListener('mousedown', mainPinMouseDown);
  mapPinMain.removeEventListener('keydown', mainPinKeyDown);
  form.addEventListener('change', disableСapacityOptions);
  map.addEventListener('click', showPopup);
}


function deactivatePage() {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  fieldsetHeader.setAttribute('disabled', 'disabled');
  fieldsetsMain.forEach((fieldsetMain) => {
    fieldsetMain.setAttribute('disabled', 'disabled');
  });

  const mainPinAddress = getMainPinAddress();
  addressInput.value = `${mainPinAddress.x}, ${mainPinAddress.y}`;

  mapPinMain.addEventListener('mousedown', mainPinMouseDown);
  mapPinMain.addEventListener('keydown', mainPinKeyDown);
}

deactivatePage();
