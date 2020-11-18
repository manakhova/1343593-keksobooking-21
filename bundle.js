(()=>{"use strict";(()=>{function e(e,t,n,o){const r=new XMLHttpRequest;return r.responseType="json",r.addEventListener("load",(function(){return 200===r.status?n(r.response):o(`Код ошибки: ${r.status} ${r.statusText}`)})),r.addEventListener("error",(function(){return o("Произошла ошибка соединения с сервером "+t)})),r.addEventListener("timeout",(function(){return o(`Запрос на сервер ${t} не успел выполниться за ${r.timeout} мс`)})),r.timeout=1e4,r.open(e,t),r}window.ajax={loadData:function(t,n,o){e("GET",t,n,o).send()},uploadData:function(t,n,o,r){e("POST",t,o,r).send(n)}}})(),window.utils={debounce:function(e,t){let n;return function(){n&&clearTimeout(n),n=setTimeout(e,t)}}},(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");function t(t){const n=e.cloneNode(!0);n.dataset.offerId=t.id;const o=n.querySelector("img");return o.src=t.author.avatar,o.alt=t.offer.title,n.style.left=t.location.x-25+"px",n.style.top=t.location.y-70+"px",n}window.pin={generatePins:function(e){const n=document.createDocumentFragment(),o=e.length>5?5:e.length;for(let r=0;r<o;r++)n.appendChild(t(e[r]));return n},MAX_PIN_COUNT:5}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card");e.querySelector(".popup__features").innerHTML="",e.querySelector(".popup__photos").innerHTML="";const t={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"};window.card={createCardElement:function(n){const o=e.cloneNode(!0);return""!==n.author.avatar?o.querySelector(".popup__avatar").src=n.author.avatar:o.querySelector(".popup__avatar").remove(),""!==n.offer.title?o.querySelector(".popup__title").textContent=n.offer.title:o.querySelector(".popup__title").remove(),""!==n.offer.adress?o.querySelector(".popup__text--address").textContent=n.offer.adress:o.querySelector(".popup__text--address").remove(),null!==n.offer.price?o.querySelector(".popup__text--price").textContent=n.offer.price:o.querySelector(".popup__text--price").remove(),""!==n.offer.type?o.querySelector(".popup__type").textContent=t[n.offer.type]:o.querySelector(".popup__type").remove(),null!==n.offer.rooms&&null!==n.offer.guests?o.querySelector(".popup__text--capacity").textContent=`${n.offer.rooms} комнат(-a/-ы) для ${n.offer.guests} гостей`:o.querySelector(".popup__text--capacity").remove(),""!==n.offer.checkin&&""!==n.offer.checkout?o.querySelector(".popup__text--time").textContent=`Заезд после ${n.offer.checkin}, выезд до ${n.offer.checkout}`:o.querySelector(".popup__text--time").remove(),n.offer.features.length>0?o.querySelector(".popup__features").appendChild(function(e){const t=document.createDocumentFragment();return e.forEach((e=>{const n=document.createElement("li");n.classList.add("popup__feature","popup__feature--"+e),t.appendChild(n)})),t}(n.offer.features)):o.querySelector(".popup__features").remove(),""!==n.offer.description?o.querySelector(".popup__description").textContent=n.offer.description:o.querySelector(".popup__description").remove(),n.offer.photos.length>0?o.querySelector(".popup__photos").appendChild(function(e){const t=document.createDocumentFragment();return e.forEach((e=>{const n=document.createElement("img");n.classList.add("popup__photo"),n.width=45,n.height=40,n.src=e,t.appendChild(n)})),t}(n.offer.photos)):o.querySelector(".popup__photos").remove(),o.dataset.id=n.id,o}}})(),(()=>{const{createCardElement:e}=window.card,t=document.querySelector(".map"),n=t.querySelector(".map__pins"),o=t.querySelector(".map__filters-container"),r=document.querySelector(".map__pin--main");let a,i=[];function c(){document.querySelectorAll("article.map__card").forEach((e=>{e.querySelector("button.popup__close").removeEventListener("click",s),document.removeEventListener("keydown",u),e.remove()}))}function s(){c(),a.classList.remove("map__pin--active")}function u(e){"Escape"===e.key&&(c(),a.classList.remove("map__pin--active"))}function d(n){a&&a.classList.remove("map__pin--active"),a=n,a.classList.add("map__pin--active");const r=n.dataset.offerId;if(r){c();const n=e(i[r]);t.insertBefore(n,o),n.querySelector("button.popup__close").addEventListener("click",s),document.addEventListener("keydown",u)}}function l(e){e.target.parentNode.classList.contains("map__pin")&&d(e.target.parentNode)}function p(e){"Enter"===e.key&&d(e.target)}function m(){t.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))}window.map={map:t,mapPinMain:r,getMainPinAddress:function(){return{x:Math.floor(parseInt(r.style.left,10)+32.5),y:Math.floor(parseInt(r.style.top,10)+32.5)}},getMainPinAddressWithTail:function(){return{x:Math.floor(parseInt(r.style.left,10)+32.5),y:Math.floor(parseInt(r.style.top,10)+65+22)}},activateMap:function(e){i=e,t.classList.remove("map--faded"),t.addEventListener("click",l),t.addEventListener("keydown",p)},deactivateMap:function(){m(),c(),t.classList.add("map--faded"),t.removeEventListener("click",l),t.removeEventListener("keydown",p)},removeCards:c,removePins:m,renderPins:function(e){n.appendChild(e)},MAIN_PIN_HEIGHT:65,MAIN_PIN_TAIL_HEIGHT:22,MAIN_PIN_WIDTH:65,MAP_WIDTH:1200,MAP_HEIGHT_TOP:130,MAP_HEIGHT_BOTTOM:630}})(),(()=>{const{debounce:e}=window.utils,{removeCards:t,removePins:n,renderPins:o}=window.map,{generatePins:r,MAX_PIN_COUNT:a}=window.pin,i=document.querySelector(".map__filters"),c=i.querySelectorAll(".map__filter"),s=i.querySelector(".map__features"),u=document.querySelector("#housing-type"),d=document.querySelector("#housing-price"),l=document.querySelector("#housing-rooms"),p=document.querySelector("#housing-guests"),m=document.querySelector("#housing-features"),f=e((function(){const e=[];for(let t=0;t<v.length&&("any"!==u.value&&v[t].offer.type!==u.value||"any"!==d.value&&"low"===d.value&&v[t].offer.price>=1e4||"middle"===d.value&&(v[t].offer.price<1e4||v[t].offer.price>=5e4)||"high"===d.value&&v[t].offer.price<5e4||"any"!==l.value&&v[t].offer.rooms.toString()!==l.value||"any"!==p.value&&v[t].offer.guests.toString()!==p.value||!y(v[t].offer)||(e.push(v[t]),e.length!==a));t++);t(),n();const i=r(e);o(i)}),500);let v=[];function y(e){const t=m.querySelectorAll("input:checked");for(let n=0;n<t.length;n++)if(!e.features.includes(t[n].value))return!1;return!0}function _(){f()}window.filter={activateFilter:function(e){v=e,i.classList.remove("map__filters--disabled"),c.forEach((e=>{e.removeAttribute("disabled")})),s.removeAttribute("disabled"),u.addEventListener("change",_),d.addEventListener("change",_),l.addEventListener("change",_),p.addEventListener("change",_),m.addEventListener("change",_)},deactivateFilter:function(){i.querySelectorAll("select").forEach((e=>{e.value="any"})),m.querySelectorAll("input").forEach((e=>{e.checked=!1})),i.classList.add("map__filters--disabled"),c.forEach((e=>{e.setAttribute("disabled","disabled")})),s.setAttribute("disabled","disabled"),u.removeEventListener("change",_),d.removeEventListener("change",_),l.removeEventListener("change",_),p.removeEventListener("change",_),m.removeEventListener("change",_)}}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".ad-form-header"),n=document.querySelectorAll(".ad-form__element"),o=document.querySelector("#room_number"),r=document.querySelector("#address"),a=document.querySelector("#title"),i=document.querySelector("#price"),c=document.querySelector("#type"),s=document.querySelector("#timein"),u=document.querySelector("#timeout"),d=document.querySelector("#capacity"),l=d.children,p={1:[1],2:[1,2],3:[1,2,3],100:[0]};function m(){Array.from(l).forEach((e=>{e.setAttribute("disabled","disabled")})),p[o.value].forEach((e=>{d.querySelector(`option[value = "${e}"]`).removeAttribute("disabled"),d.value=e}))}function f(){"bungalow"===c.value?(i.min=0,i.placeholder="0",i.setCustomValidity("Минимальная цена за ночь - 0")):"flat"===c.value?(i.min=1e3,i.placeholder="1000",i.setCustomValidity("Минимальная цена за ночь - 1000")):"house"===c.value?(i.min=5e3,i.placeholder="5000",i.setCustomValidity("Минимальная цена за ночь - 5000")):"palace"===c.value?(i.min=1e4,i.placeholder="10000",i.setCustomValidity("Минимальная цена за ночь - 10000")):i.setCustomValidity(""),i.reportValidity()}function v(){const e=a.value.length;e<30?a.setCustomValidity(`Еще ${30-e} симв.`):e>100?a.setCustomValidity(`Удалите лишние ${e-100} симв.`):a.setCustomValidity(""),a.reportValidity()}function y(){i.setCustomValidity(i.value>1e6?"Максимальная цена за ночь - 1000000":""),i.reportValidity()}function _(e){s.value=e.target.value,u.value=e.target.value}function h(e){r.value=e}window.form={form:e,activateForm:function(r){e.classList.remove("ad-form--disabled"),t.removeAttribute("disabled"),n.forEach((e=>{e.removeAttribute("disabled")})),m(),f(),h(`${r.x}, ${r.y}`),o.addEventListener("change",m),a.addEventListener("input",v),i.addEventListener("input",y),c.addEventListener("change",f),s.addEventListener("change",_),u.addEventListener("change",_)},deactivateForm:function(r){e.reset(),e.classList.add("ad-form--disabled"),t.setAttribute("disabled","disabled"),n.forEach((e=>{e.setAttribute("disabled","disabled")})),h(`${r.x}, ${r.y}`),o.removeEventListener("change",m),a.removeEventListener("input",v),i.removeEventListener("input",y),c.removeEventListener("change",f),s.removeEventListener("change",_),u.removeEventListener("change",_)},setAddressValue:h}})(),(()=>{const{map:e,mapPinMain:t,getMainPinAddressWithTail:n,MAIN_PIN_HEIGHT:o,MAIN_PIN_TAIL_HEIGHT:r,MAIN_PIN_WIDTH:a,MAP_WIDTH:i,MAP_HEIGHT_TOP:c,MAP_HEIGHT_BOTTOM:s}=window.map,u=c-o-r,d=s-o-r,l=-a/2,p=i-a/2,{setAddressValue:m}=window.form;let f={x:t.offsetLeft,y:t.offsetTop};function v(e){e.preventDefault();const o=f.x-e.clientX,r=f.y-e.clientY;f={x:e.clientX,y:e.clientY};const a={x:t.offsetLeft-o,y:t.offsetTop-r};t.style.top=function(e){return e.y<=u?u+"px":e.y>=d?d+"px":e.y+"px"}(a),t.style.left=function(e){return e.x<=l?l+"px":e.y>=p?p+"px":e.x+"px"}(a);const i=n();m(`${i.x}, ${i.y}`)}function y(t){t.preventDefault(),e.removeEventListener("mousemove",v),e.removeEventListener("mouseup",y)}t.addEventListener("mousedown",(function(t){t.preventDefault(),f={x:t.clientX,y:t.clientY},e.addEventListener("mousemove",v),e.addEventListener("mouseup",y)}))})(),(()=>{const{mapPinMain:e,activateMap:t,deactivateMap:n,getMainPinAddress:o,getMainPinAddressWithTail:r,renderPins:a}=window.map,{activateForm:i,deactivateForm:c,form:s}=window.form,{generatePins:u}=window.pin,{loadData:d,uploadData:l}=window.ajax,{activateFilter:p,deactivateFilter:m}=window.filter,f=document.querySelector("main"),v=document.querySelector(".ad-form__reset");function y(){T()}function _(e){"Enter"===e.key&&T()}function h(e,t){return e.id=t,e}function E(e){const t=document.querySelector("#error-message");t.querySelector(".error__message").textContent=e,t.classList.remove("hidden")}function L(){w()}function S(e){"Escape"===e.key&&w()}function q(){b()}function g(e){"Escape"===e.key&&b()}function w(){document.querySelector("#error-message").classList.add("hidden")}function b(){document.querySelector(".success").classList.add("hidden")}function A(){I(),document.querySelector(".success").classList.remove("hidden"),document.addEventListener("mousedown",q),document.addEventListener("keydown",g)}function x(){I()}function M(e){e.preventDefault(),l("https://21.javascript.pages.academy/keksobooking",new FormData(s),A,E)}function T(){d("https://21.javascript.pages.academy/keksobooking/data",(n=>{const o=r(),c=n.map(h),d=u(c);a(d),e.removeEventListener("mousedown",y),e.removeEventListener("keydown",_),document.removeEventListener("mousedown",q),document.removeEventListener("keydown",g),t(c),i(o),p(c),s.addEventListener("submit",M),v.addEventListener("click",x)}),E)}function I(){const t=o();e.addEventListener("mousedown",y),e.addEventListener("keydown",_),n(),c(t),m(),s.removeEventListener("submit",M),v.removeEventListener("click",x)}I(),function(){const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),t=e.querySelector(".error__button");e.id="error-message",e.classList.add("hidden"),f.appendChild(e),t.addEventListener("mousedown",L),document.addEventListener("mousedown",L),document.addEventListener("keydown",S)}(),function(){const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0);e.classList.add("hidden"),f.appendChild(e)}()})()})();