$(document).ready(function(){
  // Работа с модальным окном
  var modal = $('#modal');
  var closeModal = $('#close');
  modal.hide();
  closeModal.click(function(){
    modal.hide();
  });
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
        data: $(form).serialize(),
        success: function (data) {
          modal.show();
          $('.modal-message__text').text(data);
          $('#form-order').trigger('reset');
          $('.order-form__addbtn').html('Прикрепить файл');
        }
      });
    }
  });
  // Маска телефона
  $('#phone').mask("+7 (999) 999-99-99");
});