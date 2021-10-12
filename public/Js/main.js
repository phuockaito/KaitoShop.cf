$(document).ready(function () {
  // const scrollMenu = $('.ground-header');
  $("ul.menu").find('li.active-menu a').on('click', function () {
    $(this).parent('li.active-menu').toggleClass('open');
  });
  $('button.scrollTop').on('click', () => {
    $("html ,body").animate({ scrollTop: 0 }, 500);
  })

  // let lastScrollTop = 0;
  // window.addEventListener("scroll", () => {
  //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //     if (scrollTop > lastScrollTop) {
  //         scrollMenu.css("top","-80px");
  //         $('.ground-menu .nav-toggle').css("height","0");
  //         $('.card-total-money').css("top","5px");
  //     } else {
  //         scrollMenu.css("top","0");
  //         $('.ground-menu .nav-toggle').css("height","76px");
  //         $('.card-total-money').css("top","80px");
  //     }
  //     lastScrollTop = scrollTop;
  // });

  //------------open menu ------------
  // //------------scroll//------------
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $('.scrollTop').addClass('active');
    } else {
      $('.scrollTop').removeClass('active');
    }
  });


})

