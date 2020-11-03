'use strict';

(function () {
  const map = document.querySelector(`.map`);// почему не видит из map.js глобальную переменную map???
  const form = document.querySelector(`.ad-form`);
  const fieldsetHeader = document.querySelector(`.ad-form-header`);
  const fieldsetsMain = document.querySelectorAll(`.ad-form__element`);
  const addressInput = document.querySelector(`#address`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_TAIL_HEIGHT = 22;
  const MAIN_PIN_WIDTH = 65;

  /* global roomNumber, titleInput, priceInput, typeSelect, timeIn, timeOut */

  function getMainPinAddress() { // перенесла сюда, потому что не срабатывает из pin.js и еще это относится к главному пину, а не к генерируемым
    const mainPinAddress = {
      x: Math.floor(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2),
      y: Math.floor(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2)
    };
    return mainPinAddress;
  }

  function mainPinMouseDown() {
    activatePage();
  }

  function mainPinKeyDown(evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  }

  function activatePage() {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    fieldsetHeader.removeAttribute(`disabled`);
    fieldsetsMain.forEach((fieldsetMain) => {
      fieldsetMain.removeAttribute(`disabled`);
    });

    const mainPinAddress = getMainPinAddress();
    addressInput.value = `${mainPinAddress.x}, ${Math.floor(mainPinAddress.y + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TAIL_HEIGHT)}`;

    const offers = window.data.generateOffersArray(8);
    window.map.generatePins(offers);

    window.form.validateCapacity();
    window.form.validateType();// вызываю их тут, чтобы при активации страницы, валидация работала на выбранных по умолчанию вариантах

    mapPinMain.removeEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.removeEventListener(`keydown`, mainPinKeyDown);
    roomNumber.addEventListener(`change`, window.form.validateCapacity);
    map.addEventListener(`click`, window.map.mapClickFabric(offers));
    titleInput.addEventListener(`input`, window.form.validateTitleInput);
    priceInput.addEventListener(`input`, window.form.validatePriceInput);
    typeSelect.addEventListener(`change`, window.form.validateType);
    timeIn.addEventListener(`change`, window.form.synchronizeTime);
    timeOut.addEventListener(`change`, window.form.synchronizeTime);
  }


  function deactivatePage() {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    fieldsetHeader.setAttribute(`disabled`, `disabled`);
    fieldsetsMain.forEach((fieldsetMain) => {
      fieldsetMain.setAttribute(`disabled`, `disabled`);
    });

    const mainPinAddress = getMainPinAddress();
    addressInput.value = `${mainPinAddress.x}, ${mainPinAddress.y}`;

    mapPinMain.addEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.addEventListener(`keydown`, mainPinKeyDown);
  }

  deactivatePage();
})();
