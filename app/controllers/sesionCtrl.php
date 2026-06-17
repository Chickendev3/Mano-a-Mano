<?php
class sesionCtrl extends Controlador {
    
	public function index() : void {
		$datos = ['msj' => null];

		/* Hacer más verificaciones de seguridad --------------------------------------------------------------------------- PENDIENTE !!!! */
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$email = trim($_POST['email'] ?? '');
			$clave = trim($_POST['password'] ?? '');
			
			$msj = $this->inicioSesion($email, $clave);
			$datos['msj'] = $msj;

			if ($msj == null){
				header("location: " . BASE_URL );
			}
		}

		$this->cargarVista('sesion', $datos, 'Mano a Mano - Iniciar sesión');
	}

    public function inicioSesion (string $email, string $clave) : ?string {
		$modeloVoluntario = $this->cargarModelo('Voluntario');
		$modeloOrganizacion = $this->cargarModelo('Organizacion');	

		if (empty($email) || empty($clave)) {
            return 'Complete los campos obligatorios';
        }

		$existeMail = Usuario::emailExiste($email);
		if ($existeMail == false) {
			return 'No existe el email ingresado';
		}

		$usuarioVol = $modeloVoluntario->obtenerVoluntarioPorEmail($email);
		$usuarioOrg = $modeloOrganizacion->obtenerOrganizacionPorEmail($email);

		if ($usuarioVol){
			if (password_verify($clave, $usuarioVol['clave'])) {
                $_SESSION['usuario_logueado'] = true;
				$_SESSION['id_usuario'] = $usuarioVol['id_usuario'];
				$_SESSION['id_voluntario'] = $usuarioVol['id_voluntario'];
				$_SESSION['nombre_usuario'] = $usuarioVol['nombre'];
				$_SESSION['apellido_usuario'] = $usuarioVol['apellido'];
				$_SESSION['img_perfil'] = $usuarioVol['img_perfil'];
                $_SESSION['usuario_rol'] = 'voluntario';
				return null;	
			}
		} elseif ($usuarioOrg)
			if (password_verify($clave, $usuarioOrg['clave'])) {
                $_SESSION['usuario_logueado'] = true;
				$_SESSION['id_usuario'] = $usuarioOrg['id_usuario'];
				$_SESSION['nombre_usuario'] = $usuarioOrg['nombre'];
				$_SESSION['id_organizacion'] = $usuarioOrg['id_organizacion'];
				$_SESSION['img_perfil'] = $usuarioOrg['img_perfil'];
                $_SESSION['usuario_rol'] = 'organizacion';
				return null;	
			}
		
		return 'El email o la constraseña es incorrecta';
	}

	public function cerrarSesion () {
		session_destroy();
        header('location: ' . BASE_URL);
	}
}
?>
