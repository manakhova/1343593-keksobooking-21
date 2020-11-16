'use strict';

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const MAX_PIN_COUNT = 5;

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
  const pinsCount = offers.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : offers.length;
  for (let i = 0; i < pinsCount; i++) {
    fragment.appendChild(createPinElement(offers[i]));
  }
  return fragment;
}

window.pin = {
  generatePins
};
