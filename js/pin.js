'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_PIN_COUNT = 5;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function createPinElement(pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.offerId = pin.id;
    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;
    return pinElement;
  }

  function generatePins(offers) {
    const fragment = document.createDocumentFragment();
    const pinsCount = offers.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : offers.length;
    for (let i = 0; i < pinsCount; i++) {
      fragment.appendChild(createPinElement(offers[i]));
    }
    return fragment;
  }

  window.pin = {
    generatePins,
    MAX_PIN_COUNT
  };

})();
