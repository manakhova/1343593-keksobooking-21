'use strict';

function debounce(cb, timeout) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(cb, timeout);
  };
}

window.utils = {
  debounce
};
