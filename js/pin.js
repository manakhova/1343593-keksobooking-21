'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  /* global PIN_WIDTH, PIN_HEIGHT */

  function createPinElement(pin) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.dataset.offerId = pin.id;
    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    pinElement.style.left = `${window.utils.getRandomInteger(0, 1200) - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${window.utils.getRandomInteger(130, 630) - PIN_HEIGHT}px`;
    return pinElement;
  }

  window.pin = {
    createPinElement: createPinElement
  };
})();
