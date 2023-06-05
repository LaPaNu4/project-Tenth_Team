const refs = {
  openFooterModalBtn: document.querySelector('[data-modal-open-contacts]'),
  footerBackdrop: document.querySelector('.footer-backdrop'),
  closeFooterModalBtn: document.querySelector('[data-modal-close-contacts]'),  
};

refs.openFooterModalBtn.addEventListener('click', onOpenFooterModal);
refs.closeFooterModalBtn.addEventListener('click', onCloseFooterModal);
refs.footerBackdrop.addEventListener('click', onClickFooterModalBackdrop);

function onOpenFooterModal() {
  refs.footerBackdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}

function onCloseFooterModal() {
  refs.footerBackdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

function onClickFooterModalBackdrop(e) {
  if (e.target.classList.contains('js-close-modal')) {
    onCloseFooterModal();
  }
}

function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseFooterModal();
  }
}

//   refs.openModalBtnF.addEventListener('click', toggleModal);
//   refs.closeModalBtnF.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modalFooter.classList.toggle('is-hidden');
//     refs.body.classList.toggle('no-scroll');
//   }
// // ********************************Внизу полура
// (() => {
//   const refs = {
//     openModalBtnF: document.querySelector('[data-modal-open-contacts]'),
//     closeModalBtnF: document.querySelector('[data-modal-close-contacts]'),
//     modalFooter: document.querySelector('[data-modal]'),
//     body: document.querySelector('body'),
//   };

//   refs.openModalBtnF.addEventListener('click', toggleModal);
//   refs.closeModalBtnF.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modalFooter.classList.toggle('is-hidden');
//     refs.body.classList.toggle('no-scroll');
//   }
  
// })();
