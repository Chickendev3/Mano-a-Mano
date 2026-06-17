<?php
use PHPMailer\PHPMailer\PHPMailer;
/* use PHPMailer\PHPMailer\SMTP; */
use PHPMailer\PHPMailer\Exception;

require '../libs/vendor/autoload.php';

class contactoCtrl extends Controlador {

	public function index() : void {
		$msj = null;

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$nombre = trim($_POST['nombre'] ?? '');
			$apellido = trim($_POST['apellido'] ?? ''); 
			$email = trim($_POST['email'] ?? '');
			$asunto = trim($_POST['asunto'] ?? '');
			$cuerpo = htmlspecialchars($_POST['cuerpo'], ENT_QUOTES, 'UTF-8');
			
			$msj = $this->enviarCorreo($nombre, $apellido, $email, $asunto, $cuerpo);
			$datos['msj'] = $msj;

			if ($msj == null){
				header("location: " . BASE_URL );
			}
		}

		$datos = ['msj' => $msj];
		$this->cargarVista('contacto', $datos, 'Mano a Mano - Contacto'); 
	}

	public function enviarCorreo ( string $nombre, string $apellido, string $email, string $asunto, string $cuerpo ) : ?string {
		$correoModelo = $this->cargarModelo('Correo');

		if (empty($nombre) || empty($apellido) || empty($email) || empty($asunto) || empty($cuerpo) ) {
            return 'Complete los campos obligatorios';
        }

		//Create an instance; passing `true` enables exceptions
		$mail = new PHPMailer(true);

		try {
			//Server settings
			/* $mail->SMTPDebug = SMTP::DEBUG_SERVER;         */              
			$mail->isSMTP();                                         
			$mail->Host       = 'smtp.gmail.com';                     
			$mail->SMTPAuth   = true;                              
			$mail->Username   = 'mano.a.mano.proy@gmail.com';           //SMTP username
			$mail->Password   = 'fmxnnwszxcxepgxi';                     //SMTP password
			$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
			$mail->Port       = 465;                                    

			$nombreCompleto = $nombre . ' ' . $apellido;
			/* Remitente Real (gmail) */
			$mail->setFrom('mano.a.mano.proy@gmail.com', 'Formulario Web');
			/* Destinatario */
			$mail->addAddress('mano.a.mano.proy@gmail.com');     //Add a recipient	
			/* Para que se pueda responder al usuario */
			$mail->addReplyTo($email, $nombreCompleto);

			/* Contenido del Correo */
			/* $mail->isHTML(true); */                                  //Set email format to HTML
			$mail->Subject = $asunto;
			$mail->Body    = "Nombre: $nombreCompleto\n\nEmail: $email\n\nCuerpo del Mensaje:\n$cuerpo";

			$mail->send();
			$correoModelo->nuevoCorreo( $nombre, $apellido, $email, $asunto, $cuerpo );

			return 'Mensaje Enviado!';

		} catch (Exception $e) {
			return "Ocurrió un error: {$mail->ErrorInfo}";
		}
	}
}
?>