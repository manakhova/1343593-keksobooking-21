'use strict';

(function () {
  const {mapPinMain, activateMap, deactivateMap, getMainPinAddress, getMainPinAddressWithTail} = window.map;
  const {activateForm, deactivateForm} = window.form;
  const {generatePins} = window.pin;
  const {loadData} = window.ajax;
  const SERVER_URL = `https://231.javascript.pages.academy/keksobooking/data`;

  function initializeErrorMessage() {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorElement = errorTemplate.cloneNode(true);
    errorElement.id = `error-message`;
    errorElement.classList.add(`hidden`);
    document.body.appendChild(errorElement);
  }

  function mainPinMouseDown() {
    activatePage();
  }

  function mainPinKeyDown(evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  }

  function prepareOffers(item, index) {
    item.id = index;
    return item;
  }

  function showErrorMessage(error) {
    const errorElement = document.querySelector(`#error-message`);
    const errorMessageButtonClose = errorElement.querySelector(`.error__button`);
    errorElement.querySelector(`.error__message`).textContent = error;
    errorElement.classList.remove(`hidden`);

    errorMessageButtonClose.addEventListener(`mousedown`, closeMessageClick);
    errorMessageButtonClose.addEventListener(`keydown`, closeMessageEscKeydown);
  }

  function closeMessageClick() {
    hideErrorMessage();
  }

  function closeMessageEscKeydown(evt) {
    if (evt.key === `Escape`) {
      hideErrorMessage();
    }
  }

  function hideErrorMessage() {
    const errorElement = document.querySelector(`#error-message`);
    const errorMessageButtonClose = errorElement.querySelector(`.error__button`);
    errorElement.classList.add(`hidden`);

    errorMessageButtonClose.removeEventListener(`mousedown`, closeMessageClick);
    errorMessageButtonClose.removeEventListener(`keydown`, closeMessageEscKeydown);
  }

  function activatePage() {
    loadData(SERVER_URL, (data) => {
      const mainPinAddress = getMainPinAddressWithTail();

      const offers = data.map(prepareOffers);
      const pins = generatePins(offers);

      mapPinMain.removeEventListener(`mousedown`, mainPinMouseDown);
      mapPinMain.removeEventListener(`keydown`, mainPinKeyDown);

      activateMap(pins, offers);
      activateForm(mainPinAddress);
    },
    showErrorMessage);
  }

  function deactivatePage() {
    const mainPinAddress = getMainPinAddress();

    mapPinMain.addEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.addEventListener(`keydown`, mainPinKeyDown);

    deactivateMap();
    deactivateForm(mainPinAddress);
  }

  deactivatePage();
  initializeErrorMessage();
})();
