let e=document.getElementById("dropdownMenuLibrary"),t=document.querySelector(".dropdown-toggle-library"),o=document.querySelectorAll(".dropdown-item-library");function n(n){let l=n.target;o.forEach((function(e){e.classList.remove("dropdown-item-library-color")})),l.classList.add("dropdown-item-library-color"),t.textContent=l.textContent,e.style.display="none"}t.addEventListener("click",(function(){t.classList.toggle("rotated"),"none"===e.style.display||""===e.style.display?e.style.display="block":e.style.display="none"})),o.forEach((function(e){e.addEventListener("click",n)}));
//# sourceMappingURL=library.27a3ce29.js.map