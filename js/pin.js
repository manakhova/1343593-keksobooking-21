'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function createPinElement(pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.offerId = pin.id;
    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x}px`;
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

  function removePins() {
    const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPins.forEach((mapPin) => {
      mapPin.remove();
    });
  }

  window.pin = {
    generatePins,
    removePins
  };
})();
