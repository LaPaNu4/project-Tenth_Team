var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},e={},i=t.parcelRequired7c6;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in e){var i=e[t];delete e[t];var o={id:t,exports:{}};return n[t]=o,i.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,n){e[t]=n},t.parcelRequired7c6=i);var o=i("2shzp");i("kEUo3");const s=document.querySelector(".upcoming-film");!async function(){try{const n=await async function(){return(await o.default.get("https://api.themoviedb.org/3/movie/upcoming?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.results}();if(0===n.length)return void(s.innerHTML='<div class="upcoming-error-container">\n    <p class="upcoming_error_container_text">\n    OOPS...<br />\n    We are very sorry!<br />\n    But we couldn\'t find any upcoming movies this month.\n    </p>\n  </div>');const e=n[Math.floor(Math.random()*n.length)],i=e.id.toString(),a=await async function({poster_path:t,backdrop_path:n,genre_ids:e,title:i,overview:s,vote_average:a,vote_count:l,release_date:r,popularity:c}){const p=await async function(t){const n=(await o.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.genres;return t.map((t=>n.find((n=>n.id===t)).name)).join(", ")}(e);return`\n  \n\n     <picture class='upcoming_img'>\n      <source srcset="https://image.tmdb.org/t/p/original/${n}" media="(min-width: 768px)" loading="lazy"/>\n      <source srcset="https://image.tmdb.org/t/p/original/${t}" media="(min-width: 320px)" loading="lazy"/>\n      <img src="https://image.tmdb.org/t/p/original/${t}" alt="Movie Poster" loading="lazy"/>\n    </picture>\n\n    <div class="upcoming_content">\n      <h3 class="upcoming_name">${i}</h3>\n\n      <div class="upcoming_thumb">\n        <ul class="upcoming-list left">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Release date</p>\n            <p class="upcoming_list_date color-p">${r}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Vote / Votes</p>\n            <p class="upcoming_list_vote">\n              <span class="vote">${a}</span> / <span class="vote">${l}</span>\n            </p>\n          </li>\n        </ul>\n\n        <ul class="upcoming-list right">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Popularity</p>\n            <p class="upcoming_list_pop">${c.toFixed(1)}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Genre</p>\n            <p class="upcoming_list_genre">${p}</p>\n          </li>\n        </ul>\n      </div>\n\n      <h3 class="upcoming_content_title color-h">About</h3>\n      <p class="upcoming_content_text">${s}</p>\n\n      <button type="button" class="upcoming_content_btn" id="addLibrary">\n         Add to my library\n      </button>\n    </div>\n  `}(e);t=a,s.innerHTML=t;const l=document.querySelector(".upcoming_content_btn");let r=localStorage.getItem("favoriteMovies"),c=JSON.parse(r);c=c||[],c.find((t=>t.id===i))&&(l.textContent="Remove from my library"),l.addEventListener("click",(()=>{let t=localStorage.getItem("favoriteMovies"),n=JSON.parse(t);if(n=n||[],n.find((t=>t.id===i))){let t=n.findIndex((t=>t.id===i));n.splice(t,1),localStorage.setItem("favoriteMovies",JSON.stringify(n)),l.textContent="Add to my library"}else{const t={id:i,start:""};n.push(t),localStorage.setItem("favoriteMovies",JSON.stringify(n)),l.textContent="Remove from my library"}}))}catch(t){console.log(t)}var t}();
//# sourceMappingURL=index.2bc56832.js.map
