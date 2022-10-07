<?php
	
    $to      = 'sandra@norarealfood.com';
    $subject = 'Nuevo contacto Nora Bussiness';


    $message = 'Nuevo contacto en el formulario de Nora Bussiness.

    	Nombre empresa: '.$_POST["nombre_empresa"].'
    	Cargo: '.$_POST["cargo"].'
    	Número de personas en tu oficina: '.$_POST["numero"].'
    	Nombre y apellidos: '.$_POST["nombre"].'
    	Email: '.$_POST["email"].'
    ';
    
    $headers = 'From: sandra@norarealfood.com'       . "\r\n" .
                 'Reply-To: sandra@norarealfood.com' . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

?>