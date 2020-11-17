'use strict';

(function () {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const DEBOUNCE_INTERVAL = 500;
  const {debounce} = window.utils;
  const {removeCards, removePins, renderPins} = window.map;
  const {generatePins} = window.pin;
  const mapFilter = document.querySelector(`.map__filters`);
  const filterItems = mapFilter.querySelectorAll(`.map__filter`);
  const filterFeatureItems = mapFilter.querySelector(`.map__features`);
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  let data = [];
  const debouncedFilter = debounce(filter, DEBOUNCE_INTERVAL);


  function onFilterChange() {
    debouncedFilter();
  }

  function filter(offers) {
    const filteredOffers = [];
    for (let i = 0; i < 10; i++) {
      if (housingType) {
        return housingType.value === `any` || housingType.value === offers[i].offer.type ? true : false;
      }

      if (housingPrice) {
        return (housingPrice.value === `any` ||
        (housingPrice.value === `low` && offers[i].offer.price < LOW_PRICE) ||
        (housingPrice.value === `middle` && offers[i].offer.price >= LOW_PRICE && offers[i].offer.price < HIGH_PRICE) ||
        (housingPrice.value === `high` && offers[i].offer.price >= HIGH_PRICE));
      }

      if (housingRooms) {
        return housingRooms.value === `any` || housingRooms.value === offers[i].offer.rooms.toString();
      }

      if (housingGuests) {
        return housingGuests.value === `any` || housingGuests.value === offers[i].offer.guests.toString();
      }

      if (housingFeatures) {
        const checkedFeatures = housingFeatures.querySelectorAll(`input:checked`);
        return Array.from(checkedFeatures).every((feature) => {
          return offers[i].offer.features.includes(feature.value);
        });
      }

      filteredOffers.push(offers[i]);
      if (filteredOffers === 5) {
        break;
      }
    }
  }

  function activateFilter(offers) {
    data = offers;

    mapFilter.classList.remove(`map__filters--disabled`);
    filterItems.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
    filterFeatureItems.removeAttribute(`disabled`);

    housingType.addEventListener(`change`, onFilterChange);
    housingPrice.addEventListener(`change`, onFilterChange);
    housingRooms.addEventListener(`change`, onFilterChange);
    housingGuests.addEventListener(`change`, onFilterChange);
    housingFeatures.addEventListener(`change`, onFilterChange);
  }

  function resetFilter() {
    const selectItems = mapFilter.querySelectorAll(`select`);
    selectItems.forEach((item) => {
      item.value = `any`;
    });
    const features = housingFeatures.querySelectorAll(`input`);
    features.forEach((feature) => {
      feature.checked = false;
    });
  }

  function deactivateFilter() {
    resetFilter();

    mapFilter.classList.add(`map__filters--disabled`);
    filterItems.forEach((item) => {
      item.setAttribute(`disabled`, `disabled`);
    });
    filterFeatureItems.setAttribute(`disabled`, `disabled`);

    housingType.removeEventListener(`change`, onFilterChange);
    housingPrice.removeEventListener(`change`, onFilterChange);
    housingRooms.removeEventListener(`change`, onFilterChange);
    housingGuests.removeEventListener(`change`, onFilterChange);
    housingFeatures.removeEventListener(`change`, onFilterChange);
  }

  window.filter = {
    activateFilter,
    deactivateFilter
  };
})();
