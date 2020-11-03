'use strict';

var roomNumber = document.querySelector(`#room_number`);
var titleInput = document.querySelector(`#title`);
var priceInput = document.querySelector(`#price`);
var typeSelect = document.querySelector(`#type`);
var timeIn = document.querySelector(`#timein`);
var timeOut = document.querySelector(`#timeout`);

(function () {
  const capacity = document.querySelector(`#capacity`);
  const capacityOptions = capacity.children;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const MIN_BUNGALOW_PRICE = 0;
  const MIN_FLAT_PRICE = 1000;
  const MIN_HOUSE_PRICE = 5000;
  const MIN_PALACE_PRICE = 10000;

  function disabledCapacities() {
    Array.from(capacityOptions).forEach((capacityOption) => {
      capacityOption.setAttribute(`disabled`, `disabled`);
    });
  }

  function validateCapacity() {
    disabledCapacities();

    if (roomNumber.value === `1`) {
      Array.from(capacityOptions).forEach((capacityOption) => {
        if (capacityOption.value === `1`) {
          capacityOption.removeAttribute(`disabled`, `disabled`);
        }
      });
    } else if (roomNumber.value === `2`) {
      Array.from(capacityOptions).forEach((capacityOption) => {
        if (capacityOption.value === `2` || capacityOption.value === `1`) {
          capacityOption.removeAttribute(`disabled`, `disabled`);
        }
      });
    } else if (roomNumber.value === `3`) {
      Array.from(capacityOptions).forEach((capacityOption) => {
        if (capacityOption.value !== `0`) {
          capacityOption.removeAttribute(`disabled`, `disabled`);
        }
      });
    } else {
      Array.from(capacityOptions).forEach((capacityOption) => {
        if (capacityOption.value === `0`) {
          capacityOption.removeAttribute(`disabled`, `disabled`);
        }
      });
    }
  }

  function validateType() {
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

  function validateTitleInput() {
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

  function validatePriceInput() {
    if (priceInput.value > 1000000) {
      priceInput.setCustomValidity(`Максимальная цена за ночь - ${MAX_PRICE}`);
    } else {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  }

  function synchronizeTime(evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  }

  window.form = {
    validateCapacity: validateCapacity,
    validateType: validateType,
    validateTitleInput: validateTitleInput,
    validatePriceInput: validatePriceInput,
    synchronizeTime: synchronizeTime
  };
})();
