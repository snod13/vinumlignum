<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailerAutoload.php';
// Переменные, которые отправляет пользователь
$name = $_POST['username'];
$surname = $_POST['usersurname'];
$email = $_POST['usermail'];
$phone = $_POST['userphone'];
$count = $_POST['count'];
$message = $_POST['message'];
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
    $mail->setFrom('sork.andrew@mail.ru', 'Vinum Lignum'); // Адрес самой почты и имя отправителя
    // Получатель письма
    $mail->addAddress('sork67@gmail.com');
    // Файлы
if (!empty($_FILES['myfile']['name'][0])) {
    for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
        $filename = $_FILES['myfile']['name'][$ct];
        if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Неудалось прикрепить файл ' . $uploadfile;
        }
    }   
}
    // $mail->addAttachment($_FILES['myfile']['tmp_name'], $_FILES['myfile']['name']);
        // -----------------------
        // Само письмо
        // -----------------------
        $mail->isHTML(true);
    
        $mail->Subject = 'Заявка с сайта';
        $mail->Body    = "<b>Имя:</b> $name $surname<br>
        <b>Почта:</b> $email<br><br>
        <b>Телефон:</b> $phone<br>
        <b>Кол-во:</b> $count<br>
        <b>Доп. описание:</b> $message";
// Проверяем отравленность сообщения
if ($mail->send()) {
    echo 'Спасибо за заказ, ' .$name. ', скоро наши специалисты с вами свяжутся.' .$msg;
} else {
echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты" .$mail->ErrorInfo;
}
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
?>