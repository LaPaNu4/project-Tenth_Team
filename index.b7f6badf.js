var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},e={},o=t.parcelRequired7c6;null==o&&((o=function(t){if(t in n)return n[t].exports;if(t in e){var o=e[t];delete e[t];var i={id:t,exports:{}};return n[t]=i,o.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,n){e[t]=n},t.parcelRequired7c6=o);var i=o("2shzp");o("kEUo3");const s=document.querySelector(".upcoming-film");!async function(){try{const n=await async function(){return(await i.default.get("https://api.themoviedb.org/3/movie/upcoming?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.results}();if(0===n.length)return void(s.innerHTML='<div class="upcoming-error-container">\n    <p class="upcoming_error_container_text">\n    OOPS...<br />\n    We are very sorry!<br />\n    But we couldn\'t find any upcoming movies this month.\n    </p>\n  </div>');const e=n[Math.floor(Math.random()*n.length)],o=e.id,l=await async function({backdrop_path:t,genre_ids:n,title:e,overview:o,vote_average:s,vote_count:l,release_date:a,popularity:c}){const r=await async function(t){const n=(await i.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=0b7ed72c0b07bc683ffc3b8a0e430792")).data.genres;return t.map((t=>n.find((n=>n.id===t)).name)).join(", ")}(n);return`\n    <img\n      class="upcoming_img"\n      src="https://image.tmdb.org/t/p/original${t}"\n      alt="Poster ${e}"\n    />\n\n    <div class="upcoming_content">\n      <h3 class="upcoming_name">${e}</h3>\n\n      <div class="upcoming_thumb">\n        <ul class="upcoming-list left">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Release date</p>\n            <p class="upcoming_list_date color-p">${a}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Vote / Votes</p>\n            <p class="upcoming_list_vote">\n              <span class="vote">${s}</span> / <span class="vote">${l}</span>\n            </p>\n          </li>\n        </ul>\n\n        <ul class="upcoming-list right">\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Popularity</p>\n            <p class="upcoming_list_pop">${c.toFixed(1)}</p>\n          </li>\n          <li class="upcoming_list_item">\n            <p class="upcoming_list_text color-h">Genre</p>\n            <p class="upcoming_list_genre">${r}</p>\n          </li>\n        </ul>\n      </div>\n\n      <h3 class="upcoming_content_title color-h">About</h3>\n      <p class="upcoming_content_text">${o}</p>\n\n      <button type="button" class="upcoming_content_btn" id="addLibrary">\n         Add to my library\n      </button>\n    </div>\n  `}(e);t=l,s.innerHTML=t;const a=document.querySelector(".upcoming_content_btn");let c=localStorage.getItem("favoriteMovies"),r=JSON.parse(c);r=r||[],r.includes(o)?a.textContent="Remove from my library":a.textContent="Add to my library",a.addEventListener("click",(()=>{let t=localStorage.getItem("favoriteMovies"),n=JSON.parse(t);if(n=n||[],n.includes(o)){let t=n.findIndex((t=>t===o));n.splice(t,1),localStorage.setItem("favoriteMovies",JSON.stringify(n)),a.textContent="Add to my library"}else n.push(o),localStorage.setItem("favoriteMovies",JSON.stringify(n)),a.textContent="Remove from my library"}))}catch(t){console.log(t)}var t}();
//# sourceMappingURL=index.b7f6badf.js.map
