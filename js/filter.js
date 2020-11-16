'use strict';

const {debounce} = window.utils;
const {removeCards, removePins, renderPins} = window.map;
const {generatePins} = window.pin;
const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);
const housingFeatures = document.querySelector(`#housing-features`);
let data = [];
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEBOUNCE_INTERVAL = 500;


function filterByType(item) {
  return housingType.value === `any` || housingType.value === item.offer.type ? true : false;
}

function filterByPrice(item) {
  if (housingPrice.value === `any` ||
  (housingPrice.value === `low` && item.offer.price < LOW_PRICE) ||
  (housingPrice.value === `middle` && item.offer.price >= LOW_PRICE && item.offer.price < HIGH_PRICE) ||
  (housingPrice.value === `high` && item.offer.price >= HIGH_PRICE)) {
    return true;
  } else {
    return false;
  }
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
  let filteredOffers = [];
  filteredOffers = data.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);

  removePins();
  removeCards();
  const pins = generatePins(filteredOffers);
  renderPins(pins);
}

function onFilterChange() {
  const debouncedFilter = debounce(filter, DEBOUNCE_INTERVAL);
  debouncedFilter();
}

function activateFilter(offers) {
  data = offers;
  housingType.addEventListener(`change`, onFilterChange);
  housingPrice.addEventListener(`change`, onFilterChange);
  housingRooms.addEventListener(`change`, onFilterChange);
  housingGuests.addEventListener(`change`, onFilterChange);
  housingFeatures.addEventListener(`change`, onFilterChange);
}

function deactivateFilter() {
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
