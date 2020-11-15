'use strict';

(function () {
  const {removeCards, removePins, renderPins} = window.map;
  const {generatePins} = window.pin;
  const housingType = document.querySelector(`#housing-type`);
  let filteredOffers = [];

  function filterByType(item) {
    return housingType.value === `any` || housingType.value === item.offer.type ? true : false;
  }

  function onFilterChange(offers) {
    filteredOffers = offers.filter(filterByType);

    removePins();
    removeCards();
    const pins = generatePins(filteredOffers);
    renderPins(pins);
  }

  function activateFilter(offers) {
    housingType.addEventListener(`change`, onFilterChange(offers));
  }

  window.filter = {
    activateFilter
  };
})();
