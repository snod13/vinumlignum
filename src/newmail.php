<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$name = $_POST['username'];
$email = $_POST['useremail'];
$phone = $_POST['userphone'];
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";                                          
    $mail->SMTPAuth   = true;
    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера GMAIL
    $mail->Username   = 'sork.andrew@mail.ru'; // Логин на почте
    $mail->Password   = 'Sork13foX'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sork.andrew@mail.ru', 'Миролюбец'); // Адрес самой почты и имя отправителя
    // Получатель письма
    $mail->addAddress('a.50r0kin@yandex.ru');
        // -----------------------
        // Само письмо
        // -----------------------
        $mail->isHTML(true);
    
        $mail->Subject = 'Заявка с сайта';
        $mail->Body    = "<b>Имя:</b> $name <br>
        <b>Почта:</b> $email<br><br>
        <b>Телефон:</b><br>$phone";
// Проверяем отравленность сообщения
if ($mail->send()) {
    echo 'Спасибо за обращение, ' .$name. ', скоро мы Вам перезвоним.';
} else {
echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты" .$mail->ErrorInfo;
}
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
?>