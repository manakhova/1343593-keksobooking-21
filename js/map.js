'use strict';

(function () {
  const {createCardElement} = window.card;
  const {removePins} = window.pin;
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilter = map.querySelector(`.map__filters-container`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TAIL_HEIGHT = 22;
  const MAIN_PIN_WIDTH = 65;
  const MAP_WIDTH = 1200;
  const MAP_HEIGHT_TOP = 130;
  const MAP_HEIGHT_BOTTOM = 630;

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
      cardButtonClose.removeEventListener(`click`, closeCardClick);
      cardButtonClose.removeEventListener(`keydown`, closeCardEscKeydown);

      card.remove();
    });
  }

  function closeCardClick() {
    removeCards();
  }

  function closeCardEscKeydown(evt) {
    if (evt.key === `Escape`) {
      removeCards();
    }
  }

  function mapClickFabric(offers) {
    return function (evt) {
      if (evt.target.parentNode.classList.contains(`map__pin`)) {
        const offerId = evt.target.parentNode.dataset.offerId;
        if (offerId) {
          removeCards();

          const card = createCardElement(offers[offerId]);
          map.insertBefore(card, mapFilter);

          const cardButtonClose = card.querySelector(`button.popup__close`);
          cardButtonClose.addEventListener(`click`, closeCardClick);
          cardButtonClose.addEventListener(`keydown`, closeCardEscKeydown);
        }
      }
    };
  }

  function activateMap(pins, offers) {
    map.classList.remove(`map--faded`);
    mapPins.appendChild(pins);

    map.addEventListener(`click`, mapClickFabric(offers));
  }

  function deactivateMap() {
    removePins();
    map.classList.add(`map--faded`);
  }

  window.map = {
    map,
    mapPinMain,
    getMainPinAddress,
    getMainPinAddressWithTail,
    activateMap,
    deactivateMap,
    MAIN_PIN_HEIGHT,
    MAIN_PIN_TAIL_HEIGHT,
    MAIN_PIN_WIDTH,
    MAP_WIDTH,
    MAP_HEIGHT_TOP,
    MAP_HEIGHT_BOTTOM
  };
})();
