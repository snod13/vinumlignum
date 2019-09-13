// Работа с модальным окном
var modal = $('#modal');
var closeModal = $('#close');
closeModal.click(function () {
  modal.removeClass('modal-active');
});
$(document).ready(function(){
  // Скрипт для вывода имени файла
  document.getElementById('myfile').onchange = function () {
    var fileName = $('#myfile').val().split('/').pop().split('\\').pop();
    if (fileName)
      $('.order-form__addbtn').html(fileName);
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
    submitHandler: function (form) {
      $.ajax({
        url: 'newmail.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: new FormData(form),
        success: function (data) {
          modal.addClass('modal-active');
          $('.modal-message__text').text(data);
          $('.order-form__addbtn').html('Прикрепить файл');
          $('#form-order').trigger('reset');
          ym(54620671, 'reachGoal', 'order-form');
          return true;
        }
      });
    }
  });
  // Маска телефона
  $('#phone').mask("+7 (999) 999-99-99");
});