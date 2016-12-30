<?php

function mailer($name, $email, $nameTo, $emailTo, $subject, $message, $cc) {
	$charset = "utf-8";

	$name   = "=?$charset?B?".base64_encode($name)."?=";
	$nameTo   = "=?$charset?B?".base64_encode($nameTo)."?=";
	$subject = "=?$charset?B?".base64_encode($subject)."?=";

	$header  = "Content-Type: text/html; charset=utf-8\r\n";
	$header .= "MIME-Version: 1.0\r\n";

	$header .= "Return-Path: <". $email .">\r\n";
	$header .= "From: ". $name ." <". $email .">\r\n";
	$header .= "Reply-To: <". $email .">\r\n";
	if ($cc)  $header .= "Cc: ". $cc ."\r\n";

	$result = mail($emailTo, $subject, $message, $header, $email);
	$emailSent = true;

	if($result) {
		echo ('success');
	} else {
		echo ('error');
	}
}

	$name = trim($_POST['name']);
	$email = trim($_POST['email']);
	$message = nl2br(stripslashes($_POST['message']));
	$nameTo = "조하늘";
	$emailTo = "stuykr@naver.com";
	$cc = "gemchoky@gmail.com";
	if (empty($subject)) {
		$subject = "[".$name."] Josky.net에서 도착한 이메일입니다.";
	}

	mailer($name, $email, $nameTo, $emailTo, $subject, $message, $cc);

?>
