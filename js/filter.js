'use strict';

(function () {
  const {removeCards, removePins, renderPins} = window.map;
  const {generatePins} = window.pin;
  const housingType = document.querySelector(`#housing-type`);
  let filteredOffers = [];
  let data = [];


  function filterByType(item) {
    return housingType.value === `any` || housingType.value === item.offer.type ? true : false;
  }

  function onFilterChange() {
    filteredOffers = data;
    filteredOffers = filteredOffers.filter(filterByType);

    removePins();
    removeCards();
    const pins = generatePins(filteredOffers);
    renderPins(pins);
  }

  function activateFilter(offers) {
    data = offers;
    housingType.addEventListener(`change`, onFilterChange);
  }

  window.filter = {
    activateFilter
  };
})();
