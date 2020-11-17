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


  function filterByType(item) {
    return housingType.value === `any` || housingType.value === item.offer.type ? true : false;
  }

  function filterByPrice(item) {
    return (housingPrice.value === `any` ||
    (housingPrice.value === `low` && item.offer.price < LOW_PRICE) ||
    (housingPrice.value === `middle` && item.offer.price >= LOW_PRICE && item.offer.price < HIGH_PRICE) ||
    (housingPrice.value === `high` && item.offer.price >= HIGH_PRICE));
  }

  function filterByRooms(item) {
    return housingRooms.value === `any` || housingRooms.value === item.offer.rooms.toString();
  }

  function filterByGuests(item) {
    return housingGuests.value === `any` || housingGuests.value === item.offer.guests.toString();
  }

  function filterByFeatures(item) {
    const checkedFeatures = housingFeatures.querySelectorAll(`input:checked`);
    return Array.from(checkedFeatures).every((feature) => {
      return item.offer.features.includes(feature.value);
    });
  }

  function filter() {
    const filteredOffers = data.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);

    removePins();
    removeCards();
    const pins = generatePins(filteredOffers);
    renderPins(pins);
  }

  function onFilterChange() {
    debouncedFilter();
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
