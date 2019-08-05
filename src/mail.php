<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$first_name = $_POST['first_name'];
$second_name = $_POST['second_name'];
$name = $first_name.' '.$second_name;
$phone = $_POST['phone'];
$email = $_POST['email'];
$count = $_POST['count'];
$message = $_POST['message'];

function IsChecked($chkname,$value)
{
    if(!empty($_POST[$chkname]))
    {
        foreach($_POST[$chkname] as $chkval)
        {
            if($chkval == $value)
            {
                return true;
            }
        }
    }
    return false;
}

function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}

function check_length($value = "", $min, $max) {
    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
    return !$result;
}

$first_name = clean($first_name);
$second_name = clean($second_name);
$email = clean($email);
$phone = clean($phone);
$message = clean($message);

$mail->setFrom($email); // от кого будет уходить письмо?
$mail->addAddress('order@vinumlignum.ru');     // Кому будет уходить письмо 

if(IsChecked('material','A'))
{
    $material = "Фанера";
}
if(IsChecked('material','B'))
{
    $material = "Дерево";
}
if(IsChecked('material','A') && IsChecked('material','B'))
{
    $material = "Фанера и Дерево";
}

if(!empty($first_name) && !empty($second_name) && !empty($email) && !empty($phone)) {
    $email_validate = filter_var($email, FILTER_VALIDATE_EMAIL); 

    if(check_length($first_name, 2, 25) && check_length($second_name, 2, 50) && check_length($phone, 2, 11) && $email_validate) {
        if (isset($_FILES['add']) &&
    $_FILES['add']['error'] == UPLOAD_ERR_OK) {
    $mail->AddAttachment($_FILES['add']['tmp_name'],
                         $_FILES['add']['name']);
}
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email.
 '<br>Материал: ' .$material;
$mail->AltBody = '';

        echo "Спасибо за сообщение";
    } else { // добавили сообщение
        echo "Введенные данные некорректны";
    }
} else { // добавили сообщение
    echo "Заполните пустые поля";
}
if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: index.html');
}
?>