<?php
class sesionCtrl extends Controlador {

    // Handles login rendering and authentication
    public function index() : void {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = trim($_POST['email'] ?? '');
            
            // Bypass database check for visualization testing
            $_SESSION['usuario_logueado'] = true;
            $_SESSION['usuario_id'] = 999;
            $_SESSION['usuario_nombre'] = 'Usuario de Prueba';
            $_SESSION['usuario_email'] = $email ?: 'prueba@manoamano.org';

            $emailLower = strtolower($email);
            if ($emailLower === 'organizacion@gmail.com') {
                $_SESSION['usuario_rol'] = 'organizacion';
                $_SESSION['usuario_nombre'] = 'Organización de Prueba';
            } else {
                $_SESSION['usuario_rol'] = 'voluntario';
                $_SESSION['usuario_nombre'] = 'Voluntario de Prueba';
            }

            header('Location: ' . BASE_URL);
            exit;
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
