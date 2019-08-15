$(document).ready(function(){
  $(window).resize(function() {
    
  var screenWidth = $(window).width();
  console.log(screenWidth);
  if(screenWidth < 1200) {
    $('.modal').addClass('modal_active');
  }
  if (screenWidth > 1200) {
    $('.modal').removeClass('modal_active');
  }
  })
});