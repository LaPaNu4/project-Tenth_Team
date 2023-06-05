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
              document.querySelectorAll('.mobile-menu-link').forEach(mobileItem=>{
                mobileItem.classList.add('lightblack')
              })
              document.querySelector('.text-logo').classList.add('lightblack');
              document.querySelector('.links').classList.add('lightcolor');
              document.querySelector('.menu-btn-mobile').classList.add('lightcolor');
              document.querySelector('.footer-copyright').classList.add('lightcolor');
              document.querySelector('.footer-copyright--btn').classList.add('lightcolor');
              
            }
            else {
                document.querySelector('body').classList.remove('light');
                document.querySelector('.mobile-menu').classList.remove('light');
                document.querySelector('.button-subjectlight').style.display = "none";
                document.querySelector('.button-subject').style.display = "flex";
                document.querySelectorAll('.mobile-menu-link').forEach(mobileItem=>{
                  mobileItem.classList.remove('lightblack');
                })
                document.querySelector('.text-logo').classList.remove('lightblack');
                document.querySelector('.links').classList.remove('lightcolor');
                document.querySelector('.menu-btn-mobile').classList.remove('lightcolor');
                document.querySelector('.main-header').classList.remove('light');
                document.querySelector('.footer-copyright').classList.remove('lightcolor');
                document.querySelector('.footer-copyright--btn').classList.remove('lightcolor');
                
              }
            } catch (err) { }
    }
    addDarkClassToHTML();