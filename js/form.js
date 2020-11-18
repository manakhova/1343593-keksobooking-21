'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_BUNGALOW_PRICE = 0;
const MIN_FLAT_PRICE = 1000;
const MIN_HOUSE_PRICE = 5000;
const MIN_PALACE_PRICE = 10000;
const form = document.querySelector(`.ad-form`);
const fieldsetHeader = document.querySelector(`.ad-form-header`);
const fieldsetsMain = document.querySelectorAll(`.ad-form__element`);
const roomNumber = document.querySelector(`#room_number`);
const addressInput = document.querySelector(`#address`);
const titleInput = document.querySelector(`#title`);
const priceInput = document.querySelector(`#price`);
const typeSelect = document.querySelector(`#type`);
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);
const capacity = document.querySelector(`#capacity`);
const capacityOptions = capacity.children;
const RoomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

function disabledCapacities() {
  Array.from(capacityOptions).forEach((capacityOption) => {
    capacityOption.setAttribute(`disabled`, `disabled`);
  });
}

function onRoomNumberChange() {
  disabledCapacities();

  RoomCapacity[roomNumber.value].forEach((number) => {
    capacity.querySelector(`option[value = "${number}"]`).removeAttribute(`disabled`);
    capacity.value = number;
  });

}

function onTypeChange() {
  if (typeSelect.value === `bungalow`) {
    priceInput.min = MIN_BUNGALOW_PRICE;
    priceInput.placeholder = `0`;
    priceInput.setCustomValidity(`Минимальная цена за ночь - ${MIN_BUNGALOW_PRICE}`);
  } else if (typeSelect.value === `flat`) {
    priceInput.min = MIN_FLAT_PRICE;
    priceInput.placeholder = `1000`;
    priceInput.setCustomValidity(`Минимальная цена за ночь - ${MIN_FLAT_PRICE}`);
  } else if (typeSelect.value === `house`) {
    priceInput.min = MIN_HOUSE_PRICE;
    priceInput.placeholder = `5000`;
    priceInput.setCustomValidity(`Минимальная цена за ночь - ${MIN_HOUSE_PRICE}`);
  } else if (typeSelect.value === `palace`) {
    priceInput.min = MIN_PALACE_PRICE;
    priceInput.placeholder = `10000`;
    priceInput.setCustomValidity(`Минимальная цена за ночь - ${MIN_PALACE_PRICE}`);
  } else {
    priceInput.setCustomValidity(``);
  }
  priceInput.reportValidity();
}

function onTitleChange() {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Еще ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
}

function onPriceChange() {
  priceInput.setCustomValidity(priceInput.value > MAX_PRICE ? `Максимальная цена за ночь - ${MAX_PRICE}` : ``);
  priceInput.reportValidity();
}

function onTimeChange(evt) {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

function setAddressValue(value) {
  addressInput.value = value;
}

function activateForm(mainPinAddress) {
  form.classList.remove(`ad-form--disabled`);
  fieldsetHeader.removeAttribute(`disabled`);
  fieldsetsMain.forEach((fieldsetMain) => {
    fieldsetMain.removeAttribute(`disabled`);
  });

  onRoomNumberChange();
  onTypeChange();

  setAddressValue(`${mainPinAddress.x}, ${mainPinAddress.y}`);

  roomNumber.addEventListener(`change`, onRoomNumberChange);
  titleInput.addEventListener(`input`, onTitleChange);
  priceInput.addEventListener(`input`, onPriceChange);
  typeSelect.addEventListener(`change`, onTypeChange);
  timeIn.addEventListener(`change`, onTimeChange);
  timeOut.addEventListener(`change`, onTimeChange);
}

function deactivateForm(mainPinAddress) {
  form.reset();
  form.classList.add(`ad-form--disabled`);
  fieldsetHeader.setAttribute(`disabled`, `disabled`);
  fieldsetsMain.forEach((fieldsetMain) => {
    fieldsetMain.setAttribute(`disabled`, `disabled`);
  });

  setAddressValue(`${mainPinAddress.x}, ${mainPinAddress.y}`);

  roomNumber.removeEventListener(`change`, onRoomNumberChange);
  titleInput.removeEventListener(`input`, onTitleChange);
  priceInput.removeEventListener(`input`, onPriceChange);
  typeSelect.removeEventListener(`change`, onTypeChange);
  timeIn.removeEventListener(`change`, onTimeChange);
  timeOut.removeEventListener(`change`, onTimeChange);
}

window.form = {
  form,
  activateForm,
  deactivateForm,
  setAddressValue
};
