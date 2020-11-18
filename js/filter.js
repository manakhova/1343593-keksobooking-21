'use strict';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEBOUNCE_INTERVAL = 500;
const {debounce} = window.utils;
const {removeCards, removePins, renderPins} = window.map;
const {generatePins, MAX_PIN_COUNT} = window.pin;
const mapFilter = document.querySelector(`.map__filters`);
const filterItems = mapFilter.querySelectorAll(`.map__filter`);
const filterFeatureItems = mapFilter.querySelector(`.map__features`);
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);
const housingFeatures = document.querySelector(`#housing-features`);
const debouncedFilter = debounce(filter, DEBOUNCE_INTERVAL);
let data = [];

function filter() {
  const filteredOffers = [];
  for (let i = 0; i < data.length; i++) {
    if (housingType.value !== `any` && data[i].offer.type !== housingType.value) {
      continue;
    }

    if (housingPrice.value !== `any` &&
      housingPrice.value === `low` && data[i].offer.price >= LOW_PRICE ||
      housingPrice.value === `middle` && (data[i].offer.price < LOW_PRICE || data[i].offer.price >= HIGH_PRICE) ||
      housingPrice.value === `high` && data[i].offer.price < HIGH_PRICE) {
      continue;
    }

    if (housingRooms.value !== `any` && data[i].offer.rooms.toString() !== housingRooms.value) {
      continue;
    }

    if (housingGuests.value !== `any` && data[i].offer.guests.toString() !== housingGuests.value) {
      continue;
    }

    if (!isFeatureExist(data[i].offer)) {
      continue;
    }

    filteredOffers.push(data[i]);
    if (filteredOffers.length === MAX_PIN_COUNT) {
      break;
    }
  }

  removeCards();
  removePins();

  const pins = generatePins(filteredOffers);
  renderPins(pins);
}

function isFeatureExist(offer) {
  const checkedFeatures = housingFeatures.querySelectorAll(`input:checked`);
  for (let i = 0; i < checkedFeatures.length; i++) {
    if (!offer.features.includes(checkedFeatures[i].value)) {
      return false;
    }
  }
  return true;
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
