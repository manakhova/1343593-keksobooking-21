'use strict';

var map = document.querySelector(`.map`);

(function () {
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilter = map.querySelector(`.map__filters-container`);

  function generatePins(offers) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(window.pin.createPinElement(offers[i]));
    }
    mapPins.appendChild(fragment);
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

          const card = window.card.createCardElement(offers[offerId]);
          map.insertBefore(card, mapFilter);

          const cardButtonClose = card.querySelector(`button.popup__close`);
          cardButtonClose.addEventListener(`click`, closeCardClick);
          cardButtonClose.addEventListener(`keydown`, closeCardEscKeydown);
        }
      }
    };
  }

  window.map = {
    generatePins: generatePins,
    mapClickFabric: mapClickFabric
  };
})();
