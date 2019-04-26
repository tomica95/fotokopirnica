<?php 
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'vendor/phpmailer/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/phpmailer/src/SMTP.php';
    
    
    if(isset($_REQUEST['sendMessageButton'])){
    $username = $_REQUEST['name'];
    $regUsername = "/[A-z]{1,}/";
    $email = $_REQUEST['email'];
    $regMail = "/[\w\-.+_%]+@[\w\.\-]+\.[A-Za-z0-9]{2,}/";
	$message = $_REQUEST['message'];
	
    $podaci = [];
    $greske = [];
    if(!preg_match($regUsername,$username)){
        $greske[]='aaa';
    }
    
    if(count($greske)>0){
        var_dump($greske);
    }
    else
    {
        
                $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'jellytot95@gmail.com';                 // SMTP username
    $mail->Password = 'sifra';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    $mail->SMTPOptions =array(
        "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
            "allow_self_signed"=>true
        )
    );
    //Recipients
    $mail->setFrom('jellytot95@gmail.com', 'Poruka sa skolarackopiranac.rs');
    $mail->addAddress('jellytot95@gmail.com');     // Add a recipient
   
   
    
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Poruka sa skolarackopiranac.rs';
    $mail->Body    = 'Ime: '.$username . ' koji ima e-mail: '.$email. ' zeli da pita: '.$message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    $mail->send();
    echo 'Poruka je poslata';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
	}}
        
   

?>