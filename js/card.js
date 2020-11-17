'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  cardTemplate.querySelector(`.popup__features`).innerHTML = ``;
  cardTemplate.querySelector(`.popup__photos`).innerHTML = ``;
  const Type = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  function generateFeatures(featuresList) {
    const fragment = document.createDocumentFragment();

    featuresList.forEach((feature) => {
      const featureItem = document.createElement(`li`);
      featureItem.classList.add(`popup__feature`, `popup__feature--${feature}`);
      fragment.appendChild(featureItem);
    });

    return fragment;
  }

  function generatePhotos(photosList) {
    const fragment = document.createDocumentFragment();

    photosList.forEach((photo) => {
      const photoItem = document.createElement(`img`);
      photoItem.classList.add(`popup__photo`);
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.src = photo;
      fragment.appendChild(photoItem);
    });

    return fragment;
  }

  function createCardElement(offer) {
    const offerElement = cardTemplate.cloneNode(true);

    offerElement.querySelector(`.popup__avatar`).src = offer.author.avatar;
    offerElement.querySelector(`.popup__title`).textContent = offer.offer.title;
    offerElement.querySelector(`.popup__text--address`).textContent = offer.offer.adress;
    offerElement.querySelector(`.popup__text--price`).textContent = offer.offer.price;
    offerElement.querySelector(`.popup__type`).textContent = Type[offer.offer.type];
    offerElement.querySelector(`.popup__text--capacity`).textContent = `${offer.offer.rooms} комнат(-a/-ы) для ${offer.offer.guests} гостей`;
    offerElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

    if (offer.offer.features.length > 0) {
      offerElement.querySelector(`.popup__features`).appendChild(generateFeatures(offer.offer.features));
    } else {
      offerElement.querySelector(`.popup__features`).classList.add(`hidden`);
    }

    offerElement.querySelector(`.popup__description`).textContent = offer.offer.description;

    if (offer.offer.photos.length > 0) {
      offerElement.querySelector(`.popup__photos`).appendChild(generatePhotos(offer.offer.photos));
    } else {
      offerElement.querySelector(`.popup__photos`).classList.add(`hidden`);
    }

    offerElement.dataset.id = offer.id;
    return offerElement;
  }

  window.card = {
    createCardElement
  };
})();
