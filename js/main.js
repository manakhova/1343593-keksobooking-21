'use strict';

(function () {
  const {mapPinMain, activateMap, deactivateMap, getMainPinAddress, getMainPinAddressWithTail} = window.map;
  const {activateForm, deactivateForm} = window.form;
  const {generateOffersArray} = window.offer;
  const {generatePins} = window.pin;

  function mainPinMouseDown() {
    activatePage();
  }

  function mainPinKeyDown(evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  }

  function activatePage() {
    const mainPinAddress = getMainPinAddressWithTail();

    const offers = generateOffersArray(8);
    const pins = generatePins(offers);

    mapPinMain.removeEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.removeEventListener(`keydown`, mainPinKeyDown);

    activateMap(pins, offers);
    activateForm(mainPinAddress);
  }

  function deactivatePage() {
    const mainPinAddress = getMainPinAddress();

    mapPinMain.addEventListener(`mousedown`, mainPinMouseDown);
    mapPinMain.addEventListener(`keydown`, mainPinKeyDown);

    deactivateMap();
    deactivateForm(mainPinAddress);
  }

  deactivatePage();
})();
