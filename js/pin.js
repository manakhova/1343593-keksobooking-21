'use strict';

(function () {
  const {PIN_WIDTH, PIN_HEIGHT, MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM, MAP_WIDTH} = window.offer;
  const {getRandomInteger} = window.utils;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function createPinElement(pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.offerId = pin.id;
    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    pinElement.style.left = `${getRandomInteger(0, MAP_WIDTH) - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${getRandomInteger(MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM) - PIN_HEIGHT}px`;
    return pinElement;
  }

  function generatePins(offers) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(createPinElement(offers[i]));
    }
    return fragment;
  }

  window.pin = {
    generatePins
  };
})();
