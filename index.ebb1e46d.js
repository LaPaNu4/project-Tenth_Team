var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in a)return a[e].exports;if(e in n){var t=n[e];delete n[e];var l={id:e,exports:{}};return a[e]=l,t.call(l.exports,l,l.exports),l.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,a){n[e]=a},e.parcelRequired7c6=t);var l=t("2shzp");const i=document.querySelector(".gallery-weekly-list");async function r(){return{genres:await async function(){const{data:e}=await l.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=ee5376443abaeb243d053aa1ffc4ea05");return e}().then((({genres:e})=>e))}}function s(e){r().then((({genres:a})=>{if(e){e.forEach((e=>{const{genre_ids:n,release_date:t}=e;a.forEach((({name:a,id:l})=>{n.includes(l)&&(n.length>2&&n.splice(2,n.length-1),n.splice(n.indexOf(l),1,a)),e.genre_names=n.join(", "),e.release_date&&(e.release_date=t.slice(0,4))}))}));const n=function(e){return e.slice(0,3).map((({original_title:e,release_date:a,genre_ids:n,poster_path:t,vote_average:l,id:i})=>{let r="";r=t?`https://image.tmdb.org/t/p/w400${t}`:"https://i.ibb.co/C0LFwTh/OIF.jpg";let s="";for(let e=1;e<=5;e++){let a="fa-star-o";2*e<l?a="fa-star":2*e-1<l&&(a="fa-star-half-o"),s+=`<span class="fa star ${a}"> </span>`}return` <li class='gallery-weekly__list-elem hover-cursor' id='${i}'>           \n          <img class='gallery-weekly__image' src="${r}" alt="${e}" loading="lazy" id='${i}'>\n         <div class='gallery-weekly__all-info'> \n          <div class="gallery-weekly__info">\n              <h3 class= 'gallery-weekly__title'>${e}</h3>\n              <div class='cards-list_second_line'>\n                <div class='cards-list__text'>\n                  <p>${n} | ${a}</p>\n                </div>\n              </div>\n          </div>\n          <div class='star-rate'>\n                  ${s}\n          </div>\n        </div>\n      </li>`})).join("")}(e);i&&(i.innerHTML=n)}}))}l.default.get("https://api.themoviedb.org/3/trending/movie/week?api_key=ee5376443abaeb243d053aa1ffc4ea05").then((e=>e.data)).then((({results:e})=>s(e)));
//# sourceMappingURL=index.ebb1e46d.js.map
