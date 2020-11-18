'use strict';

const SERVER_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SERVER_UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const {mapPinMain, activateMap, deactivateMap, getMainPinAddress, getMainPinAddressWithTail, renderPins} = window.map;
const {activateForm, deactivateForm, form} = window.form;
const {generatePins} = window.pin;
const {loadData, uploadData} = window.ajax;
const {activateFilter, deactivateFilter} = window.filter;
const main = document.querySelector(`main`);
const pageResetButton = document.querySelector(`.ad-form__reset`);

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

  errorMessageButtonClose.addEventListener(`mousedown`, onMessageButtonCloseClick);
  document.addEventListener(`mousedown`, onMessageButtonCloseClick);
  document.addEventListener(`keydown`, onMessageButtonCloseEscKeydown);

}

function onMainPinMouseDown() {
  activatePage();
}

function onMainPinKeyDown(evt) {
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

function onMessageButtonCloseClick() {
  hideErrorMessage();
}

function onMessageButtonCloseEscKeydown(evt) {
  if (evt.key === `Escape`) {
    hideErrorMessage();
  }
}

function onSuccessMessageCloseClick() {
  hideSuccessMessage();
}

function onSuccessMessageCloseEscKeydown(evt) {
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

function resetPage() {
  deactivatePage();
  showSuccessMessage();

  document.addEventListener(`mousedown`, onSuccessMessageCloseClick);
  document.addEventListener(`keydown`, onSuccessMessageCloseEscKeydown);
}

function onPageResetButtonClick() {
  deactivatePage();
}

function submitForm(evt) {
  evt.preventDefault();

  uploadData(SERVER_UPLOAD_URL, new FormData(form), resetPage, showErrorMessage);
}

function activatePage() {
  loadData(SERVER_URL, (data) => {
    const mainPinAddress = getMainPinAddressWithTail();

    const offers = data.map(prepareOffers);
    const pins = generatePins(offers);
    renderPins(pins);

    mapPinMain.removeEventListener(`mousedown`, onMainPinMouseDown);
    mapPinMain.removeEventListener(`keydown`, onMainPinKeyDown);

    document.removeEventListener(`mousedown`, onSuccessMessageCloseClick);
    document.removeEventListener(`keydown`, onSuccessMessageCloseEscKeydown);

    activateMap(offers);
    activateForm(mainPinAddress);
    activateFilter(offers);

    form.addEventListener(`submit`, submitForm);
    pageResetButton.addEventListener(`click`, onPageResetButtonClick);
  },
  showErrorMessage);
}

function deactivatePage() {
  const mainPinAddress = getMainPinAddress();

  mapPinMain.addEventListener(`mousedown`, onMainPinMouseDown);
  mapPinMain.addEventListener(`keydown`, onMainPinKeyDown);

  deactivateMap();
  deactivateForm(mainPinAddress);
  deactivateFilter();

  form.removeEventListener(`submit`, submitForm);
  pageResetButton.removeEventListener(`click`, onPageResetButtonClick);
}


deactivatePage();
initializeErrorMessage();
initializeSuccessMessage();
