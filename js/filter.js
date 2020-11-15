'use strict';

(function () {
  // const {debounce} = window.utils;
  const {removeCards, removePins, renderPins} = window.map;
  const {generatePins} = window.pin;
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  let filteredOffers = [];
  let data = [];
  const LOW = 10000;
  const HIGH = 50000;
  // const DEBOUNCE_INTERVAL = 500;


  function filterByType(item) {
    return housingType.value === `any` || housingType.value === item.offer.type ? true : false;
  }

  function filterByPrice(item) {
    if (housingPrice.value === `any` ||
    (housingPrice.value === `low` && item.offer.price < LOW) ||
    (housingPrice.value === `middle` && item.offer.price >= LOW && item.offer.price < HIGH) ||
    (housingPrice.value === `high` && item.offer.price >= HIGH)) {
      return true;
    } else {
      return false;
    }
  }

  function filterByRooms(item) {
    return housingRooms.value === `any` || housingRooms.value === item.offer.rooms.toString() ? true : false;
  }

  function filterByGuests(item) {
    return housingGuests.value === `any` || housingGuests.value === item.offer.guests.toString() ? true : false;
  }

  function filterByFeatures(item) {
    const checkedFeatures = housingFeatures.querySelectorAll(`input:checked`);
    return Array.from(checkedFeatures).every((feature) => {
      return item.offer.features.includes(feature.value) ? true : false;
    });
  }

  function onFilterChange() {
    filteredOffers = data;
    filteredOffers = filteredOffers.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);

    removePins();
    removeCards();
    const pins = generatePins(filteredOffers);
    renderPins(pins);
  }

  function activateFilter(offers) {
    data = offers;
    housingType.addEventListener(`change`, onFilterChange);
    housingPrice.addEventListener(`change`, onFilterChange);
    housingRooms.addEventListener(`change`, onFilterChange);
    housingGuests.addEventListener(`change`, onFilterChange);
    housingFeatures.addEventListener(`change`, onFilterChange);
  }

  window.filter = {
    activateFilter
  };
})();
