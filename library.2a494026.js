!function(){function e(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=a.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var a=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,a.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,a){t[e]=a},a.parcelRequired7c6=i);var r=i("8nrFW"),s=i("6JpON"),o=document.querySelector(".movies-gallery"),c=(document.querySelector(".search-more"),document.querySelector(".load")),d=document.querySelector(".empty-gallery"),l=document.querySelector(".dropdown-library"),v=(document.querySelectorAll(".dropdown-item-library"),document.querySelector(".dropdown-menu-library")),m=document.querySelector(".modal-backdrop");document.querySelector(".film-card-close-btn");m.addEventListener("click",p);var u=[];function p(){var a=JSON.parse(localStorage.getItem("favoriteMovies"));if(!a||0===a.length)return o.innerHTML="",d.classList.remove("hide"),d.classList.add("show"),c.classList.remove("show"),c.classList.add("hide"),l.classList.remove("show"),void l.classList.add("hide");var n=a.map((function(e){return fetch("".concat("https://api.themoviedb.org/3/movie/").concat(e.id,"?api_key=").concat("14b16a10583a3d9315723a356100e4ad")).then((function(e){return e.json()}))}));Promise.all(n).then((function(a){var n;(n=u).push.apply(n,e(r)(a)),o.innerHTML="";var t=h(a);o.insertAdjacentHTML("beforeend",t),d.classList.add("hide"),d.classList.remove("show"),c.classList.add("show"),c.classList.remove("hide"),l.classList.add("show"),l.classList.remove("hide")})).catch((function(a){e(s).Notify.warning("OOPS... SOMETHING WENT WRONG")}))}c.classList.add("hide"),d.classList.add("show"),l.classList.add("hide");var h=function(e){return e.map((function(e){var a=e.poster_path,n=e.original_title,t=(e.release_date,e.popularity,e.id),i=e.vote_average,r=e.genres.map((function(e){return e.name})).slice(0,2).join(", "),s=(e.poster_path,e.release_date.slice(0,4)),o="https://image.tmdb.org/t/p/w500".concat(a);null===a&&(o="https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg");var c=i,d=10*Math.round(c);return'\n\n        <li class="movie-item">\n            <div class="movie" data-catalog-item id='.concat(t,'>\n                <img class="movie-img" src=').concat(o,'>\n\n\n                <div class="movie-info">\n                    <div class="info">\n                        <h2 class="movie-title">').concat(n,'</h2>\n                        <div class="genre_year">\n                            <h2 class="movie-genre">').concat(r,'</h2>\n                            <h2 class="movie-year">').concat(s,'</h2></div>\n                        </div>\n                    <div>\n                        <span class="movie-rating"></span>\n                    </div>\n                </div>\n            </div>\n            <div class="form_item form_item_library">\n            <div class="form_lebel"> </div>\n            <div data-ajax="true" class="rating rating_weekly  rating_set rating-hero">\n              <div class="rating_body">\n                <div class="rating_active ').concat(t,'" style="width: ').concat(d,'%;"></div>\n                <div class="rating_items">\n                  <input type="radio" class="rating_item" value="1" name="rating">\n                  <input type="radio" class="rating_item" value="2" name="rating">\n                  <input type="radio" class="rating_item" value="3" name="rating">\n                  <input type="radio" class="rating_item" value="4" name="rating">\n                  <input type="radio" class="rating_item" value="5" name="rating">\n                </div>\n              </div>\n            </div>\n          </div>\n        </li>')})).join("")};window.onload=p,v.addEventListener("click",(function(e){var a=e.target.dataset.filter,n=u.filter((function(e){return e.genres.map((function(e){return e.name.toLowerCase()})).includes(a.toLowerCase())}));if("all"===a.toLowerCase()){o.innerHTML="";var t=h(u);o.insertAdjacentHTML("beforeend",t),c.classList.add("show"),c.classList.remove("hide")}else if(n.length>0){o.innerHTML="";var i=h(n);o.insertAdjacentHTML("beforeend",i),c.classList.add("show"),c.classList.remove("hide")}else o.innerHTML='<h1 class="np_chosen">Sorry but there are no '.concat(a," movies in your Library...</h1>"),c.classList.add("hide"),c.classList.remove("show")}))}();
//# sourceMappingURL=library.2a494026.js.map