'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const xhr = new XMLHttpRequest();

  function loadData(url, onSuccess, onError) {
    xhr.responseType = `json`;

    function showStatus() {
      if (xhr.status === StatusCode.OK) {
        return onSuccess(xhr.response);
      } else {
        return onError(`Код ошибки: ${xhr.status} ${xhr.statusText}`);
      }
    }

    function showError() {
      return onError(`Произошла ошибка соединения с сервером ${url}`);
    }

    function showTimeoutError() {
      return onError(`Запрос на сервер ${url} не успел выполниться за ${xhr.timeout} мс`);
    }

    xhr.addEventListener(`load`, showStatus);
    xhr.addEventListener(`error`, showError);
    xhr.addEventListener(`timeout`, showTimeoutError);

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, url);
    xhr.send();
  }

  window.ajax = {
    loadData
  };
})();
