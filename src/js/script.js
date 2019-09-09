// Скрипт для вывода имени файла
document.getElementById('add').onchange = function () {
  var filename = $('#add').val().split('/').pop().split('\\').pop();
  if(filename)
    $('.order-form__addbtn').html(filename);
};
