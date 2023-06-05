let dropdownMenuLibrary = document.getElementById('dropdownMenuLibrary');
let dropdownToggleLibrary = document.querySelector('.dropdown-toggle-library');
let dropdownItemsLibrary = document.querySelectorAll('.dropdown-item-library');

dropdownToggleLibrary.addEventListener('click', toggleDropdownLibrary);
dropdownItemsLibrary.forEach(function(item) {
  item.addEventListener('click', selectOptionLibrary);
});

function toggleDropdownLibrary() {
  if (dropdownMenuLibrary.style.display === 'none' || dropdownMenuLibrary.style.display === '') {
    dropdownMenuLibrary.style.display = 'block';
    dropdownToggleLibrary.classList.toggle('rotated');
  } else {
    dropdownMenuLibrary.style.display = 'none';
  }
}

function selectOptionLibrary(e) {
  let selectedOptionLibrary = e.target;


  dropdownItemsLibrary.forEach(function(item) {
    item.classList.remove('dropdown-item-library-color');
  });


  selectedOptionLibrary.classList.add('dropdown-item-library-color');

  dropdownToggleLibrary.textContent = selectedOptionLibrary.textContent;
  dropdownToggleLibrary.classList.toggle('rotated');
  dropdownMenuLibrary.style.display = 'none';
}
