function t(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},i={},o=n.parcelRequired7c6;null==o&&((o=function(t){if(t in e)return e[t].exports;if(t in i){var n=i[t];delete i[t];var o={id:t,exports:{}};return e[t]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,n){i[t]=n},n.parcelRequired7c6=o);var a=o("2shzp");o("kEUo3");var s=o("7Y9D8");const l=document.querySelector(".upcoming-film");!async function(){try{const t=await async function(){return(await a.default.get("https://api.themoviedb.org/3/movie/upcoming?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.results}();if(0===t.length)return void(l.innerHTML='<div class="upcoming-error-container">\n    <p class="upcoming_error_container_text">\n    OOPS...<br />\n    We are very sorry!<br />\n    But we couldn\'t find any upcoming movies this month.\n    </p>\n  </div>');const e=t[Math.floor(Math.random()*t.length)],i=e.id.toString(),o=await async function({poster_path:t,backdrop_path:n,genre_ids:e,title:i,overview:o,vote_average:s,vote_count:l,release_date:r,popularity:c}){const p=await async function(t){const n=(await a.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.genres;return t.map((t=>n.find((n=>n.id===t)).name)).join(", ")}(e);return`\n  \n\n     <picture class='upcoming_img'>\n      <source srcset="https://image.tmdb.org/t/p/original/${n}" media="(min-width: 768px)" loading="lazy"/>\n      <source srcset="https://image.tmdb.org/t/p/original/${t}" media="(min-width: 320px)" loading="lazy"/>\n      <img src="https://image.tmdb.org/t/p/original/${t}" alt="Movie Poster" loading="lazy"/>\n    </picture>\n\n    <div class="upcoming_content">\n      <h3 class="upcoming_name">${i}</h3>\n\n      <div class="upcoming_thumb">\n        <ul class="upcoming-list left">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Release date</p>\n            <p class="upcoming_list_date color-p">${r}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Vote / Votes</p>\n            <p class="upcoming_list_vote">\n              <span class="vote">${s}</span> / <span class="vote">${l}</span>\n            </p>\n          </li>\n        </ul>\n\n        <ul class="upcoming-list right">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Popularity</p>\n            <p class="upcoming_list_pop">${c.toFixed(1)}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Genre</p>\n            <p class="upcoming_list_genre">${p}</p>\n          </li>\n        </ul>\n      </div>\n\n      <h3 class="upcoming_content_title color-h">About</h3>\n      <p class="upcoming_content_text">${o}</p>\n\n      <button type="button" class="upcoming_content_btn" id="addLibrary">\n         Add to my library\n      </button>\n    </div>\n  `}(e);n=o,l.innerHTML=n;const s=document.querySelector(".upcoming_content_btn");let r=localStorage.getItem("favoriteMovies"),c=JSON.parse(r);c=c||[],c.find((t=>t.id===i))&&(s.textContent="Remove from my library"),s.addEventListener("click",(()=>{let t=localStorage.getItem("favoriteMovies"),n=JSON.parse(t);if(n=n||[],n.find((t=>t.id===i))){let t=n.findIndex((t=>t.id===i));n.splice(t,1),localStorage.setItem("favoriteMovies",JSON.stringify(n)),s.textContent="Add to my library"}else{const t={id:i,start:""};n.push(t),localStorage.setItem("favoriteMovies",JSON.stringify(n)),s.textContent="Remove from my library"}}))}catch(n){t(s).Notify.warning("OOPS... SOMETHING WENT WRONG")}var n}();
//# sourceMappingURL=index.a5c227f5.js.map