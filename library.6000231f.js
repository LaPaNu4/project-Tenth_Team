!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},i={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in i){var n=i[e];delete i[e];var a={id:e,exports:{}};return o[e]=a,n.call(a.exports,a,a.exports),a.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,n){i[e]=n},n.parcelRequired7c6=a);var t=a("8nrFW"),r=(a("dIxxU").all,document.querySelector(".movies-gallery")),s=(document.querySelector(".search-more"),document.querySelector(".load")),c=document.querySelector(".empty-gallery"),d=document.querySelector(".dropdown-library");document.querySelector(".dropdown-menu-library");s.classList.add("hide"),c.classList.add("hide"),d.classList.add("hide");var l=[];var u=function(e){return e.map((function(e){var n=e.poster_path,o=e.original_title,i=(e.release_date,e.popularity,e.id),a=e.genres.map((function(e){return e.name})).slice(0,2).join(", "),t=e.release_date.slice(0,4);return'\n        <li class="movie-item"  >\n            <div class="movie" data-catalog-item id='.concat(i,'>\n                <img class="movie-img" src="https://image.tmdb.org/t/p/w500').concat(n,'">\n                <div class="movie-info">\n                    <div class="info">\n                        <h2 class="movie-title">').concat(o,'</h2>\n                        <div class="genre_year">\n                            <h2 class="movie-genre">').concat(a,'</h2>\n                            <h2 class="movie-year">').concat(t,'</h2></div>\n                        </div>\n                    <div>\n                        <span class="movie-rating"></span>\n                    </div>\n                </div>\n            </div>\n        </li>')})).join("")};window.onload=function(){var n=JSON.parse(localStorage.getItem("favoriteMovies"));if(!n||0===n.length)return c.classList.remove("hide"),void c.classList.add("show");var o=n.map((function(e){return fetch("".concat("https://api.themoviedb.org/3/movie/").concat(e.id,"?api_key=").concat("14b16a10583a3d9315723a356100e4ad")).then((function(e){return e.json()}))}));Promise.all(o).then((function(n){var o;(o=l).push.apply(o,e(t)(n)),r.innerHTML="";var i=u(n);r.insertAdjacentHTML("beforeend",i),s.classList.add("show"),s.classList.remove("hide"),d.classList.add("show"),d.classList.remove("hide")})).catch((function(e){console.log(e)}))}}();
//# sourceMappingURL=library.6000231f.js.map