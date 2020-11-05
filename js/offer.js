'use strict';

(function () {
  const {getRandomInteger, getRandomProperty, shuffleArray} = window.utils;
  const type = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalo: `Бунгало`
  };
  const checkinTime = [`10:00`, `13:00`, `14:00`];
  const checkoutTime = [`10:00`, `13:00`, `14:00`];
  const allFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const allPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MAP_WIDTH = 1200;
  const MAP_HEIGHT_TOP = 130;
  const MAP_HEIGHT_BOTTOM = 630;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  function generateOffersArray(quantity) {
    const offers = [];
    for (let i = 0; i < quantity; i++) {
      const shuffledFeatures = shuffleArray(allFeatures);
      const shuffledPhotos = shuffleArray(allPhotos);

      offers.push({
        id: i,
        author: {
          avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`
        },
        offer: {
          title: `Предложение`,
          address: `${getRandomInteger(0, 1200) - PIN_WIDTH / 2}, ${getRandomInteger(130, 630) - PIN_HEIGHT}`,
          price: `${getRandomInteger(1, 10000)}₽/ночь`,
          type: getRandomProperty(type),
          rooms: getRandomInteger(1, 100),
          guests: getRandomInteger(1, 100),
          checkin: checkinTime[getRandomInteger(0, checkinTime.length - 1)],
          checkout: checkoutTime[getRandomInteger(0, checkoutTime.length - 1)],
          features: shuffledFeatures.slice(getRandomInteger(0, shuffledFeatures.length - 1)),
          description: `Описание`,
          photos: shuffledPhotos.slice(getRandomInteger(0, shuffledPhotos.length - 1))
        },
        location: {
          x: window.utils.getRandomInteger(0, MAP_WIDTH),
          y: window.utils.getRandomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM)
        }
      });
    }
    return offers;
  }

  window.offer = {
    PIN_WIDTH,
    PIN_HEIGHT,
    generateOffersArray
  };
})();
