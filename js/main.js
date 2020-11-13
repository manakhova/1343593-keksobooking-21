'use strict';

(function () {
  const {mapPinMain, activateMap, deactivateMap, getMainPinAddress, getMainPinAddressWithTail} = window.map;
  const {activateForm, deactivateForm, form} = window.form;
  const {generatePins} = window.pin;
  const {loadData, uploadData} = window.ajax;
  const main = document.querySelector(`main`);
  const SERVER_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SERVER_UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  function initializeSuccessMessage() {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successElement = successTemplate.cloneNode(true);
    successElement.classList.add(`hidden`);
    main.appendChild(successElement);
  }

  function initializeErrorMessage() {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorElement = errorTemplate.cloneNode(true);
    const errorMessageButtonClose = errorElement.querySelector(`.error__button`);
    errorElement.id = `error-message`;
    errorElement.classList.add(`hidden`);
    main.appendChild(errorElement);

    errorMessageButtonClose.addEventListener(`mousedown`, closeMessageClick);
    errorMessageButtonClose.addEventListener(`keydown`, closeMessageEscKeydown);
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
    errorElement.querySelector(`.error__message`).textContent = error;
    errorElement.classList.remove(`hidden`);
  }

  function showSuccessMessage() {
    const successElement = document.querySelector(`.success`);
    successElement.classList.remove(`hidden`);
  }

  function closeMessageClick() {
    hideErrorMessage();
  }

  function closeMessageEscKeydown(evt) {
    if (evt.key === `Escape`) {
      hideErrorMessage();
    }
  }

  function closeSuccessMessageClick() {
    hideSuccessMessage();
  }

  function closeSuccessMessageEscKeydown(evt) {
    if (evt.key === `Escape`) {
      hideSuccessMessage();
    }
  }

  function hideErrorMessage() {
    const errorElement = document.querySelector(`#error-message`);
    errorElement.classList.add(`hidden`);
  }

  function hideSuccessMessage() {
    const successElement = document.querySelector(`.success`);
    successElement.classList.add(`hidden`);
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

      form.addEventListener(`submit`, submitForm);
    },
    showErrorMessage);
  }

  function deactivatePage() {
    const mainPinAddress = getMainPinAddress();

    mapPinMain.addEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.addEventListener(`keydown`, mainPinKeyDown);

    deactivateMap();
    deactivateForm(mainPinAddress);

    form.removeEventListener(`submit`, submitForm);
  }

  function resetPage() {
    deactivatePage();
    showSuccessMessage();

    document.addEventListener(`mousedown`, closeSuccessMessageClick);
    document.addEventListener(`keydown`, closeSuccessMessageEscKeydown);
  }

  function submitForm(evt) {
    evt.preventDefault();

    uploadData(SERVER_UPLOAD_URL, new FormData(form), resetPage, showErrorMessage);
  }

  deactivatePage();
  initializeErrorMessage();
  initializeSuccessMessage();
})();
