var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in n){var i=n[e];delete n[e];var t={id:e,exports:{}};return a[e]=t,i.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,a){n[e]=a},e.parcelRequired7c6=i);var t=i("2shzp");const l=document.querySelector(".gallery-weekly-list");async function r(){return{genres:await async function(){const{data:e}=await t.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=ee5376443abaeb243d053aa1ffc4ea05");return e}().then((({genres:e})=>e))}}function s(e){r().then((({genres:a})=>{if(e){e.forEach((e=>{const{genre_ids:n,release_date:i}=e;a.forEach((({name:a,id:t})=>{n.includes(t)&&(n.length>2&&n.splice(2,n.length-1),n.splice(n.indexOf(t),1,a)),e.genre_names=n.join(", "),e.release_date&&(e.release_date=i.slice(0,4))}))}));const n=function(e){return e.slice(0,3).map((({original_title:e,release_date:a,genre_ids:n,poster_path:i,vote_average:t,id:l})=>{let r="";r=i?`https://image.tmdb.org/t/p/w400${i}`:"https://i.ibb.co/C0LFwTh/OIF.jpg";let s="";for(let e=1;e<=5;e++){let a="fa-star-o";2*e<t?a="fa-star":2*e-1<t&&(a="fa-star-half-o"),s+=`<span class="fa star ${a}"> </span>`}return` <li class='gallery-weekly__list-elem hover-cursor' id='${l}'>           \n          <img class='gallery-weekly__image' src="${r}" alt="${e}" loading="lazy" id='${l}'>\n         <div class='gallery-weekly__all-info'> \n          <div class="gallery-weekly__info">\n              <h3 class= 'gallery-weekly__title'>${e}</h3>\n              <div class='cards-list_second_line'>\n                <div class='cards-list__text'>\n                  <p>${n} | ${a}</p>\n                </div>\n              </div>\n          </div>\n          \n        </div>\n        <div class="form_item_weekly">\n            <div class="form_lebel"> </div>\n            <div data-ajax="true" class="rating rating_set rating-hero">\n                <div class="rating_body">\n                    <div class="rating_active"></div>\n                    <div class="rating_items">\n                        <input type="radio" class="rating_item" value="1" name="rating">\n                        <input type="radio" class="rating_item" value="2" name="rating">\n                        <input type="radio" class="rating_item" value="3" name="rating">\n                        <input type="radio" class="rating_item" value="4" name="rating">\n                        <input type="radio" class="rating_item" value="5" name="rating">\n                    </div>\n                </div>\n            </div>\n        </div>\n      </li>`})).join("")}(e);l&&(l.innerHTML=n)}}))}t.default.get("https://api.themoviedb.org/3/trending/movie/week?api_key=ee5376443abaeb243d053aa1ffc4ea05").then((e=>e.data)).then((({results:e})=>s(e)));
//# sourceMappingURL=index.5f9544aa.js.map