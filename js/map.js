'use strict';

(function () {
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TAIL_HEIGHT = 22;
  const MAIN_PIN_WIDTH = 65;
  const MAP_WIDTH = 1200;
  const MAP_HEIGHT_TOP = 130;
  const MAP_HEIGHT_BOTTOM = 630;
  const {createCardElement} = window.card;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilter = map.querySelector(`.map__filters-container`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  function getMainPinAddress() {
    return {
      x: Math.floor(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2),
      y: Math.floor(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2)
    };
  }

  function getMainPinAddressWithTail() {
    return {
      x: Math.floor(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2),
      y: Math.floor(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT)
    };
  }

  function removeCards() {
    const currentCards = document.querySelectorAll(`article.map__card`);
    currentCards.forEach((card) => {
      const cardButtonClose = card.querySelector(`button.popup__close`);
      cardButtonClose.removeEventListener(`click`, onCloseCardClick);
      document.removeEventListener(`keydown`, onCloseCardEscKeydown);
      card.remove();
    });
  }

  function onCloseCardClick() {
    removeCards();
  }

  function onCloseCardEscKeydown(evt) {
    if (evt.key === `Escape`) {
      removeCards();
    }
  }

  function onMapClickFabric(offers) {
    let activePin;
    return function (evt) {
      if (evt.target.parentNode.classList.contains(`map__pin`)) {
        if (activePin) {
          activePin.classList.remove(`map__pin--active`);
          activePin = evt.target.parentNode;
        }
        evt.target.parentNode.classList.add(`map__pin--active`);
        const offerId = evt.target.parentNode.dataset.offerId;
        if (offerId) {
          removeCards();

          const card = createCardElement(offers[offerId]);
          map.insertBefore(card, mapFilter);

          const cardButtonClose = card.querySelector(`button.popup__close`);
          cardButtonClose.addEventListener(`click`, onCloseCardClick);
          document.addEventListener(`keydown`, onCloseCardEscKeydown);
        }
      }
    };
  }

  function renderPins(pins) {
    mapPins.appendChild(pins);
  }

  function removePins() {
    const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  }

  function activateMap(offers) {
    map.classList.remove(`map--faded`);
    map.addEventListener(`click`, onMapClickFabric(offers));
    map.addEventListener(`keydown`, onMapClickFabric(offers));
  }

  function deactivateMap() {
    removePins();
    removeCards();
    map.classList.add(`map--faded`);
  }

  window.map = {
    map,
    mapPinMain,
    getMainPinAddress,
    getMainPinAddressWithTail,
    activateMap,
    deactivateMap,
    removeCards,
    removePins,
    renderPins,
    MAIN_PIN_HEIGHT,
    MAIN_PIN_TAIL_HEIGHT,
    MAIN_PIN_WIDTH,
    MAP_WIDTH,
    MAP_HEIGHT_TOP,
    MAP_HEIGHT_BOTTOM
  };
})();
