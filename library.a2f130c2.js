const e=document.querySelector(".movies-gallery"),s=(document.querySelector(".search-more"),document.querySelector(".load")),o=document.querySelector(".empty-gallery"),i=document.querySelector(".dropdown-library"),t=(document.querySelectorAll(".dropdown-item-library"),document.querySelector(".dropdown-menu-library"));s.classList.add("hide"),o.classList.add("show"),i.classList.add("hide");const n=[];const a=e=>e.map((e=>{const{poster_path:s,original_title:o,release_date:i,popularity:t,id:n}=e,a=`https://image.tmdb.org/t/p/w500${s}`;return void 0!==s&&""!==s||(a="./images/hero-img/coming-soon.jpg"),`\n\n        <li class="movie-item">\n            <div class="movie" data-catalog-item id=${n}>\n                <img class="movie-img" src=${a}>\n\n\n                <div class="movie-info">\n                    <div class="info">\n                        <h2 class="movie-title">${o}</h2>\n                        <div class="genre_year">\n                            <h2 class="movie-genre">${e.genres.map((e=>e.name)).slice(0,2).join(", ")}</h2>\n                            <h2 class="movie-year">${e.release_date.slice(0,4)}</h2></div>\n                        </div>\n                    <div>\n                        <span class="movie-rating"></span>\n                    </div>\n                </div>\n            </div>\n        </li>`})).join("");window.onload=function(){const t=JSON.parse(localStorage.getItem("favoriteMovies"));if(!t||0===t.length)return o.classList.remove("hide"),void o.classList.add("show");const r=t.map((e=>fetch(`https://api.themoviedb.org/3/movie/${e.id}?api_key=14b16a10583a3d9315723a356100e4ad`).then((e=>e.json()))));Promise.all(r).then((t=>{n.push(...t),e.innerHTML="";const r=a(t);e.insertAdjacentHTML("beforeend",r),o.classList.add("hide"),o.classList.remove("show"),s.classList.add("show"),s.classList.remove("hide"),i.classList.add("show"),i.classList.remove("hide")})).catch((e=>{console.log(e)}))},t.addEventListener("click",(o=>{const i=o.target.dataset.filter;console.log(i),console.log(n);const t=n.filter((e=>e.genres.map((e=>e.name.toLowerCase())).includes(i.toLowerCase())));if(console.log(t),t.length>0){e.innerHTML="";const o=a(t);e.insertAdjacentHTML("beforeend",o),s.classList.add("show"),s.classList.remove("hide")}else e.innerHTML=`<h1 class="np_chosen">Sorry but there are no ${i} movies in your Library...</h1>`,s.classList.add("hide"),s.classList.remove("show")}));
//# sourceMappingURL=library.a2f130c2.js.map
