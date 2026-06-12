<?php
class sesionCtrl extends Controlador {

    // Handles login rendering and authentication
    public function index() : void {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = trim($_POST['email'] ?? '');
            $clave = $_POST['clave'] ?? '';

            if (empty($email) || empty($clave)) {
                $datos = ['error' => 'Por favor, ingresa tu correo y contraseña.'];
                $this->cargarVista('sesion', $datos, 'Iniciar Sesión | Mano a Mano');
                return;
            }

            // Query user in DB
            $db = new BaseDatos();
            $db->consulta("SELECT * FROM usuarios WHERE email = :email");
            $db->asignar(":email", $email);
            $db->ejecutar();
            $usuario = $db->resultado();

            if ($usuario) {
                // Verify password (supports hashed and plaintext fallbacks)
                if (password_verify($clave, $usuario['clave']) || $clave === $usuario['clave']) {
                    $_SESSION['usuario_logueado'] = true;
                    $_SESSION['usuario_id'] = $usuario['id'];
                    $_SESSION['usuario_nombre'] = $usuario['nombre'];
                    $_SESSION['usuario_email'] = $usuario['email'];

                    // Determine user role by checking if they exist in voluntarios vs organizaciones tables
                    $db->consulta("SELECT id FROM voluntarios WHERE usuario_id = :uid");
                    $db->asignar(":uid", $usuario['id']);
                    $db->ejecutar();
                    if ($db->resultado()) {
                        $_SESSION['usuario_rol'] = 'voluntario';
                    } else {
                        $_SESSION['usuario_rol'] = 'organizacion';
                    }

                    header('Location: ' . BASE_URL);
                    exit;
                } else {
                    $datos = ['error' => 'La contraseña ingresada es incorrecta.'];
                    $this->cargarVista('sesion', $datos, 'Iniciar Sesión | Mano a Mano');
                    return;
                }
            } else {
                $datos = ['error' => 'El correo electrónico no se encuentra registrado.'];
                $this->cargarVista('sesion', $datos, 'Iniciar Sesión | Mano a Mano');
                return;
            }
        }

        $datos = ['error' => null];
        $this->cargarVista('sesion', $datos, 'Iniciar Sesión | Mano a Mano');
    }

    // Handles logout
    public function salir() : void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $_SESSION = [];
        session_destroy();
        
        header('Location: ' . BASE_URL);
        exit;
    }
}
?>
