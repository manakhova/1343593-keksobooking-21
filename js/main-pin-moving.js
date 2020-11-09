'use strict';

(function () {
  const {map, mapPinMain, MAIN_PIN_HEIGHT, MAIN_PIN_TAIL_HEIGHT, MAIN_PIN_WIDTH} = window.map;
  const {MAP_HEIGHT_BOTTOM, MAP_HEIGHT_TOP, MAP_WIDTH} = window.offer;
  const {addressInput} = window.form;
  const MAIN_PIN_TOP_LIMIT = MAP_HEIGHT_TOP - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
  const MAIN_PIN_BOTTOM_LIMIT = MAP_HEIGHT_BOTTOM - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
  const MAIN_PIN_LEFT_LIMIT = -MAIN_PIN_WIDTH / 2;
  const MAIN_PIN_RIGHT_LIMIT = MAP_WIDTH - MAIN_PIN_WIDTH / 2;

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const mainPinCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (mainPinCoords.y <= MAIN_PIN_TOP_LIMIT) {
        mapPinMain.style.top = `${MAIN_PIN_TOP_LIMIT}px`;
      } else if (mainPinCoords.y >= MAIN_PIN_BOTTOM_LIMIT) {
        mapPinMain.style.top = `${MAIN_PIN_BOTTOM_LIMIT}px`;
      } else {
        mapPinMain.style.top = `${mainPinCoords.y}px`;
      }

      if (mainPinCoords.x <= MAIN_PIN_LEFT_LIMIT) {
        mapPinMain.style.left = `${MAIN_PIN_LEFT_LIMIT}px`;
      } else if (mainPinCoords.y >= MAIN_PIN_RIGHT_LIMIT) {
        mapPinMain.style.left = `${MAIN_PIN_RIGHT_LIMIT}px`;
      } else {
        mapPinMain.style.left = `${mainPinCoords.x}px`;
      }

      const pinTailCoords = {
        x: Math.floor(mainPinCoords.x + MAIN_PIN_WIDTH / 2),
        y: Math.floor(mainPinCoords.y + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT)
      }

      addressInput.value = `${pinTailCoords.x}, ${pinTailCoords.y}`;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);
    }

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);
  });
})();
