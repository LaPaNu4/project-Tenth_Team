document.querySelector('.themetoggle').addEventListener('click', (event) => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'light'){
      localStorage.removeItem('theme');
  }
  else{
      localStorage.setItem('theme', 'light')
  }
  addDarkClassToHTML()
  });

      
  function addDarkClassToHTML() {
      try {
          if (localStorage.getItem('theme') === 'light') {
            document.querySelector('body').classList.add('light');
            document.querySelector('.main-header').classList.add('light');
            document.querySelector('.mobile-menu').classList.add('light');
            document.querySelector('.button-subject').style.display = "none";
            document.querySelector('.button-subjectlight').style.display = "flex";
            document.querySelector('.text-logo').classList.add('lightblack');
            document.querySelector('.upcoming_title').classList.add('lightblack');
            document.querySelector('.upcoming_name').classList.add('lightblack');
            document.querySelector('.upcoming_list_pop').classList.add('lightcolordark');
            document.querySelector('.upcoming_list_genre').classList.add('lightcolordark');
            document.querySelector('.links').classList.add('lightcolor');
            document.querySelector('.menu-btn-mobile').classList.add('lightcolor');
            document.querySelector('.footer-copyright').classList.add('lightcolor');
            document.querySelector('.footer-copyright--btn').classList.add('lightcolor');
            document.querySelector('.search-form').classList.add('borderlight');
            document.querySelector('.upcoming_content_text').classList.add('lightcolordark');
            document.querySelector('.upcoming_content_title').classList.add('lightblack');
            document.querySelectorAll('.mobile-menu-link').forEach(mobileItem=>{
              mobileItem.classList.add('lightblack')
            })
           
            
          }
          else {
              document.querySelector('body').classList.remove('light');
              document.querySelector('.mobile-menu').classList.remove('light');
              document.querySelector('.button-subjectlight').style.display = "none";
              document.querySelector('.button-subject').style.display = "flex";
              document.querySelector('.text-logo').classList.remove('lightblack');
              document.querySelector('.links').classList.remove('lightcolor');
              document.querySelector('.menu-btn-mobile').classList.remove('lightcolor');
              document.querySelector('.main-header').classList.remove('light');
              document.querySelector('.footer-copyright').classList.remove('lightcolor');
              document.querySelector('.footer-copyright--btn').classList.remove('lightcolor');
              document.querySelector('.search-form').classList.remove('borderlight');
              document.querySelector('.upcoming_content_text').classList.remove('lightcolordark');
              document.querySelector('.upcoming_title').classList.remove('lightblack');
              document.querySelector('.upcoming_name').classList.remove('lightblack');
              document.querySelector('.upcoming_list_pop').classList.remove('lightcolordark');
              document.querySelector('.upcoming_list_genre').classList.remove('lightcolordark');
              document.querySelector('.upcoming_content_title').classList.remove('lightblack');
              document.querySelectorAll('.mobile-menu-link').forEach(mobileItem=>{
                mobileItem.classList.remove('lightblack');
              })
              
            }
          } catch (err) { }
  }
  addDarkClassToHTML();