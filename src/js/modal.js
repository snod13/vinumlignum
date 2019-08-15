$(document).ready(function(){
  $(window).load(function(){
      var screenWidth = $(window).width();
      if(screenWidth < 1200) {
        $('.modal').addClass('modal_active');
      }
    $(window).resize(function () {
      var screenWidth = $(window).width();
      if (screenWidth < 1200) {
        $('.modal').addClass('modal_active');
      }
      if (screenWidth > 1200) {
        $('.modal').removeClass('modal_active');
      }
    })
  })
});