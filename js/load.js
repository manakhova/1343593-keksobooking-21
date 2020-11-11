'use strict';

(function () {
  const serverURL = {
    load: `https://21.javascript.pages.academy/keksobooking/data`
  };
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const xhr = new XMLHttpRequest();

  function loadsData(onSuccess, onError) {
    xhr.responseType = `json`;

    function showStatus() {
      if (xhr.status === StatusCode.OK) {
        return onSuccess(xhr.response);
      } else {
        return onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    }

    function showError() {
      return onError(`Произошла ошибка соединения`);
    }

    function showTimeout() {
      return onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    }

    xhr.addEventListener(`load`, showStatus);
    xhr.addEventListener(`error`, showError);
    xhr.addEventListener(`timeout`, showTimeout);

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, serverURL.load);
    xhr.send();
  }

  window.load = {
    loadsData
  };
})();
