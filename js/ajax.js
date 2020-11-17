'use strict';

(function () {
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  function createXHR(method, url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
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

    xhr.open(method, url);
    return xhr;
  }

  function loadData(url, onSuccess, onError) {
    createXHR(`GET`, url, onSuccess, onError).send();
  }

  function uploadData(url, data, onSuccess, onError) {
    createXHR(`POST`, url, onSuccess, onError).send(data);
  }

  window.ajax = {
    loadData,
    uploadData
  };

})();
