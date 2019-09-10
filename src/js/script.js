$(document).ready(function(){
  // Скрипт для вывода имени файла
  document.getElementById('add').onchange = function () {
    var filename = $('#add').val().split('/').pop().split('\\').pop();
    if (filename)
      $('.order-form__addbtn').html(filename);
  };

  // Валидация формы
  $('#form-order').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      usermail: {
        required: true,
        email: true,
      },
      userphone: 'required',
    },
    messages: {
      username: {
        required: "Введите имя",
        minlength: jQuery.validator.format("Необходимо {0} символа!")
      },
      usermail: {
        required: "Введите email",
        email: "Пример: example@domain.com"
      },
      userphone: {
        required: "Введите номер телефона"
      },
    },
  });
  // Маска телефона
  $('#phone').mask("+7 (999) 999-99-99");
});