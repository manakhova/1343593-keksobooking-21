'use strict';

(function () {
  // const PIN_WIDTH = 50;
  // const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function createPinElement(pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.offerId = pin.id;
    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x}px`; // сервер передает координаты для верхренго левого угла или острия пина?
    pinElement.style.top = `${pin.location.y}px`;
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
