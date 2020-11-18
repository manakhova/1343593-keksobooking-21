'use strict';

const {map, mapPinMain, getMainPinAddressWithTail, MAIN_PIN_HEIGHT, MAIN_PIN_TAIL_HEIGHT, MAIN_PIN_WIDTH, MAP_WIDTH, MAP_HEIGHT_TOP, MAP_HEIGHT_BOTTOM} = window.map;
const MAIN_PIN_TOP_LIMIT = MAP_HEIGHT_TOP - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
const MAIN_PIN_BOTTOM_LIMIT = MAP_HEIGHT_BOTTOM - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
const MAIN_PIN_LEFT_LIMIT = -MAIN_PIN_WIDTH / 2;
const MAIN_PIN_RIGHT_LIMIT = MAP_WIDTH - MAIN_PIN_WIDTH / 2;
const {setAddressValue} = window.form;


let startCoords = {
  x: mapPinMain.offsetLeft,
  y: mapPinMain.offsetTop
};

function getMainPinTop(mainPinCoords) {
  if (mainPinCoords.y <= MAIN_PIN_TOP_LIMIT) {
    return `${MAIN_PIN_TOP_LIMIT}px`;
  } else if (mainPinCoords.y >= MAIN_PIN_BOTTOM_LIMIT) {
    return `${MAIN_PIN_BOTTOM_LIMIT}px`;
  }
  return `${mainPinCoords.y}px`;
}

function getMainPinLeft(mainPinCoords) {
  if (mainPinCoords.x <= MAIN_PIN_LEFT_LIMIT) {
    return `${MAIN_PIN_LEFT_LIMIT}px`;
  } else if (mainPinCoords.y >= MAIN_PIN_RIGHT_LIMIT) {
    return `${MAIN_PIN_RIGHT_LIMIT}px`;
  }
  return `${mainPinCoords.x}px`;
}

function onMouseMove(evt) {
  evt.preventDefault();

  const shift = {
    x: startCoords.x - evt.clientX,
    y: startCoords.y - evt.clientY
  };

  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const mainPinCoords = {
    x: mapPinMain.offsetLeft - shift.x,
    y: mapPinMain.offsetTop - shift.y
  };

  mapPinMain.style.top = getMainPinTop(mainPinCoords);
  mapPinMain.style.left = getMainPinLeft(mainPinCoords);

  const mainPinAddress = getMainPinAddressWithTail();
  setAddressValue(`${mainPinAddress.x}, ${mainPinAddress.y}`);
}


function onMouseUp(evt) {
  evt.preventDefault();

  map.removeEventListener(`mousemove`, onMouseMove);
  map.removeEventListener(`mouseup`, onMouseUp);
}

function onMapPinMainMouseDown(evt) {
  evt.preventDefault();

  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  map.addEventListener(`mousemove`, onMouseMove);
  map.addEventListener(`mouseup`, onMouseUp);
}
mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
